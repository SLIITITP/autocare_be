let express = require('express')
let router = express.Router()
let dbConnection = require('../../util/db-helper/db_connection')

/*Add a request*/
router.post('/api/register/add-register', (req, res, next) => {
  try {
    let CourierDetails = req.body.CourierDetails;

    let sqlQuery = `call USP_AddCourier(?)`
    dbConnection.query(sqlQuery, [CourierDetails], (_error, result, fields) => {
      if (_error) throw _error

      console.log(result)
      res.json(result)
    })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
