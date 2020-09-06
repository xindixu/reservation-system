import React, { useContext, useState } from "react"
import { Form, Spin, Button } from "antd"
import { Link } from "react-router-dom"
import { useMedia } from "react-use"
import { useMutation } from "@apollo/client"
import { mediaQuery } from "styles/index"
import { UserContext } from "contexts"
import { ReactComponent as Image } from "assets/checking-boxes.svg"
import SignInForm from "components/forms/sign-in-form"
import { SIGN_IN } from "graphql/user"

const MainForm = () => {
  const [form] = Form.useForm()
  const { setUser } = useContext(UserContext)
  const [signInError, setSignInError] = useState(null)

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted({ signIn }) {
      const { accessToken, refreshToken, email, password, role, __typename } = signIn
      if (__typename === "User") {
        return setUser({ accessToken, refreshToken, email, role })
      }
      return setSignInError({ email, password, role })
    },
  })

  return (
    <div className="flex flex-col justify-center content-center max-w-md">
      <Spin spinning={loading}>
        <h1 className="text-2xl">Welcome Back!</h1>
        <p className="my-10">
          Reservation System can help you schedule recurrent client visits, check available slots,
          and remind you and your clients on upcoming visits.
        </p>
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
          Log in
        </Button>
        <p className="mt-3">
          Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
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
