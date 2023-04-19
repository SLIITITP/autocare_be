let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add order
router.post("/api/order/add-orderdet", (req, res, next) => {
  try {
    let OrderDetails = req.body.OrderDetails;

    let sqlQuery = `call USP_AddOrder(?)`;
    dbConnection.query(
      sqlQuery,
      [OrderDetails],
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
/*
//update order
router.put("/api/order/update-cart", (req, res, next) => {
  try {
    let EmpID = req.body.EmployeeID;
    let BasicInfo = req.body.BasicInfo;

    let sqlQuery = `call USP_UpdateCart(?,?,?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [EmpID, BasicInfo],
      (_error, result, fields) => {
        if (_error) console.error(_error);

        console.log(result);
        res.json(result);
      }
    );
  } catch (error) {
    console.error(error);
  }
}); */

//list order
router.get("/api/order/list-orders", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM Order",
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

//get order by id
router.get("/api/order/get-cart", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.EmpID;
    dbConnection.query(
      `call USP_GetOrders(${id})`,
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
