import React, { useContext, useState } from "react"
import { Form, Spin, Button } from "antd"
import { Link } from "react-router-dom"
import { useMedia } from "react-use"
import { useMutation } from "@apollo/client"
import { mediaQuery } from "styles/index"
import { UserContext } from "contexts"
import { ReactComponent as Image } from "assets/schedule.svg"
import SignUpForm from "components/forms/sign-up-form"
import ManagerForm from "components/forms/manager-form"
import ClientForm from "components/forms/client-form"
import useClients from "data/use-clients"
import useManagers from "data/use-managers"
import { SIGN_UP } from "graphql/user"
import { ROLES, CLIENT, MANAGER } from "lib/constants"

const MainForm = (props) => {
  const [form] = Form.useForm()
  const { setUser } = useContext(UserContext)
  const [newUser, setNewUser] = useState(null)
  const [signUpError, setSignUpError] = useState(null)

  const { addClient } = useClients()
  const { addManager } = useManagers()

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted({ signUp }) {
      const { accessToken, refreshToken, email, password, role, __typename } = signUp
      if (__typename === "User") {
        return setNewUser({ accessToken, refreshToken, email, role })
      }
      return setSignUpError({ email, password, role })
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
    if (newUser.role === CLIENT) {
      return (
        <ClientForm
          form={form}
          onSubmit={(values) => addClient({ variables: values }).then(() => setUser(newUser))}
        />
      )
    }
    if (newUser.role === MANAGER) {
      return (
        <ManagerForm
          form={form}
          onSubmit={(values) => addManager({ variables: values }).then(() => setUser(newUser))}
        />
      )
    }
    return null
  }

  return (
    <div className="flex flex-col justify-center content-center max-w-md">
      <Spin spinning={loading}>
        <h1 className="text-2xl">Welcome to Reservation System</h1>
        <p className="my-10">
          Reservation System can help you schedule recurrent client visits, check available slots,
          and remind you and your clients on upcoming visits.{" "}
        </p>
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
          Register
        </Button>
        <p className="mt-3">
          Already have an account? <Link to="/sign-in">Sign in</Link>
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
      <div className="flex justify-center pt-10">
        <MainForm />
      </div>

      <Image style={{ height: "auto", width: "80%", margin: "auto" }} />
    </div>
  )
}
export default SignInPage
