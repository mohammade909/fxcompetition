import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

// Create a user order
export const createUserOrder = createAsyncThunk(
  'orders/createUserOrder',
  async (orderData, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
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

// Get a user's order by order_id
export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/orders/${orderId}`);
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

// Get all orders for a specific user
export const getUserOrdersById = createAsyncThunk(
  'orders/getUserOrdersById',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/orders/user/${userId}`);
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

// Update an order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ id, orderData }, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
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

// Delete an order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await fetch(`${BASEURL}/api/v1/orders/${orderId}`, {
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

// Get all orders (paginated & filtered)
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (params, thunkAPI) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${BASEURL}/api/v1/orders?${query}`);
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
