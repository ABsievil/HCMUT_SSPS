import { createContext, useContext, useState, useEffect } from 'react';

const SemesterContext = createContext();

export const SemesterProvider = ({ children }) => {
    const [semester, setSemester] = useState({
        semester: null,
        default_pages: null,
        date_reset_default_page: null,
        pagePrice: false,
        date_start: false,
        date_end: false,
    });

    useEffect(() => {
            const currentDate = new Date().toLocaleDateString('en-CA');
            console.log(currentDate);
            fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/getUltilityByCurrentDate?currentDate=${currentDate}`, {
                method: 'GET',
                credentials: 'include'
            }).then(response => response.json())
                .then(data => {
                    setSemester(data.data[0]);
                    console.log(data.data[0]);
                })
                .catch(error => {
                    console.error('Error getting ultility by current date:', error);
                });
    }, []);

    return (
        <SemesterContext.Provider value={semester}>
            {children}
        </SemesterContext.Provider>
    );
};

export const useSemester = () => useContext(SemesterContext);