import styled from "styled-components"
import { styleSettings } from "styles/index"

const { spacer, spacerXxl } = styleSettings

export const Wrapper = styled.main`
  height: 100vh;
  width: 100vw;

  .ant-layout-sider {
    height: 100vh;
    padding-top: ${spacerXxl};
  }

  .ant-layout-content {
    padding: ${spacer};
    overflow-y: scroll;
    height: calc(100vh - ${spacerXxl});
  }

  .ant-layout-header {
    height: ${spacerXxl};
    line-height: ${spacerXxl};
    background: #fff;
  }
`
