






import React, { useState, useContext } from 'react';
import axios from '../axiosConfig';
import { FiEdit, FiLink, FiTrash2, FiX, FiAlertCircle } from 'react-icons/fi';
import { StadContext } from "../../MainComponent/StadContext";
import AddNewCreate from "../../../assets/img/icons/add-create-new.svg";
import ChevronRight from "../../../assets/img/icons/chevron-righ.svg";
import { useForm } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Breadcrumb from '../BreadcrumbNavigation/Breadcrumb';

const SnakAlert = ({ alertOpen, setAlertOpen, alertMessage }) => {
    return(
        <Snackbar
            open={alertOpen}
            autoHideDuration={5000} // Hide after 5 seconds
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Positioning
        >
            <Alert
                sx={{
                    fontWeight: 'bold',
                    zIndex: 100,
                }}
                onClose={() => setAlertOpen(false)} severity="success" variant="outlined">
                {alertMessage}
            </Alert>
        </Snackbar>
    )
}

const ArticleComponent = ({ stadium, toggleDeleteModal }) => {
    const [showIcons, setShowIcons] = useState(false);

    const handleMouseEnter = () => {
        setShowIcons(true);
    };

    const handleMouseLeave = () => {
        setShowIcons(false);
    };

    return (
        <article
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full sm:w-5/6 lg:w-5/6 mx-auto mt-10
                        shadow-none transition-shadow duration-200 cursor-pointer hover:shadow-lg hover:shadow-gray-700"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                src={stadium.path ? `http://127.0.0.1:8000/storage/${stadium.path}` : 'path/to/default/image.jpg'}
                alt={stadium.stadium_name || 'Default Image'}
                className="absolute inset-0 h-full w-full object-cover z-20 transition-all duration-700 hover:scale-110 hover:opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

            {showIcons && (
                <div className="absolute top-4 right-5 z-50 flex space-x-5 text-white">
                    <a onClick={() => toggleDeleteModal(stadium)} className="hover:text-red-600" title="Delete">
                        <FiTrash2 className="text-3xl" />
                    </a>
                </div>
            )}

            <h3 className="z-40 mt-3 text-3xl font-bold text-white">{stadium.stadium_name}</h3>
            <div className="z-40 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                Capacity: {stadium.stadium_many}
            </div>
        </article>
    );
};

const Stadiums = () => {
    const { stadiums, addStadium } = useContext(StadContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    // Delete Stadium Submission
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [selectedStadiumId, setSelectedStadiumId] = useState(null);

    const toggleDeleteModal = (data) => {
        setSelectedStadiumId(data);
        setModalDeleteOpen(!isModalDeleteOpen);
    };

    const handleDeleteSubmit = async () => {
        try {
            console.log(selectedStadiumId);

            // Fetch CSRF token and set cookies
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Make the DELETE request with the CSRF token automatically handled by Laravel Sanctum
            const response = await axios.delete('/deletestadium', {
                data: { id: selectedStadiumId.id },
                withCredentials: true,
            });

            setAlertMessage(`Stadium ${selectedStadiumId.stadium_name} deleted successfully.`);
            setAlertOpen(true);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete stadium');
        }

        setModalDeleteOpen(!isModalDeleteOpen);
    };

    // Add Stadium Submission
    const onSubmit = async (data) => {
        try {
            await addStadium(data); // Use the addStadium function from context
            setModalOpen(!isModalOpen); // Close modal after successful submission
        } catch (error) {
            console.error('Failed to submit the form', error);
        }
    };

    // Breadcrumb
    const breadcrumbItems = [
        // { label: 'Dashboard', href: '/wp-admin/dashboard' },
        { label: 'Stadiums', href: '/wp-admin/stadiums' },
        // { label: 'Project Nero', href: '#' },
      ];

    return (

        <>

        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


            {stadiums.map((stadium, index) => (
                <ArticleComponent key={index} stadium={stadium} toggleDeleteModal={toggleDeleteModal} />
            ))}


            <a onClick={() => toggleModal()} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full sm:w-5/6 lg:w-5/6 mx-auto mt-10 bg-white cursor-pointer">
                <img
                    src={AddNewCreate}
                    alt="add-create-new"
                    className="absolute inset-0 h-full w-full bg-cover bg-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

                <h3 className="z-10 mt-3 text-3xl font-bold text-white">Create New Stadium</h3>
            </a>

            {/* Modal for adding stadium */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-[25vw] max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add Stadium
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <form className="space-y-4" method='POST' onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label htmlFor="Stadium_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stadium Name</label>
                                        <input
                                            type="text"
                                            name="Stadium_name"
                                            id="Stadium_name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            placeholder="Stadium Name"
                                            {...register('Stadium_name', {
                                                required: 'Stadium Name is required',
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: 'Stadium name should contain only letters, numbers, and spaces'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Stadium name must be at least 2 characters long'
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Stadium name cannot exceed 30 characters'
                                                }
                                            })}
                                        />
                                        {errors.Stadium_name && <p className='text-sm text-red-400 mt-2'>{errors.Stadium_name.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="Stadium_many" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stadium Capacity</label>
                                        <input
                                            type="text"
                                            name="Stadium_many"
                                            id="Stadium_many"
                                            placeholder="Stadium capacity"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                            {...register('Stadium_many', {
                                                required: 'Stadium capacity is required',
                                                pattern: {
                                                    value: /^[0-9/]+$/i,
                                                    message: 'Stadium capacity should contain only numbers and the "/" character'
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: 'Stadium capacity must be at least 1 digit long'
                                                },
                                                maxLength: {
                                                    value: 7,
                                                    message: 'Stadium capacity cannot exceed 7 digits'
                                                }
                                            })}
                                        />
                                        {errors.Stadium_many && <p className='text-sm text-red-400 mt-2'>{errors.Stadium_many.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="file_upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Stadium Image</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="file_upload"
                                                className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="mt-2 text-sm font-medium text-gray-600">
                                                    Drop files to Attach, or
                                                    <span className="text-blue-600 underline ml-1">browse</span>
                                                </span>
                                                <input
                                                    type="file"
                                                    id="file_upload"
                                                    className="hidden"
                                                    accept="image/png,image/jpeg"
                                                    {...register('file_upload', {
                                                        required: 'File is required'
                                                    })}
                                                />
                                            </label>
                                        </div>
                                        {errors.file_upload && <p className='text-sm text-red-400 mt-2'>{errors.file_upload.message}</p>}
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

            {/* Modal for deleting stadium */}
            {isModalDeleteOpen && (
                <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center px-4 sm:w-full">
                    <div className="relative mx-auto shadow-xl rounded-md bg-white max-w-md">
                        <div className="flex justify-end p-2">
                            <button onClick={toggleDeleteModal} type="button"
                                className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <FiX size={25} />
                            </button>
                        </div>

                        <div className="p-6 pt-0 text-center">
                            <FiAlertCircle size={80} className="text-red-600 mx-auto" />
                            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this {selectedStadiumId.stadium_name}?</h3>
                            <a onClick={handleDeleteSubmit}
                                className="cursor-pointer text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </a>
                            <a onClick={toggleDeleteModal}
                                className="cursor-pointer text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                data-modal-toggle="delete-user-modal">
                                No, cancel
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <SnakAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} alertMessage={alertMessage} />
        </div>
    </>
    );
};

export default Stadiums;



