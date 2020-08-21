import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table, Button, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { CLIENT, MANAGER } from "lib/common-types"
import { getFullName } from "lib/utils"
import { defaultTableSettings } from "lib/constants"

const { Column } = Table

const ClientsTable = ({
  data,
  deleteClient,
  editClient,
  fetchMore,
  loading,
  managers,
  page,
  setPage,
}) => {
  const onChange = ({ current }) => {
    fetchMore(current)
    setPage(current)
  }

  const { clients, size, total } = data
  return (
    <Table
      loading={loading}
      dataSource={clients}
      rowKey={({ id }) => id}
      {...defaultTableSettings}
      pagination={{ pageSize: size, total, current: page }}
      pageSize={size}
      onChange={onChange}
    >
      <Column
        title="Name"
        key="name"
        render={(record) => <Link to={`/client/${record.id}`}>{getFullName(record)} </Link>}
      />
      {clients?.length && clients[0]?.managers && (
        <Column
          title="Manager"
          key="manager"
          render={({ managers }) =>
            managers.map((manager) => <Tag key={manager.id}>{getFullName(manager)}</Tag>)
          }
          filters={managers?.map((manager) => ({ text: getFullName(manager), value: manager.id }))}
          onFilter={(filter, { managers }) => managers.some(({ id }) => id === filter)}
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
            onClick={() => editClient(client)}
          />,
          <Button
            key={`delete-${client.id}`}
            size="small"
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            aria-label="delete"
            onClick={() => deleteClient(client)}
          />,
        ]}
      />
    </Table>
  )
}
ClientsTable.defaultProps = {
  managers: [],
  loading: false,
}

ClientsTable.propTypes = {
  data: PropTypes.shape({
    clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
  }).isRequired,
  deleteClient: PropTypes.func.isRequired,
  editClient: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  managers: PropTypes.arrayOf(PropTypes.shape(MANAGER)),
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default ClientsTable
