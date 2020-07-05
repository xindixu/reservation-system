import styled, { createGlobalStyle } from "styled-components"
import { styleSettings } from "styles/index"

const { white } = styleSettings

export const Wrapper = styled.div``
export const CalendarGlobalStyleOverride = createGlobalStyle`
  .fc {
    .fc-view-harness {
      background: ${white};
    }

    .fc-button {
      text-transform: capitalize;
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
  }
`
