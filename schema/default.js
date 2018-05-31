module.exports = {
  "/EE_ProductImpression" : {
    type: "object",
    properties : {
      ecommerce : {
        required : true,
        type : "object",
        properties : {
          impressions : {
            required : true,
            type : "array",
            items : {
              "$ref": "/EE_Product",
            }
          }
        }
      }
    }
  },
  "/EE_ProductDetail": {
    type: "object",
    properties : {
      ecommerce : {
        required : true,
        type : "object",
        properties : {
          detail : {
            required : true,
            type : "object",
            properties : {
              products : { 
                required: true,
                type : "array",
                minItems : 1,
                maxItems : 1,
                items : {
                  "$ref": "/EE_Product",
                }
              }         
            }
          }
        }
      }
    }
  },
  "/EE_AddToCart": {
    type: "object",
    properties : {
      ecommerce : {
        required : true,
        type : "object",
        properties : {
          add : {
            required : true,
            type : "object",
            properties : {
              actionField : {
                type : "object",
                required : true,
                properties : {
                  list : {
                    type : "string"
                  }
                }
              },
              products : { 
                required: true,
                type : "array",
                minItems : 1,
                maxItems : 1,
                items : {
                  "$ref": "/EE_Product",
                }
              }         
            }
          }
        }
      }
    }
  },
  "/EE_Checkout": {
    type: "object",
    properties : {
      ecommerce : {
        required : true,
        type : "object",
        properties : {
          checkout : {
            required : true,
            type : "object",
            properties : {
              actionField : {
                type : "object",
                properties : {
                  step : {
                    type : "number"
                  },
                  option : {
                    type : "string"
                  }
                }
              },
              products : { 
                required: true,
                type : "array",
                minItems : 1,
                maxItems : 1,
                items : {
                  "$ref": "/EE_Product",
                }
              }         
            }
          }
        }
      }
    }
  },
  "/EE_Product" : {
    id : "/EE_Product",
    type : "object",
    properties : {
      id : { type : ["string", "number"], required:true},
      name : { type : "string", required:true},
      brand : { type : "string", required:true},
      price : { type : ["string", "number"], required:true },
      category : { type: "string", required:true},
    }
  } 
};
