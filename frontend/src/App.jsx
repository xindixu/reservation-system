import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import Teams from "./pages/teams"
import Team from "./pages/team"
import Calendar from "./pages/calendar"
import Navigation from "./components/navigation"
import { Wrapper } from "./styles"

const { Header, Sider, Content } = Layout

const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <Calendar />
    </Route>
    <Route path="/calendar" exact>
      <Calendar />
    </Route>
    <Route path="/teams" exact>
      <Teams />
    </Route>

    <Route path="/team/:id" exact>
      <Team />
    </Route>
  </Switch>
)

const App = () => {
  const [navigationCollapsed, setNavigationCollapsed] = useState(false)
  return (
    <Wrapper>
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={navigationCollapsed}>
            <Navigation />
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
