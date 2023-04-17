let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an request details*/
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

module.exports = router;