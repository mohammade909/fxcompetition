import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

// Async thunk to create a plan
export const createPlan = createAsyncThunk(
  'plans/createPlan',
  async (planData, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
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

// Async thunk to get a plan by ID
export const getPlan = createAsyncThunk(
  'plans/getPlan',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/plans/${id}`);
      
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

// Async thunk to get all plans
export const getAllPlans = createAsyncThunk(
  'plans/getAllPlans',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/plans`);
      
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

// Async thunk to update a plan
export const updatePlan = createAsyncThunk(
  'plans/updatePlan',
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/plans/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
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

// Async thunk to delete a plan
export const deletePlan = createAsyncThunk(
  'plans/deletePlan',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/plans/${id}`, {
        method: 'DELETE',
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
