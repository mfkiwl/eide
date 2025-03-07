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

import { BuilderParams } from './CodeBuilder';
import * as os from 'os';
import { File } from '../lib/node-utility/File';
import * as fs from 'fs';
import { AbstractProject } from './EIDEProject';

export class MakefileGen {

    private static paramsFileName: string = 'target.mk';

    constructor() {
        /* nothing */
    }

    generateParams(params: BuilderParams): string {

        const strList: string[] = [
            `###########################################################################`,
            `#  !!! This file is Auto-Generated By Embedded IDE, Don't modify it !!!`,
            `###########################################################################`,
        ];

        /* EIDE */
        strList.push('', `# eide version`);
        strList.push(`EIDE_VER = 2`);

        /* current target */
        strList.push('', `# current target`);
        strList.push(`CUR_TARGET := ${params.target}`);

        /* compiler */
        strList.push('', `# current compiler`);
        strList.push(`COMPILER_TYPE := ${params.toolchain}`);

        /* add include paths */
        strList.push('', `# include folders`);
        for (const path of params.incDirs) {
            strList.push(`INCLUDE_FOLDERS += ${File.ToUnixPath(path)}`);
        }

        /* add lib search paths */
        strList.push('', `# library search folders`);
        for (const path of params.libDirs) {
            strList.push(`LIB_FOLDERS += ${File.ToUnixPath(path)}`);
        }

        /* add source files */

        const srcList = params.sourceList.filter((path) => {
            return AbstractProject.getSourceFileFilter().some((reg) => reg.test(path));
        });

        strList.push('', `# c source files`);
        srcList.filter((path) => path.toLowerCase().endsWith('.c'))
            .forEach((path) => {
                strList.push(`C_SOURCES += ${File.ToUnixPath(path)}`);
            });

        strList.push('', `# cpp source files`);
        const cppMatcher = /\.(cc|cpp|cxx|c\+\+)$/i;
        srcList.filter((path) => cppMatcher.test(path))
            .forEach((path) => {
                strList.push(`CPP_SOURCES += ${File.ToUnixPath(path)}`);
            });

        strList.push('', `# asm source files`);
        const asmMatcher = /\.(s|a51|asm)$/i;
        srcList.filter((path) => asmMatcher.test(path))
            .forEach((path) => {
                strList.push(`ASM_SOURCES += ${File.ToUnixPath(path)}`);
            });

        strList.push('', `# object files`);
        const objMatcher = /\.(lib|a|o|obj)$/i;
        srcList.filter((path) => objMatcher.test(path))
            .forEach((path) => {
                strList.push(`OBJ_SOURCES += ${File.ToUnixPath(path)}`);
            });

        /* add macros */
        strList.push('', `# macro defines`);
        for (const str of params.defines) {
            strList.push(`DEFINES += ${str}`);
        }

        return strList.join(os.EOL);
    }

    generateParamsToFile(params: BuilderParams, folder: string): void {
        fs.writeFileSync(
            `${folder}${File.sep}${MakefileGen.paramsFileName}`,
            this.generateParams(params),
            { encoding: 'utf8' });
    }
}
