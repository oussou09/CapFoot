import React, { useContext, useMemo, useState } from 'react';
import Daystable from './Daystable';
import { RserveContext } from '../RserveContext';
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
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.stadium.stadium_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.contact.fullname}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{data.contact.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.time_at.time_day}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data.time_at.time_hour}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className="bg-green-100 px-3 py-2 rounded text-green-600">
                    Confirmed
                </span>
            </td>
        </tr>
    );
}

function TrueReservationAdmin() {
    const { rserves } = useContext(RserveContext);
    const [filters, setFilters] = useState({
        id: '',
        stadium_name: '',
        fullname: '',
        phone: '',
        day: '',
        hour: ''
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
                data.is_confirmed === 1 && // Only show entries where is_confirmed is true
                dayMatches // Filter by selected day
            );
        });
    }, [rserves, filters, selectedDay]); // Only recompute when rserves, filters, or selectedDay change

        // Breadcrumb
        const breadcrumbItems = [
            { label: 'False Reservation', href: '/wp-admin/reservationadmin' },
            { label: 'True Reservation', href: '/wp-admin/trueReservationAdmin' },
            // { label: 'Project Nero', href: '#' },
          ];

    return (
    <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col space-y-2">
            <div className="flex w-full md:max-w-xl rounded shadow mx-auto my-8">
                <Daystable onDaySelect={handleDaySelect} /> {/* Pass the handleDaySelect function as a prop */}
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
                            <TableHeader title="Status" />
                        </tr>
                        <tr className="bg-white">
                            <TableHeaderFun title="id" onSearch={handleSearch} />
                            <TableHeaderFun title="stadium name" onSearch={handleSearch} />
                            <TableHeaderFun title="Full name" onSearch={handleSearch} />
                            <TableHeaderFun title="phone" onSearch={handleSearch} />
                            <TableHeaderFun title="Day" onSearch={handleSearch} />
                            <TableHeaderFun title="Hour" onSearch={handleSearch} />
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                        {filteredData.map((d, i) => (
                            <TableRow key={i} data={d} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    );
}

export default TrueReservationAdmin;
