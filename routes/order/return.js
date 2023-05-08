let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add return product
router.post("/api/order/add-return-prod", (req, res, next) => {
  try {
    let ReturnProdDetails = req.body.ReturnProdDetails;

    let sqlQuery = `call USP_AddReturnProd(?)`;
    dbConnection.query(
      sqlQuery,
      [ReturnProdDetails],
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

//update return product
router.put("/api/order/update-return-prod", (req, res, next) => {
  try {
    let ReturnProdID = req.body.ReturnProdID;
    let ReturnProdDetails = req.body.ReturnProdDetails;

    let sqlQuery = `call USP_UpdateReturnProd(?,?)`;
    dbConnection.query(
      sqlQuery,
      [ReturnProdID, ReturnProdDetails],
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

//list return product
router.get("/api/order/list-return-prod", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM Return_Product",
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

//get return product by id
router.get("/api/order/get-return-prod", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.ReturnID;
    dbConnection.query(
      `call USP_GetReturnProdDet(${id})`,
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


//endpoint for deleting data
router.delete('/api/return/:id', (req, res) => {
  try {
    const sqlQuery = 'DELETE FROM Return_Product WHERE ReturnProdID = ?';

    dbConnection.query(sqlQuery, [req.params.id], (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
