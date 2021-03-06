# starDOM
A lightweight DOM manipulation library that includes AJAX requests and event handling.

![Frontpage](./docs/starDOM.png)


[starDOM Live](http://www.patrick-spencer.nyc/starDOM/)

## Javascript Objects
starDOM's $s can be passed an HTML element or a CSS selector to create a Javascript object with increased functionality.
```javascript
  let $newElement = $s("<section/>")
  ```

When passed a function, starDOM will invoke said function when the DOM is fully loaded.
```javascript
  $s(() => console.log("To infinity... and beyond!"));
  ```

## Public API

### html
Get and Set innerHTML.
```javascript
//get
  $newElement.html()

//set
  $newElement.html("To infinity... and beyond!")
  ```

### append
Add child elements.
```javascript
  $newElement.append(children)
  ```

### addClass
Add a CSS class.
```javascript
  $newElement.addClass(className)
  ```

### removeClass
Remove CSS class.
```javascript
  $newElement.removeClass(className)
  ```

### attr
Get and Set attributes.
```javascript
//get
  $newElement.attr(attrName)

//set
  $newElement.attr(attrName, value)
  ```

### children
Get children.
```javascript
  $newElement.children()
  ```

### parent
Get parent.
```javascript
  $newElement.parent()
  ```

### find
Find by selector.
```javascript
  $newElement.find(selector)
  ```

### empty
Clear innerHTML.
```javascript
  $newElement.empty()
  ```

### off
Remove event listener.
```javascript
  $newElement.off("eventName", callback)
  ```

### on
Add event listener.
```javascript
  $newElement.on("eventName", callback)
  ```

### remove
Remove from DOM.
```javascript
  $newElement.remove()
  ```

## AJAX

starDOM uses XMLHttpRequests for it's ajax method.

```javascript
  $s.ajax({
      method: "GET",
      url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY",

      success: function (data) {
        console.log("To infinity... and beyond!");
      },
      error: function (data) {
        console.log("I'm sorry Dave.  I'm affraid I can't do that.");
      }
  });
 ```
