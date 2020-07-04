import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Select, List, Avatar } from "antd"
import { getFullName, getDefaultAvatar } from "lib/utils"
import { GET_ALL_MANAGERS } from "graphql/managers"

const AddManagerToTeam = ({ initialTeam, team, setTeam }) => {
  const { data, loading } = useQuery(GET_ALL_MANAGERS)

  if (loading) {
    return "loading..."
  }

  const { managers } = data
  const managersInTeam = []
  const managersNotInTeam = []

  managers.forEach((manager) => {
    if (manager.team.id === initialTeam.id) {
      managersInTeam.push(manager)
    } else {
      managersNotInTeam.push(manager)
    }
  })

  return (
    <>
      <Form
        labelCol={{
          span: 24,
        }}
        layout="vertical"
        size="middle"
      >
        <Form.Item label="Add Managers">
          <Select mode="multiple" onChange={(managerIds) => setTeam({ ...team, managerIds })}>
            {managersNotInTeam.map(({ id, firstName, lastName }) => (
              <Select.Option value={id} key={id}>
                {firstName} {lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      Current Managers in {initialTeam.name}
      <List
        dataSource={managersInTeam}
        renderItem={(manager) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={getDefaultAvatar(manager, "xs")} />}
              title={getFullName(manager)}
              description={manager.jobTitle}
            />
          </List.Item>
        )}
      />
    </>
  )
}

AddManagerToTeam.propTypes = {
  initialTeam: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  setTeam: PropTypes.func.isRequired,
}
export default AddManagerToTeam
