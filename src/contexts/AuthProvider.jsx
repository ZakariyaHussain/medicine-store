import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign in user
    const signInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign in user with google
    const signInGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, provider); 
    }

    //update user profile
    const updateUserProfile = profileInfo =>{
        return updateProfile(auth.currentUser, profileInfo);
    }

    //sign out
    const logout = () =>{
        setLoading(true);
        return signOut(auth);
    }
    
    //state change
    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            //console.log('user in the auth state change', currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    },[])
    
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInGoogle,
        updateUserProfile,
        logout

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;