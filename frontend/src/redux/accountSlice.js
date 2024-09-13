import { createSlice } from "@reduxjs/toolkit";
import {
    createAccount,
    getAccountsByTraderId,
    getAccountById,
    deleteAccountById
} from "../actions/accounts";

const initialState = {
    accounts: [],
    account: null,
    loading: false,
    error: null,
    success: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // Add any synchronous reducers if needed
        resetAccountState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Create Account
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.accounts.push(action.payload.account);
            state.success = true;
        });
        builder.addCase(createAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.success = false;
        });

        // Get Accounts by Trader ID
        builder.addCase(getAccountsByTraderId.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAccountsByTraderId.fulfilled, (state, action) => {
            state.loading = false;
            state.accounts = action.payload.accounts;
        });
        builder.addCase(getAccountsByTraderId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        // Get Account by Account ID
        builder.addCase(getAccountById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAccountById.fulfilled, (state, action) => {
            state.loading = false;
            state.account = action.payload.account;
        });
        builder.addCase(getAccountById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        });

        // Delete Account by Account ID
        builder.addCase(deleteAccountById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(deleteAccountById.fulfilled, (state, action) => {
            console.log(action.payload);
            
            state.loading = false;
            state.success = true;
            state.accounts = state.accounts.filter(account => account.account_id !== Number(action.payload.account_id));
        });
        builder.addCase(deleteAccountById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
            state.success = false;
        });
    }
});

// Exporting synchronous actions if needed
export const { resetAccountState } = accountSlice.actions;

export default accountSlice.reducer;
