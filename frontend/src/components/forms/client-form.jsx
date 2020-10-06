import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/client"
import { Form, Input, InputNumber, Select, Row, Col } from "antd"
import { CLIENT, FORM } from "lib/common-types"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { getFullName } from "lib/utils"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import { convertToDays, DURATION_UNITS } from "lib/datetime"

const { Option } = Select

const DurationPicker = ({ value, onChange }) => {
  const [num, setNum] = useState(0)
  const [unit, setUnit] = useState(Object.keys(DURATION_UNITS)[0])

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
        {Object.keys(DURATION_UNITS).map((key) => (
          <Option key={key} value={key}>
            {DURATION_UNITS[key]}
          </Option>
        ))}
      </Select>
    </Input.Group>
  )
}

const ClientForm = ({ initialClient, form, onSubmit }) => {
  const { t } = useTranslation()

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
      cycle: convertToDays(cycle.num, cycle.unit),
      duration: convertToDays(duration.num, duration.unit),
    }
    onSubmit(values)
  }
  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={initialValues}
      scrollToFirstError
      validateMessages={defaultValidateMessages}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label={t("common.firstName")} name="firstName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t("common.lastName")} name="lastName" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label={t("common.email")}
        name="email"
        rules={[{ required: true }, { type: "email" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item label={t("common.phone")} name="phone" rules={[{ required: true }]}>
        <Input type="tel" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={t("common.cycle")}
            name="cycle"
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  const cycleLength = convertToDays(value.num, value.unit)
                  if (!cycleLength) {
                    return Promise.reject(`${t("message.isRequired", { name: t("common.cycle") })}`)
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <DurationPicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t("common.duration")}
            name="duration"
            dependencies={["cycle"]}
            rules={[
              { required: true },
              {
                validator: (_, value) => {
                  const { cycle: updatedCycle } = form.getFieldsValue()
                  const cycleLength = convertToDays(updatedCycle.num, updatedCycle.unit)
                  const durationLength = convertToDays(value.num, value.unit)
                  if (!durationLength) {
                    return Promise.reject(
                      `${t("message.isRequired", { name: t("common.duration") })}`
                    )
                  }
                  if (cycleLength < durationLength) {
                    return Promise.reject(`${t("message.durationLessThanCycle")}`)
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
      <Form.Item label={t("term.manager_plural")} name="managerIds">
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
