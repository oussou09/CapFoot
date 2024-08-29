import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/img/Logo1.png'; // Ensure the path is correct
import contact from '../assets/img/contacts-svgrepo-com.svg'; // Ensure the path is correct
import home from '../assets/img/home-svgrepo-com (5).svg'; // Ensure the path is correct
import about from '../assets/img/about.svg'; // Ensure the path is correct
import bars from '../assets/img/icons/bars-sort.svg'; // Ensure the path is correct
import close from '../assets/img/icons/close-mini.svg'; // Ensure the path is correct
import logout from '../assets/img/bx-log-out.svg'; // Ensure the path is correct

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="bg-white border-b-[5px] border-gray-900  top-0 left-0 w-full z-50">
        <header className="flex items-center justify-between px-4 md:px-20 mx-auto">
            <h1 className={`${isOpen ? 'hidden' : 'block'}`}>
                <a href="/">
                    <img className="h-[4rem] w-66 p-[0rem] logo" src={logo} alt="Logo" />
                </a>
            </h1>

            <button className="text-white md:hidden" onClick={toggleMenu}>
                <img
                    className="h-[2rem] w-10 p-[0rem]"
                    src={isOpen ? close : bars} // Toggle between bars and close icons
                    alt={isOpen ? 'Close Menu' : 'Open Menu'}
                />
            </button>

            <div className={`md:flex items-center justify-end w-full md:w-auto font-broken mt-4 md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className="flex flex-col md:flex-row items-center justify-evenly list-none w-full md:w-auto">
                    <li className="flex items-center justify-center list-none mx-4 md:mx-10 text-[20px] font-semibold group relative">
                        <Link to="/" className="flex items-center justify-center">
                            <img className="h-[32px] w-[50px]" src={home} alt="Home" />
                            <span className="font-broken tracking-wider">Home</span>
                        </Link>
                        <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-1 bg-gray-700 group-hover:w-3/6"></span>
                        <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-1 bg-gray-700 group-hover:w-3/6"></span>
                    </li>
                    <li className="flex items-center justify-center list-none mx-4 md:mx-10 text-[20px] font-semibold  group relative">
                        <Link to="/contact" className="flex items-center justify-center">
                            <img className="h-[20px] w-[40px]" src={contact} alt="Contact" />
                            <span className="font-broken tracking-wider">Contact</span>
                        </Link>
                        <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-1 bg-gray-700 group-hover:w-3/6"></span>
                        <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-1 bg-gray-700 group-hover:w-3/6"></span>
                    </li>
                    <li className="flex items-center justify-center list-none mx-4 md:mx-10 text-[20px] font-semibold group relative">
                        <Link to="/about" className="flex items-center justify-center">
                            <img className="h-[20px] w-[40px]" src={about} alt="About" />
                            <span className="font-broken tracking-wider">About</span>
                        </Link>
                        <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-1 bg-gray-700 group-hover:w-3/6"></span>
                        <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-1 bg-gray-700 group-hover:w-3/6"></span>
                    </li>
                </ul>
            </div>
        </header>
    </div>


    );
}
