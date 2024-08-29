

import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import Daystable from './Daystable';
import { RserveContext } from '../RserveContext';
import axios from '../axiosConfig';
import SortByIcon from "../../../assets/img/icons/sort-vertical.svg";
import Breadcrumb from '../BreadcrumbNavigation/Breadcrumb';

function TableHeader({ title }) {
    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <span className="block mb-3 text-sm">{title}</span>
        </th>
    );
}

function TableHeaderFun({ title, onSearch }) {
    const handleInputChange = (e) => {
        onSearch(title.toLowerCase().replace(' ', '_'), e.target.value);
    };

    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <button
                type="button"
                className="w-full mb-3 text-gray-500 font-bold flex items-center focus:outline-none"
            >
                <img src={SortByIcon} alt="Sort Icon" className="w-7 h-7 mr-2" />
                {title}
            </button>
            <input
                type="text"
                placeholder={title}
                className="w-[140px] text-sm p-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block"
                onChange={handleInputChange}
            />
        </th>
    );
}

function TableRow({ data }) {
    const [isConfirmed, setIsConfirmed] = useState(data.is_confirmed === 1 ? "true" : "false");
    const { handleSubmitConfirmationContext } = useContext(RserveContext);

        const handleConfirmationChange = (e) => {
            setIsConfirmed(e.target.value);
        };

        // Start handleConfirmation
        const handleSubmitConfirmation = () => {
            handleSubmitConfirmationContext(data.id, isConfirmed);
          };
        // End handleConfirmation

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.stadium.stadium_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.contact.fullname}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.contact.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.time_at.time_day}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.time_at.time_hour}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                <select
                    id="default"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-[7px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleConfirmationChange}
                    value={isConfirmed}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={handleSubmitConfirmation} className="bg-indigo-100 px-3 py-2 rounded text-indigo-600 hover:text-indigo-800">
                    Confirmed
                </button>
            </td>
        </tr>
    );
}

