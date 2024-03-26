import React, { useEffect, useState } from 'react';
import './index.css';
import Calendar from 'react-calendar';
import {isClassName} from "react-calendar/dist/cjs/shared/propTypes";
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

interface Holiday {
  date: string;
  name: string;
  nationalHoliday: boolean;
}

const App: React.FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = 'a7d35dc3-e8a4-4349-8bc9-97669cfccb58';
  const url = 'https://api.sallinggroup.com/v1/holidays';
  const corsProxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;  

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(corsProxyUrl, {
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
  }, [corsProxyUrl]);


    
  
  return (
      <div className="bg-gray-50 border   ">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
              <CalendarContainer>
                <Calendar
                    tileContent={({ date }) => {
                      const holiday = holidays.find(h => h.date === date.toISOString().split('T')[0]);
                      return holiday ? <p className="text-red-500">{holiday.name}</p> : null;
                    }}
                    tileClassName={({ date, view }) => {
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

const CalendarContainer = styled.div`

    .react-calendar {
      max-width: 60%;
      background: #faf7f7;
      border: 1px solid #bbb9b9;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      line-height: 1.125;
      width: 80%;
      margin: 230px auto;
      padding: 10px;


      .react-calendar__navigation {
        display: flex;

        .react-calendar__navigation__label {
          font-weight: bold;
        }

        .react-calendar__navigation__arrow {
          flex-grow: 0.333;
        }
      }

      .react-calendar__month-view__weekdays {
        text-align: center;
      }

      /* ~~~ button styles ~~~ */

      button {
        background-color: #c6d6e7;
        color: #0a0a0a;
        cursor: pointer;
        font-size: 1rem;
        margin: 0.25rem;
        padding: 0.5rem 1rem;
        transition: background-color 0.2s;

        &:hover {
          background-color: #b6ccf3;
        }

      }

      .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
      }

      .today {
        background-color: #efefc0 !important;
      }

      
      .react-calendar__month-view__days__day--neighboringMonth {
        opacity: 0.3;
      }

      .react-calendar__month-view__days__day--weekend {
        color: #f80404;
      }

      .react-calendar__year-view__months, .react-calendar__decade-view__years, .react-calendar__century-view__decades {
        display: grid !important;
        grid-template-columns: 20% 20% 20% 20% 20%;

      }
  `;

export default App;
