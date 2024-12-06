import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import "../Auth.css"; // Ensure you have the CSS with appropriate layout styles

function AuthenticatedLayout() {
  return (
    <div className="authenticated-layout">
      <Navbar/>
      <main>
        <Outlet /> {/* This renders the child route components */}
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
