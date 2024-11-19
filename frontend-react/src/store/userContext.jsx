import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: null,
        role: null,
        userId: null,
        isLoggedIn: false,
    });

    useEffect(() => {
        const token = Cookies.get('jwt');
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
                
                // Fetch user ID asynchronously
                fetch(`${import.meta.env.VITE_REACT_APP_BE_API_URL}/api/v1/Student/getStudentIdByUsername`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username}),
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(data => {
                        setUser((prevUser) => ({
                            ...prevUser,
                            userId: data.data,
                        }));
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
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);