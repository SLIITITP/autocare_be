var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let dbConnection = require('./../../util/db-helper/db_connection');

//get all
router.get('/api/master/list-product-category', async (req, res, next) => {
    dbConnection.query("SELECT * FROM ProductCategory where IsActive = 1",
        (_error, result, fields) => {
            if (_error)
                throw _error;

            console.log(result);
            res.json(result);
        });
});

//get single
router.get('/api/master/get-product-category', async (req, res, next) => {
    console.log(req.query.AutoID)
    let autoId = req.query.AutoID;
    dbConnection.query(`SELECT * FROM ProductCategory where AutoID = ` + autoId + ` and  IsActive = 1`,
        (_error, result, fields) => {
            if (_error)
                throw _error;

            console.log(result);
            res.json(result);
        });
})

module.exports = router;