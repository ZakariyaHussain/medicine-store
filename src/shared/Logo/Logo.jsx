import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to="/" className="btn btn-ghost text-xl"><img src="https://i.ibb.co/0VskKqhF/logo.jpg" alt="Logo" /></Link>
        </div>
    );
};

export default Logo;