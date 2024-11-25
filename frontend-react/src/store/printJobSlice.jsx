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
            state.Jobs = state.Jobs.map((job, index) => ({ ...job, id: index }))
            // store in local storage here.
        },
        removePrintJob: (state, action) => {
            const removeJobId = action.payload;
            state.Jobs = state.Jobs.filter(job => job.id !== removeJobId);
            state.Jobs = state.Jobs.map((job, index) => ({ ...job, id: index }))
        },
        requestPrintJobs: (state, action) => {
            
        }
    },
});

export const { addPrintJob, removePrintJob } = printJobSlice.actions;
export const selectPrintJobs = (state) => state.printJobs.Jobs;
export default printJobSlice.reducer;
