// printerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  availablePrinters: [
    { id: '1234', name: 'HP LaserJet Pro M404dn', location: 'Phòng H6-101', status: 'Sẵn sàng', type: 'Laser' },
    { id: '1245', name: 'Epson WorkForce Pro WF-3720', location: 'Phòng H2-202', status: 'Đang bảo trì', type: 'Inkjet' },
    { id: '3456', name: 'Brother HL-L2350DW', location: 'Phòng H3-303', status: 'Sẵn sàng', type: 'Canon' },
    { id: '2234', name: 'HP LaserJet Pro M404dn', location: 'Phòng H1-101', status: 'Sẵn sàng', type: 'Laser' },
  ],
};

const printerSlice = createSlice({
  name: 'printers',
  initialState,
  reducers: {
    updatePrinterStatus: (state, action) => {
      const { id, status } = action.payload;
      const printer = state.availablePrinters.find(p => p.id === id);
      if (printer) {
        printer.status = status;
      }
    },
    addPrinter: (state, action) => {
      const newPrinter = action.payload;
      state.availablePrinters.push(newPrinter);
    },
  },
});

export const { updatePrinterStatus, addPrinter } = printerSlice.actions;
export const selectAvailablePrinters = (state) => state.printers.availablePrinters;
export default printerSlice.reducer;
