var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var authUserRouter = require("./routes/authentication/users");

//masters
let productCategoryRouter = require("./routes/masters/product-category");

//payroll_hr
let employeeMaster = require("./routes/payroll_hr/employeeMaster");
let employeeLeaveRequest = require("./routes/payroll_hr/employeeLeave");
let employeeAttendance = require("./routes/payroll_hr/employeeAttendance");
                                    
//stock_management
let StockReturnForm = require("./routes/stock_management/StockReturnForm");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

//authentication
app.use("/", authUserRouter);

//masters
app.use("/", productCategoryRouter);

//payroll_hr
app.use("/", employeeMaster);
app.use("/", employeeLeaveRequest);
app.use("/" , employeeAttendance);

//stock_management
app.use("/", StockReturnForm);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
