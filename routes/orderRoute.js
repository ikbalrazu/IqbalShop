const express = require('express');
const router = express.Router();
const {newOrder} = require("../controllers/orderContoller");

router.route("/order/new").post(newOrder);

module.exports = router;