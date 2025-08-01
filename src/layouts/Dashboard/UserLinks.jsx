import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
//import { NavLink } from 'react-router';

const UserLinks = () => {
    return (
        <>
            <li><NavLink to='/dashboard/paymentHistory'><FaHome className="inline mr-2" />Payment History</NavLink></li>
        </>
    );
};

export default UserLinks;