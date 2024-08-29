import React, { useContext, useEffect, useState } from 'react';
import Template from "./template/Template";
import Dashboard from "./dashboard/Dashboard";
import Forms from "./forms/Forms";
import LoginAdmin from "./forms/LoginAdmin";
import Stadiums from "./component/Stadiums";
import ReservationAdmin from "./tables/ReservationAdmin";
import TrueReservationAdmin from "./tables/TrueReservationAdmin";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { StadProvider } from '../MainComponent/StadContext';
import { RserveProvider } from './RserveContext';
import { ContactUsProvider } from './ContactUsContext';
import ContactUsList from "./component/ContactUsList";
import { Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

function AppAdmin() {

    const navigate = useNavigate();

    useEffect(() => {
      const token = Cookies.get('admin_token');

      // If no token is found, redirect to the LoginAdmin page
      if (!token) {
        navigate('LoginAdmin');
      }
    }, [navigate]);

  return (
    <StadProvider>
        <RserveProvider>
            <ContactUsProvider>
                <Routes>
                    {/* Route for LoginAdmin outside of Template */}
                    <Route path="LoginAdmin" element={<LoginAdmin />} />

                    {/* Route for Template with nested routes */}
                    <Route element={<Template />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="stadiums" element={<Stadiums />} />
                        <Route path="reservationadmin" element={<ReservationAdmin />} />
                        <Route path="TrueReservationAdmin" element={<TrueReservationAdmin />} />
                        <Route path="getcontactus" element={<ContactUsList />} />
                        <Route path="forms" element={<Forms />} />
                        <Route path="/" element={<Navigate to="dashboard" />} />
                    </Route>
                </Routes>
            </ContactUsProvider>
        </RserveProvider>
    </StadProvider>
  );
}

export default AppAdmin;
