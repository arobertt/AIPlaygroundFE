import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './configs/AppRoutes';



const container = document.getElementById("root");

if (container) {
    const root = createRoot(container);

    root.render (
        <BrowserRouter>
           <AppRoutes />
        </BrowserRouter>
    )
}


