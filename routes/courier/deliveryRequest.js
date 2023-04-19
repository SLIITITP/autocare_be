let express = require('express')
let router = express.Router()
let dbConnection = require('../../util/db-helper/db_connection')

/*Add a request*/

router.post("/api/deliveryrequest/add-deliveryrequest", (req, res, next) => {
  try {
    let RequestDetails = req.body.RequestDetails
    console.log(RequestDetails)
    let sqlQuery = `call USP_AddRequest(?)`
    dbConnection.query(sqlQuery, [RequestDetails], (_error, result, fields) => {
      if (_error) throw _error

      console.log(result)
      res.json(result)
    })
  } catch (error) {
    console.error(error)
  }
})

//list request
router.get("/api/deliveryrequest/list-deliveryrequest", (req, res, next) => {
  try {
    dbConnection.query(
      'SELECT * FROM DeliveryRequest',
      (_error, result, fields) => {
        if (_error) console.error(_error)

        console.log(result)
        res.json(result)
      }
    )
  } catch (error) {
    console.error(error)
  }
})

//get request by id
router.get("/api/deliveryrequest/get-deliveryrequest", (req, res, next) => {
  try {
    console.log(req.query)
    let id = req.query.RequestID
    dbConnection.query(
      `call USP_GetRequest(${id})`,
      (_error, result, fields) => {
        if (_error) console.error(_error)

        console.log(result)
        res.json(result)
      }
    )
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
