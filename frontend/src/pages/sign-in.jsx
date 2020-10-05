import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Form, Spin, Button } from "antd"
import { Link } from "react-router-dom"
import { useMedia } from "react-use"
import { useMutation } from "@apollo/client"
import { mediaQuery } from "styles/index"
import { useUserContext } from "contexts/user-context"
import { ReactComponent as Image } from "assets/checking-boxes.svg"
import SignInForm from "components/forms/sign-in-form"
import { SIGN_IN } from "graphql/user"

const MainForm = () => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { updateUser } = useUserContext()
  const [signInError, setSignInError] = useState(null)

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: ({ signIn }) => {
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
      } = signIn
      if (__typename === "User") {
        return updateUser({
          id,
          accessToken,
          refreshToken,
          email,
          roleType,
          role: {
            ...manager,
            ...client,
            ...team,
          },
        })
      }
      return setSignInError({ email, password, roleType })
    },
  })

  return (
    <div className="flex flex-col justify-center content-center max-w-md">
      <Spin spinning={loading}>
        <h1 className="text-2xl">{t("page.signIn.title")}</h1>
        <p className="my-10">{t("page.signIn.body")}</p>
        <SignInForm
          form={form}
          onSubmit={(values) => signIn({ variables: values })}
          errors={signInError}
        />
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
          {t("common.logIn")}
        </Button>
        <p className="mt-3">
          {t("page.signIn.hint")} <Link to="/sign-up">{t("common.signUp")}</Link>
        </p>
      </Spin>
    </div>
  )
}

const SignUpPage = () => {
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
export default SignUpPage
