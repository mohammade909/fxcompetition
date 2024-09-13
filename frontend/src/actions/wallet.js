import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../baseurl";

// Fetch Wallet Balance
export const getWalletBalance = createAsyncThunk(
  "wallet/getWalletBalance",
  async (user_id, thunkAPI) => {
    
    try {
      const response = await fetch(`${BASEURL}/api/v1/wallet/${user_id}/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
        
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Deposit Money
export const depositMoney = createAsyncThunk(
  "wallet/depositMoney",
  async ({ user_id, amount }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/wallet/${user_id}/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Withdraw Money
export const withdrawMoney = createAsyncThunk(
  "wallet/withdrawMoney",
  async ({ user_id, amount }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/wallet/${user_id}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Get Transaction History
export const getTransactionHistory = createAsyncThunk(
  "wallet/getTransactionHistory",
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/wallet/${user_id}/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getTransactionHistoryWithUsers = createAsyncThunk(
  "wallet/getTransactionHistoryWithUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/wallet/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();    
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Delete Transaction by ID
export const deleteTransactionById = createAsyncThunk(
  "wallet/deleteTransactionById",
  async (transaction_id, thunkAPI) => {

    try {
      const response = await fetch(`${BASEURL}/api/v1/wallet/transaction/${transaction_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
