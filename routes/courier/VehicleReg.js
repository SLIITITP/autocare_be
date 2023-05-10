let express = require("express");
let router = express.Router();
let dbConnection = require("./../../util/db-helper/db_connection");

/*Add an vehicle details*/

        let sqlQuery = `call USP_AddVehicle(?)`;
        dbConnection.query(
            sqlQuery,
            [VehicleDetails],
            (_error,result,fields)=>{
                if(_error) throw _error;

                console.log(result);
                res.json(result);
            }
        );
    }catch(error){
        console.error(error);
    }
});

module.exports = router;