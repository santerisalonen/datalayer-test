const DT = require('../DT');

DT.test('noname', function(t){
  
  
  t.validate('dasd', "EE_Purchase", "this fails");
  
  let p = {
    ecommerce : {
      purchase : {
        actionField : {
          id : 1,
          revenue : 44.44,
          coupon : "TIGGAR"
        },
        products : [
          {
            id : "123",
            name : "123 product name",
            brand : "adidas",
            price : 23.33,
            category : "kids/widgets",
          }
        ]   
      }
     
    }
  };
  
  
  
  t.validate(p, "EE_Purchase", "This passes");
  
  
});