// store/slices/permissionsSlice.js
import { createSlice} from '@reduxjs/toolkit';
import { getPermissions,getUserPermissions,addPermissions } from '../actions/permissions';
// Thunks for async actions


const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    userPermissions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all permissions
      .addCase(getPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload.columns;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user permissions
      .addCase(getUserPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.userPermissions = action.payload;
      })
      .addCase(getUserPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add permissions
      .addCase(addPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPermissions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default permissionsSlice.reducer;
