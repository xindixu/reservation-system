import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { duration as durationHelper } from "moment"
import { Form, Input, InputNumber, Select, Row, Col } from "antd"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { getFullName } from "lib/utils"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import { CLIENT, FORM } from "lib/commonTypes"

const { Option } = Select

const validateMessages = {
  ...defaultValidateMessages,
  durationLessThanCycle: "Duration must be less than cycle.",
}

const DurationPicker = ({ defaultValue, onChange }) => {
  const [num, setNum] = useState(0)
  const [unit, setUnit] = useState("d")
  const UNITS = {
    d: "day(s)",
    w: "week(s)",
    M: "month(s)",
  }
  return (
    <Input.Group compact>
      <InputNumber
        min={1}
        defaultValue={defaultValue}
        onChange={(newNum) => {
          setNum(newNum)
          onChange(durationHelper(newNum, unit).asDays())
        }}
      />
      <Select
        defaultValue={unit}
        onChange={(newUnit) => {
          setUnit(newUnit)
          onChange(durationHelper(num, newUnit).asDays())
        }}
      >
        {Object.keys(UNITS).map((key) => (
          <Option key={key} value={key}>
            {UNITS[key]}
          </Option>
        ))}
      </Select>
    </Input.Group>
  )
}

const ClientForm = ({ initialClient, form }) => {
  const { data } = useQuery(GET_ALL_MANAGERS)
  const { firstName, lastName, email, phone, cycle, duration, managerId } = initialClient

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={{
        ...initialClient,
      }}
      scrollToFirstError
      validateMessages={validateMessages}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input type="text" defaultValue={firstName} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input type="text" defaultValue={lastName} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input type="email" defaultValue={email} />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input type="tel" defaultValue={phone} />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Cycle" name="cycle" rules={[{ required: true }]}>
            <DurationPicker
              defaultValue={cycle}
              onChange={(value) => form.setFieldsValue({ cycle: value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Duration"
            name="duration"
            dependencies={["cycle"]}
            rules={[
              { required: true },
              {
                validator: (_, value) =>
                  value < form.getFieldsValue().cycle
                    ? Promise.resolve()
                    : Promise.reject(validateMessages.durationLessThanCycle),
              },
            ]}
          >
            <DurationPicker
              defaultValue={duration}
              onChange={(value) => form.setFieldsValue({ duration: value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Manager" name="managerId" rules={[{ required: true }]}>
        <Select defaultValue={managerId}>
          {data?.managers.map((manager) => (
            <Select.Option value={manager.id} key={manager.id}>
              {getFullName(manager)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

ClientForm.defaultProps = {
  initialClient: {},
}

ClientForm.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialClient: PropTypes.shape(CLIENT),
}

export default ClientForm
