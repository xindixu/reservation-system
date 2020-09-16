import React from "react"
import { Avatar, Dropdown, Menu } from "antd"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { useUserContext } from "contexts/user-context"
import { getDefaultAvatar, getFullName } from "lib/utils"
import { SIGN_OUT } from "graphql/user"

const User = () => {
  const { user, updateUser } = useUserContext()
  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: () => updateUser(),
  })

  const menu = (
    <Menu selectable>
      <Menu.Item key="setting">
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="preference">
        <Link to="/preferences">Preferences</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="log-out" className="text-red-500">
        <button onClick={signOut} type="button">
          Log out
        </button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown placement="bottomRight" overlay={menu} trigger="hover">
      <div className="h-100">
        <Avatar src={getDefaultAvatar(user.role)} />
        <span className="ml-2">{getFullName(user.role)}</span>
      </div>
    </Dropdown>
  )
}

export default User
