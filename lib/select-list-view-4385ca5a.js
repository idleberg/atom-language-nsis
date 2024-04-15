'use strict';

var main = require('./main-057e63ed.js');
var require$$0$1 = require('atom');
var require$$0 = require('path');

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

var selectListView$2 = {exports: {}};

var eventListenerProps = {
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',
  onCompositionEnd: 'compositionend',
  onCompositionStart: 'compositionstart',
  onCompositionUpdate: 'compositionupdate',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onFocus: 'focus',
  onBlur: 'blur',
  onChange: 'change',
  onInput: 'input',
  onSubmit: 'submit',
  onClick: 'click',
  onContextMenu: 'contextmenu',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'dragstart',
  onDrop: 'drop',
  onMouseDown: 'mousedown',
  onMouseEnter: 'mouseenter',
  onMouseLeave: 'mouseleave',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onSelect: 'select',
  onTouchCancel: 'touchcancel',
  onTouchEnd: 'touchend',
  onTouchMove: 'touchmove',
  onTouchStart: 'touchstart',
  onScroll: 'scroll',
  onWheel: 'wheel',
  onAbort: 'abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'loadstart',
  onPause: 'pause',
  onPlay: 'play',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',
  onLoad: 'load',
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
  onAnimationIteration: 'animationiteration',
  onTransitionEnd: 'transitionend'
};

// taken from https://github.com/facebook/react/blob/67f8524e88abbf1ac0fd86d38a0477d11fbc7b3e/src/isomorphic/classic/element/ReactDOMFactories.js#L153
var svgTags = new Set([
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan'
]);

const EVENT_LISTENER_PROPS$1 = eventListenerProps;
const SVG_TAGS$2 = svgTags;

function dom$1 (tag, props, ...children) {
  let ambiguous = [];

  for (let i = 0; i < children.length;) {
    const child = children[i];
    switch (typeof child) {
      case 'string':
      case 'number':
        children[i] = {text: child};
        i++;
        break;

      case 'object':
        if (Array.isArray(child)) {
          children.splice(i, 1, ...child);
        } else if (!child) {
          children.splice(i, 1);
        } else {
          if (!child.context) {
            ambiguous.push(child);
            if (child.ambiguous && child.ambiguous.length) {
              ambiguous = ambiguous.concat(child.ambiguous);
            }
          }
          i++;
        }
        break;

      default:
        throw new Error(`Invalid child node: ${child}`)
    }
  }

  if (props) {
    for (const propName in props) {
      const eventName = EVENT_LISTENER_PROPS$1[propName];
      if (eventName) {
        if (!props.on) props.on = {};
        props.on[eventName] = props[propName];
      }
    }

    if (props.class) {
      props.className = props.class;
    }
  }

  return {tag, props, children, ambiguous}
}

const HTML_TAGS = [
  'a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo',
  'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code',
  'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl',
  'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'head', 'header', 'html', 'i', 'iframe', 'ins', 'kbd',
  'label', 'legend', 'li', 'main', 'map', 'mark', 'menu', 'meter', 'nav',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'pre',
  'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section',
  'select', 'small', 'span', 'strong', 'style', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title',
  'tr', 'u', 'ul', 'var', 'video', 'area', 'base', 'br', 'col', 'command',
  'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source',
  'track', 'wbr'
];

for (const tagName of HTML_TAGS) {
  dom$1[tagName] = (props, ...children) => {
    return dom$1(tagName, props, ...children)
  };
}

for (const tagName of SVG_TAGS$2) {
  dom$1[tagName] = (props, ...children) => {
    return dom$1(tagName, props, ...children)
  };
}


var dom_1 = dom$1;

// Based on https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
var svgAttributeTranslations = new Map([
  ['accentHeight', 'accent-height'],
  ['alignmentBaseline', 'alignment-baseline'],
  ['arabicForm', 'arabic-form'],
  ['baselineShift', 'baseline-shift'],
  ['capHeight', 'cap-height'],
  ['className', 'class'],
  ['clipPath', 'clip-path'],
  ['clipRule', 'clip-rule'],
  ['colorInterpolation', 'color-interpolation'],
  ['colorInterpolationFilters', 'color-interpolation-filters'],
  ['colorProfile', 'color-profile'],
  ['colorRendering', 'color-rendering'],
  ['dominantBaseline', 'dominant-baseline'],
  ['enableBackground', 'enable-background'],
  ['fillOpacity', 'fill-opacity'],
  ['fillRule', 'fill-rule'],
  ['floodColor', 'flood-color'],
  ['floodOpacity', 'flood-opacity'],
  ['fontFamily', 'font-family'],
  ['fontSize', 'font-size'],
  ['fontSizeAdjust', 'font-size-adjust'],
  ['fontStretch', 'font-stretch'],
  ['fontStyle', 'font-style'],
  ['fontVariant', 'font-variant'],
  ['fontWeight', 'font-weight'],
  ['glyphName', 'glyph-name'],
  ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
  ['glyphOrientationVertical', 'glyph-orientation-vertical'],
  ['horizAdvX', 'horiz-adv-x'],
  ['horizOriginX', 'horiz-origin-x'],
  ['letterSpacing', 'letter-spacing'],
  ['lightingColor', 'lighting-color'],
  ['markerEnd', 'marker-end'],
  ['markerMid', 'marker-mid'],
  ['markerStart', 'marker-start'],
  ['overlinePosition', 'overline-position'],
  ['overlineThickness', 'overline-thickness'],
  ['panose1', 'panose-1'],
  ['paintOrder', 'paint-order'],
  ['pointerEvents', 'pointer-events'],
  ['renderingIntent', 'rendering-intent'],
  ['shapeRendering', 'shape-rendering'],
  ['stopColor', 'stop-color'],
  ['stopOpacity', 'stop-opacity'],
  ['strikethroughPosition', 'strikethrough-position'],
  ['strikethroughThickness', 'strikethrough-thickness'],
  ['strokeDasharray', 'stroke-dasharray'],
  ['strokeDashoffset', 'stroke-dashoffset'],
  ['strokeLinecap', 'stroke-linecap'],
  ['strokeLinejoin', 'stroke-linejoin'],
  ['strokeMiterlimit', 'stroke-miterlimit'],
  ['strokeOpacity', 'stroke-opacity'],
  ['strokeWidth', 'stroke-width'],
  ['textAnchor', 'text-anchor'],
  ['textDecoration', 'text-decoration'],
  ['textRendering', 'text-rendering'],
  ['underlinePosition', 'underline-position'],
  ['underlineThickness', 'underline-thickness'],
  ['unicodeBidi', 'unicode-bidi'],
  ['unicodeRange', 'unicode-range'],
  ['unitsPerEm', 'units-per-em'],
  ['vAlphabetic', 'v-alphabetic'],
  ['vHanging', 'v-hanging'],
  ['vIdeographic', 'v-ideographic'],
  ['vMathematical', 'v-mathematical'],
  ['vertAdvY', 'vert-adv-y'],
  ['vertOriginX', 'vert-origin-x'],
  ['vertOriginY', 'vert-origin-y'],
  ['wordSpacing', 'word-spacing'],
  ['writingMode', 'writing-mode'],
  ['xHeight', 'x-height'],
]);

