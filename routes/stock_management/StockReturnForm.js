let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");
let SendEmail = require("./../../util/notifications/email_util");
const nodemailer = require("nodemailer");

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

//sending email
try {
  let _stockReturnID = req.body.StockReturnID;
  let _receiverEmail = req.body.Email;
  // retrieve email from database
  let emailQuery = `SELECT Email FROM StockReturnDetails WHERE StockReturnID = ?`;
  dbConnection.query(
    emailQuery,
    [_stockReturnID],
    (error, emailResult, fields) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(emailResult);

      //set & pass necessary info as like line 161 and pass it to the function line 169
      let emailObject = {
        
        receiverEmail:'carmart0012@gmail.com',
        emailSubject: "Return Stock Request for ID ${StockReturnID}",
        emailTextBody: "Requesting to Return Stock for ID ${StockReturnID}",
        emailHtmlBody: `<h1>Return Stock Request</h1>
        <p>Dear Supplier, <br><br> we are requesting to return the stock which contains ${ReturnDetails}.
          <br><br>Thanks & Regards,<br><b>AutoCare Inventory Management Team</b></p>`,
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