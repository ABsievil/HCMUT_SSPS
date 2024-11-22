import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const addPrinter = createAsyncThunk(
    'addPrinter',
    async (singlePrinter) => {
        console.log("fetching....");
        console.log(JSON.stringify(singlePrinter));
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
    }
);


export const enablePrinter = async (printerId) => {
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
        console.log('Printer enabled successfully');
        toast.success("Kích hoạt máy in thành công")
    } catch (error) {
        console.error('Error enabling printer:', error);
    }
};

export const disablePrinter = async (printerId) => {
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
        console.log('Printer disabled successfully');
        toast.success("Dừng máy in thành công")
    } catch (error) {
        console.error('Error disabling printer:', error);
    }
};
