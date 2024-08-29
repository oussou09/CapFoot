import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { SnakAlert, SnakAlertError } from './AlertMessage/SnakAlert';

export default function Contact() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const onSubmit = async (data) => {
        try {
            const SendValues = {
                name: data.name,
                email: data.email,
                message: data.message,
            };

            // Fetch CSRF token and set cookies
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Make the POST request with the CSRF token automatically handled by Laravel Sanctum
            const response = await axios.post('http://127.0.0.1:8000/api/storecontactus', SendValues, {
                withCredentials: true,
            });

            console.log(response.data);
            setAlertMessage(
                `Hello ${data.name}! We received your message successfully. We will respond to you as fast as we can at your email ${data.email}.`
            );
            setIsError(false);
            setAlertOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage(`Sorry ${data.name}!\n\nFailed to send your message.`);
            setIsError(true);
            setAlertOpen(true);
        }
    };

    return(

<div className="bg-white cursor-default">

      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold pb-4 my-10">Contact Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 animate-fadeIn">
          <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
            <h3 className="text-xl font-bold">Call Us</h3>
            <p className="text-white mt-2">+212 613583510</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
            <h3 className="text-xl font-bold">Email Us</h3>
            <p className="text-white mt-2">oussamaelamrani09@gmail.com</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-black bordebg-black bg-opacity-50 border-2 border-white border-opacity-30 hover:bg-green-200 transition-colors">
            <h3 className="text-xl font-bold">Visit Us</h3>
            <p className="text-white mt-2">JG45+M97, Casablanca</p>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-2xl font-bold text-center">Send Us A Message</h2>
        <form className="max-w-2xl mx-auto mt-8 space-y-8" method='POST' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold">Name</label>
            <input type="text" id="name" name="name" className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-opacity-70 transition"
                {...register('name', {
                    required: 'Name is required',
                    pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: 'Name should contain only letters and spaces'
                    },
                    minLength: {
                        value: 5,
                        message: 'Name must be at least 2 characters long'
                    },
                    maxLength: {
                        value: 50,
                        message: 'Name cannot exceed 30 characters'
                    }
                })}
            />
            {errors.name && <p className='text-sm text-red-400 mt-2'>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
            <input type="text" id="email" name="email" className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-opacity-70 transition"
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address'
                    },
                    maxLength: {
                        value: 50,
                        message: 'Email cannot exceed 50 characters'
                    }
                })}
            />
            {errors.email && <p className='text-sm text-red-400 mt-2'>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-bold">Message</label>
            <textarea id="message" name="message" rows="5" className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-opacity-70 transition"
                {...register('message', {
                    required: 'Message is required',
                    minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters long'
                    },
                    maxLength: {
                        value: 500,
                        message: 'Message cannot exceed 500 characters'
                    },
                    pattern: {
                        value: /^[A-Za-z0-9 .,!?'"-]+$/i,
                        message: 'Message can only contain letters, numbers, and basic punctuation'
                    }
                })}
            ></textarea>
            {errors.message && <p className='text-sm text-red-400 mt-2'>{errors.message.message}</p>}
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 transition-colors">Send Message</button>
        </form>
      </section>
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8">
          <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
            <h3 className="text-xl font-bold">What are your operating hours?</h3>
            <p className="mt-2 text-gray-700">We operate from 9 AM to 5 PM, Monday to Friday.</p>
          </div>
          <div className="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4">
            <h3 className="text-xl font-bold">How can I book an appointment?</h3>
            <p className="mt-2 text-gray-700">You can book an appointment through our website or by calling our office.</p>
          </div>
        </div>
      </section>
      <footer className="bg-gray-700 text-white text-center py-4 md:py-6 lg:py-8">
        <p className="text-sm md:text-base lg:text-lg">
            &copy; Copyright CapFoot 2024. All rights reserved. Made By Oussama.
        </p>
        </footer>
        {/* Use the appropriate alert component based on the error state */}
        {isError ? (
            <SnakAlertError
                alertOpen={alertOpen}
                alertMessage={alertMessage}
                onClose={() => setAlertOpen(false)}
            />
        ) : (
            <SnakAlert
                alertOpen={alertOpen}
                alertMessage={alertMessage}
                onClose={() => setAlertOpen(false)}
            />
        )}
    </div>

    );

}
