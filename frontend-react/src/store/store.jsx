// store.js
import { configureStore } from '@reduxjs/toolkit';
import fileTypeReducer from './fileTypeSlice';
import printersabcSlice from './PrintersabcSlice';
import personalInforReducer from './personalInforSlice'
import adminInforReducer from './adminInforSlice';
import logReducer from './printLogSlice';
import printJobReducer from './printJobSlice';

const store = configureStore({
  reducer: {
    fileTypes: fileTypeReducer,
    printersabc: printersabcSlice, // todo: rename to printerListReducer
    personalInfor: personalInforReducer,
    adminInfor: adminInforReducer,
    logs: logReducer,
    printJob: printJobReducer,
  },
});

export default store;
