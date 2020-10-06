import React from "react"
import { useTranslation } from "react-i18next"

import { Avatar, Dropdown, Menu } from "antd"
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { useUserContext } from "contexts/user-context"
import { getDefaultAvatar, getFullName, route } from "lib/utils"
import { LINK_BY_ROLE } from "lib/constants"
import { SIGN_OUT } from "graphql/user"

const User = () => {
  const { t } = useTranslation()

  const { user, updateUser } = useUserContext()
  const [signOut] = useMutation(SIGN_OUT, {
    onCompleted: () => updateUser(),
  })
  const { roleType, role } = user

  const menu = (
    <Menu selectable>
      <Menu.Item key="page" className="px-5">
        <Link to={route()[LINK_BY_ROLE[roleType]](role.id)}>
          <UserOutlined className="mr-2" />
          {t("common.myProfile")}
        </Link>
      </Menu.Item>
      <Menu.Item key="setting" className="px-5">
        <Link to="/settings">
          <SettingOutlined className="mr-2" />

          {t("common.settings")}
        </Link>
      </Menu.Item>
      {/*  <Menu.Item key="preference">
        <Link to="/preferences">Preferences</Link>
      </Menu.Item> */}
      <Menu.Divider className="px-5" />
      <Menu.Item key="log-out" className="text-red-500 px-5">
        <button onClick={signOut} type="button">
          <LogoutOutlined className="mr-2" />
          {t("common.logOut")}
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
