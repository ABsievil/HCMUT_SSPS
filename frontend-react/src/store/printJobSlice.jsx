import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const sendPrintRequest = async (PrintDTO) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/print`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(PrintDTO)
            }
        );
        if (!response.ok) {
            throw new Error(`print failed: ${response.status}`);
        }
        toast.success("Đã gửi file về hệ thống")
    } catch (error) {
        console.error('Error sending print job request:', error);
    }
};

const printJobSlice = createSlice({
    name: "printJobs",
    initialState: {
        isLoading: true,
        Jobs: [],
        error: null,
    },
    reducers: {
        addPrintJob: (state, action) => {
            state.Jobs.push(action.payload);
            state.Jobs = state.Jobs.map((job, index) => ({ ...job, id: index }));
        },
        removePrintJob: (state, action) => {
            const removeJobId = action.payload;
            state.Jobs = state.Jobs.filter(job => job.id !== removeJobId);
            state.Jobs = state.Jobs.map((job, index) => ({ ...job, id: index }));
        },
        requestPrintJob: (state, action) => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            
            const next15minutes = new Date(currentDate.getTime() + 15 * 60000);
            const nextHours = next15minutes.getHours().toString().padStart(2, '0');
            const nextMinutes = next15minutes.getMinutes().toString().padStart(2, '0');
            const nextSeconds = next15minutes.getSeconds().toString().padStart(2, '0');

            const printJobId = action.payload;
            const printDTO = state.Jobs.filter(job => job.id === printJobId)[0];
            console.log(printDTO);
            const printDTOWithoutId = {
                username: printDTO.username,
                printerId: printDTO.printerId,
                printingDate: `${year}-${month}-${day}`,
                timeStart: `${hours}:${minutes}:${seconds}`,
                timeEnd: `${nextHours}:${nextMinutes}:${nextSeconds}`,
                fileName: printDTO.fileName,
                fileType: printDTO.fileType,
                numberPageOfFile: printDTO.numberPageOfFile,
                pageSize: printDTO.pageSize,
                numberSize: printDTO.numberSize,
                numberCopy: printDTO.numberCopy,
            };
            console.log(JSON.stringify(printDTOWithoutId));
            sendPrintRequest(printDTOWithoutId);

            // state.Jobs = state.Jobs.filter(job => job.id !== printJobId);
            // state.Jobs = state.Jobs.map((job, index) => ({ ...job, id: index }));
        }
    },
});

export const { addPrintJob, removePrintJob, requestPrintJob } = printJobSlice.actions;
export const selectPrintJobs = (state) => state.printJobs.Jobs;
export default printJobSlice.reducer;
