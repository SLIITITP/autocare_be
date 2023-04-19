let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an return stock details*/
router.post("/api/returnStock/add-returnStock",(req,res,next) =>{
    try{
        let ReturnDetails = req.body.ReturnDetails;

        let sqlQuery = `call USP_AddReturnStock(?)`;
        dbConnection.query(
            sqlQuery,
            [ReturnDetails],
            (_error,result,fields)=>{
                if(_error) throw _error;

                console.log(result);
                res.json(result);
            }
        );
    }catch(error){
        console.error(error);
    }
});

//update return stock
router.put("/api/returnStock/update-returnStock", (req, res, next) => {
  try {

    let StockReturnID= req.body.StockReturnID;
    let ReturnDetails  = req.body.ReturnDetails ;
   
    let sqlQuery = `call USP_UpdateReturnStock(?,?)`;

    dbConnection.query(
      sqlQuery,
      [StockReturnID, ReturnDetails],
      (_error, result, fields) => {
        if (_error) console.error(_error);

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});


//list returned stock
router.get("/api/returnStock/list-returnStock", (req, res, next) => {
    try {
      dbConnection.query(
        "SELECT * FROM StockReturnDetails",
        (_error, result, fields) => {
          if (_error) console.error(_error);
  
          console.log(result);
          res.json(result);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

 //get return stock by id
router.get("/api/returnStock/get-returnStock", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.ReturnID;
    dbConnection.query(
      `call USP_GetStockReturnDetails(${id})`,
      (_error, result, fields) => {
        if (_error) console.error(_error);

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;