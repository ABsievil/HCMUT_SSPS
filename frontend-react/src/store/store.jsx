// store.js
import { configureStore } from '@reduxjs/toolkit';
import printJobReducer from './printJobSlice';
import fileTypeReducer from './fileTypeSlice';
import printersabcSlice from './PrintersabcSlice';
import personalInforReducer from './personalInforSlice'
import adminInforReducer from './adminInforSlice';
const store = configureStore({
  reducer: {
    printJobs: printJobReducer,
    fileTypes: fileTypeReducer,
    printersabc: printersabcSlice, // todo: rename to printerListReducer
    personalInfor: personalInforReducer,
    adminInfor: adminInforReducer,
  },
});

export default store;
