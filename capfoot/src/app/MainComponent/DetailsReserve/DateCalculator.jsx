import React, { useEffect, useState } from 'react';

// Component for getting the last Sunday
export function ComponentGetLastSunday() {
    const [lastSunday, setLastSunday] = useState('');

    useEffect(() => {
        const getLastSunday = (date) => {
            const lastSunday = new Date(date);
            lastSunday.setDate(date.getDate() - date.getDay());
            return lastSunday.toDateString();
        };

        const currentDate = new Date();
        setLastSunday(getLastSunday(currentDate));
    }, []);

    return (
        <div className="flex justify-between font-bold text-sm">
            <p>Started At</p>
            <p className="text-gray-400">{lastSunday}</p>
        </div>
    );
}

// Component for getting the next Sunday
export function ComponentGetNextSunday() {
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

    return (
        <div className="flex justify-between font-bold text-sm mt-4 md:mt-8">
            <p>Ending At</p>
            <p className="text-gray-400">{nextSunday}</p>
        </div>
    );
}
