const express = require("express");
const router = express.Router();
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionController");

router.post("/addTransaction", addTransaction);
router.post("/editTransaction", editTransaction);
router.post("/deleteTransaction", deleteTransaction);
router.post("/showTransaction", getAllTransaction);


module.exports = router;