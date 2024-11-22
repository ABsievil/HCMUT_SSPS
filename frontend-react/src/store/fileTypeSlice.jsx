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

const deleteFileAccepted = async (semester, typeAccepted) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/deleteFileAccepted?semester=${semester}&typeAccepted=${typeAccepted}`,
            {
                method: 'PUT',
                credentials: 'include',
            }
        );
        if (!response.ok) {
            throw new Error(`Delete accepted file failed: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting accepted file:', error);
    }
};

const addFileAccepted = async (semester, typeAccepted) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/addFileAccepted?semester=${semester}&typeAccepted=${typeAccepted}`,
            {
                method: 'PUT',
                credentials: 'include',
            }
        );
        if (!response.ok) {
            throw new Error(`Add accepted file failed: ${response.status}`);
        }
    } catch (error) {
        console.error('Error adding accepted file:', error);
    }
};

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
            const {semester, accepted_file_type} = action.payload;
            state.availableTypes.data.push({accepted_file_type});
            addFileAccepted(semester, accepted_file_type);
        },
        removeFileType: (state, action) => {
            const {semester, typeToRemove} = action.payload;
            state.availableTypes.data = state.availableTypes.data.filter(type => type.accepted_file_type !== typeToRemove);
            deleteFileAccepted(semester, typeToRemove);
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
