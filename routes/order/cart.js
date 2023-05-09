let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

//Add to cart
router.post("/api/order/add-to-cart", (req, res, next) => {
  try {
    let productInfo = req.body.productInfo;

    let sqlQuery = `call USP_AddtoCart(?)`;
    dbConnection.query(sqlQuery, [productInfo], (_error, result, fields) => {
      if (_error) console.error(_error);

      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
  }
});

//update cart
router.put("/api/order/update-cart", (req, res, next) => {
  try {
    let CartID = req.body.CartID;
    let productInfo = req.body.productInfo;

    let sqlQuery = `call USP_UpdateCart(?,?)`;
    dbConnection.query(
      sqlQuery,
      [CartID, productInfo],
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


//Update 2
//endpoint for updating card data

router.put('/api/cart/:id', (req, res) => { 

  try { 

    const cartData = req.body; 
    const sqlQuery = 'UPDATE Cart SET Quantity = ?, Total = ? WHERE CartID = ?'; 

    dbConnection.query(sqlQuery, [cartData.Quantity, cartData.Total, req.params.id], (error, result) => { 
      if (error) throw error; 
      console.log(result); 
      res.json(result); 
    }); 
  } catch (error) { 
    console.error(error); 
  } 

}); 


//list cart

router.get("/api/order/list-cart", (req, res, next) => {
  try {
    let customerID = req.query.CustomerID;
    dbConnection.query(
      `SELECT * FROM Cart where CustomerID = ${customerID}`,
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
router.get("/api/order/get-cart-info", (req, res, next) => {
  try {
    let customerID = req.query.CustomerID;
    dbConnection.query(
      `select Crt.*, C.FirstName, P.ProdName from Cart Crt
      left join Customer C on C.AutoID = Crt.CustomerID
      left join Product P on P.ProdID = Crt.ProductID
      where Crt.CustomerID = ${customerID}`,
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
router.delete('/api/cart/:id', (req, res) => {
  try {
    const sqlQuery = 'DELETE FROM Cart WHERE CartID = ?';

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
