import React from 'react';
import { FaHourglassHalf, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router';

const AdminLinks = () => {
    return (
        <>
            <li><NavLink to='/dashboard/adminHome'><FaUsers className="inline mr-2" />Admin Home</NavLink></li>

            <li><NavLink to='/dashboard/manageUsers'><FaHourglassHalf className="inline mr-2" />Manage Users</NavLink></li>

            <li><NavLink to='/dashboard/manageCategory'><FaHourglassHalf className="inline mr-2" />Manage Category</NavLink></li>

            <li><NavLink to='/dashboard/paymentManagement'><FaHourglassHalf className="inline mr-2" />Payment Management</NavLink></li>

            <li><NavLink to='/dashboard/salesReport'><FaHourglassHalf className="inline mr-2" />Sales Report</NavLink></li>

            <li><NavLink to='/dashboard/manageBannerAdvertise'><FaHourglassHalf className="inline mr-2" />Manage Banner Advertise</NavLink></li>
        </>
    );
};

export default AdminLinks;