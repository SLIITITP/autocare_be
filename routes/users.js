var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/user/getuser', function (req, res, next) {
  let object = { userId: 1001, userName: 'Shamith', identifier: '392212FF-E332-SS1' }
  res.json(object)
});

module.exports = router;
