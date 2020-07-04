import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"

import { Form, Select } from "antd"
import { GET_ALL_MANAGERS } from "graphql/managers"

const AddManagerToTeam = ({ team, setTeam }) => {
  const { data, loading } = useQuery(GET_ALL_MANAGERS)
  if (loading) {
    return "loading..."
  }
  const { managers } = data
  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <Form.Item label="Managers">
        <Select mode="multiple" onChange={(managerIds) => setTeam({ ...team, managerIds })}>
          {managers.map(({ id, firstName, lastName }) => (
            <Select.Option value={id} key={id}>
              {firstName} {lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
export default AddManagerToTeam
