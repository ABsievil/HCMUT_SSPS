import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPersonalInfor = createAsyncThunk(
  "fetchPersonalInfor",
  async (username) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getStudentInforByUsername/${username}`, {
        method: 'GET',
        credentials: 'include'
      })
      return response.json();
    } catch (error) {
      throw error; // Re-throw the error for handling in the rejected case
    }
  }
);

const updatePersonalInfor = async (studentDTO) => {
  // console.log(JSON.stringify(studentDTO));
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/updateStudent`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentDTO)
      }
    );
    if (!response.ok) {
      throw new Error(`updatePersonalInfor failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating PersonalInfor: ', error);
  }
}

const updatePageRemain = async (studentId, newValue) =>{
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/updateStudentPageRemain?studentId=${studentId}&pageRemain=${newValue}`,
      {
        method: 'PUT',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error(`updatePersonalInfor failed: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating PersonalInfor: ', error);
  }
}

const personalInforSlice = createSlice({
  name: 'personalInfor',
  initialState: {
    isLoading: true,
    personalInfor: [],
    error: null, // Use null for error state for clarity
  },
  reducers: {
    updatePagesRemain: (state, action) => {
      const newValue = state.personalInfor.data.page_remain + action.payload;
      if (newValue < 0) {
        console.error("số trang còn lại không thể âm, check kỹ trước khi gửi");
        return;
      }
      state.personalInfor.data.page_remain = newValue;
      updatePageRemain(state.personalInfor.data.student_id, newValue);
    }
  },
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

export const { updatePagesRemain } = personalInforSlice.actions;
export const selectPersonalInfor = (state) => state.personalInfor;
export default personalInforSlice.reducer;