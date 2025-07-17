import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
//import ProfastLogo from '../shared/ProfastLogo/ProfastLogo';
import { FaBox, FaHome, FaHourglassHalf, FaMapMarkedAlt, FaMoneyCheckAlt, FaUserEdit, FaUsers } from 'react-icons/fa';

const DashboardLayout = () => {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label> */}


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

                    <li><NavLink to='/'><FaHome className="inline mr-2" />Home</NavLink></li>

                    <li><NavLink to='/dashboard/ManageMedicine'><FaBox className="inline mr-2" />Manage Medicine</NavLink></li>

                    <li><NavLink to='/dashboard/paymentHistory'><FaMoneyCheckAlt className="inline mr-2" />Payment History</NavLink></li>

                    <li><NavLink to='/dashboard/track'><FaMapMarkedAlt className="inline mr-2" />Track a Package</NavLink></li>

                    <li><NavLink to='/dashboard/profile'><FaUserEdit className="inline mr-2" />Update Profile</NavLink></li>

                    {/* riders links */}
                    <li><NavLink to='/dashboard/activeRiders'><FaUsers className="inline mr-2" />Active Riders</NavLink></li>

                    <li><NavLink to='/dashboard/pendingRiders'><FaHourglassHalf className="inline mr-2" />Pending Riders</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;