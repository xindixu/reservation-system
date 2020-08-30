import React, { useContext } from "react"
import { Form } from "antd"
import { useMedia } from "react-use"
import { useMutation } from "@apollo/react-hooks"
import { mediaQuery } from "styles/index"
import { UserContext } from "contexts"
import { ReactComponent as Events } from "assets/events.svg"
import SignUpForm from "components/forms/sign-up-form"
import { SIGN_UP } from "graphql/user"

const SignUp = (props) => {
  const [form] = Form.useForm()
  const xlAndUp = useMedia(mediaQuery.screenXlAndUp)
  const [signUp] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <div className={`flex bg-blue-300 w-screen h-screen  ${xlAndUp ? "p-32" : "p-0"}`}>
      <div className="flex justify-center content-center w-full h-full p-20 bg-opacity-75 bg-white border-blue-200 rounded-lg border">
        <div className="flex flex-col justify-center content-center max-w-md">
          <h1 className="text-2xl">Welcome to Reservation System</h1>
          <p className="my-10">
            Reservation System can help you schedule recurrent client visits, check available slots,
            and remind you and your clients on upcoming visits.{" "}
          </p>
          <SignUpForm
            form={form}
            onSubmit={(values) => {
              console.log(values)
              signUp({ variables: values })
            }}
          />
        </div>
        {xlAndUp && (
          <div className="ml-10 w-3/4">
            <Events style={{ width: "100%" }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SignUp
