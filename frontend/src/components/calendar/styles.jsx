import styled, { createGlobalStyle } from "styled-components"
import { blue } from "@ant-design/colors"
import { styleSettings } from "styles/index"

const { spacerLg, white } = styleSettings

export const Wrapper = styled.div``
export const CalendarGlobalStyleOverride = createGlobalStyle`
  .rbc-calendar {
    
    .rbc-event {
      background: #bae7ff;
      color: #000;
    }
  
    .rbc-month-view, .rbc-off-range-bg {
      background: ${white};
    }

    .rbc-header {
      border-bottom: none;
      font-size: 100%;
      height: ${spacerLg};
      span {
        line-height: ${spacerLg};
      }
    }
    .rbc-header + .rbc-header, .rbc-day-bg + .rbc-day-bg {
      border-left: none;
    }
    .rbc-month-row + .rbc-month-row {
      border-top: none;
    }

    .rbc-date-cell {
      margin: 0 5px;
      padding: 5px;
      border-top: 1px solid #f0f0f0;
    }
    .rbc-now {
      border-color: ${blue.primary};
    }

    .rbc-day-bg {
      margin: 0 5px;
    }
  }

  .rbc-addons-dnd .rbc-addons-dnd-resizable {
    padding: 0 10px;
    .rbc-addons-dnd-resize-ew-icon {
      height 80%;
    }
  }
`
