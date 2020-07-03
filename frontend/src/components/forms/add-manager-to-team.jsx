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
        <Select
          mode="multiple"
          onChange={(managerIds) =>
            setTeam({ ...team, managers: managerIds.map((id) => managers[id]) })
          }
        >
          {managers.map((manager) => {
            const { id, firstName, lastName } = manager
            return (
              <Select.Option value={id} key={id}>
                {firstName} {lastName}
              </Select.Option>
            )
          }) || null}
        </Select>
      </Form.Item>
    </Form>
  )
}
export default AddManagerToTeam
