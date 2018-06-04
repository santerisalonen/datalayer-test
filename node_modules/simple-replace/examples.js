var simpleReplace = require('./');

console.log('\n-------- Example 1');
var exampleString = "Hi, my name is ${myName}";
var objectHash = {
    myName: "Thomas"
}
console.log(simpleReplace(exampleString, objectHash)); // "Hi, my name is Thomas"

console.log('\n-------- Example 2');
var exampleString = "Hi, my name is ${firstname} ${lastname}";
var objectHash = {
    firstname: "Thomas"
}
console.log(simpleReplace(exampleString, objectHash)); // "Hi, my name is Thomas ${lastname}"

console.log('\n-------- Example 3')
var exampleString = "${firstname} ${lastname} - ${kids:-0} kid(s)";
var objectHash = {
    firstname: "Thomas",
    lastname: "Fritz"
}
console.log(simpleReplace(exampleString, objectHash)); // "Thomas Fritz - 0 kid(s)"

console.log('\n-------- Example 4')
var exampleString = "${firstname} ${lastname} - ${kids:-0} kid(s)";
var objectHash = {
    firstname: "Thomas",
    lastname: "Fritz",
    kids: 11
}
console.log(simpleReplace(exampleString, objectHash)); // "Thomas Fritz - 11 kid(s)"