import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table, Button } from "antd"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { getFullName } from "lib/utils"

const { Column } = Table

const ClientsTable = ({ clients }) => (
  <Table dataSource={clients} rowKey={({ id }) => id}>
    <Column title="Name" key="name" render={(record) => getFullName(record)} />
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
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      cycle: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default ClientsTable
