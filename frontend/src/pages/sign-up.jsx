import React from "react"
import PropTypes from "prop-types"
import { Form } from "antd"
import { ReactComponent as Events } from "assets/events.svg"
import SignUpForm from "components/forms/sign-up-form"

const SignUp = (props) => {
  const [form] = Form.useForm()

  return (
    <div className="flex items-center justify-center bg-blue-300 w-screen h-screen">
      <div className="flex p-10 bg-opacity-75 bg-white border-blue-200 rounded-lg border">
        <div className="flex flex-col content-center mr-5 max-w-md">
          <h1 className="text-2xl">Welcome to Reservation System</h1>
          <p className="my-10">
            Reservation System can help you schedule recurrent client visits, check available slots,
            and remind you and your clients on upcoming visits.{" "}
          </p>
          <SignUpForm form={form} />
        </div>
        <Events />
      </div>
    </div>
  )
}

SignUp.propTypes = {}

export default SignUp
