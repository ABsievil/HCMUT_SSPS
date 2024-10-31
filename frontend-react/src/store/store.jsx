// store.js
import { configureStore } from '@reduxjs/toolkit';
import printerReducer from './printersSlice';
import printJobReducer from './printJobSlice';
import fileTypeReducer from './fileTypeSlice';

const store = configureStore({
  reducer: {
    printers: printerReducer,
    printJobs: printJobReducer,
    fileTypes: fileTypeReducer,
  },
});

export default store;
