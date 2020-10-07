import React, { useState, useEffect } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useMedia } from "react-use"
import { debounce, isEmpty } from "lodash"
import { I18nextProvider } from "react-i18next"
import { Layout, ConfigProvider } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import zh_CN from "antd/es/locale/zh_CN"
import en_US from "antd/es/locale/en_US"

import { AppRoutes } from "./routes"
import { Wrapper } from "./styles"
import { mediaQuery } from "./styles/index"
import i18n from "./locales"
import { useUserContext } from "contexts/user-context"
import Navbar from "components/navbar"
import User from "components/user"

const antLocaleByKey = {
  cn: zh_CN,
  en: en_US,
}

const { Header, Sider, Content } = Layout

const App = () => {
  const [navigationCollapsed, setNavigationCollapsed] = useState(false)
  const [navigationToggled, setNavigationToggled] = useState(false)
  const smAndUp = useMedia(mediaQuery.screenSmAndUp)
  const mdAndUp = useMedia(mediaQuery.screenMdAndUp)

  useEffect(() => {
    const resetToggled = debounce(() => setNavigationToggled(false), 100)
    window.addEventListener("resize", resetToggled)
    return () => {
      window.removeEventListener("resize", resetToggled)
    }
  }, [])

  const { user } = useUserContext()

  const collapsed = navigationToggled ? navigationCollapsed : !mdAndUp

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider locale={antLocaleByKey[i18n.language]}>
        <Router>
          {isEmpty(user) ? (
            <AppRoutes />
          ) : (
            <Wrapper>
              <Layout>
                <Sider trigger={null} collapsed={collapsed} collapsedWidth={smAndUp ? "80" : "0"}>
                  <Navbar />
                </Sider>
                <Layout>
                  <Header>
                    <div className="flex justify-between">
                      <div>
                        {navigationCollapsed ? (
                          <MenuUnfoldOutlined
                            className="trigger"
                            onClick={() => {
                              setNavigationCollapsed(false)
                              setNavigationToggled(true)
                            }}
                          />
                        ) : (
                          <MenuFoldOutlined
                            className="trigger"
                            onClick={() => {
                              setNavigationCollapsed(true)
                              setNavigationToggled(true)
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <User />
                      </div>
                    </div>
                  </Header>
                  <Content>
                    <AppRoutes />
                  </Content>
                </Layout>
              </Layout>
            </Wrapper>
          )}
        </Router>
      </ConfigProvider>
    </I18nextProvider>
  )
}

export default App
