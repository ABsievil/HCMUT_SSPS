// fileTypeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const fileTypeSlice = createSlice({
    name: 'fileTypes',
    initialState: {
        types: [
            { value: '.doc', label: '.doc' },
            { value: '.docx', label: '.docx' },
            { value: '.pdf', label: '.pdf' },
            { value: '.txt', label: '.txt' },
            { value: '.rtf', label: '.rtf' },
        ],
    },
    reducers: {
        addFileType: (state, action) => {
            state.types.push(action.payload);
        },
        removeFileType: (state, action) => {
            state.types = state.types.filter(type => type.value !== action.payload);
        },
    },
});

export const { addFileType, removeFileType } = fileTypeSlice.actions;
export const selectFileTypes = (state) => state.fileTypes.types;
export default fileTypeSlice.reducer;
