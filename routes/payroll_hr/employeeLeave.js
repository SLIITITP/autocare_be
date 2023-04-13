let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add leave form data*/
router.post("/api/employee/leave-request-form", (req, res, next) => {
    try{
        let LeaveInfo = req.body.LeaveInfo;

        let sqlQuery = `call USP_AddEmpLeave(?)`;
        dbConnection.query(
            sqlQuery,
            [LeaveInfo],
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