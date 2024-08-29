import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { StadContext } from '../StadContext';
import { RserveContext } from '../../AdminPart/RserveContext';
import Loading from '../../ExternFun/Loading';
import axios from 'axios';
import { ComponentGetLastSunday, ComponentGetNextSunday } from './DateCalculator';
import { SnakAlert, SnakAlertError } from '../../AlertMessage/SnakAlert';

export default function Reserving() {
    const { stadiums } = useContext(StadContext);
    const { rserves } = useContext(RserveContext);
    const [stadium, setStadium] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedOption, setSelectedOption] = useState('Monday');
    const options = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isError, setIsError] = useState(false);


    const [timeSlots, setTimeSlots] = useState([
        '8 - 9 AM', '9 - 10 AM', '10 - 11 AM', '11 - 12 PM',
        '12 - 1 PM', '1 - 2 PM', '2 - 3 PM', '3 - 4 PM',
        '4 - 5 PM', '5 - 6 PM', '6 - 7 PM', '7 - 8 PM',
        '8 - 9 PM', '9 - 10 PM', '10 - 11 PM', '11 - 12 AM'
    ]);



    useEffect(() => {
        if (stadiums && id) {
            const Fstadium = stadiums.find(stadium => stadium.id === parseInt(id, 10));
            setStadium(Fstadium);
        }
    }, [stadiums, id]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const toggleModal = (time) => {
        setSelectedTime(time);
        setModalOpen(!isModalOpen);
    };

    const onSubmit = async (data) => {
        try {
            const SendValues = {
                stadium_id: stadium.id,
                fullname: data.Fname,
                phone: data.Phone,
                time_day: selectedOption,
                time_hour: selectedTime,
            };

            // Fetch CSRF token and set cookies
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Make the POST request with the CSRF token automatically handled by Laravel Sanctum
            const response = await axios.post('http://127.0.0.1:8000/api/receiving', SendValues, {
                withCredentials: true,
            });

            // console.log(response.data);
            // alert('Reservation successful');
            setAlertMessage(`Reservation ${selectedTime} At ${selectedOption} successfully.`);
            setIsError(false);
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage(`Failed to Reservation ${selectedTime} At ${selectedOption}.`);
            setIsError(true);
            setAlertOpen(true);
        }
        setModalOpen(!isModalOpen);
    };

    useEffect(() => {
        console.log('Rserves from context:', rserves);
    }, [rserves]);

    if (!stadium) {
        return <Loading />;
    }

    return (
        <section className="container m-auto mt-[30px] pt-5 px-0 md:pt-5 md:px-0">
            <section className="relative w-full transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1">
            <img
                className="w-full xl:max-w-6xl xl:max-h-[40vw] xl:h-[50vw] lg:h-[60vw] md:h-[70vw] sm:h-[75vw] h-[80vw] rounded-md object-cover"
                src={`http://127.0.0.1:8000/storage/${stadium.path}`}
                alt={stadium.path.split('/').pop()}
                />
                <div className="content bg-white p-2 pt-8 md:p-8 pb-12 lg:max-w-lg w-full lg:absolute top-48 right-5">
                    <ComponentGetLastSunday />

                    <div className='mt-2 md:mt-5 mb-2 md:mb-3'>
                        <h2 className="text-3xl font-semibold mb-1 md:mb-2">{stadium.stadium_name} <span>{stadium.stadium_many}</span></h2>
                        <h2 className="text-1xl font-bold text-gray-800 mb-2">Times Available</h2>
                    </div>

                    <div className="flex justify-center font-bold text-sm">
                        <div className="max-w-md mx-auto mt-3 mb-2">
                            <div className="relative flex items-center">
                                <label htmlFor="single-select" className="block text-lg font-bold text-gray-700 mr-3">Days:</label>
                                <div className="mt-1 relative">
                                    <select
                                        id="single-select"
                                        name="single-select"
                                        value={selectedOption}
                                        onChange={handleChange}
                                        className="block w-full pl-[0.55rem] pr-[5.5rem] py-2 text-base focus:outline-none sm:text-sm border-3 border-black rounded-md"
                                    >
                                        {options.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {timeSlots.map((time, index) => {
                        const isReserved = rserves.some(
                            (rserve) =>
                                rserve.time_at.time_hour === time &&
                                rserve.is_confirmed === 1 &&
                                rserve.time_at.time_day === selectedOption &&
                                rserve.stadium_id === stadium.id
                        );

                        return (
                            <button
                                key={index}
                                onClick={() => toggleModal(time)}
                                className={`m-1 md:m-2 p-3 px-5 ${
                                    isReserved ? 'bg-red-600 cursor-not-allowed' : 'bg-black'
                                } text-white font-bold text-sm hover:bg-purple-800`}
                                disabled={isReserved}
                            >
                                {time} {isReserved && '(Reserved)'}
                            </button>
                        );
                    })}
                    <ComponentGetNextSunday />
                </div>
            </section>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-[25vw] max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Contact Confirmation
                                </h3>
                                <button
                                    type="button"
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal}>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" method='POST' onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label htmlFor="Fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                        <input
                                            type="text"
                                            name="Fname"
                                            id="Fname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Full Name"
                                            {...register('Fname', {
                                                required: 'Full Name is required',
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/i,
                                                    message: 'Name should contain only letters and spaces'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Full Name must be at least 2 characters long'
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Full Name cannot exceed 30 characters'
                                                }
                                            })}
                                        />
                                        {errors.Fname && <p className='text-sm text-red-400 mt-2'>{errors.Fname.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="Phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                        <input
                                            type="text"
                                            name="Phone"
                                            id="Phone"
                                            placeholder="Phone"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            required
                                            {...register('Phone', {
                                                required: 'Phone number is required',
                                                pattern: {
                                                value: /^[+]?[1-9]?[0-9]?[-.\s]?[(]?[0-9]{1,4}[)]?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/i,
                                                message: 'Phone number should be valid and may contain numbers, spaces, parentheses, dashes, and an optional plus sign'
                                                },
                                                minLength: {
                                                value: 10,
                                                message: 'Phone number must be at least 10 digits long'
                                                },
                                                maxLength: {
                                                value: 20,
                                                message: 'Phone number cannot exceed 20 digits'
                                                }
                                            })}
                                        />
                                        {errors.Phone && <p className='text-sm text-red-400 mt-2'>{errors.Phone.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-gray-900 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-black dark:focus:ring-blue-800">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
        </section>
    );
}
