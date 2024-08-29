import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AdminAxios from '../AdminPart/axiosConfig';

export const StadContext = createContext();

export const StadProvider = ({ children }) => {
    const [stadiums, setStadiums] = useState([]);

    const fetchStadiums = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/stadiums', {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            console.log(response.data); // Log the data to verify
            setStadiums(response.data); // Set the stadium data to state
        } catch (error) {
            console.error('Error fetching stadium data:', error);
            // Optional: Set up a fallback or retry mechanism
        }
    };

    useEffect(() => {
        fetchStadiums(); // Call the function to fetch data on component mount
    }, []); // Empty dependency array ensures it runs only once

    const addStadium = async (data) => {
        try {
            const DataForm = new FormData();
            DataForm.append('path', data.file_upload[0]);
            DataForm.append('stadium_name', data.Stadium_name);
            DataForm.append('stadium_many', data.Stadium_many);

            // Fetch CSRF token and set cookies
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Make the POST request with the CSRF token automatically handled by Laravel Sanctum
            const response = await AdminAxios.post('http://127.0.0.1:8000/api/addstadium', DataForm, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Add the newly added stadium to the state
            setStadiums(prevStadiums => [...prevStadiums, response.data]);

            console.log('Stadium added successfully');
        } catch (error) {
            console.error('Failed to add stadium', error);
        }
    };

    return (
        <StadContext.Provider value={{ stadiums, addStadium }}>
            {children}
        </StadContext.Provider>
    );
};
