import React from "react"
import PropTypes from "prop-types"

import { Form, Input } from "antd"

const TeamForm = ({ initialValue, team, setTeam }) => {
  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <Form.Item label="Name">
        <Input
          type="text"
          defaultValue={initialValue?.name}
          onChange={(e) => setTeam({ ...team, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          type="email"
          defaultValue={initialValue?.email}
          onChange={(e) => setTeam({ ...team, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          type="tel"
          defaultValue={initialValue?.phone}
          onChange={(e) => setTeam({ ...team, phone: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          rows={5}
          allowClear
          defaultValue={initialValue?.description}
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
