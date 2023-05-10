var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let dbConnection = require('./../../util/db-helper/db_connection');

//get all
router.get('/api/master/list-servicepackage', async (req, res, next) => {
    dbConnection.query("SELECT * FROM ServicePackage where IsActive = 1",
        (_error, result, fields) => {
            if (_error)
                throw _error;

            console.log(result);
            res.json(result);
        });
});

router.get("/api/product/get-servicepackage'", (req, res, next) => {
    try {
      console.log(req.query);
      let id = req.query.ProdID;
      dbConnection.query(
        `USP_GetPackages()`, 
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

//get single
router.get('/api/master/get-servicepackage', async (req, res, next) => {
    console.log(req.query.AutoID)
    let autoId = req.query.AutoID;
    dbConnection.query(`SELECT * FROM ServicePackage where AutoID = ` + autoId + ` and  IsActive = 1`,
        (_error, result, fields) => {
            if (_error)
                throw _error;

            console.log(result);
            res.json(result);
        });
})

module.exports = router;