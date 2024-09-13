import { createSlice } from "@reduxjs/toolkit";
import {
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
  getPlan,
} from "../actions/plan";
// Create a slice for plans
const planSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    plan: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plan = action.payload.plan;
      })
      .addCase(getPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getAllPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.plans;
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plan = action.payload.updatedPlan;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter(
          (plan) => plan.plan_id !== action.payload.planId
        );
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default planSlice.reducer;
