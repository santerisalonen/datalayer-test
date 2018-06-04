Simple Replace
==============

'Simple Replace' is a module for node.
It exports a single function which takes a string, a object hash and replaces every matching placeholder with the value from the object hash. After replacing it returns the new string.
It uses a "bash-like" variable syntax for its placeholders. At the moment it understands the ':-' bash substituation only. For a better explanation take a look at the examples underneath.

```javascript
/**
* @param {string} text         - A Text with placeholders in it you want to replace
* @param {object} objectHaash  - A Hash object.
*/
function simpleReplace(text, objectHash);

```

Usage
=====

Example 1:

```javascript
var simpleReplace = require('simpleReplace');
var exampleString = "Hi, my name is ${myName}";
var objectHash = {
    myName: "Thomas"
}
console.log(simpleReplace(exampleString, objectHash)); // "Hi, my name is Thomas"
```


Example 2:
```javascript
var simpleReplace = require('simpleReplace');
var exampleString = "Hi, my name is ${firstname} ${lastname}";
var objectHash = {
    firstname: "Thomas"
}
console.log(simpleReplace(exampleString, objectHash)); // "Hi, my name is Thomas ${lastname}"
```

Example 3:
```javascript
var simpleReplace = require('simpleReplace');
var exampleString = "${firstname} ${lastname} - ${kids:-0} kid(s)";
var objectHash = {
    firstname: "Thomas",
    lastname: "Fritz"
}
console.log(simpleReplace(exampleString, objectHash)); // "Thomas Fritz - 0 kid(s)"
```


Example 4:
```javascript
var simpleReplace = require('simpleReplace');
var exampleString = "${firstname} ${lastname} - ${kids:-0} kid(s)";
var objectHash = {
    firstname: "Thomas",
    lastname: "Fritz",
    kids: 11
}
console.log(simpleReplace(exampleString, objectHash)); // "Thomas Fritz - 11 kid(s)"
```



LICENSE
=======

The MIT License

Copyright (c) 2012 Thomas Fritz

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
