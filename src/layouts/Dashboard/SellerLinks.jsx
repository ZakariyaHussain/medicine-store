import React from 'react';
import { FaBox, FaHome, FaMapMarkedAlt, FaMoneyCheckAlt, FaUserEdit } from 'react-icons/fa';
import { NavLink } from 'react-router';

const SellerLinks = () => {
    return (
        <>
            <li><NavLink to='/dashboard/sellerHome'><FaHome className="inline mr-2" />Seller Home</NavLink></li>

            <li><NavLink to='/dashboard/ManageMedicine'><FaBox className="inline mr-2" />Manage Medicine</NavLink></li>

            <li><NavLink to='/dashboard/paymentHistory'><FaMoneyCheckAlt className="inline mr-2" />Payment History</NavLink></li>

            <li><NavLink to='/dashboard/askForAdvertisement'><FaMapMarkedAlt className="inline mr-2" />Ask For Advertisement</NavLink></li>

            <li><NavLink to='/dashboard/profile'><FaUserEdit className="inline mr-2" />Update Profile</NavLink></li>
        </>
    );
};

export default SellerLinks;