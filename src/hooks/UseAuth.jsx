import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const useAuth = () => {
    //const authInfo = use(AuthContext);
    const authInfo = useContext(AuthContext);
    return authInfo;
};

export default useAuth;