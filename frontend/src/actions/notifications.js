import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

export const fetchAllNotifications = createAsyncThunk(
  'notifications/fetchAllNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/notifications`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch notifications');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
// Async thunk to create a new notification
export const createNotification = createAsyncThunk(
  'notifications/createNotification',
  async (notificationData, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
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

// Async thunk to get all notifications for a specific user
export const getUserNotifications = createAsyncThunk(
  'notifications/getUserNotifications',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/notifications/user/${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log(data);
      
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk to mark a notification as read
export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async ({ userId, notificationId }, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASEURL}/api/v1/notifications/${userId}/${notificationId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return { notificationId, ...data };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk to delete a notification
export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/notifications/${notificationId}`, {
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