function ReservationAdmin() {
    const { rserves } = useContext(RserveContext);
    const [filters, setFilters] = useState({
        id: '',
        stadium_name: '',
        fullname: '',
        phone: '',
        day: '',
        hour: '',
        confirmation: 'false' // Set to 'false' to filter only unconfirmed reservations
    });
    const [selectedDay, setSelectedDay] = useState('All'); // New state to manage selected day

    if (!rserves || !Array.isArray(rserves)) {
        return <div>Loading...</div>;
    }

    const handleSearch = (key, value) => {
        setFilters({
            ...filters,
            [key]: value
        });
    };

    const handleDaySelect = (day) => {
        setSelectedDay(day);
    };

    // Memoize filtered data
    const filteredData = useMemo(() => {
        return rserves.filter((data) => {
            const dayMatches = selectedDay === 'All' || data.time_at.time_day === selectedDay;
            return (
                data.id.toString().includes(filters.id) &&
                data.stadium.stadium_name.toLowerCase().includes(filters.stadium_name.toLowerCase()) &&
                data.contact.fullname.toLowerCase().includes(filters.fullname.toLowerCase()) &&
                data.contact.phone.includes(filters.phone) &&
                data.time_at.time_hour.toLowerCase().includes(filters.hour.toLowerCase()) &&
                data.is_confirmed === 0 && // Only show entries where is_confirmed is false
                dayMatches // Filter by selected day
            );
        });
    }, [rserves, filters, selectedDay]); // Only recompute when rserves, filters, or selectedDay change

        // Breadcrumb
        const breadcrumbItems = [
            // { label: 'Dashboard', href: '/wp-admin/dashboard' },
            { label: 'False Reservation', href: '/wp-admin/reservationadmin' },
            // { label: 'Project Nero', href: '#' },
          ];

    return (
    <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col space-y-2">
            <div className="flex w-full md:max-w-xl rounded mx-auto my-8 md:flex md:flex-wrap md:justify-center">
                <Daystable onDaySelect={handleDaySelect} />
            </div>
            <div className="shadow overflow-x-auto rounded-md">
                <table className="min-w-full divide-y ">
                    <thead className="bg-gray-50">
                        <tr>
                            <TableHeader title="id" />
                            <TableHeader title="stadium name" />
                            <TableHeader title="Full name" />
                            <TableHeader title="phone" />
                            <TableHeader title="Day" />
                            <TableHeader title="Hour" />
                            <TableHeader title="Confirmation" />
                            <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                <span></span>
                            </th>
                        </tr>
                        <tr className="bg-white">
                            <TableHeaderFun title="id" onSearch={handleSearch} />
                            <TableHeaderFun title="stadium name" onSearch={handleSearch} />
                            <TableHeaderFun title="Full name" onSearch={handleSearch} />
                            <TableHeaderFun title="phone" onSearch={handleSearch} />
                            <TableHeaderFun title="Day" onSearch={handleSearch} />
                            <TableHeaderFun title="Hour" onSearch={handleSearch} />
                            <TableHeaderFun title="Confirmation" onSearch={handleSearch} />
                            <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                <span></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                        {filteredData.map((d, i) => (
                            <TableRow key={i} data={d} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row-reverse">
                <nav className="rounded-md border divide-x bg-white mt-4 text-sm text-gray-700" aria-label="Pagination">
                    <button className="px-3 py-2 focus:outline-none">Prev</button>
                    <button className="px-4 py-2 focus:outline-none">2</button>
                    <button className="px-4 py-2 focus:outline-none text-white bg-indigo-600">3</button>
                    <button className="px-4 py-2 focus:outline-none">4</button>
                    <button className="px-3 py-2 focus:outline-none">Next</button>
                </nav>
            </div>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row p-4">
                <Link to="../trueReservationAdmin" className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold bg-gray-600 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10 hover:shadow-lg hover:-translate-y-1">
                    Confirmed Hour
                    <span className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                            <path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    </>
    );
}

export default ReservationAdmin;
















/*
import React, { useContext } from 'react';
import Daystable from './Daystable';
import {RserveContext} from '../RserveContext';
import  SortByIcon  from "../../../assets/img/icons/sort-vertical.svg";

function TableHeader({ title }) {
  return (

        <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            <span className="block mb-3 text-sm">{title}</span>
        </th>

  );
}

function TableHeaderFun({ title }) {
    return (

          <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <button
            type="button"
            className="w-full mb-3 text-gray-500 font-bold flex items-center focus:outline-none"
            >
            <img src={SortByIcon} alt="Sort Icon" className="w-7 h-7 mr-2" />
            {title}
            </button>
            <input
            type="text"
            placeholder={title}
            className="w-[140px] text-sm p-2 mb-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block"
            />

          </th>

    );
  }

function TableRow({ data }) {


  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{data.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{data.stadium.stadium_name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{data.contact.fullname}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">{data.contact.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap"> {data.time_at.time_day} </td>
      <td className="px-6 py-4 whitespace-nowrap"> {data.time_at.time_hour} </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">

            <select
                id="default"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-[7px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={data.is_confirmed === 0 ? "false" : "true"}  // Conditional default value
            >

                <option value="false">false</option>
                <option value="true">true</option>
            </select>

      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <a href="!#" className="bg-indigo-100 px-3 py-2 rounded text-indigo-600 hover:text-indigo-800">
            Confirmed
        </a>
      </td>
    </tr>
  );
}

function ReservationAdmin() {
    const { rserves } = useContext(RserveContext);

    if (!rserves || !Array.isArray(rserves)) {
        // Handle the case when rserves is undefined, null, or not an array
        return <div>Loading...</div>;
      }

  return (
    <div className="flex flex-col space-y-2">
        <div class="flex w-full md:max-w-xl rounded shadow mx-auto my-8">

            <Daystable />

        </div>
      <div className="shadow overflow-x-auto rounded-md">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader title="id" />
              <TableHeader title="stadium name" />
              <TableHeader title="Full name" />
              <TableHeader title="phone" />
              <TableHeader title="Day" />
              <TableHeader title="Hour" />
              <TableHeader title="Confirmation" />
              <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" >
                <span></span>
              </th>
            </tr>
            <tr className="bg-white">
              <TableHeaderFun title="id" />
              <TableHeaderFun title="stadium name" />
              <TableHeaderFun title="Full name" />
              <TableHeaderFun title="phone" />
              <TableHeaderFun title="Day" />
              <TableHeaderFun title="Hour" />
              <TableHeaderFun title="Confirmation" />
              <th scope="col" className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" >
                <span></span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {rserves.map((d, i) => {
              return <TableRow key={i} data={d} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row-reverse">
        <nav
          className="rounded-md border divide-x bg-white mt-4 text-sm text-gray-700"
          aria-label="Pagination"
        >
          <button className="px-3 py-2 focus:outline-none">Prev</button>
          <button className="px-4 py-2 focus:outline-none">2</button>
          <button className="px-4 py-2 focus:outline-none text-white bg-indigo-600">3</button>
          <button className="px-4 py-2 focus:outline-none">4</button>
          <button className="px-3 py-2 focus:outline-none">Next</button>
        </nav>
      </div>
      <div class="flex flex-col w-full sm:w-auto sm:flex-row p-4">
            <a href=""
                class="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold bg-gray-600 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
                    Confirmed Hour
                <span class="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                    </svg>
                </span>
            </a>
        </div>
    </div>
  );
}

export default ReservationAdmin;
*/
