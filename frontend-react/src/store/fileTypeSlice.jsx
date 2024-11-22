import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFileType = createAsyncThunk(
    "fetchFileType",
    async (semesterId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/getFileOfSemester/${semesterId}`, {
                method: 'GET',
                credentials: 'include'
            })
            return response.json();
        } catch (error) {
            throw error;
        }
    }
);

const fileTypeSlice = createSlice({
    name: 'fileTypes',
    initialState: {
        isLoading: true,
        types: [
            { value: '.doc', label: '.doc' },
            { value: '.docx', label: '.docx' },
            { value: '.pdf', label: '.pdf' },
            { value: '.txt', label: '.txt' },
            { value: '.rtf', label: '.rtf' },
        ],
        availableTypes: [],
        error: null,
    },
    reducers: {
        addFileType: (state, action) => {
            state.types.push(action.payload);
        },
        removeFileType: (state, action) => {
            state.types = state.types.filter(type => type.value !== action.payload);
        },
    },
    extraReducers: (builder) => { // Use extraReducers for handling async actions
        builder
            .addCase(fetchFileType.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFileType.fulfilled, (state, action) => {
                state.isLoading = false;
                state.availableTypes = action.payload;
            })
            .addCase(fetchFileType.rejected, (state, action) => {
                state.error = action.error.message; // Extract error message
            });
    },
});

export const { addFileType, removeFileType } = fileTypeSlice.actions;
export const selectFileTypes = (state) => state.fileTypes.types;
export const selectAvailableFileTypes = (state) => state.fileTypes;
export default fileTypeSlice.reducer;
