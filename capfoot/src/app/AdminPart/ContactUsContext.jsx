import React, { createContext, useState, useEffect } from 'react';
import axios from './axiosConfig';

// Create the context
export const ContactUsContext = createContext();

// Create the provider component
export const ContactUsProvider = ({ children }) => {
    const [contactUsData, setContactUsData] = useState([]);

    useEffect(() => {
        const fetchContactUsData = async () => {
            try {
                const response = await axios.get('/getcontactus', {
                    withCredentials: true,
                });
                setContactUsData(response.data);
            } catch (error) {
                console.error('Error fetching contact us data:', error);
            }
        };

        fetchContactUsData();
    }, []);

    return (
        <ContactUsContext.Provider value={{ contactUsData }}>
            {children}
        </ContactUsContext.Provider>
    );
};
