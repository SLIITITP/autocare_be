let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");
let SendEmail = require("./../../util/notifications/email_util");
const nodemailer = require("nodemailer");

//Add card pay
router.post("/api/order/cardpay", (req, res, next) => {
    try {
      let cardPayDet = req.body.cardPayDet;
  
      let sqlQuery = `call USP_AddCardPay(?)`;
      
    dbConnection.query(
      sqlQuery,
      [cardPayDet],
      (_error, result, fields) => {
        if (_error) throw _error;

        console.log(result);

//sending email
    try {
      let _payID = req.body.PayID;
      let _receiverEmail = req.body.Supplier;
    // retrieve email from database
      let emailQuery = `SELECT UserName FROM SystemUsers WHERE SysManagerID = 1`;
      dbConnection.query(
        emailQuery,
        [_payID],
        (error, emailResult, fields) => {
          if (error) {
            console.error(error);
          return;
          }

      console.log(emailResult);

      //set & pass necessary info as like line 161 and pass it to the function line 169
      let emailObject = {
        
        receiverEmail:'autocaread009@gmail.com',
        emailSubject: "Payment completion for ID ${PayID}",
        emailTextBody: "Card payment completion for ID ${PayID}.",
        emailHtmlBody: `<h1>Card Payment</h1>
        <p>Dear administrator, <br><br>Card Payment for ID ${cardPayDet} has been done successfully.
          <br><br>Thanks & Regards,<br><b>AutoCare Pvt. Ltd.</b></p>`,
      };
      SendEmail(emailObject);
    }
  );
} catch (error) {
  console.error(error);
}


        res.json(result);
      }
    );
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
