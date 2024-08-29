import React, { useEffect, useState, useContext  } from 'react';
import { FiEye, FiTrash2, FiX, FiAlertCircle   } from 'react-icons/fi';
import axios from '../axiosConfig';
import Loading from '../../ExternFun/Loading';
import { ContactUsContext } from '../ContactUsContext';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Breadcrumb from '../BreadcrumbNavigation/Breadcrumb';

export default function ContactUsList() {

    const { contactUsData } = useContext(ContactUsContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const toggleModal = (data) => {
        setSelectedContactId(data)
      setModalOpen(!isModalOpen);
  };

  const handleSubmit = async () => {
    try {
        console.log(selectedContactId);

        // Fetch CSRF token and set cookies
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        });

        // Make the DELETE request with the CSRF token automatically handled by Laravel Sanctum
        const response = await axios.delete('/deletecontactus', {
            data: { id: selectedContactId.id },
            withCredentials: true,
        });

        setAlertMessage(`Message of ${selectedContactId.name} deleted successfully.`);
        setAlertOpen(true);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete contact');
    }

    setModalOpen(!isModalOpen);
};

    // Breadcrumb
    const breadcrumbItems = [
        // { label: 'Dashboard', href: '/wp-admin/dashboard' },
        { label: 'Messages', href: '/wp-admin/getcontactus' },
        // { label: 'Project Nero', href: '#' },
      ];

    if (!contactUsData) {
        return <Loading />;
    }



    const SnakAlert = () => {
        return(
            <Snackbar
                open={alertOpen}
                autoHideDuration={5000} // Hide after 6 seconds
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
    return (
        <>
        <Breadcrumb items={breadcrumbItems} />

        <section className="container mx-auto pt-10 px-0 md:pt-10 md:px-0">
            <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 xl:grid-cols-3">
                {contactUsData.map((contact, index) => (
                <div key={index}
                className="relative group rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark m-4 transition duration-400 ease-in-out hover:shadow-lg hover:bg-gray-100"
                >
                    <div className="flex items-center gap-3 py-5 px-6">
                        <div className="h-10 w-10 rounded-full">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="User" />
                        </div>
                        <div>
                            <h4 className="font-medium text-black dark:text-black">{contact.name}</h4>
                            <p className="text-sm">{contact.email}</p>
                        </div>
                    </div>

                    <div className="p-6">
                        <h4 className="mb-3 text-xl font-semibold text-black hover:text-primary dark:text-black dark:hover:text-primary">
                            <a href={`mailto:${contact.email}`} title={`Reply to ${contact.email}`}>Message</a>
                        </h4>
                        <p>{contact.message}</p>
                    </div>

                    {/* Icons that appear on hover */}
                    <div className="absolute top-2 right-2 flex space-x-4 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-blue-600">
                            <FiEye size={25} />
                        </a>
                        <a onClick={() => toggleModal(contact)} className="text-gray-600 hover:text-red-600">
                            <FiTrash2 size={25} />
                        </a>
                    </div>
                </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center px-4">
                    <div className="relative mx-auto shadow-xl rounded-md bg-white max-w-md">

                        <div className="flex justify-end p-2">
                            <button onClick={toggleModal} type="button"
                                className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                    <FiX size={25} />
                            </button>
                        </div>

                        <div className="p-6 pt-0 text-center">
                            <FiAlertCircle size={80} className="text-red-600 mx-auto" />
                            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this user?</h3>
                            <a href="#" onClick={handleSubmit}
                                className="cursor-pointer text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </a>
                            <a onClick={toggleModal}
                                className="cursor-pointer text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                                data-modal-toggle="delete-user-modal">
                                No, cancel
                            </a>
                        </div>

                    </div>
                </div>
            )}
            <SnakAlert />
        </section>
        </>
    );
}
