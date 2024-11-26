import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


export const addSemester = async (semesterDTO) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/addUltilityOfSemester`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(semesterDTO)
      }
    );
    if (!response.ok) {
      toast.error("Thêm học kỳ thất bại");
      throw new Error('thêm học kỳ thất bại');
    }
    toast.success("Thêm học kỳ thành công");
  } catch (error) {
    console.error('Error adding semester:', error);
  }
}

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
    const token = Cookies.get('jwt');
    if (token) {
      try {

      const currentDate = new Date().toLocaleDateString('en-CA');
      fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Ultilities/getUltilityByCurrentDate?currentDate=${currentDate}`, {
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json())
        .then(data => {
          setSemester(data.data[0]);
          // console.log(data.data[0]);
        })
        .catch(error => {
          console.error('Error getting ultility by current date:', error);
        });
      }catch (error) {
        console.error('Error decoding token:', error);
        // Handle token decoding errors, e.g., clear the token or redirect to login
    }
    }
  }, []);


  return (
    <SemesterContext.Provider value={semester}>
      {children}
    </SemesterContext.Provider>
  );
};

export const useSemester = () => useContext(SemesterContext);