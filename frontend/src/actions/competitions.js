import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

// Async thunk to fetch all competitions
export const fetchAllCompetitions = createAsyncThunk(
  'competitions/fetchAllCompetitions',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/competitions`);
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

// Async thunk to create a competition
export const createCompetition = createAsyncThunk(
  'competitions/createCompetition',
  async (competitionData, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/competitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitionData),
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

// Async thunk to update a competition
export const updateCompetition = createAsyncThunk(
  'competitions/updateCompetition',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/competitions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
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

// Async thunk to get competition details by ID
export const getCompetitionDetails = createAsyncThunk(
  'competitions/getCompetitionDetails',
  async (id, thunkAPI) => {
    
    try {
      const response = await fetch(`${BASEURL}/api/v1/competitions/${id}`);
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


// Async thunk to delete a competition
export const deleteCompetition = createAsyncThunk(
  'competitions/deleteCompetition',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/competitions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
