# Description

Datalayer test is a simple Node.js libary written to test web application dataLayers.

You should use it together with some headless browser like https://github.com/prismagraphql/chromeless



# Install

```
npm install datalayer-test
```


# Simple usage


```javascript

const DT = require('datalayer-test');


// add custom validation schema
let myschema = {
  "/mypageview": {
    type : "object",
    properties : {
      pageType : { type:"string"}
    }
  }
}
DT.addSchema(myschema);
let dataLayer = [
  {
    event : "EE_impression",
    ecommerce : {
      impressions : [{
        id: "12345",
        name: "product name",
        brand: "product brand",
        price: 23.33,
        category: "path/to/cat",
        list: "home"
      }]
    }
  },
  {
    event : "mypageview",
    pageType : "blogpost"
  }
];

DT.test('mytest', function(t){
  t.ok(dataLayer, 'dataLayer found');
  
  let event = dataLayer.filter(function(e){ return e.event === 'EE_impression'; });
   
  t.validate(event[0], "/EE_ProductImpression", "impression is valid");

  let event = dataLayer.filter(function(e){ return e.event === 'mypageview'; });
  
  t.validate(event[0], "mypageview", "pageview is valid");
  
});


 