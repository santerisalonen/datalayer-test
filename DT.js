const chalk = require('chalk');
const figures = require('figures');
const replace = require('simple-replace');
const validator = new (require('jsonschema')).Validator();

const defaultSchema = require("./schema/default.js");

for(var key in defaultSchema){
  validator.addSchema(defaultSchema[key], key);  
}

const path = require('path');

function _getCallerFile() {
  try {
    let err = new Error();
    let callerfile;
    let currentfile;
    Error.prepareStackTrace = function (err, stack) { return stack; };
    currentfile = err.stack.shift().getFileName();
    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();
      if(currentfile !== callerfile) return path.basename(callerfile);
    }
  } catch (err) {}
  return undefined;
}

var pad = function(str){
  return '   ' + str;
}

const stats = {};

class DT {
  constructor(name){
    this.file = _getCallerFile()
    stats[this.file] = stats[this.file] || {};
    stats[this.file] = stats[this.file] || {};
    stats[this.file][name] = stats[this.file][name] || {pass:[],fail:[]};
    
    console.log("\n" + pad( chalk.underline(this.file + ': ' + name)));
    
    this.output = stats[this.file][name];
  }
  static printStats(){
    console.log(stats);
  }
  static addSchema(schema){
    for(var key in schema){
      validator.addSchema(schema[key], key);  
    }
  }

  static test(name, callback){
    let dt = new DT(name);
    try {
      callback(dt);
    }
    catch(e){
      dt.fail(e.message, e);
    }
  } 
  static fail(test, name, reason) {
    (new DT(test)).fail(name, reason);

  }

  ok(value, msg) {   
    let ok = (value) ? true : false;
    if( typeof value === 'object') {
      if( value.constructor.name === 'Array' || value.constructor.name === 'Object' ){
        ok = (Object.keys(value).length > 0 ) ? true : false; 
      }     
    }
    if(ok) return this.pass(msg);
    else return this.fail(msg);
  }
  equal(actual, expected, msg){
    let ok = (actual == expected) ? true : false;
    if(ok) return this.pass(msg);
    else {
      let reason = 'expected: ' + expected + ', actual: ' + actual + '';
      return this.fail(msg, reason);
    }
  }
  validate(object, schema, msg){

    // jsonschema passes undefined for any schema, change that to text undefined
    if(typeof object === 'undefined') object = "undefined";
    
    let testSchema = validator.validate(object, schema);
    
    if(!testSchema.valid){
      let errMsg = testSchema.errors.map(function(e) { return e.stack; }).join(', ');
      return this.fail(msg, errMsg);
    }
    else {
      return this.pass(msg);
    }
    
  }
  fail(msg, reason){
    console.log( pad( chalk.red(figures.cross) + ' ' + msg));
    if(reason) console.log( pad( 'reason: ' + reason ));
    
    this.output.fail.push({
      name : msg,
      reason : reason
    });
    return false;
  }
  pass(msg){
    console.log( pad( chalk.green(figures.tick) + ' ' + msg));
    this.output.pass.push({
      name : msg
    });
    return true;
  }
}

module.exports = DT;