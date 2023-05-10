let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add a Product*/
router.post("/api/product/add-product", (req, res, next) => {
  try {
    let ProdBasicInfo = req.body.ProdBasicInfo;
    let ProdSubCatInfo = req.body.ProdSubCatInfo;
    let ProdCatInfo = req.body.ProdCatInfo;

    let sqlQuery = `call USP_AddProduct(?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [ProdBasicInfo, ProdSubCatInfo, ProdCatInfo],
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

//update a product
router.put("/api/product/update-product", (req, res, next) => {
  try {
    let ProdID = req.body.ProdID;
    let ProdBasicInfo = req.body.ProdBasicInfo;
    let ProdSubCatInfo = req.body.ProdSubCatInfo;
    let ProdCatInfo = req.body.ProdCatInfo;

    let sqlQuery = `call USP_UpdateProduct(?,?,?,?,?)`;
    dbConnection.query(
      sqlQuery,
      [ProdID, ProdBasicInfo, ProdSubCatInfo, ProdCatInfo],
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

//list product
router.get("/api/product/list-product", (req, res, next) => {
  try {
    dbConnection.query(
      "SELECT * FROM Product", 
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

//get products
router.get("/api/product/get-all-products", (req, res, next) => {
  try {
    dbConnection.query("SELECT ProdID, ProdName, Price, OnHandQty, Description, ImageFileName FROM Product", (_error, result, fields) => {
      if (_error) console.error(_error);

      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

//get product by id
router.get("/api/product/get-product", (req, res, next) => {
  try {
    console.log(req.query);
    let id = req.query.ProdID;
    dbConnection.query(
      `call USP_GetProductInfo(${id})`, 
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
