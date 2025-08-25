import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => (
    <>
        <Navbar />
        <div className="container-fluid">
            <div className="col-md-10 col-12 p-3">
                {/* All nested routes render here */}
                <Outlet />
            </div>
        </div>
    </>
);

export default Layout;