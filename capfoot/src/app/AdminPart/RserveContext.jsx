// RserveContext.jsx







import React, { createContext, useState, useEffect } from 'react';
import axiosUser from './axiosUser';
import AdminAxios from './axiosConfig';

export const RserveContext = createContext();

export const RserveProvider = ({ children }) => {
  const [rserves, setRserve] = useState([]);

  useEffect(() => {
    const fetchRserve = async () => {
      try {
        const response = await axiosUser.get('/datareceiving', {
          withCredentials: true,
        });
        setRserve(response.data);
      } catch (error) {
        console.error('Error fetching reserving data:', error);
      }
    };

    fetchRserve();
  }, []);

  const handleSubmitConfirmationContext = async (id, isConfirmed) => {
    const SendValue = {
      id: id,
      is_confirmed: isConfirmed === "true" ? 1 : 0,
    };

    try {
      await AdminAxios.post('/updateconfirmation', SendValue);
      console.log('Confirmation status updated successfully');

      // Update the state with the new confirmation status
      setRserve(prevRserves =>
        prevRserves.map(rserve =>
          rserve.id === id ? { ...rserve, is_confirmed: SendValue.is_confirmed } : rserve
        )
      );
    } catch (error) {
      console.error('Failed to update confirmation status', error);
    }
  };

  return (
    <RserveContext.Provider value={{ rserves, handleSubmitConfirmationContext }}>
      {children}
    </RserveContext.Provider>
  );
};

























/*
import React, { createContext, useState, useEffect } from 'react';
import axios from './axiosConfig';

export const RserveContext = createContext();

export const RserveProvider = ({ children }) => {
  const [rserves, setRserve] = useState([]);

  useEffect(() => {
    const fetchRserve = async () => {
      try {
        const response = await axios.get('/datareceiving', {
          withCredentials: true,
        });
        setRserve(response.data);
      } catch (error) {
        console.error('Error fetching reserving data:', error);
      }
    };

    fetchRserve();
  }, []);

  return (
    <RserveContext.Provider value={{ rserves }}>
      {children}
    </RserveContext.Provider>
  );
};
*/
