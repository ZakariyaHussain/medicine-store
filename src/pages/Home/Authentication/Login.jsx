import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import UseAuth from '../../../hooks/UseAuth';

//import UseAuth from '../../../hooks/UseAuth';


const Login = () => {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const { signInUser } = UseAuth();
    const location = useLocation();
    //console.log(location);
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    //login submit
    const onSubmit = data =>{
        signInUser(data.email, data.password)
        .then(result =>{
            console.log(result.user);
            navigate(from);
        })
        .catch(error =>{
            console.log(error);
        })
        console.log(data);
    }
    return (
        <div>
            <div>
                <h2 className='text-3xl font-extrabold'>Welcome Back</h2>
                
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register("email")} className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" {...register("password", {required: true, minLength: 3})} className="input" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-600'>password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-600'>password is less then 3 characters</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>

                    <button className="btn btn-primary text-black mt-4">Login Now</button>
                </fieldset>
                <p><small>Are you new this website?<Link to='/register' state={{from}} className='btn btn-link'>Register</Link></small></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;