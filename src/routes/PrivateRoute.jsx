import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';


const PrivateRoutes = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    console.log(location);

    if(loading){
        return <div className='text-center py-4'><span className="loading loading-spinner loading-xl"></span></div>
    }
    if(!user){
        return <Navigate to='/login' state={{from: location.pathname}}></Navigate>
    }
    return children;
};

export default PrivateRoutes;