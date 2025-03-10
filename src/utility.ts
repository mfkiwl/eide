/*
    MIT License

    Copyright (c) 2019 github0null

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import * as vscode from 'vscode';
import * as crypto from 'crypto';
import * as child_process from 'child_process';
import * as fs from 'fs';

import * as os from 'os';

import { WorkspaceManager } from "./WorkspaceManager";
import { CmdLineHandler } from "./CmdLineHandler";
import { ExceptionToMessage, newMessage } from "./Message";
import { NetRequest, NetResponse } from '../lib/node-utility/NetRequest';
import { File } from '../lib/node-utility/File';
import { GitFileInfo } from './WebInterface/GithubInterface';
import * as platform from './Platform';
import { SevenZipper } from './Compress';
import { ResManager } from './ResManager';
import { isArray } from 'util';
import { ExeCmd } from '../lib/node-utility/Executable';
import { GlobalEvent } from './GlobalEvents';
import { SettingManager } from './SettingManager';

export function mergeEnv(old_kv: any, new_kv: any, prependPath?: boolean): any {

    const pnam = platform.osType() == 'win32' ? 'Path' : 'PATH';
    const psep = platform.osType() == 'win32' ? ';' : ':';

    for (const key in new_kv) {
        if (key == pnam && old_kv[key]) {
            old_kv[key] = prependPath ? `${new_kv[key]}${psep}${old_kv[key]}` : `${old_kv[key]}${psep}${new_kv[key]}`;
        } else {
            old_kv[key] = new_kv[key];
        }
    }

    return old_kv;
}

export function copyAndMakeObjectKeysToLowerCase(kv_obj: any): any {
    const nObj: any = {};
    for (const key in kv_obj) nObj[key.toLowerCase()] = kv_obj[key];
    return nObj;
}

export function execInternalCommand(command: string, cwd?: string, cancel?: vscode.CancellationToken): Promise<boolean> {

    return new Promise<boolean>((resolve) => {

        const proc = new ExeCmd();

        proc.on('launch', () => {
            GlobalEvent.emit('globalLog.show');
            GlobalEvent.emit('globalLog.append', `\n>>> exec cmd: '${command}'\n\n`);
        });

        proc.on('data', str => {
            GlobalEvent.emit('globalLog.append', str);
        });

        proc.on('close', exitInfo => {
            resolve(exitInfo.code == 0);
        });

        cancel?.onCancellationRequested(_ => {
            if (!platform.kill(<number>proc.pid())) {
                GlobalEvent.emit('msg', newMessage('Warning', `Can not kill process: ${proc.pid()} !`));
            }
        });

        proc.Run(<string>command, undefined, { cwd: cwd });
    });
}

export async function notifyReloadWindow(msg: string) {
    const resp = await vscode.window.showInformationMessage(msg, 'Ok', 'Later');
    if (resp == 'Ok') {
        await vscode.commands.executeCommand('workbench.action.reloadWindow');
    }
}

export function newMarkdownString(lines: string | string[]): vscode.MarkdownString {
    if (typeof lines == 'string') {
        return new vscode.MarkdownString(lines);
    } else {
        return new vscode.MarkdownString(lines.join(os.EOL));
    }
}

export interface FileTooltipInfo {
    name: string;
    path: string;
    desc?: string;
    attr: { [key: string]: string | undefined };
}

export function newFileTooltipString(f: File | FileTooltipInfo, root?: File): vscode.MarkdownString {

    let title = `**Name:** \`${f.name}\``;

    if (!(f instanceof File) && f.desc) {
        title = title + ` (\`${f.desc}\`)`
    }

    const s = [
        title,
        `- **Path:** \`${f.path}\``,
    ];

    if (File.IsFile(f.path)) {
        try {
            const meta = fs.statSync(f.path);
            s.push(`- **Size:** \`${meta.size.toString()} Bytes (${(meta.size / 1024).toFixed(1)} KB)\``);
            s.push(`- **LastModifyTime:** \`${meta.mtime.toString()}\``);
        } catch (error) {
            // nothing
        }
    }

    if (root) {
        const re = root.ToRelativePath(f.path);
        if (re) {
            s.push(`- **RelativePath:** \`${re}\``);
        }
    }

    if (!(f instanceof File) && f.attr) { // not a File obj
        for (const key in f.attr) {
            if (f.attr[key]) {
                s.push(`- **${key}:** \`${f.attr[key]}\``);
            }
        }
    }

    return newMarkdownString(s);
}

export function toArray(obj: any): any[] {
    if (obj == undefined || obj == null) return [];
    if (isArray(obj)) return obj;
    return [obj];
}

export interface XmlFormatOptions {
    indentation?: string;
    filter?: (node: any) => boolean;
    stripComments?: boolean;
    collapseContent?: boolean;
    lineSeparator?: string;
    whiteSpaceAtEndOfSelfclosingTag?: boolean;
}

export function xmlfmt(xml: string, opts?: XmlFormatOptions): string {

    const defOpt = {
        indentation: '    ',
        lineSeparator: os.EOL,
        collapseContent: true,
        whiteSpaceAtEndOfSelfclosingTag: false
    };

    if (opts) {
        for (const key in <any>defOpt) {
            if ((<any>opts)[key] == undefined) {
                (<any>opts)[key] = (<any>defOpt)[key];
            }
        }
    }

    try {
        const format = require('xml-formatter');
        return format(xml, opts || defOpt);
    } catch (error) {
        return xml;
    }
}

export function escapeXml(str: string): string {
    return str.replace(/[<>&'"]/g, (c: string): string => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

export function runShellCommand(title: string, commandLine: string, env?: any, useTerminal?: boolean, cwd?: string): Error | undefined {
    try {

        // use vsc task
        if (!useTerminal && WorkspaceManager.getInstance().hasWorkspaces()) {
            // init shell
            const shellOption: vscode.ShellExecutionOptions = { env: env || process.env, cwd: cwd };
            if (platform.osType() == 'win32') { shellOption.executable = 'cmd.exe'; shellOption.shellArgs = ['/C']; }
            else { shellOption.executable = '/bin/bash'; shellOption.shellArgs = ['-c']; }
            // init task
            if (platform.osType() == 'win32') commandLine = `"${commandLine}"`;
            const task = new vscode.Task({ type: 'shell', command: commandLine }, vscode.TaskScope.Global,
                title, 'shell', new vscode.ShellExecution(commandLine, shellOption), []);
            task.isBackground = false;
            task.presentationOptions = { echo: true, focus: false, clear: true };
            vscode.tasks.executeTask(task);
        }

        // use terminal
        else {
            const index = vscode.window.terminals.findIndex((t) => { return t.name === title; });
            if (index !== -1) { vscode.window.terminals[index].dispose(); }
            const tOpts: vscode.TerminalOptions = { name: title, env: env || process.env, cwd: cwd };
            if (os.platform() == 'win32') tOpts.shellPath = 'cmd.exe';
            const terminal = vscode.window.createTerminal(tOpts);
            terminal.show(true);
            terminal.sendText(CmdLineHandler.DeleteCmdPrefix(commandLine));
        }

    } catch (error) {
        return error;
    }
}

export function copyObject(src: any): any {
    if (Array.isArray(src)) {
        return Array.from(src);
    } else if (typeof src === 'object') {
        return JSON.parse(JSON.stringify(src));
    } else {
        return src;
    }
}

export function wrapCommand(cmds: string[]): string {
    return cmds.map((cmd) => {
        if (cmd.includes(' ') && !cmd.startsWith('"')) { return `"${cmd}"`; }
        return cmd;
    }).join(' ');
}

export function md5(str: string): string {
    const md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
}

export function sha256(str: string): string {
    const md5 = crypto.createHash('sha256');
    md5.update(str);
    return md5.digest('hex');
}

export function sha1(str: string): string {
    const md5 = crypto.createHash('sha1');
    md5.update(str);
    return md5.digest('hex');
}

export function newSevenZipperInstance(): SevenZipper {
    return new SevenZipper(ResManager.GetInstance().Get7zDir());
}

export async function openUrl(url: string): Promise<Error | undefined> {
    try {
        await vscode.commands.executeCommand(`vscode.open`, vscode.Uri.parse(url));
    } catch (error) {
        return error;
    }
}

export function compareVersion(v1: string, v2: string): number {

    const v1_li = v1.split('.').filter((s) => s.trim() != '');
    const v2_li = v2.split('.').filter((s) => s.trim() != '');

    // compare per number
    const minLen = Math.min(v1_li.length, v2_li.length);
    for (let index = 0; index < minLen; index++) {
        const v_1 = parseInt(v1_li[index]);
        if (isNaN(v_1)) throw new Error(`version string '${v1}' must only contain 'number' and '.'`);
        const v_2 = parseInt(v2_li[index]);
        if (isNaN(v_2)) throw new Error(`version string '${v2}' must only contain 'number' and '.'`);
        if (v_1 > v_2) return 1;
        if (v_1 < v_2) return -1;
    }

    // if prefix is equal, compare len
    if (v1_li.length > v2_li.length) return 1;
    if (v1_li.length < v2_li.length) return -1;

    return 0;
}

const PROXY_HOST_MAP: { [host: string]: string[] } = {
    'api.github.com': [
        'api-github.em-ide.com',
        'api-github.github0null.io'
    ],
    'raw.githubusercontent.com': [
        'raw-github.em-ide.com',
        'raw-github.github0null.io'
    ]
};

export function redirectHost(url: string) {

    if (!SettingManager.GetInstance().isUseGithubProxy()) {
        return url;
    }

    // replace host
    for (const host in PROXY_HOST_MAP) {
        const hostList = PROXY_HOST_MAP[host];
        if (hostList.length > 1) {
            const idx = Math.floor(Math.random() * hostList.length); // random index
            url = url.replace(host, hostList[idx]);
        } else {
            url = url.replace(host, hostList[0]);
        }
    }

    return url;
}

export function setProxyHeader(headers: { [key: string]: string }): { [key: string]: string } {
    // TODO
    return headers;
}

export function formatPath(path: string): string {
    return File.ToLocalPath(path.trim().replace(/(?:\\|\/)+$/, ''));
}

export async function downloadFile(url: string): Promise<Buffer | Error | undefined> {

    return new Promise(async (resolve) => {

        let locked = false;
        const resolveIf = (data: Error | Buffer | undefined) => {
            if (!locked) {
                locked = true;
                resolve(data);
            }
        };

        const netReq = new NetRequest();

        netReq.on('error', (err) => {
            resolveIf(err);
        });

        // parse path
        const urlParts = url.replace('https://', '').split('/');
        const hostName = urlParts[0];
        const path = '/' + urlParts.slice(1).join('/');

        const res = await netReq.RequestBinary<any>({
            host: hostName,
            path: path,
            headers: setProxyHeader({ 'User-Agent': 'Mozilla/5.0' })
        }, 'https');

        let result: Buffer | Error | undefined;

        if (res.success && res.content) { // received ok
            result = res.content;
        } else {
            result = new Error(`Download file failed !, https errCode: ${res.statusCode}, msg: ${res.msg}`);
        }

        resolveIf(result);
    });
}

export function isVersionString(str: string): boolean {
    return /^\d+(?:\.\d+)+$/.test(str.trim());
}

export async function requestTxt(url: string): Promise<string | Error | undefined> {

    return new Promise(async (resolve) => {

        let locked = false;
        const resolveIf = (data: string | Error | undefined) => {
            if (!locked) {
                locked = true;
                resolve(data);
            }
        };

        const netReq = new NetRequest();

        netReq.on('error', (err) => {
            resolveIf(err);
        });

        // parse path
        const urlParts = url.replace('https://', '').split('/');
        const hostName = urlParts[0];
        const path = '/' + urlParts.slice(1).join('/');

        const res = await netReq.RequestTxt<any>({
            host: hostName,
            path: path,
            headers: setProxyHeader({ 'User-Agent': 'Mozilla/5.0' })
        }, 'https');

        let result: string | Error | undefined;

        if (res.success && res.content) { // received ok
            result = res.content;
        } else {
            result = new Error(`Request failed !, https errCode: ${res.statusCode}, msg: ${res.msg}`);
        }

        resolveIf(result);
    });
}

export async function downloadFileWithProgress(url: string, fileLable: string,
    progress: vscode.Progress<{ message?: string; increment?: number }>, token: vscode.CancellationToken,
    rejectUnauthorized: boolean = true): Promise<Buffer | Error | undefined> {

    return new Promise(async (resolve) => {

        let locked = false;
        const resolveIf = (data: Error | Buffer | undefined) => {
            if (!locked) {
                locked = true;
                resolve(data);
            }
        };

        const netReq = new NetRequest();

        netReq.on('error', (err) => {
            resolveIf(err);
        });

        token.onCancellationRequested(() => {
            netReq.emit('abort');
            resolveIf(undefined);
        });

        // parse path
        const urlParts = url.replace('https://', '').split('/');
        const hostName = urlParts[0];
        const path = '/' + urlParts.slice(1).join('/');

        let curIncrement: number = 0;

        const res = await netReq.RequestBinary<any>({
            host: hostName,
            path: path,
            headers: setProxyHeader({ 'User-Agent': 'Mozilla/5.0' }),
            rejectUnauthorized: rejectUnauthorized
        }, 'https', (increment) => {
            curIncrement += increment;
            if (curIncrement > 1) { curIncrement = 1; } // limit to 100 %
            progress.report({
                increment: increment * 100,
                message: `${(curIncrement * 100).toFixed(1)}% of '${fileLable}'`
            });
        });

        let result: Buffer | Error | undefined;

        if (res.success && res.content) { // received ok
            result = res.content;
        } else if (token.isCancellationRequested === false) {
            result = new Error(`Download file failed !, https errCode: ${res.statusCode}, msg: ${res.msg}`);
        }

        resolveIf(result);
    });
}

export async function getDownloadUrlFromGitea(repo: string, folder: string, fileName: string): Promise<any | Error | undefined> {

    return new Promise(async (resolve) => {

        const req = new NetRequest();

        const res = await req.Request<any, any>({
            host: `git.github0null.io`,
            path: `/api/v1/repos/root/${repo}/contents/${folder}`,
            timeout: 3000,
            headers: setProxyHeader({ 'User-Agent': 'Mozilla/5.0' }),
            rejectUnauthorized: false, // ignore cert failed
        }, 'https');

        if (res.success == false || res.content == undefined) {
            resolve(new Error(res.msg || `Can't connect to git repo !`));
            return;
        }

        let fInfo: any | undefined;

        for (const fileInfo of res.content) {
            if (fileInfo['name'] == fileName) {
                fInfo = fileInfo;
                break;
            }
        }

        resolve(fInfo);
    });
}

export async function readGithubRepoFolder(repo_url: string, token?: vscode.CancellationToken): Promise<GitFileInfo[] | Error> {

    // URL: https://api.github.com/repos/github0null/eide-doc/contents/eide-template-list
    const remoteUrl = redirectHost(repo_url).replace(/^http[s]?:\/\//, '');
    const netReq = new NetRequest();

    let reqError: Error | undefined;
    netReq.on('error', (err) => {
        (<Error>err).message = `Failed to connect '${remoteUrl}'`;
        reqError = err;
    });

    const pathArr = (remoteUrl).split('/');
    const hostName = pathArr[0];
    const path = '/' + pathArr.slice(1).join('/');

    token?.onCancellationRequested(() => {
        netReq.emit('abort');
    });

    const res = await netReq.Request<any, any>({
        host: hostName,
        path: path,
        timeout: 3000,
        headers: setProxyHeader({ 'User-Agent': 'Mozilla/5.0' })
    }, 'https');

    if (!res.success) {
        const errMsg = res.msg ? `, msg: ${res.msg}` : '';
        return new Error(`Can't connect to github repository !${errMsg}`);
    } else if (res.content === undefined) {
        const errMsg = res.msg ? `, msg: ${res.msg}` : '';
        return new Error(`Can't get content from github repository !${errMsg}`);
    }

    if (reqError) {
        return reqError;
    }

    return <GitFileInfo[]>res.content;
}

/**
 * @param repo_path like: github0null/eide_default_external_tools_index
 * @param file_path like: dir/index.json
*/
export async function readGithubRepoTxtFile(repo_path: string, file_path: string): Promise<string | Error | undefined> {
    // https://raw.githubusercontent.com/github0null/eide_default_external_tools_index/master/xxx
    const url = redirectHost(`https://raw.githubusercontent.com/${repo_path}/master/${file_path}`);
    return await requestTxt(url);
}

