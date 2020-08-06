import styled, { createGlobalStyle } from "styled-components"
import { styleSettings } from "styles/index"

const { spacerLg, white, borderRadiusBase } = styleSettings

export const Wrapper = styled.div``
export const CalendarGlobalStyleOverride = createGlobalStyle`
  .rbc-calendar {
    
    .fc-view-harness {
      background: ${white};
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
