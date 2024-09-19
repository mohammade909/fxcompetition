    const ErrorHandler = require("../utils/errorHandler");
    const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
    const asyncHandler = require("express-async-handler");
    const dotenv = require("dotenv");
    const db = require("../config/database");
    const bcrypt = require("bcrypt");
    const crypto = require('crypto')
    dotenv.config();


    async function generateUniqueTransactionId() {
        let isUnique = false;
        let transactionId = '';
    
        while (!isUnique) {
            transactionId = crypto.randomBytes(8).toString('hex'); 
            const [existingTransaction] = await db.promise().query('SELECT * FROM transactions WHERE transaction_id = ?', [transactionId]);
            if (existingTransaction.length === 0) {
                isUnique = true;
            }
        }
    
        return transactionId;
    }
    
    async function generateUniqueAccountNumber() {
        let isUnique = false;
        let accountNumber = '';

        while (!isUnique) {
            accountNumber = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit account number
            const [existingAccount] = await db.promise().query('SELECT * FROM accounts WHERE account_number = ?', [accountNumber]);
            if (existingAccount.length === 0) {
                isUnique = true;
            }
        }

        return accountNumber;
    }

    // Helper function to generate a random password
    function generateRandomPassword() {
        return crypto.randomBytes(6).toString('hex'); // 12-character password
    }

    // Controller function to create an account
    exports.createAccount = catchAsyncErrors(async (req, res, next) => {
        const {
            trader_id,
            account_type,
            initial_deposit,
            leverage,
            currency,
            is_demo,
            server_id// Default server ID
        } = req.body;
    
        try {
            if (is_demo) {
                // Check if the trader already has a demo account
                // const [existingDemoAccount] = await db.promise().query(
                //     'SELECT * FROM accounts WHERE trader_id = ? AND is_demo = true',
                //     [trader_id]
                // );
    
                // if (existingDemoAccount.length > 0) {
                //     return next(new ErrorHandler('Trader already has a demo account. Only one demo account is allowed per trader.', 400));
                // }
    
                const account_number = await generateUniqueAccountNumber();
                const password = generateRandomPassword();
                const demoAccountType = 'demo'; // Set account type to 'demo'
                const demoBalance = 8000; // Set balance to 8000
    
                const newAccount = {
                    trader_id,
                    account_number,
                    password,
                    account_type: demoAccountType,
                    balance: demoBalance,
                    currency: 'USD',
                    leverage: 100,
                    status: 'active',
                    is_demo: true,
                    initial_deposit: demoBalance,
                    server_id
                };
    
                await db.promise().query('INSERT INTO accounts SET ?', newAccount);
    
                return res.status(201).json({
                    success: true,
                    message: 'Demo account created successfully',
                    account: newAccount
                });
            } else {
                // For non-demo accounts, allow multiple accounts
                const account_number = await generateUniqueAccountNumber();
                const password = generateRandomPassword();
    
                // Check if the trader has sufficient balance for the initial deposit
                const [traderWallet] = await db.promise().query(
                    'SELECT * FROM wallet WHERE user_id = ?',
                    [trader_id]
                );                            
    
                if (traderWallet.length === 0) {
                    return next(new ErrorHandler('Trader not found', 404));
                }
    
                const currentBalance = traderWallet[0].balance;
    
                if (currentBalance < initial_deposit) {
                    return next(new ErrorHandler('Insufficient balance for initial deposit', 400));
                }
    
                // Update the trader's wallet balance
                const newBalance = currentBalance - initial_deposit;
                await db.promise().query(
                    'UPDATE wallet SET balance = ? WHERE user_id = ?',
                    [newBalance, trader_id]
                );
    
                // Create a new account
                const newAccount = {
                    trader_id,
                    account_number,
                    password,
                    account_type,
                    balance: initial_deposit,
                    currency,
                    leverage,
                    status: 'active',
                    initial_deposit,
                    server_id
                };
    
                await db.promise().query('INSERT INTO accounts SET ?', newAccount);
    
                // Create a transaction record for the withdrawal
               
                const transactionId = await generateUniqueTransactionId();
                await db.promise().query('INSERT INTO Transactions (transaction_id, wallet_id, transaction_type, amount) VALUES (?, ?, ?, ?)', [transactionId, traderWallet[0].wallet_id, 'withdrawal', initial_deposit]);
        
    
                return res.status(201).json({
                    success: true,
                    message: 'Account created successfully',
                    account: newAccount
                });
            }
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler(error.message || 'Error creating account', 500));
        }
    });
    
    exports.getAccountsByTraderId = catchAsyncErrors(async (req, res, next) => {
        const { trader_id } = req.params;

        try {
            const [accounts] = await db.promise().query('SELECT * FROM accounts WHERE trader_id = ?', [trader_id]);

            if (accounts.length === 0) {
                return next(new ErrorHandler('No accounts found for this trader', 404));
            }

            res.status(200).json({
                success: true,
                accounts
            });
        } catch (error) {
            return next(new ErrorHandler('Error fetching accounts', 500));
        }
    });


    // Controller function to get an account by account_id
    exports.getAccountById = catchAsyncErrors(async (req, res, next) => {
        const { account_id } = req.params;

        try {
            const [account] = await db.promise().query('SELECT * FROM accounts WHERE account_id = ?', [account_id]);

            if (account.length === 0) {
                return next(new ErrorHandler('Account not found', 404));
            }

            res.status(200).json({
                success: true,
                account: account[0]
            });
        } catch (error) {
            return next(new ErrorHandler('Error fetching account', 500));
        }
    });


    exports.deleteAccountById = catchAsyncErrors(async (req, res, next) => {
        const { account_id } = req.params;

        try {
            // Check if the account exists
            const [account] = await db.promise().query('SELECT * FROM accounts WHERE account_id = ?', [account_id]);

            if (account.length === 0) {
                return next(new ErrorHandler('Account not found', 404));
            }

            // Delete the account
            await db.promise().query('DELETE FROM accounts WHERE account_id = ?', [account_id]);

            res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
                account_id
            });
        } catch (error) {
            return next(new ErrorHandler('Error deleting account', 500));
        }
    });