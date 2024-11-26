// store.js
import { configureStore } from '@reduxjs/toolkit';
import fileTypeReducer from './fileTypeSlice';
import printersabcSlice from './PrintersabcSlice';
import personalInforReducer from './personalInforSlice';
import adminInforReducer from './adminInforSlice';
import printLogReducer from './printLogSlice';
import printJobReducer from './printJobSlice';
import paymentLogReducer from './paymentLogSlice';
import paymentReducer from './paymentSlice';


const store = configureStore({
  reducer: {
    fileTypes: fileTypeReducer,
    printersabc: printersabcSlice, // Updated key to reflect the renamed reducer
    personalInfor: personalInforReducer,
    adminInfor: adminInforReducer,
    logs: printLogReducer, // Corrected reducer name (was previously `logReducer`)
    printJobs: printJobReducer,
    paymentLogs: paymentLogReducer, // Added missing reducer for consistency
    payment: paymentReducer,
  },
});

export default store;
