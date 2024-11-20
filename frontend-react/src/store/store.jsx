// store.js
import { configureStore } from '@reduxjs/toolkit';
import printerReducer from './printersSlice';
import printJobReducer from './printJobSlice';
import fileTypeReducer from './fileTypeSlice';
import printersabcSlice from './PrintersabcSlice';
import singlePrinterReducer from './singlePrinterSlice'
import personalInforReducer from './personalInforSlice'

const store = configureStore({
  reducer: {
    printers: printerReducer,
    printJobs: printJobReducer,
    fileTypes: fileTypeReducer,
    printersabc: printersabcSlice, // todo: rename to printerListReducer
    singlePrinter: singlePrinterReducer,
    personalInfor: personalInforReducer
  },
});

export default store;
