(function(e){function _(_){for(var a,n,i=_[0],o=_[1],l=_[2],u=0,d=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&d.push(r[n][0]),r[n]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);c&&c(_);while(d.length)d.shift()();return s.push.apply(s,l||[]),t()}function t(){for(var e,_=0;_<s.length;_++){for(var t=s[_],a=!0,i=1;i<t.length;i++){var o=t[i];0!==r[o]&&(a=!1)}a&&(s.splice(_--,1),e=n(n.s=t[0]))}return e}var a={},r={app:0},s=[];function n(_){if(a[_])return a[_].exports;var t=a[_]={i:_,l:!1,exports:{}};return e[_].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=a,n.d=function(e,_,t){n.o(e,_)||Object.defineProperty(e,_,{enumerable:!0,get:t})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,_){if(1&_&&(e=n(e)),8&_)return e;if(4&_&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&_&&"string"!=typeof e)for(var a in e)n.d(t,a,function(_){return e[_]}.bind(null,a));return t},n.n=function(e){var _=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(_,"a",_),_},n.o=function(e,_){return Object.prototype.hasOwnProperty.call(e,_)},n.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=_,i=i.slice();for(var l=0;l<i.length;l++)_(i[l]);var c=o;s.push([0,"chunk-vendors"]),t()})({0:function(e,_,t){e.exports=t("56d7")},"034f":function(e,_,t){"use strict";t("85ec")},"199c":function(module,__webpack_exports__,__webpack_require__){"use strict";var C_Users_Admin_Desktop_eide_tools_cmsis_config_wizard_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("b85c"),core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("a15b"),core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("fb6a"),core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("c740"),core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es_array_find_index_js__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("ac1f"),core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("5319"),core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("2ca0"),core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_6__),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("99af"),core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_7__),core_js_modules_es_string_repeat_js__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("38cf"),core_js_modules_es_string_repeat_js__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(core_js_modules_es_string_repeat_js__WEBPACK_IMPORTED_MODULE_8__),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("d3b7"),core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_9__),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("25f0"),core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_10__),core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("00b4"),core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_11___default=__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_11__),_instance,appData={lang:"default",strs:{default:{title:"CMSIS Configuration Wizard","title.btn.save":"Save All","title.btn.open.config":"Open Header"},"zh-cn":{title:"CMSIS 配置向导","title.btn.save":"全部保存","title.btn.open.config":"打开源文件"}},tree:{cmsisObj:[],fileLines:[],modifyList:[],metaProp:{children:"children",label:"name"},cur_item:void 0}};__webpack_exports__["a"]={name:"App",components:{},data:function(){return appData},mounted:function(){var e=this;_instance=this,this.$on("save-status",(function(_){e.dialog.title=_.title||e.title,e.dialog.msg=_.msg,e.dialog.theme=_.success?"success":"danger",e.dialog.visible=!0}))},methods:{getInstance:function(){return _instance},forceUpdate:function(){this.$forceUpdate()},onSave:function(){_instance.$emit("save-all")},onOpenConfig:function(){var e,_;_instance.$emit("open-config",null===(e=this.tree.cur_item)||void 0===e||null===(_=e.location)||void 0===_?void 0:_.start)},notify:function(e){_instance.$notify(e)},message:function(e){_instance.$message(e)},get_str:function(e){return this.strs[this.lang]&&void 0!==this.strs[this.lang][e]?this.strs[this.lang][e]:this.strs["default"][e]||e},get_enum_desc_by_val:function(e,_){var t,a=Object(C_Users_Admin_Desktop_eide_tools_cmsis_config_wizard_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__["a"])(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(r.val==_)return r.desc}}catch(s){a.e(s)}finally{a.f()}},get_code_by_loc:function(e){return void 0!=e.end&&e.end>=e.start?this.tree.fileLines.slice(e.start,e.end+1).join("\n"):""},cut_long_str:function(e){return e.length>70?"".concat(e.substr(0,67),"..."):e},is_parent_checked:function(e){var _=e.parent;while(_){if(("bool"==_.data.type||"section"==_.data.type)&&"0"==_.data.var_value)return!1;_=_.parent}return!0},on_tree_item_modified:function(e){if(void 0!=e.location){var _=this.tree.modifyList.findIndex((function(_){var t,a;return(null===(t=_.location)||void 0===t?void 0:t.start)==(null===(a=e.location)||void 0===a?void 0:a.start)}));-1==_&&this.tree.modifyList.push(e),this.on_handle_item_change(e)}},on_handle_item_change:function(e){switch(e.type){case"section":break;case"code":case"bool":break;case"option":void 0!=e.var_disp_value?void 0!=e.var_mod_bit?this.format_value_by_bits(e,e.var_disp_value):(e.var_disp_value=this.format_value_by_range(e,e.var_disp_value),this.format_value_by_disp_fmt(e,e.var_disp_value)):e.var_value=this.format_value_by_range(e,e.var_value);break;case"string":if(void 0!=e.var_disp_value){var _=e.var_disp_value.replace(/(?<!\\)"/g,'\\"');e.var_value='"'.concat(_,'"')}else e.var_value=e.var_disp_value;break;default:break}},is_hex_number:function(e){return e.toLowerCase().startsWith("0x")},parse_number:function(e){return this.is_hex_number(e)?parseInt(e,16):parseInt(e)},get_mask:function(e,_){_=_||1;for(var t=0,a=0;a<_;a++)t<<=1,t|=1;return t<<e},align_hex_val:function(e){for(var _=1,t=0;t<8;t++){if(_<<=1,_==e.length)return e;if(_>e.length){var a=_-e.length;return"".concat("0".repeat(a)).concat(e)}}return e},format_value_by_bits:function(e,_){if(void 0!=e.var_mod_bit){var t=this.parse_number(_),a=this.is_hex_number(e.var_value),r=this.parse_number(e.var_value);if(!isNaN(t)&&!isNaN(r)){var s=this.get_mask(e.var_mod_bit.start,e.var_mod_bit.end),n=~s;t<<=e.var_mod_bit.start,t&=s,r&=n,r|=t,e.var_value=a?"0x".concat(this.align_hex_val(r.toString(16))):r.toString()}}},format_value_by_disp_fmt:function format_value_by_disp_fmt(cmsisObj,val){var disp_inf=cmsisObj.var_disp_inf;if(void 0!=disp_inf.operate){var var_disp_value=val;if(/^(?:\d+|0x[0-9a-f]+)$/i.test(var_disp_value)){var real_val=eval("".concat(this.parse_number(var_disp_value)).concat(disp_inf.operate.operator).concat(disp_inf.operate.val));isNaN(real_val)||(real_val=parseInt(real_val),this.is_hex_number(cmsisObj.var_value)?cmsisObj.var_value="0x".concat(this.align_hex_val(real_val.toString(16))):cmsisObj.var_value=real_val.toString())}}},format_value_by_range:function(e,_){var t=e.var_range;if(void 0==t)return _;var a=this.parse_number(_);if(a>t.end?a=t.end:a<t.start&&(a=t.start),t.step>0){var r=a%t.step;a-=r}return this.is_hex_number(_)?"0x".concat(this.align_hex_val(a.toString(16))):a.toString()},on_tree_item_actived:function(e){this.tree.cur_item=e}}}},"56d7":function(e,_,t){"use strict";t.r(_);var a=t("b85c"),r=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("ac1f"),t("5319"),t("99af"),t("2b0e")),s=function(){var e=this,_=e.$createElement,t=e._self._c||_;return t("div",{attrs:{id:"app"}},[t("el-container",{attrs:{id:"main"}},[t("el-header",{attrs:{id:"header"}},[t("el-row",{staticStyle:{"align-items":"center"},attrs:{gutter:12,type:"flex"}},[t("el-col",{attrs:{span:12}},[t("h3",[e._v(e._s(e.get_str("title")))])]),t("el-col",{staticStyle:{margin:"4px"},attrs:{span:12}},[t("el-row",{attrs:{type:"flex",justify:"end"}},[t("el-button",{attrs:{size:"small",round:""},on:{click:e.onOpenConfig}},[e._v(e._s(e.get_str("title.btn.open.config")))]),t("el-button",{attrs:{size:"small",round:""},on:{click:e.onSave}},[e._v(e._s(e.get_str("title.btn.save")))])],1)],1)],1)],1),t("div",{staticClass:"custom-divider"},[t("el-divider")],1),t("el-main",{attrs:{id:"content"}},[t("el-tree",{attrs:{data:e.tree.cmsisObj,props:e.tree.metaProp},on:{"node-click":e.on_tree_item_actived},scopedSlots:e._u([{key:"default",fn:function(_){var a=_.node,r=_.data;return e.is_parent_checked(a)?t("span",{staticClass:"tree-node"},[t("span",[e._v(e._s(e.cut_long_str(a.label)))]),t("span",["section"==r.type||"bool"==r.type?t("div",[t("el-checkbox",{attrs:{"true-label":"1","false-label":"0"},on:{change:function(_){return e.on_tree_item_modified(r)}},model:{value:r.var_value,callback:function(_){e.$set(r,"var_value",_)},expression:"data.var_value"}})],1):"code"==r.type?t("div",[t("el-checkbox",{attrs:{"true-label":"","false-label":"!"},on:{change:function(_){return e.on_tree_item_modified(r)}},model:{value:r.var_value,callback:function(_){e.$set(r,"var_value",_)},expression:"data.var_value"}})],1):"option"==r.type?t("div",[void 0!=r.var_enum?t("div",[t("el-dropdown",{attrs:{trigger:"click"},on:{command:function(_){r.var_value=_,e.on_tree_item_modified(r)}}},[t("span",{staticClass:"el-dropdown-link"},[t("i",{staticClass:"el-icon-arrow-down el-icon--left"}),e._v(e._s(e.get_enum_desc_by_val(r.var_enum,r.var_value))+" ")]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(r.var_enum,(function(_,a){return t("el-dropdown-item",{key:a,attrs:{command:_.val}},[e._v(" "+e._s(_.desc)+" ")])})),1)],1)],1):void 0!=r.var_disp_value?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_disp_value,expression:"data.var_disp_value"}],attrs:{type:"text",size:"12"},domProps:{value:r.var_disp_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_disp_value",_.target.value)}}})]):t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_value,expression:"data.var_value"}],attrs:{type:"text",size:"12"},domProps:{value:r.var_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_value",_.target.value)}}})])]):"string"==r.type?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_disp_value,expression:"data.var_disp_value"}],attrs:{type:"text",size:"18"},domProps:{value:r.var_disp_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_disp_value",_.target.value)}}})]):e._e()])]):t("span",{staticClass:"tree-node"},[t("s",[e._v(e._s(e.cut_long_str(a.label)))]),t("span",["section"==r.type||"bool"==r.type?t("div",[t("el-checkbox",{attrs:{"true-label":"1","false-label":"0",disabled:""},on:{change:function(_){return e.on_tree_item_modified(r)}},model:{value:r.var_value,callback:function(_){e.$set(r,"var_value",_)},expression:"data.var_value"}})],1):"code"==r.type?t("div",[t("el-checkbox",{attrs:{"true-label":"","false-label":"!",disabled:""},on:{change:function(_){return e.on_tree_item_modified(r)}},model:{value:r.var_value,callback:function(_){e.$set(r,"var_value",_)},expression:"data.var_value"}})],1):"option"==r.type?t("div",[void 0!=r.var_enum?t("div",[t("el-dropdown",{attrs:{trigger:"click",disabled:""},on:{command:function(_){r.var_value=_,e.on_tree_item_modified(r)}}},[t("span",{staticClass:"el-dropdown-link"},[t("i",{staticClass:"el-icon-arrow-down el-icon--left"}),e._v(e._s(e.get_enum_desc_by_val(r.var_enum,r.var_value))+" ")]),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(r.var_enum,(function(_,a){return t("el-dropdown-item",{key:a,attrs:{command:_.val}},[e._v(" "+e._s(_.desc)+" ")])})),1)],1)],1):void 0!=r.var_disp_value?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_disp_value,expression:"data.var_disp_value"}],attrs:{type:"text",size:"12",disabled:""},domProps:{value:r.var_disp_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_disp_value",_.target.value)}}})]):t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_value,expression:"data.var_value"}],attrs:{type:"text",size:"12",disabled:""},domProps:{value:r.var_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_value",_.target.value)}}})])]):"string"==r.type?t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:r.var_disp_value,expression:"data.var_disp_value"}],attrs:{type:"text",size:"18",disabled:""},domProps:{value:r.var_disp_value},on:{change:function(_){return e.on_tree_item_modified(r)},input:function(_){_.target.composing||e.$set(r,"var_disp_value",_.target.value)}}})]):e._e()])])}}],null,!0)})],1),t("el-footer",{attrs:{id:"footer"}},[t("div",{attrs:{id:"footer-cont"}},[t("b",[e._v("Details:")]),void 0!=e.tree.cur_item?t("div",{staticStyle:{"margin-left":"14px"}},[t("p",[e._v(e._s(e.tree.cur_item.name+" "+(e.tree.cur_item.desc||"")))]),e._l(e.tree.cur_item.detail,(function(_,a){return t("p",{key:a},[e._v(e._s(_))])})),void 0!=e.tree.cur_item.var_def_val?t("div",[t("p",[e._v(e._s("Default: "+e.tree.cur_item.var_def_val))])]):e._e(),"code"==e.tree.cur_item.type&&void 0!=e.tree.cur_item.location?t("div",[t("div",[e._v("Code Fragment: ")]),t("pre",{staticStyle:{margin:"0px 8px"}},[e._v("                            "),t("code",[e._v(e._s("\n"+e.get_code_by_loc(e.tree.cur_item.location)))]),e._v("\n                        ")])]):e._e()],2):e._e()])])],1)],1)},n=[],i=t("199c"),o=i["a"],l=(t("034f"),t("2877")),c=Object(l["a"])(o,s,n,!1,null,null,null),u=c.exports,d=t("5c96"),v=t.n(d);t("0fae");r["default"].config.productionTip=!1,r["default"].use(v.a);var p=void 0,f=!1,m=u.data(),g=void 0,b=acquireVsCodeApi();function h(){f||(f=!0,console.log("[cmsis config wizard view] start init and create page ..."),new r["default"]({render:function(e){return e(u)}}).$mount("#app"),p=u.methods.getInstance(),p.$on("save-all",(function(){return j()})),p.$on("open-config",(function(e){return E(e)})),console.log("[cmsis config wizard view] app inited done !"))}function E(e){"number"==typeof e?b.postMessage({type:"cmd",cmd:"open-config",arg:e}):b.postMessage("open-config")}function O(e){u.methods.notify({type:e.success?"success":"error",title:e.success?"Success":"Failed",message:e.msg,position:"bottom-right"})}function j(){if(p){console.log("[cmsis config wizard view] start post data ...");var e=m.tree.modifyList;console.log("[cmsis config wizard view] found ".concat(e.length," times change"));var _,t=/^(\s*#define\s+\w+\s*)(.+)?/,r=Object(a["a"])(e);try{for(r.s();!(_=r.n()).done;){var s=_.value;if("code"==s.type)for(var n=s.location.start;n<=s.location.end;n++)"!"==s.var_value?g[n]="//".concat(g[n]):g[n]=g[n].replace(/^\s*\/{2,}/,"");else{var i=g[s.location.start],o=t.exec(i);o&&o.length>2&&void 0!=o[2]?g[s.location.start]=i.replace(t,"$1".concat(s.var_value)):g[s.location.start]="".concat(i," ").concat(s.var_value)}}}catch(l){r.e(l)}finally{r.f()}b.postMessage(g),console.log("[cmsis config wizard view] post data done !")}else O({success:!1,msg:"App have not inited !"})}function y(e,_){console.log("[cmsis config wizard view] start init data ..."),g=_,m.tree.cmsisObj=e.group,m.tree.fileLines=g,console.log("[cmsis config wizard view] Init data done !")}window.addEventListener("message",(function(e){if(e.data.status){var _={success:e.data.status.success,msg:e.data.status.msg};O(_)}else y(e.data.data,e.data.lines),h()})),document.addEventListener("keydown",(function(e){"s"==e.key.toLowerCase()&&e.ctrlKey&&(e.preventDefault(),j())})),b.postMessage("eide.cmsis_config_wizard.launched")},"85ec":function(e,_,t){}});
//# sourceMappingURL=app.js.map