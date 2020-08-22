import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { InfinityTable as Table } from "antd-table-infinity"

import { Button, Tag, Spin } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { CLIENT, MANAGER } from "lib/common-types"
import { getFullName } from "lib/utils"
import { defaultTableSettings } from "lib/constants"

const ClientsTable = ({
  loading,
  clients = [],
  managers,
  editClient,
  deleteClient,
  fetchMore,
  hasNext,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, client) => <Link to={`/client/${client.id}`}>{getFullName(client)}</Link>,
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
      render: (_, { managers }) =>
        managers.map((manager) => <Tag key={manager.id}>{getFullName(manager)}</Tag>),

      filters: managers?.map((manager) => ({ text: getFullName(manager), value: manager.id })),
      onFilter: (filter, { managers }) => managers.some(({ id }) => id === filter),
    },
    {
      title: "Cycle",
      dataIndex: "cycle",
      key: "cycle",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      render: (_, { id, email, phone }) => [
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
      ],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, client) => [
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
      ],
    },
  ]

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={clients}
      rowKey={({ id }) => id}
      onFetch={() => {
        if (hasNext) {
          return fetchMore()
        }
      }}
      pageSize={20}
      loadingIndicator={
        <div className="flex justify-center">
          <Spin />
        </div>
      }
      scroll={{ y: "calc(100vh - 10rem)" }}
    />
  )
}
ClientsTable.defaultProps = {
  managers: [],
  loading: true,
}
ClientsTable.propTypes = {
  loading: PropTypes.bool,
  clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
  managers: PropTypes.arrayOf(PropTypes.shape(MANAGER)),
  editClient: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
}
export default ClientsTable
