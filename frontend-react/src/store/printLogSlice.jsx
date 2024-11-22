import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper function to fetch logs for a specific student
const getLogStudent = async (studentId, logStudentDTO) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getLogStudent/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logStudentDTO),
      credentials: 'include'
    });

    // Check if the response is ok (status 200)
    if (!response.ok) {
      // Attempt to parse the error response body
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Failed to fetch student log');
    }

    // Return the JSON response if the request was successful
    return await response.json();
  } catch (error) {
    console.error('Error in getLogStudent:', error); // Log the error for debugging
    throw new Error(error.message || 'An error occurred while fetching student logs');
  }
};

// Helper function to fetch logs for all students
const getLogAllStudent = async (logStudentDTO) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getLogAllStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logStudentDTO),
      credentials: 'include'
    });

    // Check if the response is ok (status 200)
    if (!response.ok) {
      // Attempt to parse the error response body
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Failed to fetch all student logs');
    }

    // Return the JSON response if the request was successful
    return await response.json();
  } catch (error) {
    console.error('Error in getLogAllStudent:', error); // Log the error for debugging
    throw new Error(error.message || 'An error occurred while fetching logs for all students');
  }
};

// Async action to fetch logs for a specific student
export const fetchLogStudent = createAsyncThunk(
  'logs/fetchLogStudent',
  async ({ studentId, logStudentDTO }, { rejectWithValue }) => {
    try {
      return await getLogStudent(studentId, logStudentDTO);
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message to the Redux store
    }
  }
);

// Async action to fetch logs for all students
export const fetchLogAllStudents = createAsyncThunk(
  'logs/fetchLogAllStudents',
  async (logStudentDTO, { rejectWithValue }) => {
    try {
      return await getLogAllStudent(logStudentDTO);
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message to the Redux store
    }
  }
);

// Redux slice to handle the logs state
const logSlice = createSlice({
  name: 'logs',
  initialState: {
    studentLogs: [],
    allLogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch log for a specific student
      .addCase(fetchLogStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentLogs = action.payload.data || [];
      })
      .addCase(fetchLogStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch student logs';
      })
      // Fetch logs for all students
      .addCase(fetchLogAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.allLogs = action.payload.data || [];
      })
      .addCase(fetchLogAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch logs for all students';
      });
  },
});
export const selectStudentLog = (state) => state.logs;
export default logSlice.reducer;
