// printJobSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  printJobs: [
    { id: "12345", fileName: "congthuc.doc", totalPage: "100", date: "26/09/2024 2:22" },
    { id: "12346", fileName: "baitap.pdf", totalPage: "100", date: "26/09/2024 3:15" },
    { id: "12347", fileName: "doan.docx", totalPage: "100", date: "26/09/2024 4:30" },
  ],
  currentPrintJob: null
};

const printJobSlice = createSlice({
  name: 'printJobs',
  initialState,
  reducers: {
    addPrintJob: (state, action) => {
      state.printJobs.push(action.payload);
    },
    removePrintJob: (state, action) => {
      state.printJobs = state.printJobs.filter(job => job.id !== action.payload);
    },
    setCurrentPrintJob: (state, action) => {
      state.currentPrintJob = action.payload;
    }
  },
});

export const { addPrintJob, removePrintJob, setCurrentPrintJob } = printJobSlice.actions;
export const selectPrintJobs = (state) => state.printJobs.printJobs;
export const selectCurrentPrintJob = (state) => state.printJobs.currentPrintJob;

export default printJobSlice.reducer;