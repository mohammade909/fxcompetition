import { createAsyncThunk } from "@reduxjs/toolkit";
import {BASEURL} from '../baseurl'
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async ({ page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'asc', status = '', token }, thunkAPI) => {
    let api = `${BASEURL}/api/v1/users?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    if (status) {
      api += `&status=${status}`;
    }

    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (values, thunkAPI) => {
    try {
      // Your asynchronous logic to add student here
      const response = await fetch(`${BASEURL}/api/v1/users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Example asynchronous thunk to get students

export const getUserById = createAsyncThunk(
  "users/getUser",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/users/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getUserProfile = createAsyncThunk(
  "users/getUser",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/users/profile/${token}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to delete student
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(`${BASEURL}/api/v1/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      return { userId: userId, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Example asynchronous thunk to update student
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`${BASEURL}/api/v1/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
     console.log(data);
      return data;
    } catch (error) {
      // Handle error
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchLevels = createAsyncThunk(
  'levels/fetchLevels',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/achievers`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
          
      return data;
    } catch (error) {
      console.error('Failed to fetch levels:', error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const updateLevelStatusByUserId = createAsyncThunk(
  'levels/updateLevelStatusByUserId',
  async ({ user_id, level_status }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/achievers/levels/${user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level_status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to update level status:', error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);