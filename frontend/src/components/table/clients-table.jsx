import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { getFullName } from "lib/utils"
import { CLIENT, MANAGER } from "lib/commonTypes"
import { defaultTableSettings } from "lib/constants"

const { Column } = Table

const ClientsTable = ({ loading, clients, managers, edit }) => (
  <Table loading={loading} dataSource={clients} rowKey={({ id }) => id} {...defaultTableSettings}>
    <Column title="Name" key="name" render={(record) => getFullName(record)} />
    {clients?.length && clients[0]?.manager && (
      <Column
        title="Manager"
        key="manager"
        render={({ manager }) => getFullName(manager)}
        filters={managers?.map((manager) => ({ text: getFullName(manager), value: manager.id }))}
        onFilter={(filter, { manager }) => manager.id === filter}
      />
    )}

    <Column title="Cycle" key="cycle" dataIndex="cycle" />
    <Column title="Duration" key="duration" dataIndex="duration" />
    <Column
      title="Contact"
      key="contact"
      render={({ id, email, phone }) => [
        <Button
          key={`email-${id}`}
          type="link"
          size="small"
          icon={<MailOutlined />}
          aria-label="email"
          href={`mailto:${email}`}
        />,
        <Button
          key={`phone-${id}`}
          type="link"
          size="small"
          icon={<PhoneOutlined />}
          aria-label="call"
          href={`tel:${phone}`}
        />,
      ]}
    />
    <Column
      title="Action"
      key="actions"
      render={(client) => [
        <Button
          key={`edit-${client.id}`}
          size="small"
          shape="circle"
          icon={<EditOutlined />}
          aria-label="edit"
          onClick={() => edit(client)}
        />,
        <Button
          key={`delete-${client.id}`}
          size="small"
          type="danger"
          shape="circle"
          icon={<DeleteOutlined />}
          aria-label="delete"
          onClick={() => {}}
        />,
      ]}
    />
  </Table>
)

ClientsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
  managers: PropTypes.arrayOf(PropTypes.shape(MANAGER)).isRequired,
}

export default ClientsTable
