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
  console.log(JSON.stringify(studentDTO));
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
      const studentDTO = {
        student_id: state.personalInfor.data.student_id,
        last_name: state.personalInfor.data.last_name,
        middle_name: state.personalInfor.data.middle_name,
        first_name:state.personalInfor.data.first_name,
        email: state.personalInfor.data.email,
        date_of_birth: state.personalInfor.data.date_of_birth,
        phone_number: state.personalInfor.data.phone_number,
        school_year: state.personalInfor.data.school_year,
        faculty: state.personalInfor.data.faculty,
        page_remain: newValue
      }
      updatePersonalInfor(studentDTO);
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