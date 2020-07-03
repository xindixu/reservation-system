import React, { useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import Routes from "./routes"
import Navbar from "./components/navbar"
import { Wrapper } from "./styles"

const { Header, Sider, Content } = Layout

const App = () => {
  const [navigationCollapsed, setNavigationCollapsed] = useState(false)
  return (
    <Wrapper>
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={navigationCollapsed}>
            <Navbar />
          </Sider>
          <Layout>
            <Header>
              {navigationCollapsed ? (
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setNavigationCollapsed(false)}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger"
                  onClick={() => setNavigationCollapsed(true)}
                />
              )}
            </Header>
            <Content>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    </Wrapper>
  )
}

export default App
