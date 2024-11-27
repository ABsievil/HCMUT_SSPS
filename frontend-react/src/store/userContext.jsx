import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const UserContext = createContext();

export const fetchUserId = createAsyncThunk(
    "fetchUserId",
    async (username) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getStudentIdByUsername/${username}`, {
          method: 'GET',
          credentials: 'include'
        })
        return response.json();
      } catch (error) {
        throw error; // Re-throw the error for handling in the rejected case
      }
    }
  );

export const UserProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        username: null,
        role: null,
        userId: null,
        isLoggedIn: false,
    });

    useEffect(() => {
        // const token = Cookies.get('jwt');
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const username = decodedToken.sub;
                const role = decodedToken.role;
                
                setUser({
                    username,
                    role,
                    isLoggedIn: true,
                });

                // Use fetchUserId async thunk to get user ID
                dispatch(fetchUserId(username))
                    .then((action) => {
                        if (action.payload && action.payload.data) {
                            setUser((prevUser) => ({
                                ...prevUser,
                                userId: action.payload.data,
                            }));
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user ID:', error);
                        // Handle error, e.g., show an error message to the user
                    });

            } catch (error) {
                console.error('Error decoding token:', error);
                // Handle token decoding errors, e.g., clear the token or redirect to login
            }
        }
    }, [dispatch]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);