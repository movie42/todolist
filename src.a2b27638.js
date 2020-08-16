// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var date = document.querySelector(".date");
var userForm = document.querySelector(".userForm");
var userName = userForm.querySelector(".userName");
var todoForm = document.querySelector(".todoForm");
var input = todoForm.querySelector(".todoName");
var todoList = document.querySelector(".todoList");
var greeting = document.querySelector(".greetingUser");
var weather = document.querySelector(".weather");
var todoKey = "TODO_LIST";
var USER_NAME = "users";
var COORDS = "coords";
var API_KEY = "d0b507ffc26b0ba87bc5af7c9d1fb0e5";
var todoSaveList = [];
var imgObj = {
  img1: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  img2: "https://images.unsplash.com/photo-1587997573803-5df279e30716?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1763&q=80",
  img3: "https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80",
  img4: "https://images.unsplash.com/photo-1588618670195-620f6dde8368?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80",
  img5: "https://images.unsplash.com/photo-1526035266069-fc237c5baddd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"
};

function randomBackGround(value) {
  var keys = Object.keys(value);
  return value[keys[keys.length * Math.random() << 0]];
}

function changeBackgroundImage() {
  var app = document.getElementById("app");
  app.style.backgroundImage = "url(".concat(randomBackGround(imgObj), ")");
}

function randomNumber() {
  var number = Math.floor(Math.random() * 10000000000);
  return number;
}

function getDate() {
  var today = new Date();
  var hour = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var untilHour = 24 - hour;
  var untilMinutes = 60 - minutes;
  var untilSeconds = 60 - seconds;
  date.innerText = "".concat(untilHour > 10 ? untilHour : "0".concat(untilMinutes), "\uC2DC\uAC04 ").concat(untilMinutes > 10 ? untilMinutes : "0".concat(untilHour), "\uBD84 ").concat(untilSeconds > 10 ? untilSeconds : "0".concat(untilSeconds), "\uCD08");
}

function saveToDoList() {
  localStorage.setItem(todoKey, JSON.stringify(todoSaveList));
}

function delTodoList(event) {
  var nodeTarget = event.target;
  var li = nodeTarget.parentNode;
  todoList.removeChild(li);
  var clean = todoSaveList.filter(function (value) {
    return value.id !== +li.id;
  });
  todoSaveList = clean;
  saveToDoList();
}

function writeToDoList(value) {
  var li = document.createElement("li");
  var delBtn = document.createElement("button");
  var span = document.createElement("span");
  var id = randomNumber();
  span.innerText = value;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delTodoList);
  li.id = id;
  li.appendChild(span);
  li.appendChild(delBtn);
  todoList.appendChild(li);
  var todoObj = {
    text: value,
    id: id
  };
  todoSaveList.push(todoObj);
  saveToDoList();
}

function handleSubmit(event) {
  event.preventDefault();
  var toDoValue = input.value;
  writeToDoList(toDoValue);
  input.value = "";
}

function getLocalStorageItem() {
  var localItem = localStorage.getItem(todoKey);

  if (localItem !== null) {
    var parsedTodo = JSON.parse(localItem);
    parsedTodo.forEach(function (value) {
      return writeToDoList(value.text);
    });
  }
}

function resetUserName(event) {
  var button = event.target;
  button.remove();
  userForm.classList.add("showing");
  todoForm.classList.remove("showing");
  localStorage.clear(USER_NAME);
  greeting.innerText = "몇시간이나 남았죠?";
}

function paintUserName() {
  var getUserName = localStorage.getItem(USER_NAME);

  if (getUserName !== null) {
    userForm.classList.remove("showing");
    todoForm.classList.add("showing");
    greeting.innerText = "".concat(getUserName, "\uB2D8, \uB108\uBB34 \uC870\uAE09\uD574\uD558\uC9C0 \uB9C8\uC138\uC694 \u314E\u314E");
    var button = document.createElement("button");
    button.className = "rewrite_btn";
    button.innerText = "".concat(getUserName, "\uB2D8\uC774 \uC544\uB2C8\uC2E0\uAC00\uC694?");
    button.addEventListener("click", resetUserName);
    greeting.after(button);
  }
}

function getUserName(event) {
  event.preventDefault();
  var userText = userName.value;
  localStorage.setItem(USER_NAME, userText);
  paintUserName();
}

function getWeather(lat, lng) {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lng, "&appid=").concat(API_KEY, "&units=metric")).then(function (json) {
    return json.json();
  }).then(function (json) {
    var temperatur = json.main.temp;
    weather.innerText = "\uC624\uB298\uC758 \uAE30\uC628\uC740 ".concat(temperatur > 30 ? "".concat(temperatur, "\uB3C4\uB85C \uC874\uB098 \uB365\uC2B5\uB2C8\uB2E4.") : temperatur, "\uC785\uB2C8\uB2E4.");
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log(latitude);
  var coordsObj = {
    latitude: latitude,
    longitude: longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("I CAN NOT");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  var loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    var parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  setInterval(getDate, 1000);
  userForm.addEventListener("submit", getUserName);
  todoForm.addEventListener("submit", handleSubmit);
  getLocalStorageItem();
  paintUserName();
  changeBackgroundImage();
  loadCoords();
}

init();
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55817" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map