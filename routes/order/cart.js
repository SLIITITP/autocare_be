let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add to cart
/*router.post("/api/order/add-to-cart", (req, res, next) => {
  try {
    let BasicInfo = req.body.BasicInfo;
    let JobInfo = req.body.JobInfo;
    let LeaveInfo = req.body.LeaveInfo;
    let PayrollInfo = req.body.PayrollInfo;

    let sqlQuery = `call USP_AddtoCart(?)`;
    dbConnection.query(
      sqlQuery,
      [BasicInfo, JobInfo, LeaveInfo, PayrollInfo],
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

//update cart
router.put("/api/order/update-cart", (req, res, next) => {
  try {
    let EmpID = req.body.EmployeeID;
    let BasicInfo = req.body.BasicInfo;
    let JobInfo = req.body.JobInfo;
    let LeaveInfo = req.body.LeaveInfo;
    let PayrollInfo = req.body.PayrollInfo;

    let sqlQuery = `call USP_UpdateCart(?)`;
    dbConnection.query(
      sqlQuery,
      [EmpID, BasicInfo, JobInfo, LeaveInfo, PayrollInfo],
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

//list cart

router.get("/api/order/list-cart", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM Cart",
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


//get cart by id
router.get("/api/order/get-cart", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.EmpID;
    dbConnection.query(
      `select ProdID, ProdName, Price, ProdCatID  from Product  limit 1;`,
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
