import UserAvatar from "./profile.png";
import {
  SearchIcon,
  LogoutIcon,
  UserIcon,
  AdjustmentsIcon,
  BellIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import axios from '../axiosConfig';
import Cookies from 'js-cookie';


function NavBar() {
  const navBarHeight = 71;
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const adminName = Cookies.get('admin_name');

  const handleLogout = async () => {
      try {
          await axios.post('/LogoutFormAdmin');

          // Remove the token from the cookies
          Cookies.remove('admin_token');

          navigate('/wp-admin/LoginAdmin'); // Redirect to the login page
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };



  return (
    <nav
      className="flex items-center space-x-4 shadow bg-white block w-full px-5 absolute z-50"
      style={{ height: navBarHeight }}
    >


    <div className="hidden md:inline-flex flex-1">
    <form className=" max-w-xl py-1 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
        <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent w-[20vw] focus:outline-none pr-8 font-semibold border-0 focus:ring-0 px-0 py-0"
            name="topic"
        />
        <button
            className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3">
            Search
        </button>
    </form>

      </div>


      <div className="flex-1 md:flex-none"></div>

      {/* <a href="!#" className="relative text-gray-500 hover:text-gray-800">
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
        <span class="absolute top-0 right-0 flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        <BellIcon className="w-6 h-6" />
      </a> */}

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full items-center text-gray-500 hover:text-gray-800 focus:outline-none">
            <img className="rounded-full w-8 h-8" src={UserAvatar} alt="" />
            {adminName && <span className="font-medium ml-3 mr-1">Welcome, {adminName}!</span>}
            <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <UserIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <AdjustmentsIcon
                      className="w-5 h-5 mr-2"
                      aria-hidden="true"
                    />
                    Setting
                  </button>
                )}
              </Menu.Item>
            </div> */}
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={handleLogout}
                    className={`${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
}

export default NavBar;
