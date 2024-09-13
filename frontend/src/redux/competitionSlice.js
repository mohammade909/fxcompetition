import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCompetitions,
  getCompetitionDetails,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} from "../actions/competitions"; // Adjust the path as needed

const competitionsSlice = createSlice({
  name: 'competitions',
  initialState: {
    competitions: [],
    competition: null,
    loading: false, // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all competitions
      .addCase(fetchAllCompetitions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCompetitions.fulfilled, (state, action) => {
        state.loading = false;
        state.competitions = action.payload.competitions;
      })
      .addCase(fetchAllCompetitions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Create competition
      .addCase(createCompetition.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCompetition.fulfilled, (state, action) => {
        state.loading = false;
        state.competitions.push(action.payload); // Add the new competition to the list
      })
      .addCase(createCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Update competition
      .addCase(updateCompetition.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompetition.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCompetition = action.payload;
        const existingCompetition = state.competitions.find(
          (comp) => comp.competition_id === updatedCompetition.competitionId
        );
        if (existingCompetition) {
          Object.assign(existingCompetition, updatedCompetition);
        }
      })
      .addCase(updateCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // get Details of competition
      .addCase(getCompetitionDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompetitionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.competition = action.payload.competition; 
      })
      .addCase(getCompetitionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // Delete competition
      .addCase(deleteCompetition.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCompetition.fulfilled, (state, action) => {
        state.loading = false;
        state.competitions = state.competitions.filter(
          (comp) => comp.competition_id !== action.payload.id
        );
      })
      .addCase(deleteCompetition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default competitionsSlice.reducer;
