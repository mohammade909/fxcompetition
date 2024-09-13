import { createSlice } from "@reduxjs/toolkit";
import {
  getWalletBalance,
  depositMoney,
  withdrawMoney,
  getTransactionHistory,
  deleteTransactionById,
  getTransactionHistoryWithUsers
} from "../actions/wallet";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    wallet:null,
    transactions: [],
    loading: false,
    totals:null,
    error: null,
    message: null,
  },
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Wallet Balance
      .addCase(getWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.wallet = action.payload.wallet_id;
      })
      .addCase(getWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Deposit Money
      .addCase(depositMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.successMessage = action.payload.message;
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Withdraw Money
      .addCase(withdrawMoney.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload.balance;
        state.successMessage = action.payload.message;
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Get Transaction History
      .addCase(getTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
      })
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // Get All Transaction History
      .addCase(getTransactionHistoryWithUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionHistoryWithUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.totals = action.payload.totals;
      })
      .addCase(getTransactionHistoryWithUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Delete Transaction by ID
      .addCase(deleteTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.transaction_id !== action.payload.transaction_id
        );
        state.successMessage = action.payload.message;
      })
      .addCase(deleteTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearSuccessMessage, clearErrorMessage } = walletSlice.actions;

export default walletSlice.reducer;
