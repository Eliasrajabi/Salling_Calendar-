import React, { useState } from 'react';
import { Holiday } from './Interface';
import { Props } from './Interface';


const HolidayChecker: React.FC<Props> = ({ isHoliday, getHolidaysWithinPeriod }) => {
    const [inputDate, setInputDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [holidayStatus, setHolidayStatus] = useState('');
    const [holidaysInRange, setHolidaysInRange] = useState<Holiday[]>([]);

    const handleCheckHoliday = () => {
        if(!inputDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            alert('Please enter a valid date');
            return;
        }
        const date = new Date(inputDate);
        const result = isHoliday(date);
        setHolidayStatus(result ? 'Yes, it is a holiday.' : 'No, it is not a holiday.');
    };

    const handleCheckHolidaysWithinPeriod = () => {
        if(startDate > endDate) {
            alert('Start date must be before end date');
            return;
        }
        if(!startDate.match(/^\d{4}-\d{2}-\d{2}$/) || !endDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            alert('Please enter valid dates');
            return;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const holidays = getHolidaysWithinPeriod(start, end);
        setHolidaysInRange(holidays);
    };

    return (
        <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg   " >
            <h2
                className="text-1xl font-bold text-left p-4">Check if the date is holiday</h2>
            
            <section>
            <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
            />
            <br/>
            <br/>
            <button
                className="h-12 min-w-[8rem] rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600"
                onClick={handleCheckHoliday}>Check
            </button>
            <p>{holidayStatus}</p>
            </section>
            <br/>
            
            <h2
                className="text-1xl font-bold text-left  p-4"
            >
                Find Holidays Within a Time Period:
            </h2>
            
            <section>
                    <label>Start Date:</label>
                    <input 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="date"
                        value={startDate} onChange={(e) => 
                        setStartDate(e.target.value)}/>
                    <label>End Date:</label>
                    <input 
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="date" 
                        value={endDate} onChange={(e) =>
                        setEndDate(e.target.value)}/>
                    <br/>
                    <br/>
                        <button
                            className="h-12 min-w-[8rem] rounded-lg border-2 border-emerald-600 bg-emerald-500 text-emerald-50 shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-600"
                            onClick={handleCheckHolidaysWithinPeriod}>Find Holidays
                        </button>
                        <br/>
                        <br/>
                        <ul className="">
                            {holidaysInRange.map((holiday, index) => (
                                <li key={index}>{holiday.name} - {holiday.date}</li>
                            ))}
                        </ul>
            </section>
        </div>
        </div>

    );
};

export default HolidayChecker;
