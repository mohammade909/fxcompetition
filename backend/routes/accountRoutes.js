
const express = require('express');
const {
    createAccount,
    getAccountsByTraderId,
    getAccountById,
    deleteAccountById
} = require('../controllers/accountsController');

const router = express.Router();

// Route to create an account
router.post('/', createAccount);

// Route to get all accounts by trader_id
router.get('/trader/:trader_id', getAccountsByTraderId);

// Route to get a specific account by account_id
router.get('/:account_id', getAccountById);

// Route to delete an account by account_id
router.delete('/:account_id', deleteAccountById);

module.exports = router;
