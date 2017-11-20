class DomNodeCollection {

  constructor(htmlArgs) {
    this.htmlArgs = htmlArgs;
  }
// 
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