var updateRef$2 = function updateRef (domNode, oldRefName, newRefName, refs) {
  if (newRefName !== oldRefName) {
    if (typeof oldRefName === 'function') oldRefName(null);
    else if (oldRefName && refs[oldRefName] === domNode) delete refs[oldRefName];
    if (typeof newRefName === 'function') newRefName(domNode);
    else if (newRefName) refs[newRefName] = domNode;
  }
};

const EVENT_LISTENER_PROPS = eventListenerProps;
const SVG_TAGS$1 = svgTags;
const SVG_ATTRIBUTE_TRANSLATIONS = svgAttributeTranslations;
const EMPTY = '';

const updateRef$1 = updateRef$2;

var updateProps_1 = function (domNode, oldVirtualNode, newVirtualNode, options) {
  const oldProps = oldVirtualNode && oldVirtualNode.props;
  const newProps = newVirtualNode.props;

  let refs, listenerContext;
  if (options) {
    refs = options.refs;
    listenerContext = options.listenerContext;
  }
  updateProps$2(domNode, oldVirtualNode, oldProps, newVirtualNode, newProps);
  if (refs) updateRef$1(domNode, oldProps && oldProps.ref, newProps && newProps.ref, refs);
  updateEventListeners(domNode, oldVirtualNode, newVirtualNode, listenerContext);
};

// Using var to avoid "Unsupported phi use of variable" deoptimization in Chrome 56
function updateProps$2 (domNode, oldVirtualNode, oldProps, newVirtualNode, newProps) {
  if (oldProps) {
    for (var name in oldProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      if (!newProps || !(name in newProps)) {
        if (name === 'dataset') {
          updateProps$2(domNode.dataset, null, oldProps && oldProps.dataset, null, null);
        } else if (name !== 'innerHTML' && oldVirtualNode && SVG_TAGS$1.has(oldVirtualNode.tag)) {
          domNode.removeAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name);
        } else {
          // Clear property for objects that don't support deletion (e.g. style
          // or className). If we used null instead of an empty string, the DOM
          // could sometimes stringify the value and mistakenly assign 'null'.
          domNode[name] = EMPTY;
          delete domNode[name];
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      if (name === 'ref' || name === 'on') continue
      if (name in EVENT_LISTENER_PROPS) continue
      var oldValue = oldProps && oldProps[name];
      var newValue = newProps[name];
      if (name === 'dataset') {
        updateNestedProps(domNode.dataset, oldValue, newValue, false);
      } else if (name === 'style' && typeof newValue !== 'string') {
        if (typeof oldValue === 'string') {
          domNode.style = '';
          oldValue = null;
        }
        updateNestedProps(domNode.style, oldValue, newValue, true);
      } else if (name === 'attributes') {
        updateAttributes(domNode, oldValue, newValue);
      } else {
        if (newValue !== oldValue) {
          if (name !== 'innerHTML' && newVirtualNode && SVG_TAGS$1.has(newVirtualNode.tag)) {
            domNode.setAttribute(SVG_ATTRIBUTE_TRANSLATIONS.get(name) || name, newValue);
          } else if (newVirtualNode && newVirtualNode.tag === 'input'
            && name === 'value' && domNode[name] === newValue) ; else {
            domNode[name] = newValue;
          }
        }
      }
    }
  }
}

function updateNestedProps (domProps, oldProps, newProps, isStyleObject) {
  if (oldProps) {
    for (var name in oldProps) {
      if (!newProps || !(name in newProps)) {
        if (isStyleObject) {
          domProps[name] = EMPTY;
        } else {
          delete domProps[name];
        }
      }
    }
  }

  if (newProps) {
    for (var name in newProps) {
      const oldValue = oldProps && oldProps[name];
      const newValue = newProps[name];
      if (newValue !== oldValue) {
        domProps[name] = newValue;
      }
    }
  }
}

function updateAttributes (domNode, oldAttributes, newAttributes) {
  if (oldAttributes) {
    for (var name in oldAttributes) {
      if (!newAttributes || !(name in newAttributes)) {
        domNode.removeAttribute(name);
      }
    }
  }

  if (newAttributes) {
    for (var name in newAttributes) {
      const oldValue = oldAttributes && oldAttributes[name];
      const newValue = newAttributes[name];
      if (newValue !== oldValue) {
        domNode.setAttribute(name, newValue);
      }
    }
  }
}

function updateEventListeners (domNode, oldVirtualNode, newVirtualNode, listenerContext) {
  const oldListeners = oldVirtualNode && oldVirtualNode.props && oldVirtualNode.props.on;
  const newListeners = newVirtualNode.props && newVirtualNode.props.on;

  for (const eventName in oldListeners) {
    if (!(newListeners && eventName in newListeners)) {
      let listenerToRemove;
      if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
        listenerToRemove = oldVirtualNode.boundListeners[eventName];
      } else {
        listenerToRemove = oldListeners[eventName];
      }
      domNode.removeEventListener(eventName, listenerToRemove);
    }
  }

  for (const eventName in newListeners) {
    const oldListener = oldListeners && oldListeners[eventName];
    const newListener = newListeners[eventName];

    if (newListener !== oldListener) {
      if (oldListener) {
        let listenerToRemove;
        if (oldVirtualNode && oldVirtualNode.boundListeners && oldVirtualNode.boundListeners[eventName]) {
          listenerToRemove = oldVirtualNode.boundListeners[eventName];
        } else {
          listenerToRemove = oldListener;
        }
        domNode.removeEventListener(eventName, listenerToRemove);
      }
      if (newListener) {
        let listenerToAdd;
        if (listenerContext) {
          listenerToAdd = newListener.bind(listenerContext);
          if (!newVirtualNode.boundListeners) newVirtualNode.boundListeners = {};
          newVirtualNode.boundListeners[eventName] = listenerToAdd;
        } else {
          listenerToAdd = newListener;
        }
        domNode.addEventListener(eventName, listenerToAdd);
      }
    }
  }
}

const updateProps$1 = updateProps_1;
const SVG_TAGS = svgTags;

function render$3 (virtualNode, options) {
  let domNode;
  if (virtualNode.text != null) {
    domNode = document.createTextNode(virtualNode.text);
  } else {
    const {tag, children} = virtualNode;
    let {props, context} = virtualNode;

    if (context) {
      options = {refs: context.refs, listenerContext: context};
    }

    if (typeof tag === 'function') {
      let ref;
      if (props && props.ref) {
        ref = props.ref;
      }
      const component = new tag(props || {}, children);
      virtualNode.component = component;
      domNode = component.element;
      if (typeof ref === "function") {
        ref(component);
      } else if (options && options.refs && ref) {
        options.refs[ref] = component;
      }
    } else if (SVG_TAGS.has(tag)) {
      domNode = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if (children) addChildren(domNode, children, options);
      if (props) updateProps$1(domNode, null, virtualNode, options);
    } else {
      domNode = document.createElement(tag);
      if (children) addChildren(domNode, children, options);
      if (props) updateProps$1(domNode, null, virtualNode, options);
    }
  }
  virtualNode.domNode = domNode;
  return domNode
}

