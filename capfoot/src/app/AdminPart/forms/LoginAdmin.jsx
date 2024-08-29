
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import logo from '../../../assets/img/Logo1.png'; // Ensure the path is correct
import axios from 'axios';
import Cookies from 'js-cookie';


function LoginAdmin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const onSubmit = async (data) => {
        try {
            const SendValues = {
                email: data.email,
                password: data.password
            };

            // Fetch CSRF token and set cookies
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Make the POST request with the CSRF token automatically handled by Laravel Sanctum
            const response = await axios.post('http://127.0.0.1:8000/api/ReqFormAdmin', SendValues, {
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log('Login successful', response.data);
                Cookies.set('admin_token', response.data.token, { expires: 7 }); // End In 7D
                Cookies.set('admin_name', response.data.name, { expires: 7 }); // End In 7D
                navigate('/wp-admin/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error.response.data);
        }
    };


    return(
                // <!-- Container -->
        <div className="flex flex-col h-screen bg-gray-100">
            {/* <!-- Auth Card Container --> */}
            <div className="grid place-items-center mx-2 my-10 sm:my-auto">
                <div className="flex">
                    <span className="text-center font-bold my-10 mx-auto">
                        <img className="h-[5rem] w-70 p-[0rem] logo" src={logo} alt="Logo" />
                    </span>
                </div>


                {/* <!-- Auth Card --> */}
                <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                    px-6 py-10 sm:px-10 sm:py-6
                    bg-white rounded-lg shadow-md lg:shadow-lg">

                    {/* <!-- Card Title --> */}
                    <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                        Login Admin
                    </h2>

                    <form className="mt-10" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        {/* <!-- Email Input --> */}
                        <label htmlFor="email" className="block text-2xs font-semibold text-gray-600 uppercase">E-mail</label>
                        <input id="email" type="email" name="email" placeholder="e-mail address" autoComplete="email"
                            className="block w-full py-3 px-1 mt-2 mb-4
                            text-gray-800 appearance-none
                            border-b-4 border-gray-200
                            focus:text-gray-500 focus:border-gray-200
                            outline-none focus:outline-none focus:ring-0"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Please enter a valid email address'
                                }
                            })}
                            />
                            {errors.email && <p className='text-sm text-red-400 mt-2'>{errors.email.message}</p>}

                        {/* <!-- Password Input --> */}
                        <label htmlFor="password" className="block mt-2 text-2xs font-semibold text-gray-600 uppercase">Password</label>
                        <input id="password" type="password" name="password" placeholder="*********" autoComplete="current-password"
                            className="block w-full py-3 px-1 mt-2 mb-4
                            text-gray-800 appearance-none
                            border-b-4 border-gray-200
                            focus:text-gray-500 focus:border-gray-200
                            outline-none focus:outline-none focus:ring-0"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 4,
                                    message: 'Password must be at least 8 characters long'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Password cannot exceed 20 characters'
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Password must contain at least one letter and one number'
                                }
                            })}
                            />
                            {errors.password && <p className='text-sm text-red-400 mt-2'>{errors.password.message}</p>}


                        {/* <!-- Auth Buttton --> */}
                        <button type="submit"
                            className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                            font-medium text-white uppercase
                            focus:outline-none hover:bg-gray-700 hover:shadow-none">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin;
