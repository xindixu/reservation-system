import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Form, Select, List, Avatar } from "antd"
import { FORM, MANAGER } from "lib/common-types"
import { getFullName, getDefaultAvatar } from "lib/utils"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import useClients from "data/use-clients"

const groupClients = (clients, managerId) => {
  const clientsServedByManager = []
  const clientsNotServedByManager = []

  if (clients) {
    clients.clients.forEach((client) => {
      if (client.managers.some(({ id }) => id === managerId)) {
        clientsServedByManager.push(client)
      } else {
        clientsNotServedByManager.push(client)
      }
    })
  }
  return { clientsServedByManager, clientsNotServedByManager }
}
const AddClientToManager = ({ form, initialManager, onSubmit, setNumOfClientsToAdd }) => {
  const { clients, loadingClients, errorClients, loadClients } = useClients()

  useEffect(() => {
    loadClients()
  }, [])

  if (loadingClients) {
    return "loading..."
  }

  // TODO: clients: search for clients by name
  const { clientsNotServedByManager } = groupClients(clients, initialManager.id)
  const clientsServedByManager = initialManager.clients

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
