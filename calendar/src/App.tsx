import React, { useEffect, useState } from 'react';
import './index.css';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { Holiday } from './Interface';
import { token, holidaysURL } from './API';
import { CalendarContainer } from './CalendarContainer';

const App: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(holidaysURL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log(response.status, response.statusText);

        if (!response.ok) {
          throw new Error('Failed to fetch holidays');
        }

        const data: Holiday[] = await response.json();
        console.log('Fetched holidays:', data);
        setHolidays(data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays().then(r => console.log('fetchHolidays', r));
  }, [holidays]);

  
  return (
      <div className="bg-gray-50 border   ">
        <h1 className="text-2xl font-bold text-center p-4">Holidays in Denmark</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
              <CalendarContainer>
                <Calendar
                    tileContent={({date}) => {
                      const holiday = holidays.find(h => h.date === date.toISOString().split('T')[0]);
                      return holiday ? <p className="text-red-500">{holiday.name}</p> : null;
                    }}
                    tileClassName={({date, view}) => {
                      // Add class 'today' if date is today's date
                      if (view === 'month' && date.toDateString() === new Date().toDateString()) {
                        return 'today';
                      }

                    }}
                />
              </CalendarContainer>
            </div>
        )}

      </div>

  );
};


export default App;
