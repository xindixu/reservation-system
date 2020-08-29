import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Column, CellMeasurer } from "react-virtualized"
import { Button, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import InfiniteScrollTable from "./infinite-scroll-table"
import { CLIENT } from "lib/common-types"
import { getFullName } from "lib/utils"
import "react-virtualized/styles.css"

const ClientsTable = ({ clients = [], deleteClient, editClient, fetchMore, hasNext }) => (
  <InfiniteScrollTable data={clients} fetchMore={fetchMore} hasNext={hasNext}>
    {({ width, cache }) => [
      <Column
        label="Name"
        dataKey="name"
        width={200}
        cellRenderer={({ rowData }) => (
          <Link to={`/client/${rowData.id}`}>{getFullName(rowData)} </Link>
        )}
      />,
      <Column
        label="Manager"
        dataKey="manager"
        width={(width / 5) * 3}
        flexGrow={1}
        cellRenderer={({ rowData, parent, rowIndex }) => (
          <CellMeasurer cache={cache} parent={parent} rowIndex={rowIndex}>
            <div className="py-4">
              {rowData.managers.map((manager) => (
                <Tag key={manager.id}>{getFullName(manager)}</Tag>
              ))}
            </div>
          </CellMeasurer>
        )}
      />,
      <Column width={80} label="Cycle" dataKey="cycle" />,
      <Column width={80} label="Duration" dataKey="duration" />,
      <Column
        label="Contact"
        dataKey="contact"
        width={80}
        cellRenderer={({ rowData: { id, email, phone } }) => [
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
      />,
      <Column
        label="Action"
        dataKey="actions"
        width={80}
        cellRenderer={({ rowData: client }) => [
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
      />,
    ]}
  </InfiniteScrollTable>
)

ClientsTable.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
  deleteClient: PropTypes.func.isRequired,
  editClient: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
}

export default ClientsTable
