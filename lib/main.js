const DomNodeCollection = require('./dom_node_collection.js');

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
