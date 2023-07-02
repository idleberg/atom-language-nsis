"use strict";var e=require("./main-dc18ffab.js"),t=require("atom"),i=require("path");function n(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(i){if("default"!==i&&!(i in e)){var n=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(e,i,n.get?n:{enumerable:!0,get:function(){return t[i]}})}}))})),Object.freeze(e)}var s={},o={get exports(){return s},set exports(e){s=e}},r={onCopy:"copy",onCut:"cut",onPaste:"paste",onCompositionEnd:"compositionend",onCompositionStart:"compositionstart",onCompositionUpdate:"compositionupdate",onKeyDown:"keydown",onKeyPress:"keypress",onKeyUp:"keyup",onFocus:"focus",onBlur:"blur",onChange:"change",onInput:"input",onSubmit:"submit",onClick:"click",onContextMenu:"contextmenu",onDoubleClick:"dblclick",onDrag:"drag",onDragEnd:"dragend",onDragEnter:"dragenter",onDragExit:"dragexit",onDragLeave:"dragleave",onDragOver:"dragover",onDragStart:"dragstart",onDrop:"drop",onMouseDown:"mousedown",onMouseEnter:"mouseenter",onMouseLeave:"mouseleave",onMouseMove:"mousemove",onMouseOut:"mouseout",onMouseOver:"mouseover",onMouseUp:"mouseup",onSelect:"select",onTouchCancel:"touchcancel",onTouchEnd:"touchend",onTouchMove:"touchmove",onTouchStart:"touchstart",onScroll:"scroll",onWheel:"wheel",onAbort:"abort",onCanPlay:"canplay",onCanPlayThrough:"canplaythrough",onDurationChange:"durationchange",onEmptied:"emptied",onEncrypted:"encrypted",onEnded:"ended",onError:"error",onLoadedData:"loadeddata",onLoadedMetadata:"loadedmetadata",onLoadStart:"loadstart",onPause:"pause",onPlay:"play",onPlaying:"playing",onProgress:"progress",onRateChange:"ratechange",onSeeked:"seeked",onSeeking:"seeking",onStalled:"stalled",onSuspend:"suspend",onTimeUpdate:"timeupdate",onVolumeChange:"volumechange",onWaiting:"waiting",onLoad:"load",onAnimationStart:"animationstart",onAnimationEnd:"animationend",onAnimationIteration:"animationiteration",onTransitionEnd:"transitionend"},a=new Set(["circle","clipPath","defs","ellipse","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]);const l=r,d=a;function c(e,t,...i){let n=[];for(let e=0;e<i.length;){const t=i[e];switch(typeof t){case"string":case"number":i[e]={text:t},e++;break;case"object":Array.isArray(t)?i.splice(e,1,...t):t?(t.context||(n.push(t),t.ambiguous&&t.ambiguous.length&&(n=n.concat(t.ambiguous))),e++):i.splice(e,1);break;default:throw new Error(`Invalid child node: ${t}`)}}if(t){for(const e in t){const i=l[e];i&&(t.on||(t.on={}),t.on[i]=t[e])}t.class&&(t.className=t.class)}return{tag:e,props:t,children:i,ambiguous:n}}const u=["a","abbr","address","article","aside","audio","b","bdi","bdo","blockquote","body","button","canvas","caption","cite","code","colgroup","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","html","i","iframe","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","noscript","object","ol","optgroup","option","output","p","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","u","ul","var","video","area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];for(const e of u)c[e]=(t,...i)=>c(e,t,...i);for(const e of d)c[e]=(t,...i)=>c(e,t,...i);var h=c,p=new Map([["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["className","class"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["panose1","panose-1"],["paintOrder","paint-order"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xHeight","x-height"]]),m=function(e,t,i,n){i!==t&&("function"==typeof t?t(null):t&&n[t]===e&&delete n[t],"function"==typeof i?i(e):i&&(n[i]=e))};const f=r,g=a,v=p,y="",b=m;var x=function(e,t,i,n){const s=t&&t.props,o=i.props;let r,a;n&&(r=n.refs,a=n.listenerContext),w(e,t,s,i,o),r&&b(e,s&&s.ref,o&&o.ref,r),function(e,t,i,n){const s=t&&t.props&&t.props.on,o=i.props&&i.props.on;for(const i in s)if(!o||!(i in o)){let n;n=t&&t.boundListeners&&t.boundListeners[i]?t.boundListeners[i]:s[i],e.removeEventListener(i,n)}for(const r in o){const a=s&&s[r],l=o[r];if(l!==a){if(a){let i;i=t&&t.boundListeners&&t.boundListeners[r]?t.boundListeners[r]:a,e.removeEventListener(r,i)}if(l){let t;n?(t=l.bind(n),i.boundListeners||(i.boundListeners={}),i.boundListeners[r]=t):t=l,e.addEventListener(r,t)}}}}(e,t,i,a)};function w(e,t,i,n,s){if(i)for(var o in i)"ref"!==o&&"on"!==o&&(o in f||s&&o in s||("dataset"===o?w(e.dataset,null,i&&i.dataset,null,null):"innerHTML"!==o&&t&&g.has(t.tag)?e.removeAttribute(v.get(o)||o):(e[o]=y,delete e[o])));if(s)for(var o in s)if("ref"!==o&&"on"!==o&&!(o in f)){var r=i&&i[o],a=s[o];"dataset"===o?k(e.dataset,r,a,!1):"style"===o&&"string"!=typeof a?("string"==typeof r&&(e.style="",r=null),k(e.style,r,a,!0)):"attributes"===o?I(e,r,a):a!==r&&("innerHTML"!==o&&n&&g.has(n.tag)?e.setAttribute(v.get(o)||o,a):n&&"input"===n.tag&&"value"===o&&e[o]===a||(e[o]=a))}}function k(e,t,i,n){if(t)for(var s in t)i&&s in i||(n?e[s]=y:delete e[s]);if(i)for(var s in i){const n=t&&t[s],o=i[s];o!==n&&(e[s]=o)}}function I(e,t,i){if(t)for(var n in t)i&&n in i||e.removeAttribute(n);if(i)for(var n in i){const s=t&&t[n],o=i[n];o!==s&&e.setAttribute(n,o)}}const S=x,C=a;function E(e,t){let i;if(null!=e.text)i=document.createTextNode(e.text);else{const{tag:n,children:s}=e;let{props:o,context:r}=e;if(r&&(t={refs:r.refs,listenerContext:r}),"function"==typeof n){let r;o&&o.ref&&(r=o.ref);const a=new n(o||{},s);e.component=a,i=a.element,"function"==typeof r?r(a):t&&t.refs&&r&&(t.refs[r]=a)}else C.has(n)?(i=document.createElementNS("http://www.w3.org/2000/svg",n),s&&M(i,s,t),o&&S(i,null,e,t)):(i=document.createElement(n),s&&M(i,s,t),o&&S(i,null,e,t))}return e.domNode=i,i}function M(e,t,i){for(let n=0;n<t.length;n++)e.appendChild(E(t[n],i))}var L=E;const N=L,P=x,D=m;function O(e,t,i){const n=e.domNode;if(t===e)return n;if(q(e,t)){let s;return null!=t.text?(n.nodeValue=t.text,s=n):"function"==typeof t.tag?s=function(e,t,i){const{component:n,props:s}=e;let{props:o,children:r}=t;t.component=n;const a=i&&i.refs;a&&D(n,s&&s.ref,o&&o.ref,a);return n.update(o||{},r),n.element}(e,t,i):(!function(e,t,i,n){var s,o=0,r=t.length-1,a=t[0],l=t[r],d=0,c=i.length-1,u=i[0],h=i[c];for(;o<=r&&d<=c;)if(a)if(l)if(q(a,u))O(a,u,n),a=t[++o],u=i[++d];else if(q(l,h))O(l,h,n),l=t[--r],h=i[--c];else if(q(a,h))O(a,h,n),e.insertBefore(a.domNode,l.domNode.nextSibling),a=t[++o],h=i[--c];else if(q(l,u))O(l,u,n),e.insertBefore(l.domNode,a.domNode),l=t[--r],u=i[++d];else{s||(A.length>0?(s=A.pop()).clear():s=new Map,z(s,t,o,r));var p=F(u),m=p?s.get(p):null;if(null==m)e.insertBefore(N(u,n),a.domNode),u=i[++d];else{var f=t[m];O(f,u,n),t[m]=void 0,e.insertBefore(f.domNode,a.domNode),u=i[++d]}}else l=t[--r];else a=t[++o];if(o>r){var g=i[c+1]?i[c+1].domNode:null;for(let t=d;t<=c;t++)e.insertBefore(N(i[t],n),g)}else if(d>c)for(let e=o;e<=r;e++){var v=t[e];v&&U(v,n&&n.refs)}s&&A.push(s)}(n,e.children,t.children,i),P(n,e,t,i),s=n),t.domNode=s,s!==n&&n.parentNode&&n.parentNode.replaceChild(s,n),s}{const s=n.parentNode,o=n.nextSibling;U(e,i&&i.refs);const r=N(t,i);return s&&s.insertBefore(r,o),t.domNode=r,r}}let A=[new Map,new Map,new Map,new Map];function U(e,t,i=!0){const{domNode:n,props:s,children:o,component:r}=e,a=s&&s.ref;if(r)"function"==typeof a?a(null):t&&a&&t[a]===r&&delete t[a],r.destroy&&r.destroy();else if("function"==typeof a?a(null):t&&a&&t[a]===n&&delete t[a],o)for(let e=0;e<o.length;e++)U(o[e],t,!1);i&&n.remove()}function q(e,t){return F(e)===F(t)&&e.tag===t.tag}function F(e){return e.props?e.props.key:void 0}function z(e,t,i,n){for(let s=i;s<=n;s++){const i=F(t[s]);i&&e.set(i,s)}return e}var R=O,j={};const T=class{constructor(){this.updateRequests=[],this.readRequests=[],this.pendingAnimationFrame=null,this.performUpdates=this.performUpdates.bind(this),this.performingUpdates=!1}updateDocument(e){this.updateRequests.push(e),this.pendingAnimationFrame||(this.pendingAnimationFrame=window.requestAnimationFrame(this.performUpdates))}readDocument(e){this.readRequests.push(e),this.pendingAnimationFrame||(this.pendingAnimationFrame=window.requestAnimationFrame(this.performUpdates))}getNextUpdatePromise(){return this.nextUpdatePromise||(this.nextUpdatePromise=new Promise((e=>{this.resolveNextUpdatePromise=e}))),this.nextUpdatePromise}performUpdates(){for(;this.updateRequests.length>0;)this.updateRequests.shift()();for(this.pendingAnimationFrame=null;this.readRequests.length>0;)this.readRequests.shift()();if(this.nextUpdatePromise){let e=this.resolveNextUpdatePromise;this.nextUpdatePromise=null,this.resolveNextUpdatePromise=null,e()}}};let B=null;j.setScheduler=function(e){B=e},j.getScheduler=function(){return B||(B=new T),B};const Q=L,V=R,{getScheduler:_}=j,G=new WeakSet;let H=0,K=0;function W(e){return null!=e&&!1!==e}function X(e,t){t.context=e,t.ambiguous&&(t.ambiguous.forEach((t=>{t.context=e})),delete t.ambiguous)}function $(e,t=!0){if(!W(e.virtualNode))throw new Error(`${e.constructor?e.constructor.name+" instance":e} is not associated with a valid virtualNode. Perhaps this component was never initialized?`);if(null==e.element)throw new Error(`${e.constructor?e.constructor.name+" instance":e} is not associated with a DOM element. Perhaps this component was never initialized?`);let i=e.render();if(!W(i)){const t=e.constructor&&e.constructor.name?" in "+e.constructor.name:"";throw new Error("invalid falsy value "+i+" returned from render()"+t)}X(e,i),H++;let n=e.virtualNode,s=e.element,o=V(n,i,{refs:e.refs,listenerContext:e});if(e.virtualNode=i,o!==s&&!t)throw new Error("The root node type changed on update, but the update was performed with the replaceNode option set to false");e.element=o,"function"==typeof e.writeAfterUpdate&&e.writeAfterUpdate(),"function"==typeof e.readAfterUpdate&&_().readDocument((function(){e.readAfterUpdate()})),H--}function Y(e,t=!0){K++,J(e.virtualNode),1===K&&t&&e.element.remove(),K--}function J(e){e.component&&"function"==typeof e.component.destroy?e.component.destroy():e.children&&e.children.forEach(J)}var Z={initialize:function(e){if("function"!=typeof e.update)throw new Error("Etch components must implement `update(props, children)`.");let t=e.render();if(!W(t)){let i=e.constructor&&e.constructor.name?" in "+e.constructor.name:"";throw new Error("invalid falsy value "+t+" returned from render()"+i)}X(e,t),e.refs={},e.virtualNode=t,e.element=Q(e.virtualNode,{refs:e.refs,listenerContext:e})},update:function(e,t=!0){if(H>0)return $(e,t),Promise.resolve();let i=_();return G.has(e)||(G.add(e),i.updateDocument((function(){G.delete(e),$(e,t)}))),i.getNextUpdatePromise()},updateSync:$,destroy:function(e,t=!0){if(H>0||K>0)return Y(e,t),Promise.resolve();let i=_();return i.updateDocument((function(){Y(e,t)})),i.getNextUpdatePromise()},destroySync:Y};const ee=h,te=L,{initialize:ie,update:ne,updateSync:se,destroy:oe,destroySync:re}=Z,{setScheduler:ae,getScheduler:le}=j;var de,ce={dom:ee,render:te,initialize:ie,update:ne,updateSync:se,destroy:oe,destroySync:re,setScheduler:ae,getScheduler:le},ue={},he={get exports(){return ue},set exports(e){ue=e}},pe={};function me(){return de||(de=1,function(t){(function(){var e,n;e=i.sep,t.basenameScore=function(i,n,s){var o,r,a,l,d;for(r=i.length-1;i[r]===e;)r--;for(d=0,a=r,o=null;r>=0;)i[r]===e?(d++,null==o&&(o=i.substring(r+1,a+1))):0===r&&(a<i.length-1?null==o&&(o=i.substring(0,a+1)):null==o&&(o=i)),r--;return o===i?s*=2:o&&(s+=t.score(o,n)),l=d+1,s*=.01*Math.max(1,10-l)},t.score=function(t,i){var s,o,r,a,l,d,c,u,h,p,m,f;if(t===i)return 1;if(n(t,i))return 1;for(p=0,c=i.length,h=t.length,r=0,a=0;r<c;){if(s=i[r++],l=t.indexOf(s.toLowerCase()),m=t.indexOf(s.toUpperCase()),-1===(d=Math.min(l,m))&&(d=Math.max(l,m)),-1===(a=d))return 0;o=.1,t[a]===s&&(o+=.1),0===a||t[a-1]===e?o+=.8:"-"!==(f=t[a-1])&&"_"!==f&&" "!==f||(o+=.7),t=t.substring(a+1,h),p+=o}return((u=p/c)*(c/h)+u)/2},n=function(t,i){if(t[t.length-i.length-1]===e)return t.lastIndexOf(i)===t.length-i.length}}).call(e.commonjsGlobal)}(pe)),pe}var fe,ge={},ve={get exports(){return ge},set exports(e){ge=e}};function ye(){return fe||(fe=1,function(){var e,t,i;t=me(),e=function(e){return e.candidate},i=function(e,t){return t.score-e.score},ve.exports=function(n,s,o,r){var a,l,d,c,u,h,p,m,f;if(l=(f=null!=r?r:{}).key,d=f.maxResults,s){for(u=[],p=0,m=n.length;p<m;p++)a=n[p],(h=null!=l?a[l]:a)&&(c=t.score(h,s,o),o||(c=t.basenameScore(h,s,c)),c>0&&u.push({candidate:a,score:c}));u.sort(i),n=u.map(e)}return null!=d&&(n=n.slice(0,d)),n}}.call(e.commonjsGlobal)),ge}var be,xe={};function we(){return be||(be=1,function(t){(function(){var e;e=i.sep,t.basenameMatch=function(i,n){var s,o,r;for(o=i.length-1;i[o]===e;)o--;for(r=o,s=null;o>=0;)i[o]===e?null==s&&(s=i.substring(o+1,r+1)):0===o&&(r<i.length-1?null==s&&(s=i.substring(0,r+1)):null==s&&(s=i)),o--;return t.match(s,n,i.length-s.length)},t.match=function(e,t,i){var n,s,o,r,a,l,d,c,u,h;if(null==i&&(i=0),e===t)return function(){h=[];for(var t=i,n=i+e.length;i<=n?t<n:t>n;i<=n?t++:t--)h.push(t);return h}.apply(this);for(d=t.length,c=e.length,s=0,o=0,a=[];s<d;){if(n=t[s++],r=e.indexOf(n.toLowerCase()),u=e.indexOf(n.toUpperCase()),-1===(l=Math.min(r,u))&&(l=Math.max(r,u)),-1===(o=l))return[];a.push(i+o),i+=o+1,e=e.substring(o+1,c)}return a}}).call(e.commonjsGlobal)}(xe)),xe}(function(){var e,t,n,s,o;o=me(),n=ye(),s=we(),e=i.sep,t=/\ /g,he.exports={filter:function(i,s,o){var r;return s&&(r=-1!==s.indexOf(e),s=s.replace(t,"")),n(i,s,r,o)},score:function(i,n){var s,r;return i&&n?i===n?2:(s=-1!==n.indexOf(e),n=n.replace(t,""),r=o.score(i,n),s||(r=o.basenameScore(i,n,r)),r):0},match:function(i,n){var o,r,a,l,d,c;if(!i)return[];if(!n)return[];if(i===n)return function(){c=[];for(var e=0,t=i.length;0<=t?e<t:e>t;0<=t?e++:e--)c.push(e);return c}.apply(this);if(l=-1!==n.indexOf(e),n=n.replace(t,""),a=s.match(i,n),!l)for(o=s.basenameMatch(i,n),a=a.concat(o).sort((function(e,t){return e-t})),d=null,r=0;r<a.length;)r&&d===a[r]?a.splice(r,1):(d=a[r],r++);return a}}}).call(e.commonjsGlobal),function(i,n){var s=e.commonjsGlobal&&e.commonjsGlobal.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const o=t,r=s(ce),a=r.default.dom,l=s(ue);class d{constructor(e){this.props=e,this.props.hasOwnProperty("initialSelectionIndex")||(this.props.initialSelectionIndex=0),e.initiallyVisibleItemCount&&this.initializeVisibilityObserver(),this.computeItems(!1),this.disposables=new o.CompositeDisposable,r.default.initialize(this),this.element.classList.add("select-list"),this.disposables.add(this.refs.queryEditor.onDidChange(this.didChangeQuery.bind(this))),e.skipCommandsRegistration||this.disposables.add(this.registerAtomCommands());const t=this.refs.queryEditor.element,i=this.didLoseFocus.bind(this);t.addEventListener("blur",i),this.didClickItemsList=!1,this.element.addEventListener("mousedown",(e=>{e.target===this.refs.items&&(this.didClickItemsList=!0)})),this.disposables.add(new o.Disposable((()=>{t.removeEventListener("blur",i)})))}static setScheduler(e){r.default.setScheduler(e)}static getScheduler(){return r.default.getScheduler()}initializeVisibilityObserver(){this.visibilityObserver=new IntersectionObserver((e=>{for(const t of e)if(t.intersectionRatio>0){const e=t.target;this.visibilityObserver.unobserve(e);const i=Array.from(this.refs.items.children).indexOf(e);i>=0&&this.renderItemAtIndex(i)}}))}focus(){this.refs.queryEditor.element.focus()}didLoseFocus(e){this.didClickItemsList||this.element.contains(e.relatedTarget)?(this.didClickItemsList=!1,this.refs.queryEditor.element.focus()):document.hasFocus()&&this.cancelSelection()}reset(){this.refs.queryEditor.setText("")}destroy(){return this.disposables.dispose(),this.visibilityObserver&&this.visibilityObserver.disconnect(),r.default.destroy(this)}registerAtomCommands(){return atom.commands.add(this.element,{"core:move-up":e=>{this.selectPrevious(),e.stopPropagation()},"core:move-down":e=>{this.selectNext(),e.stopPropagation()},"core:move-to-top":e=>{this.selectFirst(),e.stopPropagation()},"core:move-to-bottom":e=>{this.selectLast(),e.stopPropagation()},"core:confirm":e=>{this.confirmSelection(),e.stopPropagation()},"core:cancel":e=>{this.cancelSelection(),e.stopPropagation()}})}update(e){let t=!1;return"items"in e&&(this.props.items=e.items,t=!0),"maxResults"in e&&(this.props.maxResults=e.maxResults,t=!0),"filter"in e&&(this.props.filter=e.filter,t=!0),"filterQuery"in e&&(this.props.filterQuery=e.filterQuery,t=!0),"query"in e&&(this.refs.queryEditor.setText(e.query),t=!1),"selectQuery"in e&&(e.selectQuery?this.refs.queryEditor.selectAll():this.refs.queryEditor.clearSelections()),"order"in e&&(this.props.order=e.order),"emptyMessage"in e&&(this.props.emptyMessage=e.emptyMessage),"errorMessage"in e&&(this.props.errorMessage=e.errorMessage),"infoMessage"in e&&(this.props.infoMessage=e.infoMessage),"loadingMessage"in e&&(this.props.loadingMessage=e.loadingMessage),"loadingBadge"in e&&(this.props.loadingBadge=e.loadingBadge),"itemsClassList"in e&&(this.props.itemsClassList=e.itemsClassList),"initialSelectionIndex"in e&&(this.props.initialSelectionIndex=e.initialSelectionIndex),t&&this.computeItems(),r.default.update(this)}render(){return a.div({},a(o.TextEditor,{ref:"queryEditor",mini:!0}),this.renderLoadingMessage(),this.renderInfoMessage(),this.renderErrorMessage(),this.renderItems())}renderItems(){if(this.items.length>0){const e=["list-group"].concat(this.props.itemsClassList||[]).join(" ");return this.visibilityObserver&&r.default.getScheduler().updateDocument((()=>{Array.from(this.refs.items.children).slice(this.props.initiallyVisibleItemCount).forEach((e=>{this.visibilityObserver.observe(e)}))})),this.listItems=this.items.map(((e,t)=>{const i=this.getSelectedItem()===e,n=!this.props.initiallyVisibleItemCount||t<this.props.initiallyVisibleItemCount;return a(c,{element:this.props.elementForItem(e,{selected:i,index:t,visible:n}),selected:i,onclick:()=>this.didClickItem(t)})})),a.ol({className:e,ref:"items"},...this.listItems)}return!this.props.loadingMessage&&this.props.emptyMessage?a.span({ref:"emptyMessage"},this.props.emptyMessage):""}renderErrorMessage(){return this.props.errorMessage?a.span({ref:"errorMessage"},this.props.errorMessage):""}renderInfoMessage(){return this.props.infoMessage?a.span({ref:"infoMessage"},this.props.infoMessage):""}renderLoadingMessage(){return this.props.loadingMessage?a.div({className:"loading"},a.span({ref:"loadingMessage",className:"loading-message"},this.props.loadingMessage),this.props.loadingBadge?a.span({ref:"loadingBadge",className:"badge"},this.props.loadingBadge):""):""}getQuery(){return this.refs&&this.refs.queryEditor?this.refs.queryEditor.getText():""}getFilterQuery(){return this.props.filterQuery?this.props.filterQuery(this.getQuery()):this.getQuery()}didChangeQuery(){this.props.didChangeQuery&&this.props.didChangeQuery(this.getFilterQuery()),this.computeItems()}didClickItem(e){this.selectIndex(e),this.confirmSelection()}computeItems(e){this.listItems=null,this.visibilityObserver&&this.visibilityObserver.disconnect();const t=this.props.filter||this.fuzzyFilter.bind(this);this.items=t(this.props.items.slice(),this.getFilterQuery()),this.props.order&&this.items.sort(this.props.order),this.props.maxResults&&(this.items=this.items.slice(0,this.props.maxResults)),this.selectIndex(this.props.initialSelectionIndex,e)}fuzzyFilter(e,t){if(0===t.length)return e;{const i=[];for(const n of e){const e=this.props.filterKeyForItem?this.props.filterKeyForItem(n):n,s=l.default.score(e,t);s>0&&i.push({item:n,score:s})}return i.sort(((e,t)=>t.score-e.score)),i.map((e=>e.item))}}getSelectedItem(){return void 0===this.selectionIndex?null:this.items[this.selectionIndex]}renderItemAtIndex(e){const t=this.items[e],i=this.getSelectedItem()===t,n=this.listItems[e].component;this.visibilityObserver&&this.visibilityObserver.unobserve(n.element),n.update({element:this.props.elementForItem(t,{selected:i,index:e,visible:!0}),selected:i,onclick:()=>this.didClickItem(e)})}selectPrevious(){return void 0===this.selectionIndex?this.selectLast():this.selectIndex(this.selectionIndex-1)}selectNext(){return void 0===this.selectionIndex?this.selectFirst():this.selectIndex(this.selectionIndex+1)}selectFirst(){return this.selectIndex(0)}selectLast(){return this.selectIndex(this.items.length-1)}selectNone(){return this.selectIndex(void 0)}selectIndex(e,t=!0){e>=this.items.length?e=0:e<0&&(e=this.items.length-1);const i=this.selectionIndex;return this.selectionIndex=e,void 0!==e&&this.props.didChangeSelection&&this.props.didChangeSelection(this.getSelectedItem()),t?this.listItems?(i>=0&&this.renderItemAtIndex(i),e>=0&&this.renderItemAtIndex(e),r.default.getScheduler().getNextUpdatePromise()):r.default.update(this):Promise.resolve()}selectItem(e){const t=this.items.indexOf(e);if(-1===t)throw new Error("Cannot select the specified item because it does not exist.");return this.selectIndex(t)}confirmSelection(){const e=this.getSelectedItem();null!=e?this.props.didConfirmSelection&&this.props.didConfirmSelection(e):this.props.didConfirmEmptySelection&&this.props.didConfirmEmptySelection()}cancelSelection(){this.props.didCancelSelection&&this.props.didCancelSelection()}}n.default=d,i.exports=d;class c{constructor(e){this.mouseDown=this.mouseDown.bind(this),this.mouseUp=this.mouseUp.bind(this),this.didClick=this.didClick.bind(this),this.selected=e.selected,this.onclick=e.onclick,this.element=e.element,this.element.addEventListener("mousedown",this.mouseDown),this.element.addEventListener("mouseup",this.mouseUp),this.element.addEventListener("click",this.didClick),this.selected&&this.element.classList.add("selected"),this.domEventsDisposable=new o.Disposable((()=>{this.element.removeEventListener("mousedown",this.mouseDown),this.element.removeEventListener("mouseup",this.mouseUp),this.element.removeEventListener("click",this.didClick)})),r.default.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this))}mouseDown(e){e.preventDefault()}mouseUp(e){e.preventDefault()}didClick(e){e.preventDefault(),this.onclick()}destroy(){this.element.remove(),this.domEventsDisposable.dispose()}update(e){this.element.removeEventListener("mousedown",this.mouseDown),this.element.removeEventListener("mouseup",this.mouseUp),this.element.removeEventListener("click",this.didClick),this.element.parentNode.replaceChild(e.element,this.element),this.element=e.element,this.element.addEventListener("mousedown",this.mouseDown),this.element.addEventListener("mouseup",this.mouseUp),this.element.addEventListener("click",this.didClick),e.selected&&this.element.classList.add("selected"),this.selected=e.selected,this.onclick=e.onclick,r.default.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this))}scrollIntoViewIfNeeded(){this.selected&&this.element.scrollIntoViewIfNeeded(!1)}}}(o,s);var ke=n({__proto__:null,default:e.getDefaultExportFromCjs(s)},[s]);exports.selectListView=ke;
//# sourceMappingURL=select-list-view-737cf9ce.js.map