function addChildren (parent, children, options) {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(render$3(children[i], options));
  }
}

var render_1 = render$3;

const render$2 = render_1;
const updateProps = updateProps_1;
const updateRef = updateRef$2;

function patch$1 (oldVirtualNode, newVirtualNode, options) {
  const oldNode = oldVirtualNode.domNode;

  if (newVirtualNode === oldVirtualNode) return oldNode

  if (virtualNodesAreEqual(oldVirtualNode, newVirtualNode)) {
    let newNode;
    if (newVirtualNode.text != null) {
      oldNode.nodeValue = newVirtualNode.text;
      newNode = oldNode;
    } else {
      if (typeof newVirtualNode.tag === 'function') {
        newNode = updateComponent(oldVirtualNode, newVirtualNode, options);
      } else {
        updateChildren(oldNode, oldVirtualNode.children, newVirtualNode.children, options);
        updateProps(oldNode, oldVirtualNode, newVirtualNode, options);
        newNode = oldNode;
      }
    }
    newVirtualNode.domNode = newNode;
    if (newNode !== oldNode && oldNode.parentNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode);
    }
    return newNode
  } else {
    const parentNode = oldNode.parentNode;
    const nextSibling = oldNode.nextSibling;
    removeVirtualNode(oldVirtualNode, options && options.refs);
    const newNode = render$2(newVirtualNode, options);
    if (parentNode) parentNode.insertBefore(newNode, nextSibling);
    newVirtualNode.domNode = newNode;
    return newNode
  }
}

function updateComponent (oldVirtualNode, newVirtualNode, options) {
  const {component, props: oldProps} = oldVirtualNode;
  let {props: newProps, children: newChildren} = newVirtualNode;
  newVirtualNode.component = component;
  const refs = options && options.refs;
  if (refs) updateRef(component, oldProps && oldProps.ref, newProps && newProps.ref, refs);
  component.update(newProps || {}, newChildren);
  return component.element
}

let mapPool = [new Map(), new Map(), new Map(), new Map()];

function updateChildren (parentElement, oldChildren, newChildren, options) {
  var oldStartIndex = 0;
  var oldEndIndex = oldChildren.length - 1;
  var oldStartChild = oldChildren[0];
  var oldEndChild = oldChildren[oldEndIndex];

  var newStartIndex = 0;
  var newEndIndex = newChildren.length - 1;
  var newStartChild = newChildren[0];
  var newEndChild = newChildren[newEndIndex];

  var oldIndicesByKey;

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartChild) {
      oldStartChild = oldChildren[++oldStartIndex];
    } else if (!oldEndChild) {
      oldEndChild = oldChildren[--oldEndIndex];
    } else if (virtualNodesAreEqual(oldStartChild, newStartChild)) {
      patch$1(oldStartChild, newStartChild, options);
      oldStartChild = oldChildren[++oldStartIndex];
      newStartChild = newChildren[++newStartIndex];
    } else if (virtualNodesAreEqual(oldEndChild, newEndChild)) {
      patch$1(oldEndChild, newEndChild, options);
      oldEndChild = oldChildren[--oldEndIndex];
      newEndChild = newChildren[--newEndIndex];
    } else if (virtualNodesAreEqual(oldStartChild, newEndChild)) {
      patch$1(oldStartChild, newEndChild, options);
      parentElement.insertBefore(oldStartChild.domNode, oldEndChild.domNode.nextSibling);
      oldStartChild = oldChildren[++oldStartIndex];
      newEndChild = newChildren[--newEndIndex];
    } else if (virtualNodesAreEqual(oldEndChild, newStartChild)) {
      patch$1(oldEndChild, newStartChild, options);
      parentElement.insertBefore(oldEndChild.domNode, oldStartChild.domNode);
      oldEndChild = oldChildren[--oldEndIndex];
      newStartChild = newChildren[++newStartIndex];
    } else {
      if (!oldIndicesByKey) {
        if (mapPool.length > 0) {
          oldIndicesByKey = mapPool.pop();
          oldIndicesByKey.clear();
        } else {
          oldIndicesByKey = new Map();
        }
        mapOldKeysToIndices(oldIndicesByKey, oldChildren, oldStartIndex, oldEndIndex);
      }

      var key = getKey(newStartChild);
      var oldIndex = key ? oldIndicesByKey.get(key) : null;
      if (oldIndex == null) {
        parentElement.insertBefore(render$2(newStartChild, options), oldStartChild.domNode);
        newStartChild = newChildren[++newStartIndex];
      } else {
        var oldChildToMove = oldChildren[oldIndex];
        patch$1(oldChildToMove, newStartChild, options);
        oldChildren[oldIndex] = undefined;
        parentElement.insertBefore(oldChildToMove.domNode, oldStartChild.domNode);
        newStartChild = newChildren[++newStartIndex];
      }
    }
  }

  if (oldStartIndex > oldEndIndex) {
    var subsequentElement = newChildren[newEndIndex + 1] ? newChildren[newEndIndex + 1].domNode : null;
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parentElement.insertBefore(render$2(newChildren[i], options), subsequentElement);
    }
  } else if (newStartIndex > newEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      var child = oldChildren[i];
      if (child) removeVirtualNode(child, options && options.refs);
    }
  }

  if (oldIndicesByKey) mapPool.push(oldIndicesByKey);
}

function removeVirtualNode (virtualNode, refs, removeDOMNode = true) {
  const {domNode, props, children, component} = virtualNode;
  const ref = props && props.ref;
  if (component) {
    if (typeof ref === 'function') ref(null);
    else if (refs && ref && refs[ref] === component) delete refs[ref];
    if (component.destroy) component.destroy();
  } else {
    if (typeof ref === 'function') ref(null);
    else if (refs && ref && refs[ref] === domNode) delete refs[ref];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        removeVirtualNode(children[i], refs, false);
      }
    }
  }

  if (removeDOMNode) domNode.remove();
}

function virtualNodesAreEqual (oldVirtualNode, newVirtualNode) {
  return (
    getKey(oldVirtualNode) === getKey(newVirtualNode)
      && oldVirtualNode.tag === newVirtualNode.tag
  )
}

function getKey (virtualNode) {
  return virtualNode.props ? virtualNode.props.key : undefined
}

function mapOldKeysToIndices (oldIndicesByKey, children, startIndex, endIndex) {
  for (let i = startIndex; i <= endIndex; i++) {
    const key = getKey(children[i]);
    if (key) oldIndicesByKey.set(key, i);
  }
  return oldIndicesByKey
}

var patch_1 = patch$1;

var schedulerAssignment = {};