export function genGithubHash(f: File | Buffer): string {
    if (f instanceof File) {
        const header = Buffer.from('blob ' + f.getSize() + '\0');
        const buf = Buffer.concat([header, fs.readFileSync(f.path)], header.length + f.getSize());
        const hash = crypto.createHash('sha1');
        hash.update(buf);
        return hash.digest('hex');
    } else {
        const header = Buffer.from('blob ' + f.length + '\0');
        const buf = Buffer.concat([header, f], header.length + f.length);
        const hash = crypto.createHash('sha1');
        hash.update(buf);
        return hash.digest('hex');
    }
}

interface FileCacheInfo {

    version: string;

    files: { name: string; sha: string; }[];
}

export class FileCache {

    private folder: File;
    private cacheFile: File;
    private cache: FileCacheInfo;

    public constructor(rootFolder: File) {
        this.folder = rootFolder;
        this.cacheFile = File.fromArray([rootFolder.path, 'cache.json']);
        this.cache = this.cacheFile.IsFile() ? JSON.parse(this.cacheFile.Read()) : { version: '1.0', files: [] };
    }

    public add(name: string, sha: string) {

        const idx = this.cache.files.findIndex((inf) => inf.name == name);

        if (idx != -1) {
            this.cache.files[idx].sha = sha;
        } else {
            this.cache.files.push({
                name: name,
                sha: sha
            });
        }
    }

