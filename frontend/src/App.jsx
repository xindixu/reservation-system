import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import Teams from './pages/teams'
import Calendar from './pages/calendar'
import Navigation from './components/navigation-bar'
import { Wrapper } from './styles'

const { Header, Sider, Content } = Layout

const App = () => {
  const [navigationCollapsed, setNavigationCollapsed] = useState(false)
  return (
    <Wrapper>
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={navigationCollapsed}
          >
            <Navigation />
          </Sider>
          <Layout>
            <Header>
              {navigationCollapsed ? (
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setNavigationCollapsed(false)}
                />
              )
                : (
                  <MenuFoldOutlined
                    className="trigger"
                    onClick={() => setNavigationCollapsed(true)}
                  />
                )}
            </Header>
            <Content>
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
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </Wrapper>
  )
}

export default App
