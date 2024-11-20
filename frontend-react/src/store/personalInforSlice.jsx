import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPersonalInfor = createAsyncThunk(
  "fetchPersonalInfor",
  async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getStudentInforById/${userId}`, {
        method: 'GET',
        credentials: 'include'
      })
      return response.json();
    } catch (error) {
      throw error; // Re-throw the error for handling in the rejected case
    }
  }
);

const personalInforSlice = createSlice({
  name: 'personalInfor',
  initialState: {
    isLoading: true,    
    personalInfor: [],
    error: null, // Use null for error state for clarity
  },
  reducers: {}, // No reducers needed in this simplified case
  extraReducers: (builder) => { // Use extraReducers for handling async actions
    builder
      .addCase(fetchPersonalInfor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPersonalInfor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.personalInfor = action.payload;
      })
      .addCase(fetchPersonalInfor.rejected, (state, action) => {
        state.error = action.error.message; // Extract error message
      });
  },
});

export default personalInforSlice.reducer;