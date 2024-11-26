import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_REACT_APP_BE_API_URL;

// Async Thunk for VNPay Payment API Call
export const createVnPayPayment = createAsyncThunk(
  'payment/createVnPayPayment',
  async ({ amount, bankCode }, { rejectWithValue }) => {
    try {
      // Prepare URL and fetch configuration
      const url = `${API_BASE_URL}/api/v1/payment/vn-pay?amount=${amount}&bankCode=${bankCode}`;
      const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      };

      // Call API
      const response = await fetch(url, config);

      // Check response status
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      // Parse response data
      const responseData = await response.json();

      // Validate response structure based on your format
      if (responseData.status !== 'OK') {
        return rejectWithValue({ message: responseData.message });
      }

      // Extract and return only the payment URL, which is inside the "data" field
      return { paymentUrl: responseData.data, message: responseData.message };
    } catch (error) {
      return rejectWithValue({
        message: error.message || 'Payment initialization failed'
      });
    }
  }
);

// Payment Slice
export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentUrl: null,  // Store the payment URL from the API response
    message: '',       // Store the response message (success or error)
    loading: false,
    error: null,
  },
  reducers: {
    // Optional: Clear payment state
    clearPaymentState: (state) => {
      state.paymentUrl = null;
      state.message = '';
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVnPayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVnPayPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload.paymentUrl;  // Store the payment URL
        state.message = action.payload.message;        // Store the response message
      })
      .addCase(createVnPayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
