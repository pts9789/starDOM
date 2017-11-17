/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

const docReadyCallbacks = [];

function $s(arg) {
  if (typeof arg === "function") {
    if (document.readyState === "complete") {
      arg();
    } else {
      docReadyCallbacks.push(arg);
    }
  }

  if (arg instanceof HTMLElement) {
    return new DomNodeCollection([arg]);
  } else if (arg instanceof NodeList){
    return new DomNodeCollection(arg);
  } else if (arg instanceof Array){
    return new DomNodeCollection(arg);
  } else {
    const docArr = document.querySelectorAll(arg);
    console.log(docArr);
    return new DomNodeCollection(docArr);
  }
}

$s.extend = (base, ...otherArgs) => {
  let keys;
  otherArgs.forEach((arg) => {
    keys = Object.keys(arg);
    keys.forEach((key) => {
      base[key] = arg[key];
    });
  });
  return base;
};


$s.ajax = (options) => {

  const request = new XMLHttpRequest();
  const defaults = {
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $s.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    options.url += `${toQueryString(options.data)}`;
  }

  request.open(options.method, options.url, true);
  request.onload = (e) => {
    if (request.status === 200) {
      options.success(JSON.parse(request.response));
    } else {
      options.error(JSON.parse(request.response));
    }
  };

  request.send(JSON.stringify(options.data));
};

toQueryString = (obj) => {
  let result = "";
  Object.keys(obj).forEach((key) => {
    result += `?${key}=${obj[key]}&`;
  });
  return result.substring(0, result.length - 1);
};

window.DomNodeCollection = DomNodeCollection;

window.$s = $s;

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < docReadyCallbacks.length; i++) {
    docReadyCallbacks[i]();
  }
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {

  constructor(htmlArgs) {
    this.htmlArgs = htmlArgs;
  }

  html(string){

    if (string) {
      this.htmlArgs.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.htmlArgs[0].innerHTML;
    }
  }

  empty(){
    this.htmlArgs.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(arg){
    if (arg instanceof HTMLElement) {
      this.htmlArgs.forEach((el) => {
        el.innerHTML = arg.outerHTML;
      });
    } else if (arg instanceof DomNodeCollection) {
      this.htmlArgs.forEach((el) => {
        el.innerHTML = arg.htmlArgs[0].outerHTML;
      });
    } else if (typeof arg === "string") {
        this.htmlArgs.forEach((el) => {
          el.innerHTML = arg;
        });
      }
    }

  addClass(value) {
    this.htmlArgs.forEach ((el) => {
      el.classList.add(value);
    });
  }

  removeClass(className) {
    this.htmlArgs.forEach ((el) => {
      let elClasses = el.className.split(" ");
      let remCLasses = className.split(" ");

      elClasses.forEach ((cl, idx) => {
        if (remCLasses.include(cl)) {
          elClasses[idx] = "";
        }
      });
      elClasses.join(" ");
      el.className = elClasses;
    });
  }

  attr(attrName, value) {
    this.htmlArgs.forEach ((el) => {
      el[attrName] = value;
    });
  }

  children(){
    let kids = [];
    this.htmlArgs.forEach ((el) => {
      kids = kids.concat(el.children);
    });
    return $s(kids);
  }

  parent(){
    let parent = [];
    this.htmlArgs.forEach ((el) => {
      parent = parent.concat(el.parentNode);
    });
    return $s(parent);
  }

  find(selector){
    let kids = this.children();
    let selected = [];

    for (let i = 0; i < kids.htmlArgs[0].length; i++) {
      if (kids.htmlArgs[0][i].localName === selector) {
        selected.push(kids.htmlArgs[0][i]);
      }
    }
    return $s(selected);
  }

  remove() {
    this.htmlArgs.forEach ((el) => {
      el.parentNode.removeChild(el);
    });
    this.htmlArgs = [];
  }

  on(type, callback) {
    for (let i = 0; i < this.htmlArgs.length; i++) {
      this.htmlArgs[i].addEventListener(type, callback);
    }
  }

  off(type, callback) {
    for (let i = 0; i < htmlArgs.length; i++) {
      htmlArgs[i].removeEventListener(type, callback);
    }
  }

}

module.exports = DomNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=starDOM.js.map