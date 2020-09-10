import React from "react"
import { Avatar } from "antd"
import { useUserContext } from "contexts/user-context"
import { getDefaultAvatar, getFullName } from "lib/utils"

const User = () => {
  const { user } = useUserContext()
  return (
    <div>
      <Avatar src={getDefaultAvatar(user)} />
      {getFullName(user)}
    </div>
  )
}

export default User