// If the scheduler is not customized via `etch.setScheduler`, an instance of
// this class will be used to schedule updates to the document. The
// `updateDocument` method accepts functions to be run at some point in the
// future, then runs them on the next animation frame.
var defaultScheduler = class DefaultScheduler {
  constructor () {
    this.updateRequests = [];
    this.readRequests = [];
    this.pendingAnimationFrame = null;
    this.performUpdates = this.performUpdates.bind(this);
    this.performingUpdates = false;
  }

  // Enqueues functions that write to the DOM to be performed on the next
  // animation frame. Functions passed to this method should *never* read from
  // the DOM, because that could cause synchronous reflows.
  updateDocument (fn) {
    this.updateRequests.push(fn);
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates);
    }
  }

  readDocument (fn) {
    this.readRequests.push(fn);
    if (!this.pendingAnimationFrame) {
      this.pendingAnimationFrame = window.requestAnimationFrame(this.performUpdates);
    }
  }

  // Returns a promise that will resolve at the end of the next update cycle,
  // after all the functions passed to `updateDocument` and `updateDocumentSync`
  // have been run.
  getNextUpdatePromise () {
    if (!this.nextUpdatePromise) {
      this.nextUpdatePromise = new Promise(resolve => {
        this.resolveNextUpdatePromise = resolve;
      });
    }
    return this.nextUpdatePromise
  }

  // Performs all the pending document updates. If running these update
  // functions causes *more* updates to be enqueued, they are run synchronously
  // in this update cycle without waiting for another frame.
  performUpdates () {
    while (this.updateRequests.length > 0) {
      this.updateRequests.shift()();
    }

    // We don't clear the pending frame until all update requests are processed.
    // This ensures updates requested within other updates are processed in the
    // current frame.
    this.pendingAnimationFrame = null;

    // Now that updates are processed, we can perform all pending document reads
    // without the risk of interleaving them with writes and causing layout
    // thrashing.
    while (this.readRequests.length > 0) {
      this.readRequests.shift()();
    }

    if (this.nextUpdatePromise) {
      let resolveNextUpdatePromise = this.resolveNextUpdatePromise;
      this.nextUpdatePromise = null;
      this.resolveNextUpdatePromise = null;
      resolveNextUpdatePromise();
    }
  }
};

// This file implements getter and setter functions for a scheduler to be used
// by this library when updating the DOM. The scheduler's job is to ensure that
// DOM interaction is performed efficiently. When using `etch` in Atom, you
// should tell `etch` to use Atom's scheduler by calling
// `setScheduler(atom.views)`.
//
// Schedulers should support the following interface:
// * `updateDocument(fn)` This method is asynchronous. It enqueues functions to
// be executed later.
// * `getNextUpdatePromise()` This function should return a promise that
// resolves after all pending document update functions have been invoked.
//
// Schedulers could support the following optional methods, which are supported
// by Atom's scheduler.
//
// * `readDocument` This method can be invoked by clients other than `etch` when
// it is necessary to read from the DOM. Functions enqueued via this method
// should not be run until all document update functions have been executed.
// Batching updates and reads in this way will prevent forced synchronous
// reflows.
// * `pollDocument` This method is similar to `readDocument`, but it runs the
// associated functions repeatedly. Again, they should be scheduled in such a
// way so as to avoid synchronous reflows.

const DefaultScheduler = defaultScheduler;

let scheduler = null;

schedulerAssignment.setScheduler = function setScheduler (customScheduler) {
  scheduler = customScheduler;
};

schedulerAssignment.getScheduler = function getScheduler () {
  if (!scheduler) {
    scheduler = new DefaultScheduler();
  }
  return scheduler
};

const render$1 = render_1;
const patch = patch_1;
const {getScheduler: getScheduler$1} = schedulerAssignment;

const componentsWithPendingUpdates = new WeakSet();
let syncUpdatesInProgressCounter = 0;
let syncDestructionsInProgressCounter = 0;

function isValidVirtualNode (virtualNode) {
  return virtualNode != null && virtualNode !== false
}

function applyContext (context, virtualNode) {
  virtualNode.context = context;
  if (virtualNode.ambiguous) {
    virtualNode.ambiguous.forEach(node => {
      node.context = context;
    });
    delete virtualNode.ambiguous;
  }
}

// This function associates a component object with a DOM element by calling
// the components `render` method, assigning an `.element` property on the
// object and also returning the element.
//
// It also assigns a `virtualNode` property based on the return value of the
// `render` method. This will be used later by `performElementUpdate` to diff
// the new results of `render` with the previous results when updating the
// component's element.
//
// Finally, this function also associates the component with a `refs` object,
// which is populated with references to elements based on `ref` properties on
// nodes of the `virtual-dom` tree. Before calling into `virtual-dom` to create
// the DOM tree, it pushes this `refs` object to a shared stack so it can be
// accessed by hooks during the creation of individual elements.
function initialize$1(component) {
  if (typeof component.update !== 'function') {
    throw new Error('Etch components must implement `update(props, children)`.')
  }

  let virtualNode = component.render();
  if (!isValidVirtualNode(virtualNode)) {
    let namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : '';
    throw new Error('invalid falsy value ' + virtualNode + ' returned from render()' + namePart)
  }

  applyContext(component, virtualNode);

  component.refs = {};
  component.virtualNode = virtualNode;
  component.element = render$1(component.virtualNode, {
    refs: component.refs, listenerContext: component
  });
}

// This function receives a component that has already been associated with an
// element via a previous call to `initialize` and updates this element by
// calling `render` on the component.
//
// When called in normal circumstances, it uses the scheduler to defer this
// update until the next animation frame, and will only perform one update of a
// given component in a given frame. This means you can call `update`
// repeatedly in a given tick without causing redundant updates.
//
// If this function called during another synchronous update (for example, as a
// result of a call to `update` on a child component), the update is performed
// synchronously.
//
// Returns a promise that will resolve when the requested update has been
// completed.
function update$1 (component, replaceNode=true) {
  if (syncUpdatesInProgressCounter > 0) {
    updateSync$1(component, replaceNode);
    return Promise.resolve()
  }

  let scheduler = getScheduler$1();

  if (!componentsWithPendingUpdates.has(component)) {
    componentsWithPendingUpdates.add(component);
    scheduler.updateDocument(function () {
      componentsWithPendingUpdates.delete(component);
      updateSync$1(component, replaceNode);
    });
  }

  return scheduler.getNextUpdatePromise()
}

