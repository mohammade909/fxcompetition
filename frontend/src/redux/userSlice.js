import { createSlice } from "@reduxjs/toolkit";
import { getUsers, createUser,fetchLevels,updateLevelStatusByUserId, deleteUser, updateUser, getUserById } from "../actions/user";
// Example asynchronous thunk to handle login

const initialState = {
  users: null,
  loading: false,
  levels:[],
  error: null,
  message: null,
  user: null,
  totalPages: 0,
  currentPage: 1,
};

const staffSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.levels = action.payload.levels;
      })
      .addCase(fetchLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
  
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      builder
      .addCase(updateLevelStatusByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLevelStatusByUserId.fulfilled, (state, action) => {
        state.loading = false;
        // Update the state with the updated level status
        const updatedLevel = action.payload;
        const index = state.levels.findIndex((level) => level.user_id === updatedLevel.user_id);
        if (index !== -1) {
          state.levels[index] = updatedLevel;
        }
      })
      .addCase(updateLevelStatusByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessage } = staffSlice.actions;

export default staffSlice.reducer;