    public get(name: string, sha: string): File | undefined {

        const idx = this.cache.files.findIndex((inf) => {
            return inf.name == name && inf.sha == sha;
        });

        if (idx == -1) {
            return undefined;
        }

        const f = File.fromArray([this.folder.path, this.cache.files[idx].name]);
        if (!f.IsFile()) {
            return undefined;
        }

        return f;
    }

    public clear(name?: string) {
        if (name) {
            const idx = this.cache.files.findIndex((inf) => inf.name == name);
            if (idx != -1) {
                this.cache.files.splice(idx, 1);
            }
        } else {
            this.cache.files = [];
        }
    }

    public save() {
        this.cacheFile.Write(JSON.stringify(this.cache));
    }
}

export function ToJsonStringExclude(obj: any, excludeList?: string[], indent?: string | number): string {

    const my_replacer = (key: string, val: any): any => {

        if (!val) return val;

        if (key == '' && excludeList && excludeList.length > 0) {

            let newVal = JSON.parse(JSON.stringify(val));

            for (const rKey of excludeList) {
                newVal[rKey] = undefined;
            }

            return newVal;
        }

        return val;
    };

    return JSON.stringify(obj, my_replacer, indent);
}

export function getFirstKey(obj: any): string | undefined {
    if (typeof obj === 'object') {
        for (const key in obj) {
            return key;
        }
    }
}

export function deepCloneObject(obj: any): any {

    if (typeof obj != 'object') {
        return obj;
    }

    return JSON.parse(JSON.stringify(obj));
}