// Synchronsly updates the DOM element associated with a component object. .
// This method assumes the presence of `.element` and `.virtualNode`
// properties on the component, which are assigned in the `initialize`
// function.
//
// It calls `render` on the component to obtain the desired state of the DOM,
// then `diff`s it with the previous state and `patch`es the element based on
// the resulting diff. During the patch operation, it pushes the component's
// `refs` object to a shared stack so that references to DOM elements can be
// updated.
//
// If `update` is called during the invocation of `updateSync`,
// the requests are processed synchronously as well. We track whether this is
// the case by incrementing and decrementing `syncUpdatesInProgressCounter`
// around the call.
//
// For now, etch does not allow the root tag of the `render` method to change
// between invocations, because we want to preserve a one-to-one relationship
// between component objects and DOM elements for simplicity.
function updateSync$1 (component, replaceNode=true) {
  if (!isValidVirtualNode(component.virtualNode)) {
    throw new Error(`${component.constructor ? component.constructor.name + ' instance' : component} is not associated with a valid virtualNode. Perhaps this component was never initialized?`)
  }

  if (component.element == null) {
    throw new Error(`${component.constructor ? component.constructor.name + ' instance' : component} is not associated with a DOM element. Perhaps this component was never initialized?`)
  }

  let newVirtualNode = component.render();
  if (!isValidVirtualNode(newVirtualNode)) {
    const namePart = component.constructor && component.constructor.name ? ' in ' + component.constructor.name : '';
    throw new Error('invalid falsy value ' + newVirtualNode + ' returned from render()' + namePart)
  }

  applyContext(component, newVirtualNode);

  syncUpdatesInProgressCounter++;
  let oldVirtualNode = component.virtualNode;
  let oldDomNode = component.element;
  let newDomNode = patch(oldVirtualNode, newVirtualNode, {
    refs: component.refs,
    listenerContext: component
  });
  component.virtualNode = newVirtualNode;
  if (newDomNode !== oldDomNode && !replaceNode) {
    throw new Error('The root node type changed on update, but the update was performed with the replaceNode option set to false')
  } else {
    component.element = newDomNode;
  }

  // We can safely perform additional writes after a DOM update synchronously,
  // but any reads need to be deferred until all writes are completed to avoid
  // DOM thrashing. Requested reads occur at the end of the the current frame
  // if this method was invoked via the scheduler. Otherwise, if `updateSync`
  // was invoked outside of the scheduler, the default scheduler will defer
  // reads until the next animation frame.
  if (typeof component.writeAfterUpdate === 'function') {
    component.writeAfterUpdate();
  }
  if (typeof component.readAfterUpdate === 'function') {
    getScheduler$1().readDocument(function () {
      component.readAfterUpdate();
    });
  }

  syncUpdatesInProgressCounter--;
}

// Removes the component's associated element and calls `destroy` on any child
// components. Normally, this function is asynchronous and will perform the
// destruction on the next animation frame. If called as the result of another
// update or destruction, it calls `destroy` on child components synchronously.
// If called as the result of destroying a component higher in the DOM, the
// element is not removed to avoid redundant DOM manipulation. Returns a promise
// that resolves when the destruction is completed.
function destroy$1 (component, removeNode=true) {
  if (syncUpdatesInProgressCounter > 0 || syncDestructionsInProgressCounter > 0) {
    destroySync$1(component, removeNode);
    return Promise.resolve()
  }

  let scheduler = getScheduler$1();
  scheduler.updateDocument(function () {
    destroySync$1(component, removeNode);
  });
  return scheduler.getNextUpdatePromise()
}

// A synchronous version of `destroy`.
//
// Note that we track whether `destroy` calls are in progress and only remove
// the element if we are not a nested call.
function destroySync$1 (component, removeNode=true) {
  syncDestructionsInProgressCounter++;
  destroyChildComponents(component.virtualNode);
  if (syncDestructionsInProgressCounter === 1 && removeNode) component.element.remove();
  syncDestructionsInProgressCounter--;
}

function destroyChildComponents(virtualNode) {
  if (virtualNode.component && typeof virtualNode.component.destroy === 'function') {
    virtualNode.component.destroy();
  } else if (virtualNode.children) {
    virtualNode.children.forEach(destroyChildComponents);
  }
}

var componentHelpers = {
  initialize: initialize$1,
  update: update$1, updateSync: updateSync$1,
  destroy: destroy$1, destroySync: destroySync$1
};

const dom = dom_1;
const render = render_1;
const {initialize, update, updateSync, destroy, destroySync} = componentHelpers;
const {setScheduler, getScheduler} = schedulerAssignment;

var lib = {
  dom, render,
  initialize, update, updateSync, destroy, destroySync,
  setScheduler, getScheduler
};

var fuzzaldrin = {exports: {}};

var scorer = {};

var hasRequiredScorer;

function requireScorer () {
	if (hasRequiredScorer) return scorer;
	hasRequiredScorer = 1;
	(function (exports) {
		(function() {
		  var PathSeparator, queryIsLastPathSegment;

		  PathSeparator = require$$0.sep;

		  exports.basenameScore = function(string, query, score) {
		    var base, depth, index, lastCharacter, segmentCount, slashCount;
		    index = string.length - 1;
		    while (string[index] === PathSeparator) {
		      index--;
		    }
		    slashCount = 0;
		    lastCharacter = index;
		    base = null;
		    while (index >= 0) {
		      if (string[index] === PathSeparator) {
		        slashCount++;
		        if (base == null) {
		          base = string.substring(index + 1, lastCharacter + 1);
		        }
		      } else if (index === 0) {
		        if (lastCharacter < string.length - 1) {
		          if (base == null) {
		            base = string.substring(0, lastCharacter + 1);
		          }
		        } else {
		          if (base == null) {
		            base = string;
		          }
		        }
		      }
		      index--;
		    }
		    if (base === string) {
		      score *= 2;
		    } else if (base) {
		      score += exports.score(base, query);
		    }
		    segmentCount = slashCount + 1;
		    depth = Math.max(1, 10 - segmentCount);
		    score *= depth * 0.01;
		    return score;
		  };

		  exports.score = function(string, query) {
		    var character, characterScore, indexInQuery, indexInString, lowerCaseIndex, minIndex, queryLength, queryScore, stringLength, totalCharacterScore, upperCaseIndex, _ref;
		    if (string === query) {
		      return 1;
		    }
		    if (queryIsLastPathSegment(string, query)) {
		      return 1;
		    }
		    totalCharacterScore = 0;
		    queryLength = query.length;
		    stringLength = string.length;
		    indexInQuery = 0;
		    indexInString = 0;
		    while (indexInQuery < queryLength) {
		      character = query[indexInQuery++];
		      lowerCaseIndex = string.indexOf(character.toLowerCase());
		      upperCaseIndex = string.indexOf(character.toUpperCase());
		      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
		      if (minIndex === -1) {
		        minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
		      }
		      indexInString = minIndex;
		      if (indexInString === -1) {
		        return 0;
		      }
		      characterScore = 0.1;
		      if (string[indexInString] === character) {
		        characterScore += 0.1;
		      }
		      if (indexInString === 0 || string[indexInString - 1] === PathSeparator) {
		        characterScore += 0.8;
		      } else if ((_ref = string[indexInString - 1]) === '-' || _ref === '_' || _ref === ' ') {
		        characterScore += 0.7;
		      }
		      string = string.substring(indexInString + 1, stringLength);
		      totalCharacterScore += characterScore;
		    }
		    queryScore = totalCharacterScore / queryLength;
		    return ((queryScore * (queryLength / stringLength)) + queryScore) / 2;
		  };

		  queryIsLastPathSegment = function(string, query) {
		    if (string[string.length - query.length - 1] === PathSeparator) {
		      return string.lastIndexOf(query) === string.length - query.length;
		    }
		  };

		}).call(main.commonjsGlobal); 
	} (scorer));
	return scorer;
}

var filter = {exports: {}};

var hasRequiredFilter;

