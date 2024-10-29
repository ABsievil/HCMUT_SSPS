// store.js
import { configureStore } from '@reduxjs/toolkit';
import printerReducer from './printersSlice';
import printJobReducer from './printJobSlice';

const store = configureStore({
  reducer: {
    printers: printerReducer,
    printJobs: printJobReducer,
  },
});

export default store;
