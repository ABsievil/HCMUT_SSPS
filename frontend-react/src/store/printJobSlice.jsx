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
    name: "printJob",
    initialState: {
        isLoading: true,
        printJob: [],
        error: null,
    },
    reducers: {
        addPrintJob: (state, action) => {
            state.printJob.push(action.payload);
            console.log(state.printJob[0]);
            // store in local storage here.
        }
    },
});

export const { addPrintJob } = printJobSlice.actions;
export const selectPrintJob = (state) => state.printJob;
export default printJobSlice.reducer;
