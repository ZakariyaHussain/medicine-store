import React from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
//import ProfastLogo from '../ProfastLogo/ProfastLogo';


const Navbar = () => {
    //const { user, logout } = UseAuth();
    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        <li><NavLink to='/sendparcel'>Send Parcel</NavLink></li>
        <li><NavLink to='/beARider'>Be A Rider</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
        {/* {
            user && <>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

            </>
        } */}

    </>
    //logout
    // const handleLogout = () => {
    //     logout()
    //         .then(() => {
    //             console.log('Logout Successful');
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            navItems
                        }
                    </ul>
                </div>
                
                <span className='btn btn-ghost text-xl'>
                    {/* <ProfastLogo></ProfastLogo> */}
                    logo
                </span>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navItems
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <Link className='btn btn-primary text-black'>Logout</Link>
                {/* {
                    user ? <Link onClick={handleLogout} className='btn btn-primary text-black'>Logout</Link> : <Link to='/login' className='btn btn-primary text-black'>Login</Link>
                } */}
            </div>
        </div>
    );
};

export default Navbar;