// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"aGWDx":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "85be31d1321df24b";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"k4j9L":[function(require,module,exports) {
var _exampleUtils = require("../example-utils");
var _sceneCanvas2D = require("animcc/SceneCanvas2d");
// Set up canvas
const canvas = document.getElementById("canvas");
const ctx2d = canvas.getContext('2d');
var dpr = _exampleUtils.setupCanvas(canvas) // Device pixel ratio
;
// Set up animation context and animation libraries
const scene = new _sceneCanvas2D.SceneCanvas2d(ctx2d);
const testLibrary = scene.createLibrary('test', '../assets/test');
async function init() {
    await testLibrary.loadData();
    update();
}
let frame = 0;
function update() {
    scene.ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.ctx.save();
    scene.ctx.translate(canvas.width / 2, canvas.height / 2);
    scene.ctx.scale(dpr, dpr);
    testLibrary.symbol("Scene").draw(frame);
    scene.ctx.restore();
    frame += 1;
    requestAnimationFrame(update);
}
init();

},{"../example-utils":"6NqHf","animcc/SceneCanvas2d":"6pBPa"}],"6NqHf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setupCanvas", ()=>setupCanvas
);
parcelHelpers.export(exports, "addExampleButtons", ()=>addExampleButtons
);
function setupCanvas(canvas) {
    // Set the context quality and smoothing
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Set the canvas according to window width
    var bodyRec = document.body.getBoundingClientRect();
    canvas.width = Math.min(1000, bodyRec.width - 8);
    canvas.height = canvas.width;
    // Get the device pixel ratio, falling back to 1.
    let dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    let rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    //canvas.style.border = "2px solid gray";
    canvas.style.width = "" + canvas.width + "px";
    canvas.style.height = "" + canvas.height + "px";
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    return dpr;
}
function addExampleButtons(libraryKey, libs, onLibrarySelected, onSymbolPicked, onMinus, onPlus) {
    const library = libs[libraryKey];
    const buttons1 = document.getElementById("buttons");
    const selector = document.createElement('select');
    selector.value = libraryKey;
    selector.onchange = (e)=>{
        const buttons = document.getElementById('buttons');
        while(buttons.childNodes.length > 0)buttons.childNodes[0].remove();
        addExampleButtons(selector.value, libs, onLibrarySelected, onSymbolPicked, onMinus, onPlus);
        onLibrarySelected(libs[selector.value]);
    };
    buttons1.appendChild(selector);
    for (const libraryName of Object.keys(libs)){
        const option = document.createElement('option');
        option.value = libraryName;
        option.selected = libraryName == libraryKey;
        option.innerText = libraryName;
        selector.appendChild(option);
    }
    const minusButton = document.createElement('button');
    minusButton.innerHTML = '-';
    minusButton.onclick = onMinus;
    buttons1.appendChild(minusButton);
    const plusButton = document.createElement('button');
    plusButton.innerHTML = '+';
    plusButton.onclick = onPlus;
    buttons1.appendChild(plusButton);
    for (const clip of library.clips){
        if (clip.name.indexOf("/") != -1 || clip.name.indexOf("Symbol ") == 0 || clip.name.indexOf("Tween ") == 0 || clip.name.indexOf("/Symbol ") != -1 || clip.name.indexOf("/Tween ") != -1) continue;
        var button = document.createElement("button");
        button.innerHTML = clip.name;
        button.onclick = ()=>onSymbolPicked(clip)
        ;
        buttons1.appendChild(button);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6pBPa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// This is all of the library's rendering code required to draw into a canvas 2d context.
// This could easily be ported to any immediate mode rendering context, ie WebGL.
// This could also be ported to scene graph based libraries like PixiJS, or event the DOM,
// with a few modification to faciliate mapping to a scene graph.
parcelHelpers.export(exports, "SceneCanvas2d", ()=>SceneCanvas2d
);
var _scene = require("./Scene");
var _instance = require("./Instance");
var _layer = require("./Layer");
var _sprite = require("./Sprite");
var _math = require("./util/math");
class SceneCanvas2d extends _scene.Scene {
    constructor(ctx){
        super();
        this.draw = (item, frame, lerp, callback)=>{
            if (item instanceof _layer.Layer) {
                if (item.type == 'Clipper') ;
                else if (item.clippedBy) {
                    const clipLayer = item.clip.layersByName[item.clippedBy];
                    this.pushRenderTarget();
                    clipLayer.draw(frame, lerp, callback);
                    this.ctx.globalCompositeOperation = 'source-in';
                    if (callback) callback(item, frame, lerp);
                    else item.draw(frame, lerp, callback);
                    this.popRenderTarget();
                } else if (callback) callback(item, frame, lerp);
                else item.draw(frame, lerp, callback);
            } else if (item instanceof _instance.Instance) {
                this.ctx.save();
                this.transformInstance(item, frame, lerp);
                const didPushContext = this.handleFilters(item, frame, lerp);
                this.handleColor(item, frame, lerp);
                if (callback) callback(item, frame, lerp);
                else item.draw(frame, lerp, callback);
                if (didPushContext) this.popRenderTarget();
                this.ctx.restore();
            } else if (item instanceof _sprite.Sprite) {
                if (callback) callback(item, frame, lerp);
                else item.draw(frame, lerp, callback);
            } else if (callback) callback(item, frame, lerp);
            else item.draw(frame, lerp, callback);
        };
        this.drawImage = (image, sx, sy, sw, sh, rx, ry, rw, rh)=>{
            this.ctx.drawImage(image, sx, sy, sw, sh, rx, ry, rw, rh);
        };
        this.canvas = ctx.canvas;
        this.stack = [
            ctx
        ];
        this.pool = [];
        this._mouseX = -1;
        this._mouseY = -1;
        ctx.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        this._mouseX = (e.clientX - rect.left) * scaleX;
        this._mouseY = (e.clientY - rect.top) * scaleY;
    }
    get mouseX() {
        return this._mouseX;
    }
    get mouseY() {
        return this._mouseY;
    }
    getLocal(x, y) {
        const point = new DOMPoint(x, y);
        const matrix = this.ctx.getTransform();
        const imatrix = matrix.inverse();
        return point.matrixTransform(imatrix);
    }
    get ctx() {
        return this.stack[this.stack.length - 1];
    }
    pushRenderTarget() {
        const ctx = this.pool.length == 0 ? document.createElement('canvas').getContext('2d') : this.pool.pop();
        ctx.canvas.width = this.ctx.canvas.width;
        ctx.canvas.height = this.ctx.canvas.height;
        ctx.setTransform(this.ctx.getTransform());
        this.stack.push(ctx);
    }
    popRenderTarget() {
        if (this.stack.length <= 1) throw "Cannot pop stack";
        const ctx = this.stack.pop();
        this.ctx.save();
        this.ctx.resetTransform();
        this.ctx.drawImage(ctx.canvas, 0, 0);
        this.ctx.restore();
        this.pool.push(ctx);
    }
    handleColor(item, frame, lerp) {
        // TODO: Handle lerp on color
        if (item.color?.mode == 'CA' || item.color?.mode == 'Alpha' || item.color?.mode == 'Advanced' || item.color?.mode == 'AD') this.ctx.globalAlpha *= item.color.alphaMultiplier;
    }
    handleFilters(item, frame, lerp) {
        // TODO: Handle lerp on filters
        if (item.filters) for (let k of Object.keys(item.filters)){
            const key = k;
            if (key == 'DropShadowFilter') {
                const filter = item.filters[key];
                this.pushDropShadow(filter.color + Math.round(filter.strength * 255).toString(16), filter.blurX, Math.cos(filter.angle * Math.PI / 180) * filter.distance, Math.sin(filter.angle * Math.PI / 180) * filter.distance);
                return true;
            }
        }
    }
    pushDropShadow(color, blur, offsetX = 0, offsetY = 0) {
        this.ctx.save();
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = blur;
        this.ctx.shadowOffsetX = offsetX;
        this.ctx.shadowOffsetY = offsetY;
        this.pushRenderTarget();
    }
    popDropShadow() {
        this.popRenderTarget();
        this.ctx.restore();
    }
    transformInstance(item, frame, lerp) {
        if (lerp && item.next) {
            const t = (_math.modWrap(frame, item.totalFrames) - item.index) / item.frame.totalFrames;
            const m1 = item.matrix;
            const m2 = item.next.matrix;
            this.ctx.transform(m1._00 + (m2._00 - m1._00) * t, m1._01 + (m2._01 - m1._01) * t, m1._10 + (m2._10 - m1._10) * t, m1._11 + (m2._11 - m1._11) * t, m1._30 + (m2._30 - m1._30) * t, m1._31 + (m2._31 - m1._31) * t);
        } else this.ctx.transform(item.matrix._00, item.matrix._01, item.matrix._10, item.matrix._11, item.matrix._30, item.matrix._31);
    }
}

},{"./Scene":"3E7xP","./Instance":"7I8vs","./Layer":"7pPtx","./Sprite":"g3GJM","./util/math":"cxIXW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3E7xP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Scene", ()=>Scene
);
var _library = require("./Library");
class Scene {
    constructor(){
        this.draw = null // OVERRIDE THIS IN THE BASE CLASS!
        ;
        this.drawImage = null;
        this.pixelData = {
        };
    }
    get mouseX() {
        throw "Override mouseX in base class";
    }
    get mouseY() {
        throw "Override mouseY in base class";
    }
    createLibrary(name, path) {
        const library = new _library.Library(name, path, this);
        return library;
    }
    getPixelData(image) {
        if (image.complete == false) throw "Image has not loaded!";
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return {
            ctx,
            imageData,
            image
        };
    }
}

},{"./Library":"yT88N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"yT88N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Library", ()=>Library
);
var _clip = require("./Clip");
var _vec2 = require("./geom/Vec2");
var _sprite = require("./Sprite");
var _atlas = require("./Atlas");
var _utilJson = require("./json/utilJson");
var _matrix = require("./geom/Matrix");
var _createImage = require("./util/createImage");
class Library {
    constructor(name, path, scene){
        this.clips = [];
        this.clipsByName = {
        };
        this.spritesByName = {
        };
        this.atlases = [];
        this.atlasesBySpriteName = {
        };
        this.name = name;
        this.path = path;
        this.atlases = [];
        this.scene = scene;
    }
    symbol(name) {
        if (this.clipsByName[name]) return this.clipsByName[name];
        if (this.spritesByName[name]) return this.spritesByName[name];
        throw "Cannot find symbol: " + name + " for library: " + this.path;
    }
    createAtlas(props, pixelData) {
        const atlas = new _atlas.Atlas({
            ...props,
            library: this,
            pixelData
        });
        this.atlases.push(atlas);
        return atlas;
    }
    createSprite(atlas, props) {
        const sprite = new _sprite.Sprite({
            ...props,
            atlas: atlas
        });
        atlas.sprites.push(sprite);
        this.spritesByName[sprite.name] = sprite;
        this.atlasesBySpriteName[sprite.name] = atlas;
        return sprite;
    }
    createClip(props) {
        const clip = new _clip.Clip({
            ...props,
            library: this
        });
        this.clips.push(clip);
        this.clipsByName[clip.name] = clip;
        return clip;
    }
    async loadData() {
        const animJsonPath = this.path + "/Animation.json";
        const animFetchResult = await fetch(animJsonPath);
        const dataRaw = await animFetchResult.json();
        const data = _utilJson.normaliseJson(dataRaw);
        const spriteNames = [];
        // Clip
        for (const symbolData of data.symbolDictionary.symbols){
            const clip = this.createClip({
                name: symbolData.symbolName
            });
            // Layer
            for(let l = symbolData.timeline.layers.length - 1; l >= 0; l--){
                const layerData = symbolData.timeline.layers[l];
                const layer = clip.createLayer({
                    name: layerData.layerName,
                    type: layerData.layerType || 'Normal',
                    clippedBy: layerData.clippedBy || null
                });
                // Frame
                for (const frameData of layerData.frames){
                    const frame = layer.createFrame({
                        name: "" + frameData.index,
                        totalFrames: frameData.duration,
                        labelName: frameData.name,
                        index: frameData.index
                    });
                    // Element
                    for (const elemInstanceData of frameData.elements)if ("symbolInstance" in elemInstanceData) {
                        const elemData = elemInstanceData.symbolInstance;
                        const m = elemData.matrix3D;
                        const instanceProps = {
                            frame,
                            name: frame.name,
                            filters: elemData.filters || null,
                            matrix: 'm00' in m ? new _matrix.Matrix(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new _matrix.Matrix(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                            itemName: elemData.symbolName,
                            color: elemData.color || null
                        };
                        const clipInstance = frame.createClipInstance({
                            ...instanceProps,
                            transformationPoint: new _vec2.Vec2(elemData.transformationPoint),
                            behaviour: elemData.symbolType == "graphic" ? {
                                type: 'graphic',
                                loop: elemData.loop,
                                firstFrame: elemData.firstFrame
                            } : {
                                type: 'movieclip'
                            }
                        });
                    } else {
                        const elemData = elemInstanceData.atlasSpriteInstance;
                        const m = elemData.matrix3D;
                        const spriteInstance = frame.createSpriteInstance({
                            name: frame.name,
                            filters: elemData.filters || null,
                            color: null,
                            matrix: 'm00' in m ? new _matrix.Matrix(m.m00, m.m01, m.m02, m.m03, m.m10, m.m11, m.m12, m.m13, m.m20, m.m21, m.m22, m.m23, m.m30, m.m31, m.m32, m.m33) : new _matrix.Matrix(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]),
                            itemName: elemData.name
                        });
                        if (spriteNames.indexOf(spriteInstance.itemName) == -1) spriteNames.push(spriteInstance.itemName);
                    }
                }
            }
        }
        // Sprites
        let pendingAtlasIndex = 1;
        for (const spriteName of spriteNames)if (this.atlasesBySpriteName[spriteName] == null) {
            const spriteJsonPath = this.path + `/spritemap${pendingAtlasIndex}.json`;
            const altasFetch = await fetch(spriteJsonPath);
            const dataRaw = await altasFetch.json();
            const data = _utilJson.normaliseJson(dataRaw);
            const imagePath = this.path + `/spritemap${pendingAtlasIndex}.png`;
            const image = await _createImage.createImage(imagePath) // TODO: This will impact load times. Find a way to make this load parallel. Workers?
            ;
            const atlas = this.createAtlas({
                image,
                app: data.meta.app,
                version: data.meta.version,
                imagePath: data.meta.image,
                format: data.meta.format,
                size: data.meta.size,
                resolution: data.meta.resolution
            }, this.scene.getPixelData(image));
            for (const spriteSpriteData of data.atlas.sprites){
                const spriteData = spriteSpriteData.sprite;
                const sprite = this.createSprite(atlas, {
                    name: spriteData.name,
                    x: spriteData.x,
                    y: spriteData.y,
                    width: spriteData.w,
                    height: spriteData.h,
                    rotated: spriteData.rotated
                });
                this.atlasesBySpriteName[sprite.name] = atlas;
            }
            pendingAtlasIndex++;
        }
    }
}

},{"./Clip":"bH2qW","./geom/Vec2":"77mMh","./Sprite":"g3GJM","./Atlas":"1b8dl","./json/utilJson":"hsnOM","./geom/Matrix":"aWnnV","./util/createImage":"1QolB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bH2qW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Clip", ()=>Clip
);
var _drawable = require("./Drawable");
var _layer = require("./Layer");
var _math = require("./util/math");
class Clip extends _drawable.Drawable {
    constructor(props){
        super({
            ...props,
            totalFrames: 0,
            id: `${props.library.name}.clips.${props.name}`
        });
        this.layers = [];
        this.layersById = {
        };
        this.layersByName = {
        };
        this.framesById = {
        };
        this.framesByLabel = {
        };
    }
    createLayer(props) {
        const layer = new _layer.Layer({
            ...props,
            clip: this
        });
        this.layers.push(layer);
        this.layersById[layer.id] = layer;
        this.layersByName[layer.name] = layer;
        if (layer.totalFrames > this.totalFrames) this.totalFrames = layer.totalFrames;
        return layer;
    }
    __addFrame(frame) {
        this.framesById[frame.id] = frame;
        if (frame.layer.totalFrames > this.totalFrames) this.totalFrames = frame.layer.totalFrames;
        if (frame.labelName) this.framesByLabel[frame.labelName] = frame;
    }
    draw(frame, lerp, callback) {
        for (const layer of this.layers){
            if (layer.totalFrames == 0) continue;
            var f = _math.modWrap(frame, layer.totalFrames);
            if (layer.totalFrames >= f) this.library.scene.draw(layer, frame, lerp, callback);
        }
    }
}

},{"./Drawable":"7D6fr","./Layer":"7pPtx","./util/math":"cxIXW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7D6fr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Drawable", ()=>Drawable
);
class Drawable {
    constructor(props){
        this.totalFrames = 1;
        this.name = props.name;
        this.id = props.id;
        this.totalFrames = props.totalFrames;
        this.library = props.library;
    }
    get scene() {
        return this.library.scene;
    }
    draw(frame, lerp, callback) {
    // Override in base class
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7pPtx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Layer", ()=>Layer
);
var _drawable = require("./Drawable");
var _frame = require("./Frame");
var _math = require("./util/math");
class Layer extends _drawable.Drawable {
    constructor(props){
        super({
            ...props,
            totalFrames: 0,
            id: `${props.clip.id}.${props.name}`,
            library: props.clip.library
        });
        this.clip = props.clip;
        this.type = props.type;
        this.clippedBy = props.clippedBy || null;
        this.index = this.clip.layers.length;
        this.frames = [];
        this.framesByName = {
        };
        this.labels = [];
    }
    createFrame(props) {
        const frame = new _frame.Frame({
            ...props,
            layer: this
        });
        // TODO: Allow for more flexibility when adding frames
        if (this.frames.length > 0 && this.lastFrame.index + this.lastFrame.totalFrames != frame.index) throw "Must add next frame at previous frame.index+frame.duration";
        this.framesByName[frame.name] = frame;
        if (frame.index + frame.totalFrames > this.totalFrames) this.totalFrames = frame.index + frame.totalFrames;
        if (frame.labelName) this.labels.push(frame);
        this.clip.__addFrame(frame);
        /* TODO: Determine if this should be nessessary
        if(this.firstFrame){
            this.firstFrame.prev = frame
            frame.next = this.firstFrame
        }
        */ if (this.lastFrame) {
            this.lastFrame.next = frame;
            frame.prev = this.lastFrame;
        }
        this.frames.push(frame);
        return frame;
    }
    get lastFrame() {
        return this.frames[this.frames.length - 1];
    }
    get firstFrame() {
        return this.frames[0];
    }
    keyframeAt(frame) {
        // TODO: Binary search would be a good optimisation here
        frame = _math.modWrap(frame, this.totalFrames);
        for (const keyframe of this.frames){
            if (keyframe.index <= frame && keyframe.index + keyframe.totalFrames > frame) return keyframe;
        }
        return null;
    }
    draw(frame, lerp, callback) {
        var keyframe = this.keyframeAt(frame);
        if (keyframe != null) this.library.scene.draw(keyframe, frame, lerp, callback);
    }
}

},{"./Drawable":"7D6fr","./Frame":"1vPWB","./util/math":"cxIXW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1vPWB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Frame", ()=>Frame
);
var _clipInstance = require("./ClipInstance");
var _drawable = require("./Drawable");
var _spriteInstance = require("./SpriteInstance");
class Frame extends _drawable.Drawable {
    constructor(props){
        super({
            ...props,
            id: `${props.layer.id}.${props.index}`,
            library: props.layer.library
        });
        this.instances = [];
        this.layer = props.layer;
        this.index = props.index;
        this.labelName = props.labelName || null;
    }
    createClipInstance(props) {
        const clipInstance = new _clipInstance.ClipInstance({
            ...props,
            frame: this,
            totalFrames: this.totalFrames
        });
        this.instances.push(clipInstance);
        return clipInstance;
    }
    createSpriteInstance(props) {
        const spriteInstance = new _spriteInstance.SpriteInstance({
            ...props,
            frame: this,
            totalFrames: this.totalFrames
        });
        this.instances.push(spriteInstance);
        return spriteInstance;
    }
    draw(frame, lerp, callback) {
        for (const instance of this.instances)this.library.scene.draw(instance, frame, lerp, callback);
    }
}

},{"./ClipInstance":"lcRZo","./Drawable":"7D6fr","./SpriteInstance":"JuFoS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lcRZo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ClipInstance", ()=>ClipInstance
);
var _vec2 = require("./geom/Vec2");
var _instance = require("./Instance");
var _math = require("./util/math");
class ClipInstance extends _instance.Instance {
    constructor(props){
        super(props);
        this.behaviour = props.behaviour || {
            type: 'movieclip'
        };
        this.transformationPoint = props.transformationPoint || new _vec2.Vec2({
            x: 0,
            y: 0
        });
    }
    get item() {
        return this.library.clipsByName[this.itemName];
    }
    draw(frame, lerp, callback) {
        if (this.behaviour.type == 'graphic') frame = this.behaviour.firstFrame + _math.modWrap(frame, 1);
        this.library.scene.draw(this.item, frame, lerp, callback);
    }
}

},{"./geom/Vec2":"77mMh","./Instance":"7I8vs","./util/math":"cxIXW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"77mMh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vec2", ()=>Vec2
);
class Vec2 {
    constructor(props){
        this.x = props.x;
        this.y = props.y;
        this.data = new Float32Array([
            this.x,
            this.y
        ]);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7I8vs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Instance", ()=>Instance
);
var _drawable = require("./Drawable");
var _matrix = require("./geom/Matrix");
class Instance extends _drawable.Drawable {
    //position:Vec3;
    //scale:Vec3;
    //rotation:Vec3;
    //filters = new Array<Filter>();
    constructor(props){
        super({
            ...props,
            library: props.frame.library,
            id: `${props.frame.id}.${props.frame.instances.length}`
        });
        this.itemName = props.itemName;
        this.matrix = props.matrix || new _matrix.Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this.filters = props.filters || null;
        this.color = props.color || null;
        //this.position = props.position;
        //this.scale = props.scale;
        //this.rotation = props.rotation;
        this.frame = props.frame;
        this.index = this.frame.instances.length;
    }
    get prev() {
        const item = this.frame.prev?.instances[this.index];
        return item?.itemName == this.itemName ? item : undefined;
    }
    get next() {
        const item = this.frame.next?.instances[this.index];
        return item?.itemName == this.itemName ? item : undefined;
    }
    get item() {
        throw "Override item getter in base class";
    }
    draw(frame, lerp, callback) {
        this.library.scene.draw(this.item, frame, lerp, callback);
    }
}

},{"./Drawable":"7D6fr","./geom/Matrix":"aWnnV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aWnnV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Matrix", ()=>Matrix
);
class Matrix {
    constructor(_00, _01, _02, _03, _10, _11, _12, _13, _20, _21, _22, _23, _30, _31, _32, _33){
        this._00 = _00;
        this._01 = _01;
        this._02 = _02;
        this._03 = _03;
        this._10 = _10;
        this._11 = _11;
        this._12 = _12;
        this._13 = _13;
        this._20 = _20;
        this._21 = _21;
        this._22 = _22;
        this._23 = _23;
        this._30 = _30;
        this._31 = _31;
        this._32 = _32;
        this._33 = _33;
        this.data = new Float32Array([
            _00,
            _01,
            _02,
            _03,
            _10,
            _11,
            _12,
            _13,
            _20,
            _21,
            _22,
            _23,
            _30,
            _31,
            _32,
            _33, 
        ]);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cxIXW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "modWrap", ()=>modWrap
);
function modWrap(a, b) {
    return a - b * Math.floor(a / b);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"JuFoS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SpriteInstance", ()=>SpriteInstance
);
var _instance = require("./Instance");
class SpriteInstance extends _instance.Instance {
    constructor(props){
        super(props);
    }
    get item() {
        return this.library.spritesByName[this.itemName];
    }
}

},{"./Instance":"7I8vs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g3GJM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sprite", ()=>Sprite
);
var _drawable = require("./Drawable");
class Sprite extends _drawable.Drawable {
    constructor(props){
        super({
            ...props,
            totalFrames: 1,
            library: props.atlas.library,
            id: `${props.atlas.library.name}.sprites.${props.name}`
        });
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.rotated = props.rotated;
        this.atlas = props.atlas;
    }
    getPixel(x, y, transform) {
        const point = new DOMPoint(x, y);
        const imatrix = transform.inverse();
        const local = point.matrixTransform(imatrix);
        if (local.x < 0 || local.x >= this.width) return null;
        if (local.y < 0 || local.y >= this.height) return null;
        return this.atlas.getPixel(this.x + local.x, this.y + local.y);
    }
    isSolidPixelAt(x, y, transform, alphaThreshold = 1) {
        const pixel = this.getPixel(x, y, transform);
        return pixel && pixel[3] > alphaThreshold;
    }
    draw(frame, lerp, callback) {
        this.scene.drawImage(this.atlas.image, this.x, this.y, this.width, this.height, 0, 0, this.width, this.height);
    }
}

},{"./Drawable":"7D6fr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1b8dl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Atlas", ()=>Atlas
);
class Atlas {
    constructor(props){
        this.sprites = [];
        this.library = props.library;
        this.image = props.image;
        this.app = props.app;
        this.version = props.version;
        this.imagePath = props.imagePath;
        this.format = props.format;
        this.size = props.size;
        this.resolution = props.resolution;
        this.pixelData = props.pixelData;
    // this.library.scene.getPixelData(this.image) // TODO: Determine if this should be a lazy operation
    }
    getPixel(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        let i = x + y * this.pixelData.imageData.width;
        const data = this.pixelData.imageData.data;
        return [
            data[i * 4 + 0],
            data[i * 4 + 1],
            data[i * 4 + 2],
            data[i * 4 + 3], 
        ];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hsnOM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// AnimateCC exports wildy inconsistent JSON. Normalise the
// fields to make it easier to work with
parcelHelpers.export(exports, "normaliseJson", ()=>normaliseJson
);
const keys = {
    // Fix inconsistent names
    // spritemap.json
    SPRITE: "sprite",
    SPRITES: "sprites",
    ATLAS: "atlas",
    // Animation.json
    ANIMATION: "animation",
    ATLAS_SPRITE_instance: "atlasSpriteInstance",
    DecomposedMatrix: "decomposedMatrix",
    Frames: "frames",
    framerate: "frameRate",
    Instance_Name: "instanceName",
    Layer_name: "layerName",
    Layer_type: "layerType",
    Clipped_by: "clippedBy",
    LAYERS: "layers",
    Matrix3D: "matrix3D",
    Position: "position",
    Rotation: "rotation",
    Scaling: "scaling",
    SYMBOL_DICTIONARY: "symbolDictionary",
    SYMBOL_Instance: "symbolInstance",
    SYMBOL_name: "symbolName",
    Symbols: "symbols",
    TIMELINE: "timeline",
    // Filter
    GradientEntries: "gradientEntries",
    // Color
    RedMultiplier: 'redMultiplier',
    AlphaOffset: 'alphaOffset',
    // Animation.json optimised
    AN: "animation",
    AM: "alphaMultiplier",
    ASI: "atlasSpriteInstance",
    BM: "bitmap",
    C: "color",
    DU: "duration",
    E: "elements",
    FF: "firstFrame",
    FR: "frames",
    FRT: "frameRate",
    I: "index",
    IN: "instanceName",
    L: "layers",
    LN: "layerName",
    LP: "loop",
    M3D: "matrix3D",
    MD: "metadata",
    M: "mode",
    N: "name",
    POS: "position",
    S: "symbols",
    SD: "symbolDictionary",
    SI: "symbolInstance",
    SN: "symbolName",
    ST: "symbolType",
    TL: "timeline",
    TRP: "transformationPoint"
};
function normaliseKey(key) {
    return keys[key] || key;
}
function normaliseJson(data) {
    if (typeof data == "string" || typeof data == "number") return data;
    switch(typeof data){
        case "string":
            return data;
        case "number":
            return data;
        case "boolean":
            return data;
        case "object":
            if (Array.isArray(data)) return data.map(normaliseJson);
            else {
                var result = {
                };
                Object.keys(data).forEach((key)=>result[normaliseKey(key)] = normaliseJson(data[key])
                );
                return result;
            }
        case "bigint":
            throw "Not supported";
        case "function":
            throw "Not supported";
        case "symbol":
            throw "Not supported";
        case "undefined":
            throw "Not supported";
        default:
            throw "Unsupported";
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1QolB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createImage", ()=>createImage
);
const createImage = (src)=>new Promise((resolve)=>{
        const img = new Image();
        img.src = src;
        img.onload = ()=>resolve(img)
        ;
        img.onerror = ()=>{
            throw "Image did not load: " + img.src;
        };
    })
;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["aGWDx","k4j9L"], "k4j9L", "parcelRequire5443")

//# sourceMappingURL=index.321df24b.js.map
