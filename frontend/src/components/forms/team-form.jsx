import React from "react"
import PropTypes from "prop-types"

import { Form, Input } from "antd"
import { TEAM } from "lib/commonTypes"

const TeamForm = ({ initialTeam, team, setTeam }) => {
  const { name, email, phone, description } = initialTeam
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
          defaultValue={name}
          onChange={(e) => setTeam({ ...team, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          type="email"
          defaultValue={email}
          onChange={(e) => setTeam({ ...team, email: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          type="tel"
          defaultValue={phone}
          onChange={(e) => setTeam({ ...team, phone: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          rows={5}
          allowClear
          defaultValue={description}
          onChange={(e) => setTeam({ ...team, description: e.target.value })}
        />
      </Form.Item>
    </Form>
  )
}

TeamForm.defaultProps = {
  initialTeam: {},
}

TeamForm.propTypes = {
  initialTeam: PropTypes.shape(TEAM),
  team: PropTypes.object.isRequired,
  setTeam: PropTypes.func.isRequired,
}

export default TeamForm
