import React, { useEffect } from "react"
import { sortBy } from "lodash"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Form, Select, List, Avatar } from "antd"
import { FORM, MANAGER } from "lib/common-types"

import { getFullName, getDefaultAvatar, mapById } from "lib/utils"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"
import useClients from "data/use-clients"

const groupClients = (clients, managerId) => {
  const clientsServedByManager = []
  const clientsNotServedByManager = []

  if (clients) {
    clients.forEach((client) => {
      if (client.managers.some(({ id }) => id === managerId)) {
        clientsServedByManager.push(client)
      } else {
        clientsNotServedByManager.push(client)
      }
    })
  }
  return { clientsServedByManager, clientsNotServedByManager }
}
const AddClientsToManager = ({ form, initialManager, onSubmit, setNumOfClientsToAdd }) => {
  const { t } = useTranslation()

  const { clients: { clients } = {}, loadingClients, loadClients } = useClients()

  useEffect(() => {
    // TODO: real pagination
    loadClients({ variables: { size: 200 } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loadingClients) {
    return "loading..."
  }

  // TODO: clients: search for clients by name
  const { clientsNotServedByManager } = groupClients(clients, initialManager.id)

  const clientsById = mapById(clientsNotServedByManager)

  return (
    <>
      <Form
        {...defaultFormLayout}
        form={form}
        validateMessages={defaultValidateMessages}
        onFinish={onSubmit}
      >
        <Form.Item
          initialValue={initialManager.clientIds}
          label={t("message.addClientsToManager", { manager: getFullName(initialManager) })}
          rules={[{ required: true }]}
          name="clientIds"
        >
          <Select
            mode="multiple"
            onChange={(clintIds) => {
              setNumOfClientsToAdd(clintIds.length)
            }}
          >
            {clientsNotServedByManager.map((client) => (
              <Select.Option value={client.id} key={client.id}>
                {getFullName(client)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <List
        dataSource={sortBy(
          form.getFieldValue("clientIds")?.map((id) => clientsById[id]),
          ["firstName", "lastName"]
        )}
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

AddClientsToManager.propTypes = {
  form: PropTypes.shape(FORM).isRequired,
  initialManager: PropTypes.shape(MANAGER).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setNumOfClientsToAdd: PropTypes.func.isRequired,
}
export default AddClientsToManager
