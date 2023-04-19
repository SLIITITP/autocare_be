var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let dbConnection = require('./../../util/db-helper/db_connection');

//get all
router.get('/api/customer/upade-appointment', async (req, res, next) => {
    dbConnection.query("SELECT * FROM SchedulingAppointment",
        (_error, result, fields) => {
            if (_error)
                throw _error;

            console.log(result);
            res.json(result);
        });
});

module.exports = router;