import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrintersabc } from "../../store/PrintersabcSlice";

const PrinterList = () => {
  const dispatch = useDispatch();
  const { isLoading, printerList, error } = useSelector((state) => state.printersabc);
  useEffect(() => {
    dispatch(fetchPrintersabc());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // console.log(printerList);
  return (
    <div>
      {printerList.data.map((printer, index) => (
        <li key={index}>
          <strong>Printer ID:</strong> {printer.printer_id}<br />
          <strong>Brand:</strong> {printer.brand_name}<br />
          <strong>Model:</strong> {printer.printer_model}<br />
          {/* ... other properties */}
        </li>
      ))}
    </div>

  );
};

export default PrinterList;