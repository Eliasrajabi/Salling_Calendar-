import styled from "styled-components";

export const CalendarContainer = styled.div`

    .react-calendar {
      max-width: 40%;
      background: #faf7f7;
      border: 1px solid #bbb9b9;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      line-height: 1.125;
      width: 50%;
      margin: 0px auto;
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
