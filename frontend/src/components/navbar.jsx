import React from "react"
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
  const location = useLocation()
  return (
    <Menu theme="dark" defaultSelectedKeys={location.pathname} mode="inline">
      <Menu.Item key="calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="teams" icon={<TeamOutlined />}>
        <Link to="/teams">Teams</Link>
      </Menu.Item>
      <Menu.Item key="managers" icon={<UserOutlined />}>
        <Link to="/managers">Managers</Link>
      </Menu.Item>
      <Menu.Item key="clients" icon={<ContactsOutlined />}>
        <Link to="/clients">Clients</Link>
      </Menu.Item>
      <Menu.Item key="slots" icon={<AppstoreAddOutlined />}>
        <Link to="/slots">Slots</Link>
      </Menu.Item>
    </Menu>
  )
}
export default Navbar
