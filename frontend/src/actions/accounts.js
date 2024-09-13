import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../baseurl";

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountData, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
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

export const getAccountsByTraderId = createAsyncThunk(
  "account/getAccountsByTraderId",
  async (trader_id, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASEURL}/api/v1/accounts/trader/${trader_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
export const getAccountById = createAsyncThunk(
  "account/getAccountById",
  async (account_id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/accounts/${account_id}`, {
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

export const deleteAccountById = createAsyncThunk(
  "account/deleteAccountById",
  async (account_id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/accounts/${account_id}`, {
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
