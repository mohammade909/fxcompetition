const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const db = require("../config/database");
const crypto = require('crypto')
// Helper function to generate a unique transaction ID (optional)
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

async function generateUniqueWalletId() {
    let isUnique = false;
    let walletId = '';

    while (!isUnique) {
        walletId = Math.floor(10000000 + Math.random() * 90000000).toString(); // Generate an 8-digit number
        const [existingWallet] = await db.promise().query('SELECT * FROM Wallet WHERE wallet_id = ?', [walletId]);
        if (existingWallet.length === 0) {
            isUnique = true;
        }
    }

    return walletId;
}

// Get Wallet Balance
exports.getWalletBalance = catchAsyncErrors(async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const [wallet] = await db.promise().query('SELECT * FROM Wallet WHERE user_id = ?', [user_id]);

        if (wallet.length === 0) {
            return next(new ErrorHandler('Wallet not found', 404));
        }

        res.status(200).json({
            success: true,
            balance: wallet[0].balance,
            wallet_id: wallet[0].wallet_id
        });
    } catch (error) {
        return next(new ErrorHandler('Error fetching wallet balance', 500));
    }
});

// Deposit Money
exports.depositMoney = catchAsyncErrors(async (req, res, next) => {
    const { user_id } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
        return next(new ErrorHandler('Invalid deposit amount', 400));
    }

    try {
        let [wallet] = await db.promise().query('SELECT * FROM wallet WHERE user_id = ?', [user_id]);

        if (wallet.length === 0) {
            const walletId = await generateUniqueWalletId();
            await db.promise().query('INSERT INTO wallet (wallet_id, user_id, balance) VALUES (?, ?, ?)', [walletId, user_id, 0]);
            [wallet] = await db.promise().query('SELECT * FROM Wallet WHERE user_id = ?', [user_id]);
        }

        // const newBalance = wallet[0].balance + parseFloat(amount);
        await db.promise().query(`UPDATE wallet SET balance = balance + ${amount} WHERE user_id = ?`, [user_id]);

        const transactionId = await generateUniqueTransactionId();
        await db.promise().query('INSERT INTO Transactions (transaction_id, wallet_id, transaction_type, amount) VALUES (?, ?, ?, ?)', [transactionId, wallet[0].wallet_id, 'deposit', amount]);

        res.status(201).json({
            success: true,
            message: 'Deposit successful',
            
        });
    } catch (error) {
        console.log(error);
        
        return next(new ErrorHandler('Error processing deposit', 500));
    }
});

// Withdraw Money
exports.withdrawMoney = catchAsyncErrors(async (req, res, next) => {
    const { user_id } = req.params;
    const { amount } = req.body;

    if (amount <= 0) {
        return next(new ErrorHandler('Invalid withdrawal amount', 400));
    }

    try {
        const [wallet] = await db.promise().query('SELECT * FROM Wallet WHERE user_id = ?', [user_id]);

        if (wallet.length === 0) {
            return next(new ErrorHandler('Wallet not found', 404));
        }

        if (wallet[0].balance < amount) {
            return next(new ErrorHandler('Insufficient balance', 400));
        }

        const newBalance = wallet[0].balance - parseFloat(amount);
        await db.promise().query('UPDATE Wallet SET balance = ? WHERE user_id = ?', [newBalance, user_id]);

        const transactionId = await generateUniqueTransactionId();
        await db.promise().query('INSERT INTO Transactions (transaction_id, wallet_id, transaction_type, amount) VALUES (?, ?, ?, ?)', [transactionId, wallet[0].wallet_id, 'withdrawal', amount]);

        res.status(201).json({
            success: true,
            message: 'Withdrawal successful',
            balance: newBalance
        });
    } catch (error) {
        return next(new ErrorHandler('Error processing withdrawal', 500));
    }
});

// Get Transaction History
exports.getTransactionHistory = catchAsyncErrors(async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const [wallet] = await db.promise().query('SELECT * FROM Wallet WHERE user_id = ?', [user_id]);

        if (wallet.length === 0) {
            return next(new ErrorHandler('Wallet not found', 404));
        }

        const [transactions] = await db.promise().query('SELECT * FROM Transactions WHERE wallet_id = ?', [wallet[0].wallet_id]);

        res.status(200).json({
            success: true,
            transactions
        });
    } catch (error) {
        return next(new ErrorHandler('Error fetching transaction history', 500));
    }
});

// Delete Transaction by ID (optional)
exports.deleteTransactionById = catchAsyncErrors(async (req, res, next) => {
    const { transaction_id } = req.params;
    
    try {
        const [transaction] = await db.promise().query('SELECT * FROM Transactions WHERE transaction_id = ?', [transaction_id]);

        if (transaction.length === 0) {
            return next(new ErrorHandler('Transaction not found', 404));
        }

        await db.promise().query('DELETE FROM Transactions WHERE transaction_id = ?', [transaction_id]);

        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully',
             transaction_id
        });
    } catch (error) {
        return next(new ErrorHandler('Error deleting transaction', 500));
    }
});

exports.getTransactionsWithUserDetails = catchAsyncErrors(async (req, res, next) => {
    const query = `
        SELECT 
            t.transaction_id,
            t.wallet_id,
            t.transaction_type,
            t.amount,
            t.transaction_date,
            u.user_id,
            u.username,
            u.email,
            u.first_name,
            u.last_name,
            u.phone,
            u.user_type,
            u.kyc_status,
            u.login_status,
            u.user_image
        FROM 
            transactions t
        JOIN 
            wallet w ON t.wallet_id = w.wallet_id
        JOIN 
            users u ON w.user_id = u.user_id;
    `;

    const totalsQuery = `
        SELECT
            SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END) AS total_deposit,
            SUM(CASE WHEN transaction_type = 'withdrawal' THEN amount ELSE 0 END) AS total_withdrawal
        FROM 
            transactions;
    `;

    // Execute the first query to get transaction details
    db.query(query, (err, results) => {
        if (err) {
            return next(err);
        }

        // Execute the second query to get the total deposits and withdrawals
        db.query(totalsQuery, (err, totalsResult) => {
            if (err) {
                return next(err);
            }

            res.status(200).json({
                success: true,
                transactions: results,
                totals: totalsResult[0], // totalsResult is an array with one object
            });
        });
    });
});