function requireFilter () {
	if (hasRequiredFilter) return filter.exports;
	hasRequiredFilter = 1;
	(function() {
	  var pluckCandidates, scorer, sortCandidates;

	  scorer = requireScorer();

	  pluckCandidates = function(a) {
	    return a.candidate;
	  };

	  sortCandidates = function(a, b) {
	    return b.score - a.score;
	  };

	  filter.exports = function(candidates, query, queryHasSlashes, _arg) {
	    var candidate, key, maxResults, score, scoredCandidates, string, _i, _len, _ref;
	    _ref = _arg != null ? _arg : {}, key = _ref.key, maxResults = _ref.maxResults;
	    if (query) {
	      scoredCandidates = [];
	      for (_i = 0, _len = candidates.length; _i < _len; _i++) {
	        candidate = candidates[_i];
	        string = key != null ? candidate[key] : candidate;
	        if (!string) {
	          continue;
	        }
	        score = scorer.score(string, query, queryHasSlashes);
	        if (!queryHasSlashes) {
	          score = scorer.basenameScore(string, query, score);
	        }
	        if (score > 0) {
	          scoredCandidates.push({
	            candidate: candidate,
	            score: score
	          });
	        }
	      }
	      scoredCandidates.sort(sortCandidates);
	      candidates = scoredCandidates.map(pluckCandidates);
	    }
	    if (maxResults != null) {
	      candidates = candidates.slice(0, maxResults);
	    }
	    return candidates;
	  };

	}).call(main.commonjsGlobal);
	return filter.exports;
}

var matcher = {};

var hasRequiredMatcher;

function requireMatcher () {
	if (hasRequiredMatcher) return matcher;
	hasRequiredMatcher = 1;
	(function (exports) {
		(function() {
		  var PathSeparator;

		  PathSeparator = require$$0.sep;

		  exports.basenameMatch = function(string, query) {
		    var base, index, lastCharacter;
		    index = string.length - 1;
		    while (string[index] === PathSeparator) {
		      index--;
		    }
		    lastCharacter = index;
		    base = null;
		    while (index >= 0) {
		      if (string[index] === PathSeparator) {
		        if (base == null) {
		          base = string.substring(index + 1, lastCharacter + 1);
		        }
		      } else if (index === 0) {
		        if (lastCharacter < string.length - 1) {
		          if (base == null) {
		            base = string.substring(0, lastCharacter + 1);
		          }
		        } else {
		          if (base == null) {
		            base = string;
		          }
		        }
		      }
		      index--;
		    }
		    return exports.match(base, query, string.length - base.length);
		  };

		  exports.match = function(string, query, stringOffset) {
		    var character, indexInQuery, indexInString, lowerCaseIndex, matches, minIndex, queryLength, stringLength, upperCaseIndex, _results;
		    if (stringOffset == null) {
		      stringOffset = 0;
		    }
		    if (string === query) {
		      return (function() {
		        _results = [];
		        for (var _i = stringOffset, _ref = stringOffset + string.length; stringOffset <= _ref ? _i < _ref : _i > _ref; stringOffset <= _ref ? _i++ : _i--){ _results.push(_i); }
		        return _results;
		      }).apply(this);
		    }
		    queryLength = query.length;
		    stringLength = string.length;
		    indexInQuery = 0;
		    indexInString = 0;
		    matches = [];
		    while (indexInQuery < queryLength) {
		      character = query[indexInQuery++];
		      lowerCaseIndex = string.indexOf(character.toLowerCase());
		      upperCaseIndex = string.indexOf(character.toUpperCase());
		      minIndex = Math.min(lowerCaseIndex, upperCaseIndex);
		      if (minIndex === -1) {
		        minIndex = Math.max(lowerCaseIndex, upperCaseIndex);
		      }
		      indexInString = minIndex;
		      if (indexInString === -1) {
		        return [];
		      }
		      matches.push(stringOffset + indexInString);
		      stringOffset += indexInString + 1;
		      string = string.substring(indexInString + 1, stringLength);
		    }
		    return matches;
		  };

		}).call(main.commonjsGlobal); 
	} (matcher));
	return matcher;
}

