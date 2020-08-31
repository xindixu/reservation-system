import React, { useContext, useState } from "react"
import { Form, Spin, Button } from "antd"
import { useMedia } from "react-use"
import { useMutation } from "@apollo/client"
import { mediaQuery } from "styles/index"
import { UserContext } from "contexts"
import { ReactComponent as Events } from "assets/events.svg"
import SignUpForm from "components/forms/sign-up-form"
import ManagerForm from "components/forms/manager-form"
import ClientForm from "components/forms/client-form"
import useClients from "data/use-clients"
import useManagers from "data/use-managers"
import { SIGN_UP } from "graphql/user"
import { ROLES, CLIENT, MANAGER } from "lib/constants"

const SignUp = (props) => {
  const [form] = Form.useForm()
  const { setUser } = useContext(UserContext)
  const [newUser, setNewUser] = useState(null)
  const [signUpError, setSignUpError] = useState(null)
  const xlAndUp = useMedia(mediaQuery.screenXlAndUp)

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
    <Spin spinning={loading}>
      <div className={`flex bg-blue-300 w-screen h-screen  ${xlAndUp ? "p-32" : "p-0"}`}>
        <div className="flex justify-center content-center w-full h-full p-20 bg-opacity-75 bg-white border-blue-200 rounded-lg border">
          <div className="flex flex-col justify-center content-center max-w-md">
            <h1 className="text-2xl">Welcome to Reservation System</h1>
            <p className="my-10">
              Reservation System can help you schedule recurrent client visits, check available
              slots, and remind you and your clients on upcoming visits.{" "}
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
          </div>
          {xlAndUp && (
            <div className="ml-10 w-3/4">
              <Events style={{ width: "100%" }} />
            </div>
          )}
        </div>
      </div>
    </Spin>
  )
}

export default SignUp
