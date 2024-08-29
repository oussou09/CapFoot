import { ComponentGetNextSunday } from "../../MainComponent/DetailsReserve/DateCalculator";
import UserAvater from "../template/profile.png";
import { FiEdit, FiLink, FiTrash2, FiX, FiAlertCircle } from 'react-icons/fi';
import { PhoneIcon, BriefcaseIcon, CalendarIcon  } from "@heroicons/react/outline";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import axiosadmin from '../axiosConfig';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Breadcrumb from "../BreadcrumbNavigation/Breadcrumb";



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


let defaultInputClass =
  "border w-full border-gray-300 rounded-md font-light focus:ring-0 focus:border-indigo-500 ";

let defaultButtonClass =
  "px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md";

function InputLabel({ title }) {
  return (
    <label className="block font-medium text-gray-700 mb-1">
      {title}
    </label>
  );
}

function SimpleInput({ type, placeholder }) {
  return (
    <input
      type={type}
      className={defaultInputClass}
      placeholder={placeholder}
    />
  );
}

function SimpleInputWithDescription({ type, placeholder, desc }) {
  return (
    <div className="flex flex-col space-y-1">
      <SimpleInput type={type} placeholder={placeholder} />
      <span className="text-xs text-gray-400 italic text-light">{desc}</span>
    </div>
  );
}

function SimpleTextArea({ row, placeholder }) {
  return (
    <textarea
      rows={row ?? 3}
      defaultValue=""
      className={defaultInputClass}
      placeholder={placeholder}
    />
  );
}

