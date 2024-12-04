import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const sendOTPByEmail = async (gmail) => {
    try {
        const url = `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Email/sendEmail?toGmail=${gmail}`;
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to send email. HTTP status: ${response.status}`);
        }
        return { success: true };
    } catch (error) {
        console.error('Error sending email', error);
        return { success: false, error: error.message };
    }
}

const addStudent = async (studentDTO) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/addStudent`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentDTO)
        });
        if (!response.ok) {
            throw new Error(`Failed to send email. HTTP status: ${response.status}`);
        }
        return { success: true };
    } catch (error) {
        console.error('Error sending email', error);
        return { success: false, error: error.message };
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
        error: null,
    },
    reducers: {
        sendEmail: (state, action) => {
            const email = action.payload;
            localStorage.setItem('email', email);
            state.email = action.payload;
            // sendOTPByEmail(action.payload);
        }
    }
});

export const { sendEmail } = authSlice.actions;
export default authSlice.reducer;