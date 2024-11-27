import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

const updateAdminInforAsync = async (adminDTO) => {
  console.log(adminDTO);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Admin/updateAdminInfor`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminDTO)
      }
    );
    if (!response.ok) {
      throw new Error(`updatePersonalInfor failed: ${response.status}`);
    }
    toast.success("Thông tin cập nhật thành công!");
  } catch (error) {
    console.error('Error updating PersonalInfor: ', error);
  }
}

const adminInforSlice = createSlice({
  name: "adminInfor",
  initialState: {
    isLoading: true,
    adminInfor: [],
    error: null,
  },
  reducers: {
    updateAdminInfor: (state, action) => {
      console.log(action.payload);
      state.adminInfor.data = action.payload;
      updateAdminInforAsync(action.payload);
    }
  },
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

export const { updateAdminInfor } = adminInforSlice.actions;
export default adminInforSlice.reducer;
