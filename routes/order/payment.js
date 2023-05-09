let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add card pay
router.post("/api/order/cardpay", (req, res, next) => {
    try {
      let cardPayDet = req.body.cardPayDet;
  
      let sqlQuery = `call USP_AddCardPay(?)`;
      dbConnection.query(sqlQuery, [cardPayDet], (_error, result, fields) => {
        if (_error) throw _error;
  
        console.log(result);
        res.json(result);
      });
    } catch (error) {
      console.error(error);
    }
  }); 


//list card pay
router.get('/api/paydet', (req, res) => { 

    try { 
      const sqlQuery = 'SELECT * FROM CardPayment'; 

      dbConnection.query(sqlQuery, (error, result) => { 
        if (error) throw error; 
        console.log(result); 
        res.json(result); 
      }); 
    } catch (error) { 
      console.error(error); 
    } 

}); 

module.exports = router;
