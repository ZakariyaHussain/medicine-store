import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
//import useAxios from '../../../hooks/useAxios';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile } = UseAuth();
    const [profilePicture, setProfilePicture] = useState('');
    const axiosInstance = useAxios();
    const location = useLocation();
    //console.log(location);
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);
                const userProfile = {
                    displayName: data.name,
                    photoUrl: profilePicture,
                }

                //update user info in database
                const userInfo = {
                    email: data.user,
                    role: 'user', //default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                //update user profile in firebase
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('profile picture updated');
                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }
    const handleImgUpload = async (e) => {
        const photo = e.target.files[0];
        console.log(photo);
        const formData = new FormData();
        formData.append('image', photo);
        const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
        //const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`);
        const res = await axios.post(imgUploadUrl, formData);
        setProfilePicture(res.data.data.url);
    }
    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
            <div className="card-body justify-center">
                <h1 className="text-5xl font-bold">Create an Account!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-600'>Type your name</p>
                        }

                        {/* image field */}
                        <label className="label">Your Picture</label>
                        <input type="file" onChange={handleImgUpload} className="input" placeholder="Your Profile Picture" />
                        {
                            errors.name?.type === 'required' && <p className='text-red-600'>Type your name</p>
                        }

                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === 'required' && <p className='text-red-600'>Type your valid email</p>
                        }

                        {/* password field */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-600'>password need at least 6 characters or longer</p>
                        }
                        {/* role field */}
                        <label className="label">Role</label>
                        <select name="" id="" className='border border-solid border-[#00000028] p-2 rounded'>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>
                        </select>


                        <div><p><small>Have an account?<Link to='/joinUs' className='btn btn-link'>Login</Link></small></p></div>
                        <button className="btn bg-[#22b1a4] text-neutral mt-4">Sign Up</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;