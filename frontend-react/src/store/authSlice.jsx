import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const sendOTPByEmail = async (gmail) => {
    try {
        await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Email/deleteOTPByEmail/${gmail}`, { method: 'PUT' });
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Email/sendEmail?toGmail=${gmail}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to send email. HTTP status: ${response.status}`);
        }
        return { success: true };
    } catch (error) {
        console.error('Error sending email', error);
        return { success: false, error: error.message };
    }
}

export const deleteOTPByEmail = async (gmail) => {
    try {
        const url = `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Email/deleteOTPByEmail/${gmail}`;
        const response = await fetch(url, { method: 'PUT' });
        if (!response.ok) {
            throw new Error(`Failed to delete otp by email. HTTP status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting otp by email', error);
    }
}

export const addStudent = async (studentDTO) => {
    // console.log(studentDTO);
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/addStudent`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentDTO)
        });
        if (!response.ok) {
            throw new Error(`Failed to add student. HTTP status: ${response.status}`);
        }
        toast.success("Tạo tài khoản thành công");
        localStorage.removeItem('email')
    } catch (error) {
        console.error('Error adding student', error);
        toast.error("Tạo tài khoản không thành công");
        localStorage.removeItem('email')
    }
}

export const getOTPbyEmail = async (gmail) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Email/getOTPByEmail/${gmail}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Failed to get OTP. HTTP status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error gettin email', error);
    }
}

export const createNewPassword = async (createNewPasswordDTO) => {
    try {
        const url = `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/createNewPassword`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createNewPasswordDTO),
        });
        if (!response.ok) {
            throw new Error(`Failed to submit new password. HTTP status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error submitting new password', error);
    }
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoading: true,
        email: null,
        studentDTO: [],
        error: null,
    },
    reducers: {
        sendEmail: (state, action) => {
            const email = action.payload;
            state.email = email;
            localStorage.setItem('email', email);
            sendOTPByEmail(email);  
        },
        saveRegisterInfor: (state, action) => {
            state.studentDTO = action.payload;
        },
    }
});

export const { sendEmail, saveRegisterInfor } = authSlice.actions;
export const selectAuth = (state) => state.authentication;
export default authSlice.reducer;