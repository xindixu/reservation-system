import { createGlobalStyle } from 'styled-components';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

export const CalendarGlobalStyleOverride = createGlobalStyle`
  .fc-event {
    border: #f4f5f7;
    background-color: #f4f5f7;
  }

`;
