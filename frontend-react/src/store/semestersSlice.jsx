import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllSemesterIds = createAsyncThunk(
  "fetchAllSemesterIds",
  async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/getAllSemester`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('get semester failed');
    }
    return response.json();
  } catch (error) {
    console.error('Error getting semester:', error);
  }
})

export const fetchUltilityOfSemester = createAsyncThunk (
  "fetchUltilityOfSemester",
  async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/getUltilityOfSemester/${id}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('get semester ultility failed');
    }
    return response.json();
  } catch (error) {
    console.error('Error getting semester ultility:', error);
  }
})

const semestersSlice = createSlice({
  name: 'semesters',
  initialState: {
    isLoading: true,
    Semesters: [],
    Ultility: [],
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => { // Use extraReducers for handling async actions
    builder
      .addCase(fetchAllSemesterIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSemesterIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Semesters = action.payload.data;
      })
      .addCase(fetchAllSemesterIds.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchUltilityOfSemester.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUltilityOfSemester.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Ultility = action.payload.data;
      })
      .addCase(fetchUltilityOfSemester.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const selectSemesters = (state) => state.semesters;
export default semestersSlice.reducer;