function GroupedInputSelectStart({ type, placeholder, items }) {
  return (
    <div className="flex rounded-md">
      <select className="border border-r-0 border-gray-300 rounded-none rounded-l-md text-gray-700 bg-gray-100 font-light focus:ring-0 focus:border-gray-300">
        {items.map((e, i) => {
          return <option key={i}>{e}</option>;
        })}
      </select>
      <input
        type={type}
        className="block w-full border border-gray-300 rounded-none rounded-r-md font-light focus:ring-0 focus:border-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
}

function SimpleSelect({ items }) {
  return (
    <select className={defaultInputClass}>
      {items.map((e, i) => {
        return <option key={i}>{e}</option>;
      })}
    </select>
  );
}

function SimpleCheckbox({ title, desc }) {
  return (
    <div className="flex items-start space-x-2">
      <div className="flex items-center h-6">
        <input
          type="checkbox"
          className={
            "focus:ring-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          }
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-800">{title}</label>
        {desc && <span className="text-xs text-gray-400">{desc}</span>}
      </div>
    </div>
  );
}

function Forms() {

    const [nextSunday, setNextSunday] = useState('');

    useEffect(() => {
        const getNextSunday = (date) => {
            const nextSunday = new Date(date);
            nextSunday.setDate(date.getDate() + (7 - date.getDay()));
            return nextSunday.toDateString();
        };

        const currentDate = new Date();
        setNextSunday(getNextSunday(currentDate));
    }, []);



    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);

    const toggleDeleteModal = () => {
        setModalDeleteOpen(!isModalDeleteOpen);
    };


    const HandleClearTable = async () => {

        try {

            // Fetch CSRF token and set cookies
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Make the DELETE request with the CSRF token automatically handled by Laravel Sanctum
            const response = await axiosadmin.delete('/deleteallreceiving', {
                withCredentials: true,
            });

            setAlertMessage(`Cleaned successfully.`);
            setAlertOpen(true);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete contact');
        }

        setModalDeleteOpen(!isModalDeleteOpen);

    }

    // Breadcrumb
    const breadcrumbItems = [
        // { label: 'Dashboard', href: '/wp-admin/dashboard' },
        { label: 'Clear Reservation', href: '/wp-admin/forms' },
        // { label: 'Project Nero', href: '#' },
        ];

  return (
    <div>
        <Breadcrumb items={breadcrumbItems} />
      {/* <div className="order-2 lg:order-1 lg:col-span-3">
        <div className="shadow rounded-md bg-white">
          <form>
            <div className="grid lg:grid-cols-2 gap-4 px-5 py-4">
              <h2 className="col-span-2 text-xl text-gray-600 font-semibold">
                Edit Information
              </h2>
              <div className="col-span-2 lg:col-span-1">
                <InputLabel title="First Name" />
                <SimpleInput type="text" placeholder="Enter firstname" />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <InputLabel title="Last Name" />
                <SimpleInput type="text" placeholder="Enter lastname" />
              </div>
              <div className="col-span-2">
                <InputLabel title="Email" />
                <SimpleInputWithDescription
                  type="text"
                  placeholder="example@domain.com"
                  desc="Your current email address."
                />
              </div>
              <div className="col-span-2">
                <InputLabel title="Phone Number" />
                <GroupedInputSelectStart
                  type="tel"
                  placeholder="9xxxxxxxx"
                  items={["+95", "+1", "+81"]}
                />
              </div>
              <div className="col-span-2">
                <InputLabel title="Work as" />
                <SimpleSelect items={["Developer", "Engineer", "Artist"]} />
              </div>
              <div className="col-span-2">
                <InputLabel title="Bio" />
                <SimpleTextArea placeholder="Write about yourself..." />
              </div>
              <div className="col-span-2 mb-4">
                <SimpleCheckbox
                  title="Notification"
                  desc="Get notified when updates."
                />
              </div>
            </div>
            <div className="flex flex-row-reverse bg-gray-50 rounded-b-md px-5 py-4">
              <input
                type="submit"
                className={defaultButtonClass}
                value="Save"
              />
            </div>
          </form>
        </div>
      </div> */}
      <div className="order-1 lg:order-2 lg:col-span-2">
        <div className="shadow rounded-md bg-white">
            <div className="flex flex-col items-center px-5 py-4">

            <div className="flex justify-center items-center text-gray-500">
                    <CalendarIcon className="w-6 h-6" />
                    <p className="text-xl bold px-2">Ending At</p>
                    <p className="text-gray-400 text-xl bold">{nextSunday}</p>
            </div>
            <p className="w-full text-sm text-gray-500 text-center italic mt-2 p-3 rounded border-2 border-dashed">
                <strong className="text-xl text-black-600 font-semibold">Please note</strong>: Clearing reservations is irreversible. Make sure you're certain before proceeding!
            </p>
            <div className="py-5">
                <button className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-red-600 transition duration-300 ease-out border-2 border-red-500 rounded-lg shadow-md group"
                onClick={toggleDeleteModal}
                >
                    <span
                        className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease"
                    >
                        <svg
                        height="25px"
                        width="25px"
                        version="1.1"
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        fill="#ffffff"  // Ensure this is handled properly
                        >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                            <path
                                className="fill-current text-white"
                                d="M439.114,69.747c0,0,2.977,2.1-43.339-11.966c-41.52-12.604-80.795-15.309-80.795-15.309l-2.722-19.297 C310.387,9.857,299.484,0,286.642,0h-30.651h-30.651c-12.825,0-23.729,9.857-25.616,23.175l-2.722,19.297 c0,0-39.258,2.705-80.778,15.309C69.891,71.848,72.868,69.747,72.868,69.747c-10.324,2.849-17.536,12.655-17.536,23.864v16.695 h200.66h200.677V93.611C456.669,82.402,449.456,72.596,439.114,69.747z"
                            ></path>
                            <path
                                className="fill-current text-white"
                                d="M88.593,464.731C90.957,491.486,113.367,512,140.234,512h231.524c26.857,0,49.276-20.514,51.64-47.269 l25.642-327.21H62.952L88.593,464.731z M342.016,209.904c0.51-8.402,7.731-14.807,16.134-14.296 c8.402,0.51,14.798,7.731,14.296,16.134l-14.492,239.493c-0.51,8.402-7.731,14.798-16.133,14.288 c-8.403-0.51-14.806-7.722-14.296-16.125L342.016,209.904z M240.751,210.823c0-8.42,6.821-15.241,15.24-15.241 c8.42,0,15.24,6.821,15.24,15.241v239.492c0,8.42-6.821,15.24-15.24,15.24c-8.42,0-15.24-6.821-15.24-15.24V210.823z M153.833,195.608c8.403-0.51,15.624,5.894,16.134,14.296l14.509,239.492c0.51,8.403-5.894,15.615-14.296,16.125 c-8.403,0.51-15.624-5.886-16.134-14.288l-14.509-239.493C139.026,203.339,145.43,196.118,153.833,195.608z"
                            ></path>
                            </g>
                        </g>
                        </svg>
                    </span>
                    <span className="absolute flex items-center text-base font-semibold justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                            Delete All Recervation For {nextSunday}
                    </span>
                    <span className="relative text-base font-semibold invisible">Clear All Recervation For {nextSunday}</span>
                    </button>
                </div>
            </div>
        </div>
      </div>
      {isModalDeleteOpen && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center px-4">
            <div className="relative mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div className="flex justify-end p-2">
                    <button onClick={toggleDeleteModal} type="button"
                        className="cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <FiX size={25} />
                    </button>
                </div>

                <div className="p-6 pt-0 text-center">
                    <FiAlertCircle size={80} className="text-red-600 mx-auto" />
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete all records?</h3>
                    <a onClick={HandleClearTable}
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
  );
}

export default Forms;
