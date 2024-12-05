import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const addNewPrinterAsync = async (singlePrinter) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Printer/addPrinter`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(singlePrinter),
      }
    );
    if (!response.ok) {
      throw new Error('thêm máy in thất bại');
    }
    toast.success("Thêm máy in thành công")
  } catch (error) {
    console.error('Error disabling printer:', error);
  }
}

const enablePrinterAsync = async (printerId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Printer/enablePrinter/${printerId}`,
      {
        method: 'PUT',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error(`Enable printer failed: ${response.status}`);
    }
    // console.log('Printer enabled successfully');
    toast.success("Kích hoạt máy in thành công")
  } catch (error) {
    console.error('Error enabling printer:', error);
  }
};

const disablePrinterAsync = async (printerId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Printer/disablePrinter/${printerId}`,
      {
        method: 'PUT',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error(`Disable printer failed: ${response.status}`);
    }
    // console.log('Printer disabled successfully');
    toast.success("Dừng máy in thành công")
  } catch (error) {
    console.error('Error disabling printer:', error);
  }
};

export const fetchPrintersabc = createAsyncThunk(
  "fetchPrintersabc",
  async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Printer/getInforAllPrinter`, {
        method: 'GET',
        credentials: 'include'
      })
      return response.json();
    } catch (error) {
      throw error; // Re-throw the error for handling in the rejected case
    }
  }
);

const printersabcSlice = createSlice({
  name: 'printersabc',
  initialState: {
    isLoading: true, // Corrected typo for consistency
    printerList: [],
    error: null, // Use null for error state for clarity
  },
  reducers: {
    addPrinter: (state, action) => {
      const newPrinter = action.payload;
      newPrinter.state = true;
      state.printerList.data.push(newPrinter);
      addNewPrinterAsync(newPrinter);
    },
    disablePrinter: (state, action) => {
      const id = action.payload;
      const printer = state.printerList.data.find(p => p.printer_id === id);
      if (printer)
        printer.state = false;
      disablePrinterAsync(id);
    },
    enablePrinter: (state, action) => {
      const id = action.payload;
      const printer = state.printerList.data.find(p => p.printer_id === id);
      if (printer)
        printer.state = true;
      enablePrinterAsync(id);
    },
    
  }, // No reducers needed in this simplified case
  extraReducers: (builder) => { // Use extraReducers for handling async actions
    builder
      .addCase(fetchPrintersabc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrintersabc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.printerList = action.payload;
      })
      .addCase(fetchPrintersabc.rejected, (state, action) => {
        state.error = action.error.message; // Extract error message
      });
  },
});

export const { addPrinter, disablePrinter, enablePrinter } = printersabcSlice.actions;
export const selectPrinterList = (state) => state.printersabc;
export default printersabcSlice.reducer;