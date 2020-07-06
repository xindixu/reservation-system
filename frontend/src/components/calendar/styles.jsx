import styled, { createGlobalStyle } from "styled-components"
import { styleSettings } from "styles/index"

const { spacerLg, white, borderRadiusBase } = styleSettings

export const Wrapper = styled.div``
export const CalendarGlobalStyleOverride = createGlobalStyle`
  .fc {
    
    .fc-view-harness {
      background: ${white};
    }

    .fc-button {
      text-transform: capitalize;
      border-radius: 2px;
      border-width: 1px;
    }

    .fc-prev-button, .fc-next-button {
      width: ${spacerLg};
      height: ${spacerLg};
      border-radius: ${borderRadiusBase};
      padding: 0;
    }

    .fc-button-primary {
      background-color: #1890ff;
      border-color: #1890ff;
      color: #fff;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    }

    .fc-button-primary:not([disabled]):hover, 
    .fc-button-primary:not([disabled]):focus {
      color: #fff;
      background: #40a9ff;
      border-color: #40a9ff;
    }

    .fc-button-primary:focus {
      box-shadow: none; 
    }
    .fc-button-primary:not([disabled]):active, 
    .fc-button-primary:not(:disabled):active:focus {
      outline: 0;
      box-shadow: none;
      background: #096dd9;
      border-color: #096dd9;
    }

    .fc-button-primary:disabled {
      cursor: not-allowed;
      color: rgba(0,0,0,.25);
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
      opacity: 1;
    }

    .fc-daygrid-day.fc-day-today {
      background: none;
    }
  }

  .fc-theme-standard {
    td, th, .fc-scrollgrid {
      border: none;
    }
    .fc-daygrid-day-frame {
      margin: 4px;
      border-top: 1px solid #f0f0f0;
    }
    .fc-day-today .fc-daygrid-day-frame {
        background: rgba(255, 220, 40, 0.15);
    }

  } 

`
