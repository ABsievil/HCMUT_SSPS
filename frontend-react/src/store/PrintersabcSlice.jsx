import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPrintersabc = createAsyncThunk(
  "fetchPrintersabc",
  async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Printer/getInforAllPrinter`, {
        method: 'GET',
        credentials: 'include'
      })
      return response.json();
    } catch (error) {
      throw error; // Re-throw the error for handling in the rejected case
    }
  }
);

const printersabcSlice = createSlice({
  name: 'printersabc',
  initialState: {
    isLoading: true, // Corrected typo for consistency
    printerList: [],
    error: null, // Use null for error state for clarity
  },
  reducers: {}, // No reducers needed in this simplified case
  extraReducers: (builder) => { // Use extraReducers for handling async actions
    builder
      .addCase(fetchPrintersabc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrintersabc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.printerList = action.payload;
      })
      .addCase(fetchPrintersabc.rejected, (state, action) => {
        state.error = action.error.message; // Extract error message
      });
  },
});

export default printersabcSlice.reducer;