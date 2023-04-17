let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

/*Add a request*/
router.post("/api/request/add-request",(req,res,next) =>{
    try{
        let RequestDetails = req.body.RequestDetails;

        let sqlQuery = `call USP_AddRequest(?)`;
        dbConnection.query(
            sqlQuery,
            [RequestDetails],
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