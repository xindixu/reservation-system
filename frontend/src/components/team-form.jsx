import React from "react"
import PropTypes from "prop-types"

import { Form, Input } from "antd"

const TeamForm = ({ team, setTeam }) => {
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      layout="vertical"
      size="middle"
    >
      <Form.Item label="Name">
        <Input type="text" onChange={(e) => setTeam({ ...team, name: e.target.value })} />
      </Form.Item>
      <Form.Item label="Email">
        <Input type="email" onChange={(e) => setTeam({ ...team, email: e.target.value })} />
      </Form.Item>
      <Form.Item label="Phone">
        <Input type="tel" onChange={(e) => setTeam({ ...team, phone: e.target.value })} />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          rows={5}
          allowClear
          onChange={(e) => setTeam({ ...team, description: e.target.value })}
        />
      </Form.Item>
    </Form>
  )
}

TeamForm.propTypes = {
  team: PropTypes.object.isRequired,
  setTeam: PropTypes.func.isRequired,
}

export default TeamForm
