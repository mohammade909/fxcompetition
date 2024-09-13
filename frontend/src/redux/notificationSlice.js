 import { createSlice } from "@reduxjs/toolkit";
 import {fetchAllNotifications,getUserNotifications, markNotificationAsRead, createNotification, deleteNotification} from '../actions/notifications'
const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
      notifications: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createNotification.pending, (state) => {
          state.loading = true;
        })
        .addCase(createNotification.fulfilled, (state, action) => {
          state.loading = false;
          state.notifications.push(action.payload);
        })
        .addCase(createNotification.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(getUserNotifications.pending, (state) => {
          state.loading = true;
        })
        .addCase(getUserNotifications.fulfilled, (state, action) => {
          state.loading = false;
          state.notifications = action.payload.notifications;
        })
        .addCase(getUserNotifications.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(fetchAllNotifications.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllNotifications.fulfilled, (state, action) => {
          state.loading = false;
          state.notifications = action.payload.notifications;
        })
        .addCase(fetchAllNotifications.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(markNotificationAsRead.pending, (state) => {
          state.loading = true;
        })
        .addCase(markNotificationAsRead.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.notifications.findIndex(
            (notification) => notification.id === action.payload.notificationId
          );
          if (index !== -1) {
            state.notifications[index].read_status = true;
          }
        })
        .addCase(markNotificationAsRead.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(deleteNotification.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteNotification.fulfilled, (state, action) => {
          state.loading = false;
          state.notifications = state.notifications.filter(
            (notification) => notification.id !== action.payload.notificationId
          );
        })
        .addCase(deleteNotification.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        });
    },
  });
  
  export default notificationSlice.reducer;
  