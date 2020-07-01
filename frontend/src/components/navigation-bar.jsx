import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { TeamOutlined, CalendarOutlined } from '@ant-design/icons'


const Navigation = () => {
  const location = useLocation()
  return (
    <Menu defaultSelectedKeys={location.pathname} mode="horizontal">
      <Menu.Item key="calendar" icon={<CalendarOutlined />}>
        <Link to="calendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="teams" icon={<TeamOutlined />}>
        <Link to="teams">Teams</Link>
      </Menu.Item>
    </Menu>
  )
}
export default Navigation
