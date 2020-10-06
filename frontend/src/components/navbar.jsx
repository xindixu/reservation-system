import React from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"
import { Menu } from "antd"
import {
  AppstoreAddOutlined,
  TeamOutlined,
  CalendarOutlined,
  ContactsOutlined,
  UserOutlined,
} from "@ant-design/icons"

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  return (
    <Menu theme="dark" defaultSelectedKeys={location.pathname} mode="inline">
      <Menu.Item key="calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">{t("common.calendar")}</Link>
      </Menu.Item>
      <Menu.Item key="teams" icon={<TeamOutlined />}>
        <Link to="/teams">{t("term.team_plural")}</Link>
      </Menu.Item>
      <Menu.Item key="managers" icon={<UserOutlined />}>
        <Link to="/managers">{t("term.manager_plural")}</Link>
      </Menu.Item>
      <Menu.Item key="clients" icon={<ContactsOutlined />}>
        <Link to="/clients">{t("term.client_plural")}</Link>
      </Menu.Item>
      <Menu.Item key="slots" icon={<AppstoreAddOutlined />}>
        <Link to="/slots">{t("term.slot_plural")}</Link>
      </Menu.Item>
    </Menu>
  )
}
export default Navbar
