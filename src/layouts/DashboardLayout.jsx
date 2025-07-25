import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaBox, FaHome, FaHourglassHalf, FaMapMarkedAlt, FaMoneyCheckAlt, FaUserEdit, FaUsers } from 'react-icons/fa';
//import useAuth from '../hooks/useAuth';
import UserLinks from './Dashboard/userLinks';
import SellerLinks from './Dashboard/SellerLinks';
import AdminLinks from './Dashboard/AdminLinks';
import useRole from '../hooks/useRole';



const DashboardLayout = () => {
    const [role, roleLoading] = useRole();
    if (roleLoading) return <p className="p-4">Loading role...</p>;
    console.log(role);
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* page content here */}
                <Outlet></Outlet>
                {/* page content here */}
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}

                    <Link to='/'><img src="https://i.ibb.co/0VskKqhF/logo.jpg" alt="Logo" /></Link>

                    {/* user dashboard */}
                    {
                        role === "user" && <UserLinks></UserLinks>
                    }


                    {/* seller dashboard */}
                    
                    {
                        role === "seller" && <SellerLinks></SellerLinks>
                    }

                    {/* admin links */}
                    {/* {
                        user?.role === "admin" && <AdminLinks></AdminLinks>
                    } */}
                    
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;