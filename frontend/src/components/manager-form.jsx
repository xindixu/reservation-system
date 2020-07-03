import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Input, Select } from "antd"
import { GET_ALL_TEAMS } from "graphql/teams"

const ManagerForm = ({ manager, setManager }) => {
  const { data } = useQuery(GET_ALL_TEAMS)
  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <div className="flex flex-wrap -mx-2 overflow-hidden">
        <div className="my-2 px-2 w-1/2 overflow-hidden">
          <Form.Item label="First Name">
            <Input
              type="text"
              onChange={(e) => setManager({ ...manager, firstName: e.target.value })}
            />
          </Form.Item>
        </div>
        <div className="my-2 px-2 w-1/2 overflow-hidden">
          <Form.Item label="Last Name">
            <Input
              type="text"
              onChange={(e) => setManager({ ...manager, lastName: e.target.value })}
            />
          </Form.Item>
        </div>
      </div>
      <Form.Item label="Job Title">
        <Input type="text" onChange={(e) => setManager({ ...manager, jobTitle: e.target.value })} />
      </Form.Item>
      <Form.Item label="Email">
        <Input type="email" onChange={(e) => setManager({ ...manager, email: e.target.value })} />
      </Form.Item>
      <Form.Item label="Phone">
        <Input type="tel" onChange={(e) => setManager({ ...manager, phone: e.target.value })} />
      </Form.Item>
      <Form.Item label="Team">
        <Select onChange={(teamId) => setManager({ ...manager, teamId })}>
          {data
            ? data.teams.map(({ id, name }) => (
                <Select.Option value={id} key={id}>
                  {name}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
    </Form>
  )
}

ManagerForm.propTypes = {
  manager: PropTypes.object.isRequired,
  setManager: PropTypes.func.isRequired,
}

export default ManagerForm
