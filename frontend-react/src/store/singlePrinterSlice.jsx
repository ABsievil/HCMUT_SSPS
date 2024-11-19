import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addPrinter = createAsyncThunk(
    'addPrinter',
    async (singlePrinter) => {
        console.log("fetching....");
        console.log(JSON.stringify(singlePrinter));
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Printer/addPrinter`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(singlePrinter),
            }
        );
        if (!response.ok) {
            throw new Error('thêm máy in thất bại');
        }
    }
);
const singlePrinterSlice = createSlice({
    name: 'singlePrinter',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPrinter.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addPrinter.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addPrinter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default singlePrinterSlice.reducer;