let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");

//update ticket status
router.put("/api/employee/track-ticket-status", (req, res, next) => {
    try{
        let _TicketID = req.body.TicketID;
        let _statusValue = req.body.Status;

        let sqlQuery = `call USP_UpdateTicket(?)`;
        dbConnection.query(
            sqlQuery,
            [_TicketID, _statusValue],
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