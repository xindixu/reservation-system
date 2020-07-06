import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from "antd"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { getFullName } from "lib/utils"
import { CLIENT } from "lib/commonTypes"
import { defaultTableSettings } from "lib/constants"

const { Column } = Table

const ClientsTable = ({ clients, managers }) => (
  <Table dataSource={clients} rowKey={({ id }) => id} {...defaultTableSettings}>
    <Column title="Name" key="name" render={(record) => getFullName(record)} />
    {clients[0]?.manager && (
      <Column
        title="Manager"
        key="manager"
        render={({ manager }) => getFullName(manager)}
        filters={managers.map((manager) => ({ text: getFullName(manager), value: manager.id }))}
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
          aria-label="email team"
          href={`mailto:${email}`}
        />,
        <Button
          key={`phone-${id}`}
          type="link"
          size="small"
          icon={<PhoneOutlined />}
          aria-label="call team"
          href={`tel:${phone}`}
        />,
      ]}
    />
  </Table>
)

ClientsTable.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
}

export default ClientsTable
