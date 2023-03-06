let mysql = require('mysql')

const dbConnection = mysql.createConnection({
    connectionLimit : 10, //important
    host: "vehicleservice-db.cp0iihjfbf4i.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Admin1234",
    database: "db_vehicle_service",
})

module.exports = dbConnection