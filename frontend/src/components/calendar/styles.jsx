import { createGlobalStyle } from 'styled-components';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export const CalendarGlobalStyleOverride = createGlobalStyle`
  .fc-event {
    border: #5a67d8;
    background-color: #5a67d8;
  }
`;
