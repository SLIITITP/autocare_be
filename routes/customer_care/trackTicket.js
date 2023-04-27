let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

//update ticket status
router.put("/api/employee/track-ticket-status", (req, res, next) => {
    try{
        let TicketInfo = req.body.TicketInfo;

        let sqlQuery = `call USP_UpdateTicket(?)`;
        dbConnection.query(
            sqlQuery,
            (_error, result, feilds) => {
                if (_error) console.error(_error);

                console.log(result);
                res.json(result);
            }
        );
    }catch (error) {
        console.error(error);
    }
});

module.exports = router;