import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { duration } from "moment"
import { Form, Input, InputNumber, Select, Row, Col } from "antd"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { getFullName } from "lib/utils"

const { Option } = Select

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
          onChange(duration(newNum, unit).asDays())
        }}
      />
      <Select
        defaultValue={unit}
        onChange={(newUnit) => {
          setUnit(newUnit)
          onChange(duration(num, newUnit).asDays())
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

const ClientForm = ({ initialClient, client, setClient }) => {
  const { data } = useQuery(GET_ALL_MANAGERS)
  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="First Name">
            <Input
              type="text"
              defaultValue={initialClient?.firstName}
              onChange={(e) => setClient({ ...client, firstName: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name">
            <Input
              type="text"
              defaultValue={initialClient?.lastName}
              onChange={(e) => setClient({ ...client, lastName: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Email">
        <Input
          type="email"
          defaultValue={initialClient?.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          type="tel"
          defaultValue={initialClient?.phone}
          onChange={(e) => setClient({ ...client, phone: e.target.value })}
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Cycle">
            <DurationPicker
              defaultValue={initialClient?.cycle}
              onChange={(value) => setClient({ ...client, cycle: value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Duration">
            <DurationPicker
              defaultValue={initialClient?.duration}
              onChange={(value) => setClient({ ...client, duration: value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Manager">
        <Select
          defaultValue={initialClient?.managerId}
          onChange={(managerId) => setClient({ ...client, managerId })}
        >
          {data
            ? data.managers.map((manager) => (
                <Select.Option value={manager.id} key={manager.id}>
                  {getFullName(manager)}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  )
}

ClientForm.propTypes = {
  initialClient: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  setClient: PropTypes.func.isRequired,
}

export default ClientForm
