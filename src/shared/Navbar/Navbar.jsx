import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Globe } from 'lucide-react';
import UseAuth from '../../hooks/UseAuth';

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = () => {
    logout()
      .then(() => console.log('Logout Successful'))
      .catch(console.error);
  };

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/shop">Shop</NavLink></li>
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-sm px-4">
      {/* --- left: logo & mobile menu --- */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-[1]">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Medicine Store</Link>
      </div>

      {/* --- center nav links (desktop) --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* --- right: language, cart, auth --- */}
      <div className="navbar-end flex items-center gap-2">
        {/* language dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost btn-circle">
            <Globe className="w-5 h-5" />
          </button>
          <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box w-24 mt-3 p-2 shadow">
            <li><button>EN</button></li>
            <li><button>BN</button></li>
          </ul>
        </div>

        {/* cart icon */}
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <ShoppingCart className="w-5 h-5" />
            <span className="badge badge-sm indicator-item">2</span>
          </div>
        </Link>

        {/* auth / profile */}
        {user ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                <img src={user.photoURL || '/avatar.png'} alt="profile" />
              </div>
            </button>
            <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box w-40 mt-3 p-2 shadow">
              <li><Link to="/profile">Update Profile</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/joinUs" className="btn btn-primary btn-sm">Join Us</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
