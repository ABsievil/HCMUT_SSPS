import { createSlice } from "@reduxjs/toolkit";

const requestPrintJob = async (PrintDTO) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/print`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(PrintDTO),
            }
        );
        if (!response.ok) {
            throw new Error(`print failed: ${response.status}`);
        }
    } catch (error) {
        console.error('Error sending print job request:', error);
    }
};

const printJobSlice = createSlice({
    name: "adminInfor",
    initialState: {
        isLoading: true,
        printJob: [],
        error: null,
    },
    reducers: {
        addPrintJob: (state, action) => {
            state.printJob.push(action.payload);
            // you may want to store it in local storage here.
        }
    },
});


export default printJobSlice.reducer;
