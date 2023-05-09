let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");
let SendEmail = require("./../../util/notifications/email_util");
const nodemailer = require("nodemailer");

/*Add Stock Orders*/
router.post("/api/stockOrder/add-stockOrder", (req, res, next) => {
  try {
    let  PurchaseOrderInfo = req.body.PurchaseOrderInfo ;
   

    let sqlQuery = `call USP_AddStockOrders(?)`;
    dbConnection.query(
      sqlQuery,
      [PurchaseOrderInfo],
      (_error, result, fields) => {
        if (_error) throw _error;

        console.log(result);

        //sending email
try {
  let _stockOrderID = req.body.OrderID;
  let _receiverEmail = req.body.Supplier;
  // retrieve email from database
  let emailQuery = `SELECT Supplier FROM StockPurchaseOrder WHERE OrderID = ?`;
  dbConnection.query(
    emailQuery,
    [_stockOrderID],
    (error, emailResult, fields) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(emailResult);

      //set & pass necessary info as like line 161 and pass it to the function line 169
      let emailObject = {
        
        receiverEmail:'carmart0012@gmail.com',
        emailSubject: "Order Stock Request for ID ${OrderID}",
        emailTextBody: "Requesting place an stock order request for ID ${OrderID}.",
        emailHtmlBody: `<h1>Order Stock</h1>
        <p>Dear Supplier, <br><br>We are requesting to place a stock order for ID ${PurchaseOrderInfo}.
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
  } catch (error) {
    console.error(error);
  }
});

//update an order details
router.put("/api/stockOrder/update-stockOrder", (req, res, next) => {
  try {
    let OrderID = req.body.OrderID;
    let  PurchaseOrderInfo = req.body. PurchaseOrderInfo;
  
    let sqlQuery = `call USP_UpdateStockOrders(?,?)`;
    dbConnection.query(
      sqlQuery,
      [OrderID, PurchaseOrderInfo],
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

//list purchase order stock
router.get("/api/stockOrder/list-stockOrder", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT *,Quantity * UnitPrice AS TotalAmount FROM StockPurchaseOrder",
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

//get purchase order stock by id
router.get("/api/stockOrder/get-stockOrder", (req, res, next) => {
try {
  console.log(req.query);
  let id = req.query.PurchaseID;
  dbConnection.query(
    `call USP_GetStockPurchaseDetails(${id})`,
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