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
    name: "printJobs",
    initialState: {
        isLoading: true,
        Jobs: [],
        error: null,
    },
    reducers: {
        addPrintJob: (state, action) => {
            state.Jobs.push(action.payload);
            console.log(state.Jobs[0]);
            // store in local storage here.
        }
    },
});

export const { addPrintJob } = printJobSlice.actions;
export const selectPrintJobs = (state) => state.printJobs.Jobs;
export default printJobSlice.reducer;
