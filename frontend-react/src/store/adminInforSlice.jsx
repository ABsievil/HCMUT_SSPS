import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdminInfor = createAsyncThunk("fetchAdminInfor", async () => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_BE_API_URL
      }/api/v1/Admin/getAdminInfor`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return response.json();
  } catch (error) {
    throw error;
  }
});

const adminInforSlice = createSlice({
  name: "adminInfor",
  initialState: {
    isLoading: true,
    adminInfor: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminInfor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminInfor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminInfor = action.payload;
      })
      .addCase(fetchAdminInfor.rejected, (state, action) => {
        state.error = action.error.message; // Extract error message
      });
  },
});
export default adminInforSlice.reducer;
