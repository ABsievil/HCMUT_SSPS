import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Reusable fetch function
const fetchLogs = async (url, params = {}) => {
  const { dateStart, dateEnd, studentId } = params;
  const query = new URLSearchParams({ dateStart, dateEnd }).toString();
  const fullUrl = query ? `${url}?${query}` : url;

  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch logs from ${url}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Fetch logs for a specific student
export const fetchLogBuyPageStudent = createAsyncThunk(
  'logs/fetchLogBuyPageStudent',
  async ({ studentId, dateStart, dateEnd }) => {
    const data = await fetchLogs(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getLogBuyPageStudent/${studentId}`,
      { dateStart, dateEnd }
    );
    console.log('Fetched student logs:', data);
    return data;
  }
);

// Fetch logs for all students
export const fetchLogBuyPageAllStudent = createAsyncThunk(
  'logs/fetchLogBuyPageAllStudent',
  async ({ dateStart, dateEnd }) => {
    const data = await fetchLogs(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getLogBuyPageAllStudent`,
      { dateStart, dateEnd }
    );
    console.log('Fetched all student logs:', data);
    return data;
  }
);

// Slice for payment logs
const paymentLogSlice = createSlice({
  name: 'logs',
  initialState: {
    studentPayLogs: [],
    allStudentPayLogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle `fetchLogBuyPageStudent`
      .addCase(fetchLogBuyPageStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogBuyPageStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentPayLogs = action.payload;
      })
      .addCase(fetchLogBuyPageStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle `fetchLogBuyPageAllStudent`
      .addCase(fetchLogBuyPageAllStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogBuyPageAllStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudentPayLogs = action.payload;
      })
      .addCase(fetchLogBuyPageAllStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selector
export const selectPaymentStudentLog = (state) => state.logs;

// Reducer export
export default paymentLogSlice.reducer;
