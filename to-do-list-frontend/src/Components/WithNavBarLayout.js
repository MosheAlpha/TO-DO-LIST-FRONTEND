import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import React from 'react';

export default function WithNavBarLayout() {
    return (
    <>
        <NavBar />
        <Outlet />
    </>
    );
};