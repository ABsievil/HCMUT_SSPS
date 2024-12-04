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

const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoading: true,
        email: null,
        error: null,
    },
    reducers: {
        sendEmail : (state, action) => {
            state.email = action.payload;
            sendOTPByEmail(action.payload);
        }
    }
});

export const { sendEmail } = authSlice.actions;
export const selectAuth = (state) => state.authentication;
export default authSlice.reducer;