let express = require("express");
let router = express.Router();
let dbConnection = require("../../util/db-helper/db_connection");


//get
router.get("/api/customer/get-ticket", (req, res, next) => {
try {
    console.log(req.query);
    let id = req.query.TicketID;
    dbConnection.query(
        `call USP_GetTicket(${id})`,
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