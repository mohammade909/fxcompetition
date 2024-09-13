// src/slices/enrollmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Adjust the path as needed
import {
  fetchAllEnrollments,
  deleteEnrollment,
  getEnrollmentById,
  createEnrollment,
  getEnrollmentsByUserId,
  updateEnrollment,
} from "../actions/enrollment";

// Create a slice for enrollments
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: [],
    enrollment: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
      })
      .addCase(fetchAllEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(createEnrollment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments.push(action.payload.enrollmentId);
      })
      .addCase(createEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getEnrollmentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnrollmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollment = action.payload.enrollment;
      })
      .addCase(getEnrollmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getEnrollmentsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnrollmentsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.enrollments;
      })
      .addCase(getEnrollmentsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateEnrollment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollment = action.payload.enrollment;
      })
      .addCase(updateEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteEnrollment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = state.enrollments.filter(
          (enrollment) =>
            enrollment.enrollment_id !== action.payload.enrollmentId
        );
      })
      .addCase(deleteEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default enrollmentSlice.reducer;
