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
  durationRequired: "Duration is required",
  durationLessThanCycle: "Duration must be less than cycle.",
}

const DurationPicker = ({ value, onChange }) => {
  const [num, setNum] = useState(0)
  const [unit, setUnit] = useState("d")
  const UNITS = {
    d: "day(s)",
    w: "week(s)",
    M: "month(s)",
  }

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        num,
        unit,
        ...value,
        ...changedValue,
      })
    }
  }

  return (
    <Input.Group compact>
      <InputNumber
        min={1}
        value={value.num}
        onChange={(newNum) => {
          setNum(newNum)
          triggerChange({
            num: newNum,
          })
        }}
      />

      <Select
        value={value.unit}
        onChange={(newUnit) => {
          setUnit(newUnit)
          triggerChange({
            unit: newUnit,
          })
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

const ClientForm = ({ initialClient, form, onSubmit }) => {
  const { data } = useQuery(GET_ALL_MANAGERS)

  const initialValues = {
    ...initialClient,
    cycle: {
      num: initialClient.cycle,
      unit: "d",
    },
    duration: {
      num: initialClient.duration,
      unit: "d",
    },
  }

  const onFinish = (fieldValues) => {
    const { cycle, duration } = fieldValues
    const values = {
      ...fieldValues,
      cycle: durationHelper(cycle.num, cycle.unit).asDays(),
      duration: durationHelper(duration.num, duration.unit).asDays(),
    }
    onSubmit(values)
  }
  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialValues}
      scrollToFirstError
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
        <Input type="tel" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Cycle" name="cycle" rules={[{ required: true }]}>
            <DurationPicker />
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
                validator: (_, value) => {
                  const { cycle: updatedCycle } = form.getFieldsValue()
                  const cycleLength = durationHelper(updatedCycle.num, updatedCycle.unit).asDays()
                  const durationLength = durationHelper(value.num, value.unit).asDays()
                  if (!durationLength) {
                    return Promise.reject(validateMessages.durationRequired)
                  }
                  if (cycleLength < durationLength) {
                    return Promise.reject(validateMessages.durationLessThanCycle)
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <DurationPicker />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Managers" name="managerIds">
        <Select mode="multiple">
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
  initialClient: PropTypes.shape({
    ...CLIENT,
    managerIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
}

export default ClientForm
