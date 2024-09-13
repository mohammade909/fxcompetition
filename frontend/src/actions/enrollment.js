import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../baseurl"; // Adjust the path as needed

// Async thunk to fetch all enrollments
export const fetchAllEnrollments = createAsyncThunk(
  "enrollments/fetchAllEnrollments",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/enrollments`);

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

// Async thunk to create an enrollment
export const createEnrollment = createAsyncThunk(
  "enrollments/createEnrollment",
  async (enrollmentData, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
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

// Async thunk to get a specific enrollment by ID
export const getEnrollmentById = createAsyncThunk(
  "enrollments/getEnrollmentById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/enrollments/${id}`);

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

// Async thunk to get enrollments by user ID
export const getEnrollmentsByUserId = createAsyncThunk(
  "enrollments/getEnrollmentsByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASEURL}/api/v1/enrollments/user/${userId}`
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

// Async thunk to update an enrollment
export const updateEnrollment = createAsyncThunk(
  "enrollments/updateEnrollment",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/enrollments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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

// Async thunk to delete an enrollment
export const deleteEnrollment = createAsyncThunk(
  "enrollments/deleteEnrollment",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/enrollments/${id}`, {
        method: "DELETE",
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