(function() {
  var PathSeparator, SpaceRegex, filter, matcher, scorer;

  scorer = requireScorer();

  filter = requireFilter();

  matcher = requireMatcher();

  PathSeparator = require$$0.sep;

  SpaceRegex = /\ /g;

  fuzzaldrin.exports = {
    filter: function(candidates, query, options) {
      var queryHasSlashes;
      if (query) {
        queryHasSlashes = query.indexOf(PathSeparator) !== -1;
        query = query.replace(SpaceRegex, '');
      }
      return filter(candidates, query, queryHasSlashes, options);
    },
    score: function(string, query) {
      var queryHasSlashes, score;
      if (!string) {
        return 0;
      }
      if (!query) {
        return 0;
      }
      if (string === query) {
        return 2;
      }
      queryHasSlashes = query.indexOf(PathSeparator) !== -1;
      query = query.replace(SpaceRegex, '');
      score = scorer.score(string, query);
      if (!queryHasSlashes) {
        score = scorer.basenameScore(string, query, score);
      }
      return score;
    },
    match: function(string, query) {
      var baseMatches, index, matches, queryHasSlashes, seen, _results;
      if (!string) {
        return [];
      }
      if (!query) {
        return [];
      }
      if (string === query) {
        return (function() {
          _results = [];
          for (var _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
      }
      queryHasSlashes = query.indexOf(PathSeparator) !== -1;
      query = query.replace(SpaceRegex, '');
      matches = matcher.match(string, query);
      if (!queryHasSlashes) {
        baseMatches = matcher.basenameMatch(string, query);
        matches = matches.concat(baseMatches).sort(function(a, b) {
          return a - b;
        });
        seen = null;
        index = 0;
        while (index < matches.length) {
          if (index && seen === matches[index]) {
            matches.splice(index, 1);
          } else {
            seen = matches[index];
            index++;
          }
        }
      }
      return matches;
    }
  };

}).call(main.commonjsGlobal);

var fuzzaldrinExports = fuzzaldrin.exports;

(function (module, exports) {
	var __importDefault = (main.commonjsGlobal && main.commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const atom_1 = require$$0$1;
	// @ts-ignore Merge https://github.com/atom/etch/pull/90
	const etch_1 = __importDefault(lib);
	const $ = etch_1.default.dom;
	const fuzzaldrin_1 = __importDefault(fuzzaldrinExports);
	class SelectListView {
	    constructor(props) {
	        this.props = props;
	        if (!this.props.hasOwnProperty('initialSelectionIndex')) {
	            this.props.initialSelectionIndex = 0;
	        }
	        if (props.initiallyVisibleItemCount) {
	            this.initializeVisibilityObserver();
	        }
	        this.computeItems(false);
	        this.disposables = new atom_1.CompositeDisposable();
	        etch_1.default.initialize(this);
	        this.element.classList.add('select-list');
	        this.disposables.add(this.refs.queryEditor.onDidChange(this.didChangeQuery.bind(this)));
	        if (!props.skipCommandsRegistration) {
	            this.disposables.add(this.registerAtomCommands());
	        }
	        const editorElement = this.refs.queryEditor.element;
	        const didLoseFocus = this.didLoseFocus.bind(this);
	        editorElement.addEventListener('blur', didLoseFocus);
	        // When clicking the scrollbar of the items list, a blur event will be triggered
	        // on the query editor element, but we don't want to treat that as a cancellation.
	        // This mousedown listener allows us to detect this case and restore focus to the
	        // query editor. This is based on https://stackoverflow.com/a/1480178.
	        this.didClickItemsList = false;
	        this.element.addEventListener('mousedown', event => {
	            if (event.target === this.refs.items) {
	                this.didClickItemsList = true;
	            }
	        });
	        this.disposables.add(new atom_1.Disposable(() => { editorElement.removeEventListener('blur', didLoseFocus); }));
	    }
	    static setScheduler(scheduler) {
	        etch_1.default.setScheduler(scheduler);
	    }
	    static getScheduler() {
	        return etch_1.default.getScheduler();
	    }
	    initializeVisibilityObserver() {
	        this.visibilityObserver = new IntersectionObserver(changes => {
	            for (const change of changes) {
	                if (change.intersectionRatio > 0) {
	                    const element = change.target;
	                    this.visibilityObserver.unobserve(element);
	                    const index = Array.from(this.refs.items.children).indexOf(element);
	                    if (index >= 0) {
	                        this.renderItemAtIndex(index);
	                    }
	                }
	            }
	        });
	    }
	    focus() {
	        this.refs.queryEditor.element.focus();
	    }
	    didLoseFocus(event) {
	        if (this.didClickItemsList || this.element.contains(event.relatedTarget)) {
	            this.didClickItemsList = false;
	            this.refs.queryEditor.element.focus();
	        }
	        else if (document.hasFocus()) {
	            this.cancelSelection();
	        }
	    }
	    reset() {
	        this.refs.queryEditor.setText('');
	    }
	    destroy() {
	        this.disposables.dispose();
	        if (this.visibilityObserver)
	            this.visibilityObserver.disconnect();
	        return etch_1.default.destroy(this);
	    }
	    registerAtomCommands() {
	        return atom.commands.add(this.element, {
	            'core:move-up': (event) => {
	                this.selectPrevious();
	                event.stopPropagation();
	            },
	            'core:move-down': (event) => {
	                this.selectNext();
	                event.stopPropagation();
	            },
	            'core:move-to-top': (event) => {
	                this.selectFirst();
	                event.stopPropagation();
	            },
	            'core:move-to-bottom': (event) => {
	                this.selectLast();
	                event.stopPropagation();
	            },
	            'core:confirm': (event) => {
	                this.confirmSelection();
	                event.stopPropagation();
	            },
	            'core:cancel': (event) => {
	                this.cancelSelection();
	                event.stopPropagation();
	            }
	        });
	    }
	    update(props) {
	        let shouldComputeItems = false;
	        if ('items' in props) {
	            this.props.items = props.items;
	            shouldComputeItems = true;
	        }
	        if ('maxResults' in props) {
	            this.props.maxResults = props.maxResults;
	            shouldComputeItems = true;
	        }
	        if ('filter' in props) {
	            this.props.filter = props.filter;
	            shouldComputeItems = true;
	        }
	        if ('filterQuery' in props) {
	            this.props.filterQuery = props.filterQuery;
	            shouldComputeItems = true;
	        }
	        if ('query' in props) {
	            // Items will be recomputed as part of the change event handler, so we
	            // don't need to recompute them again at the end of this function.
	            this.refs.queryEditor.setText(props.query);
	            shouldComputeItems = false;
	        }
	        if ('selectQuery' in props) {
	            if (props.selectQuery) {
	                this.refs.queryEditor.selectAll();
	            }
	            else {
	                this.refs.queryEditor.clearSelections();
	            }
	        }
	        if ('order' in props) {
	            this.props.order = props.order;
	        }
	        if ('emptyMessage' in props) {
	            this.props.emptyMessage = props.emptyMessage;
	        }
	        if ('errorMessage' in props) {
	            this.props.errorMessage = props.errorMessage;
	        }
	        if ('infoMessage' in props) {
	            this.props.infoMessage = props.infoMessage;
	        }
	        if ('loadingMessage' in props) {
	            this.props.loadingMessage = props.loadingMessage;
	        }
	        if ('loadingBadge' in props) {
	            this.props.loadingBadge = props.loadingBadge;
	        }
	        if ('itemsClassList' in props) {
	            this.props.itemsClassList = props.itemsClassList;
	        }
	        if ('initialSelectionIndex' in props) {
	            this.props.initialSelectionIndex = props.initialSelectionIndex;
	        }
	        if (shouldComputeItems) {
	            this.computeItems();
	        }
	        return etch_1.default.update(this);
	    }
	    render() {
	        return $.div({}, $(atom_1.TextEditor, { ref: 'queryEditor', mini: true }), this.renderLoadingMessage(), this.renderInfoMessage(), this.renderErrorMessage(), this.renderItems());
	    }
	    renderItems() {
	        if (this.items.length > 0) {
	            const className = ['list-group'].concat(this.props.itemsClassList || []).join(' ');
	            if (this.visibilityObserver) {
	                etch_1.default.getScheduler().updateDocument(() => {
	                    Array.from(this.refs.items.children).slice(this.props.initiallyVisibleItemCount).forEach((element) => {
	                        this.visibilityObserver.observe(element);
	                    });
	                });
	            }
	            this.listItems = this.items.map((item, index) => {
	                const selected = this.getSelectedItem() === item;
	                const visible = !this.props.initiallyVisibleItemCount || index < this.props.initiallyVisibleItemCount;
	                return $(ListItemView, {
	                    element: this.props.elementForItem(item, { selected, index, visible }),
	                    selected: selected,
	                    onclick: () => this.didClickItem(index)
	                });
	            });
	            return $.ol({ className, ref: 'items' }, ...this.listItems);
	        }
	        else if (!this.props.loadingMessage && this.props.emptyMessage) {
	            return $.span({ ref: 'emptyMessage' }, this.props.emptyMessage);
	        }
	        else {
	            return "";
	        }
	    }
	    renderErrorMessage() {
	        if (this.props.errorMessage) {
	            return $.span({ ref: 'errorMessage' }, this.props.errorMessage);
	        }
	        else {
	            return '';
	        }
	    }
	    renderInfoMessage() {
	        if (this.props.infoMessage) {
	            return $.span({ ref: 'infoMessage' }, this.props.infoMessage);
	        }
	        else {
	            return '';
	        }
	    }
	    renderLoadingMessage() {
	        if (this.props.loadingMessage) {
	            return $.div({ className: 'loading' }, $.span({ ref: 'loadingMessage', className: 'loading-message' }, this.props.loadingMessage), this.props.loadingBadge ? $.span({ ref: 'loadingBadge', className: 'badge' }, this.props.loadingBadge) : '');
	        }
	        else {
	            return '';
	        }
	    }
	    getQuery() {
	        if (this.refs && this.refs.queryEditor) {
	            return this.refs.queryEditor.getText();
	        }
	        else {
	            return '';
	        }
	    }
	    getFilterQuery() {
	        return this.props.filterQuery ? this.props.filterQuery(this.getQuery()) : this.getQuery();
	    }
	    didChangeQuery() {
	        if (this.props.didChangeQuery) {
	            this.props.didChangeQuery(this.getFilterQuery());
	        }
	        this.computeItems();
	    }
	    didClickItem(itemIndex) {
	        this.selectIndex(itemIndex);
	        this.confirmSelection();
	    }
	    computeItems(updateComponent) {
	        this.listItems = null;
	        if (this.visibilityObserver)
	            this.visibilityObserver.disconnect();
	        const filterFn = this.props.filter || this.fuzzyFilter.bind(this);
	        // @ts-ignore fuzzaldrin types should be fixed
	        this.items = filterFn(this.props.items.slice(), this.getFilterQuery());
	        if (this.props.order) {
	            this.items.sort(this.props.order);
	        }
	        if (this.props.maxResults) {
	            this.items = this.items.slice(0, this.props.maxResults);
	        }
	        this.selectIndex(this.props.initialSelectionIndex, updateComponent);
	    }
	    fuzzyFilter(items, query) {
	        if (query.length === 0) {
	            return items;
	        }
	        else {
	            const scoredItems = [];
	            for (const item of items) {
	                const string = this.props.filterKeyForItem ? this.props.filterKeyForItem(item) : item;
	                const score = fuzzaldrin_1.default.score(string, query);
	                if (score > 0) {
	                    scoredItems.push({ item, score });
	                }
	            }
	            scoredItems.sort((a, b) => b.score - a.score);
	            return scoredItems.map((i) => i.item);
	        }
	    }
	    getSelectedItem() {
	        if (this.selectionIndex === undefined)
	            return null;
	        return this.items[this.selectionIndex];
	    }
	    renderItemAtIndex(index) {
	        const item = this.items[index];
	        const selected = this.getSelectedItem() === item;
	        const component = this.listItems[index].component;
	        if (this.visibilityObserver)
	            this.visibilityObserver.unobserve(component.element);
	        component.update({
	            element: this.props.elementForItem(item, { selected, index, visible: true }),
	            selected: selected,
	            onclick: () => this.didClickItem(index)
	        });
	    }
	    selectPrevious() {
	        if (this.selectionIndex === undefined)
	            return this.selectLast();
	        return this.selectIndex(this.selectionIndex - 1);
	    }
	    selectNext() {
	        if (this.selectionIndex === undefined)
	            return this.selectFirst();
	        return this.selectIndex(this.selectionIndex + 1);
	    }
	    selectFirst() {
	        return this.selectIndex(0);
	    }
	    selectLast() {
	        return this.selectIndex(this.items.length - 1);
	    }
	    selectNone() {
	        return this.selectIndex(undefined);
	    }
	    selectIndex(index, updateComponent = true) {
	        if (index >= this.items.length) {
	            index = 0;
	        }
	        else if (index < 0) {
	            index = this.items.length - 1;
	        }
	        const oldIndex = this.selectionIndex;
	        this.selectionIndex = index;
	        if (index !== undefined && this.props.didChangeSelection) {
	            this.props.didChangeSelection(this.getSelectedItem());
	        }
	        if (updateComponent) {
	            if (this.listItems) {
	                if (oldIndex >= 0)
	                    this.renderItemAtIndex(oldIndex);
	                if (index >= 0)
	                    this.renderItemAtIndex(index);
	                return etch_1.default.getScheduler().getNextUpdatePromise();
	            }
	            else {
	                return etch_1.default.update(this);
	            }
	        }
	        else {
	            return Promise.resolve();
	        }
	    }
	    selectItem(item) {
	        const index = this.items.indexOf(item);
	        if (index === -1) {
	            throw new Error('Cannot select the specified item because it does not exist.');
	        }
	        else {
	            return this.selectIndex(index);
	        }
	    }
	    confirmSelection() {
	        const selectedItem = this.getSelectedItem();
	        if (selectedItem != null) {
	            if (this.props.didConfirmSelection) {
	                this.props.didConfirmSelection(selectedItem);
	            }
	        }
	        else {
	            if (this.props.didConfirmEmptySelection) {
	                this.props.didConfirmEmptySelection();
	            }
	        }
	    }
	    cancelSelection() {
	        if (this.props.didCancelSelection) {
	            this.props.didCancelSelection();
	        }
	    }
	}
	exports.default = SelectListView;
	// cjs export for backward compatibility
	module.exports = SelectListView;
	class ListItemView {
	    constructor(props) {
	        this.mouseDown = this.mouseDown.bind(this);
	        this.mouseUp = this.mouseUp.bind(this);
	        this.didClick = this.didClick.bind(this);
	        this.selected = props.selected;
	        this.onclick = props.onclick;
	        this.element = props.element;
	        this.element.addEventListener('mousedown', this.mouseDown);
	        this.element.addEventListener('mouseup', this.mouseUp);
	        this.element.addEventListener('click', this.didClick);
	        if (this.selected) {
	            this.element.classList.add('selected');
	        }
	        this.domEventsDisposable = new atom_1.Disposable(() => {
	            this.element.removeEventListener('mousedown', this.mouseDown);
	            this.element.removeEventListener('mouseup', this.mouseUp);
	            this.element.removeEventListener('click', this.didClick);
	        });
	        etch_1.default.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this));
	    }
	    mouseDown(event) {
	        event.preventDefault();
	    }
	    mouseUp(event) {
	        event.preventDefault();
	    }
	    didClick(event) {
	        event.preventDefault();
	        this.onclick();
	    }
	    destroy() {
	        this.element.remove();
	        this.domEventsDisposable.dispose();
	    }
	    update(props) {
	        this.element.removeEventListener('mousedown', this.mouseDown);
	        this.element.removeEventListener('mouseup', this.mouseUp);
	        this.element.removeEventListener('click', this.didClick);
	        this.element.parentNode.replaceChild(props.element, this.element);
	        this.element = props.element;
	        this.element.addEventListener('mousedown', this.mouseDown);
	        this.element.addEventListener('mouseup', this.mouseUp);
	        this.element.addEventListener('click', this.didClick);
	        if (props.selected) {
	            this.element.classList.add('selected');
	        }
	        this.selected = props.selected;
	        this.onclick = props.onclick;
	        etch_1.default.getScheduler().updateDocument(this.scrollIntoViewIfNeeded.bind(this));
	    }
	    scrollIntoViewIfNeeded() {
	        if (this.selected) {
	            // @ts-ignore: this function is a non-standard API.
	            this.element.scrollIntoViewIfNeeded(false);
	        }
	    }
	}
	
} (selectListView$2, selectListView$2.exports));

var selectListViewExports = selectListView$2.exports;
var selectListView = /*@__PURE__*/main.getDefaultExportFromCjs(selectListViewExports);

var selectListView$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: selectListView
}, [selectListViewExports]);

exports.selectListView = selectListView$1;
//# sourceMappingURL=select-list-view-4385ca5a.js.map
