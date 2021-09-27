import React from "react"
import { message } from "antd"
import { useMutation } from "@apollo/client"
import SettingsForm from "components/forms/settings-form"
import { useUserContext } from "contexts/user-context"
import { UPDATE_USER } from "graphql/user"

const Settings = () => {
  const { user, updateUser } = useUserContext()

  const [editUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: (resp) => {
      const { id, email, locale } = resp.updateUser

      updateUser({
        ...user,
        id,
        email,
        locale,
      })
      return message.success("User is updated.")
    },
  })

  return (
    <SettingsForm
      initialUser={user}
      onSubmit={(values) => editUser({ variables: { id: user.id, ...values } })}
      loading={loading}
    />
  )
}

export default Settings
