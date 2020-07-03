import React from "react"
import PropTypes from "prop-types"

import { Form, Input, Row, Col } from "antd"

const ManagerForm = ({ manager, setManager }) => {
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
              onChange={(e) => setManager({ ...manager, firstName: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name">
            <Input
              type="text"
              onChange={(e) => setManager({ ...manager, lastName: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Email">
        <Input type="email" onChange={(e) => setManager({ ...manager, email: e.target.value })} />
      </Form.Item>
      <Form.Item label="Phone">
        <Input type="tel" onChange={(e) => setManager({ ...manager, phone: e.target.value })} />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          rows={5}
          allowClear
          onChange={(e) => setManager({ ...manager, description: e.target.value })}
        />
      </Form.Item>
    </Form>
  )
}

ManagerForm.propTypes = {
  manager: PropTypes.object.isRequired,
  setManager: PropTypes.func.isRequired,
}

export default ManagerForm
