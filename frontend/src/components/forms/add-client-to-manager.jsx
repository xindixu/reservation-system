import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"
import { Form, Select, List, Avatar } from "antd"
import { getFullName, getDefaultAvatar } from "lib/utils"
import { FORM, MANAGER } from "lib/commonTypes"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import { GET_ALL_CLIENTS } from "graphql/clients"

const AddClientToManager = ({ form, initialManager, onSubmit, setNumOfClientsToAdd }) => {
  const { data, loading } = useQuery(GET_ALL_CLIENTS)

  if (loading) {
    return "loading..."
  }

  const { clients } = data
  const clientsServedByManager = []
  const clientsNotServedByManager = []

  clients.forEach((client) => {
    if (client.managers.some(({ id }) => id === initialManager.id)) {
      clientsServedByManager.push(client)
    } else {
      clientsNotServedByManager.push(client)
    }
  })

  return (
    <>
      <Form
        {...defaultFormLayout}
        form={form}
        initialValues={initialManager}
        validateMessages={defaultValidateMessages}
        onFinish={onSubmit}
      >
        <Form.Item label="Add Clients" name="clientIds">
          <Select mode="multiple" onChange={(clientIds) => setNumOfClientsToAdd(clientIds.length)}>
            {clientsNotServedByManager.map((client) => (
              <Select.Option value={client.id} key={client.id}>
                {getFullName(client)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      Current Clients served by {getFullName(initialManager)}
      <List
        dataSource={clientsServedByManager}
        renderItem={(client) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={getDefaultAvatar(client, "xs")} />}
              title={getFullName(client)}
            />
          </List.Item>
        )}
      />
    </>
  )
}

AddClientToManager.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialManager: PropTypes.shape(MANAGER).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setNumOfClientsToAdd: PropTypes.func.isRequired,
}
export default AddClientToManager
