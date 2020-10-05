import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, Spin, Button } from "antd"
import { Link } from "react-router-dom"
import { useMedia } from "react-use"
import { useMutation } from "@apollo/client"
import { mediaQuery } from "styles/index"
import { useUserContext } from "contexts/user-context"
import { ReactComponent as Image } from "assets/schedule.svg"
import SignUpForm from "components/forms/sign-up-form"
import ManagerForm from "components/forms/manager-form"
import TeamForm from "components/forms/team-form"
import ClientForm from "components/forms/client-form"
import useClients from "data/use-clients"
import useManagers from "data/use-managers"
import useTeams from "data/use-teams"
import { SIGN_UP } from "graphql/user"
import { ADMIN, CLIENT, MANAGER } from "lib/constants"

const MainForm = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { updateUser } = useUserContext()
  const [newUser, setNewUser] = useState(null)
  const [signUpError, setSignUpError] = useState(null)

  const { addClient } = useClients()
  const { addManager } = useManagers()
  const { addTeam } = useTeams()

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted: ({ signUp }) => {
      const {
        id,
        accessToken,
        refreshToken,
        email,
        password,
        roleType,
        team,
        manager,
        client,
        __typename,
      } = signUp
      if (__typename === "User") {
        return setNewUser({
          id,
          accessToken,
          refreshToken,
          email,
          roleType,
          role: {
            ...team,
            ...manager,
            ...client,
          },
        })
      }
      return setSignUpError({ email, password, roleType })
    },
  })

  const StepForm = () => {
    if (!newUser) {
      return (
        <SignUpForm
          form={form}
          onSubmit={(values) => signUp({ variables: values })}
          errors={signUpError}
        />
      )
    }

    if (newUser.roleType === CLIENT) {
      return (
        <ClientForm
          form={form}
          onSubmit={(values) =>
            addClient({ variables: { ...values, userId: newUser.id } }).then(({ data }) => {
              const { createClient } = data
              const newUserWithRole = { ...newUser, role: createClient }
              updateUser(newUserWithRole)
            })
          }
        />
      )
    }
    if (newUser.roleType === MANAGER) {
      return (
        <ManagerForm
          form={form}
          onSubmit={(values) =>
            addManager({ variables: { ...values, userId: newUser.id } }).then(({ data }) => {
              updateUser(newUser)
              const { createManager } = data
              const newUserWithRole = { ...newUser, role: createManager }
              updateUser(newUserWithRole)
            })
          }
        />
      )
    }
    if (newUser.roleType === ADMIN) {
      return (
        <TeamForm
          form={form}
          onSubmit={(values) => addTeam({ variables: values }).then(() => updateUser(newUser))}
        />
      )
    }
    return null
  }

  return (
    <div className="flex flex-col justify-center content-center max-w-md">
      <Spin spinning={loading}>
        <h1 className="text-2xl">{t("page.signUp.title")}</h1>
        <p className="my-10">{t("page.signUp.body")}</p>
        <StepForm />
        <Button
          type="primary"
          onClick={() =>
            form
              .validateFields()
              .then(() => {
                form.submit()
              })
              .catch()
          }
          block
        >
          {t("common.signUp")}
        </Button>
        <p className="mt-3">
          {t("page.signUp.hint")} <Link to="/sign-in">{t("common.logIn")}</Link>
        </p>
      </Spin>
    </div>
  )
}

const SignInPage = () => {
  const xlAndUp = useMedia(mediaQuery.screenXlAndUp)

  if (xlAndUp) {
    return (
      <div className="flex bg-blue-300 w-screen h-screen p-32">
        <div className="flex justify-center content-center w-full h-full p-20 bg-opacity-75 bg-white border-blue-200 rounded-lg border">
          <MainForm />
          {xlAndUp && (
            <div className="ml-10 w-3/4">
              <Image style={{ width: "100%" }} />
            </div>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="bg-opacity-75 bg-blue-200 flex flex-col justify-center w-screen h-screen overflow-auto">
      <div className="flex justify-center pt-20">
        <MainForm />
      </div>

      <Image style={{ height: "auto", width: "80%", margin: "auto" }} />
    </div>
  )
}
export default SignInPage
