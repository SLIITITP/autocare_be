let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

/*Add leave form data*/
router.post("/api/customer/login-request-form", (req, res, next) => {
    try{
        //req.body.AppoinmentInfo(json eke name)
        let loginInfo = req.body.loginInfo;
        
        let sqlQuery = `call USP_AddServiceManagerLogin(?)`
        dbConnection.query(
            sqlQuery,
            [loginInfo],
            (_error, result, fields) => {
                if (_error) throw _error;

                console.log(result);
                res.json(result);
            }
        );
    }catch (error) {
        console.error(error);
    }
});

module.exports = router;