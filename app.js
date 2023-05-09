var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var authUserRouter = require("./routes/authentication/users");

//courier
let deliveryRequest = require("./routes/courier/deliveryRequest");
let CourierRegistration = require("./routes/courier/CourierRegistration");
let VehicleReg = require("./routes/courier/VehicleReg");

//masters
let productCategoryRouter = require("./routes/masters/product-category");

//payroll_hr
let employeeMaster = require("./routes/payroll_hr/employeeMaster");
let employeeLeaveRequest = require("./routes/payroll_hr/employeeLeave");
let employeeAttendance = require("./routes/payroll_hr/employeeAttendance");
let employeePayroll = require("./routes/payroll_hr/employeePayroll");

//stock_management
let StockReturnForm = require("./routes/stock_management/StockReturnForm");
let StockReceiveForm = require("./routes/stock_management/StockReceiveForm");
let InventoryLogin = require("./routes/stock_management/InventoryLogin");
let purchaseOrderForm = require("./routes/stock_management/purchaseOrderForm");

//order
let orderForm = require("./routes/order/orders");
let cartItems = require("./routes/order/cart");
let returnProd = require("./routes/order/return");

//appointment_scheduling
let schedulingAppointment = require("./routes/scheduling/Scheduling_appointment");
let confirmAppointment = require("./routes/scheduling/Confirm_appointment");
let ServiceManagerLogin = require("./routes/scheduling/Login");
let VehicleServiceAppointment = require("./routes/scheduling/Service");
let carwashAppointment = require("./routes/scheduling/carwash");
let serviceApointment = require("./routes/scheduling/Details");
//ticket
let RaiseTicket = require("./routes/customer_care/raiseTicket");
let TrackTicket = require("./routes/customer_care/trackTicket");
let MyTicket = require("./routes/customer_care/myTicket");

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

//courier
app.use("/", deliveryRequest);
app.use("/", CourierRegistration);
app.use("/", VehicleReg);

//masters
app.use("/", productCategoryRouter);

//payroll_hr
app.use("/", employeeMaster);
app.use("/", employeeLeaveRequest);
app.use("/", employeeAttendance);
app.use("/", employeePayroll);

//stock_management
app.use("/", StockReturnForm);
app.use("/", StockReceiveForm);
app.use("/", InventoryLogin);
app.use("/", purchaseOrderForm);

//order
app.use("/", orderForm);
app.use("/", cartItems);
app.use("/", returnProd);

//scheduling_appointment
app.use("/", schedulingAppointment);
app.use("/", confirmAppointment);
app.use("/", ServiceManagerLogin);
app.use("/", VehicleServiceAppointment);
app.use("/", carwashAppointment);
app.use("/",serviceApointment)
// customer_care
app.use("/", RaiseTicket);
app.use("/", TrackTicket);
app.use("/", MyTicket);

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
