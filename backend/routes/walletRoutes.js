const express = require('express');
const router = express.Router();
const {
    getWalletBalance,
    depositMoney,
    withdrawMoney,
    getTransactionHistory,
    deleteTransactionById,
    getTransactionsWithUserDetails
} = require('../controllers/walletController'); // Adjust the path if necessary

// Route to get wallet balance
router.get('/:user_id/balance', getWalletBalance);

// Route to deposit money into the wallet
router.post('/:user_id/deposit', depositMoney);

// Route to withdraw money from the wallet
router.post('/:user_id/withdraw', withdrawMoney);

// Route to get transaction history
router.get('/:user_id/transactions', getTransactionHistory);

router.get('/transactions', getTransactionsWithUserDetails);

// Route to delete a transaction by ID
router.delete('/transaction/:transaction_id', deleteTransactionById);

module.exports = router;
