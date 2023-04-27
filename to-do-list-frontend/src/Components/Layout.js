import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import React from 'react';

export default function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};