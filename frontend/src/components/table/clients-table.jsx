import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Column, Table, AutoSizer, InfiniteLoader } from "react-virtualized"
import { Button, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { CLIENT, MANAGER } from "lib/common-types"
import { getFullName } from "lib/utils"
import { defaultTableSettings } from "lib/constants"
import "react-virtualized/styles.css" // only needs to be imported once

const ClientsTable = ({
  clients = [],
  deleteClient,
  editClient,
  fetchMore,
  hasNext,
  loading,
  managers,
}) => {
  console.log(clients)
  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => !!clients[index]}
      loadMoreRows={fetchMore}
      rowCount={hasNext ? clients.length + 1 : clients.length}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              width={width}
              height={height}
              headerHeight={20}
              rowHeight={80}
              rowCount={clients.length}
              rowGetter={({ index }) => clients[index]}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
            >
              <Column
                label="Name"
                dataKey="name"
                width={300}
                cellRenderer={({ rowData }) => (
                  <Link to={`/client/${rowData.id}`}>{getFullName(rowData)} </Link>
                )}
              />

              <Column
                label="Manager"
                dataKey="manager"
                width={500}
                flexGrow={1}
                cellRenderer={({ rowData }) => (
                  <div>
                    {rowData.managers.map((manager) => (
                      <Tag key={manager.id}>{getFullName(manager)}</Tag>
                    ))}
                  </div>
                )}
                // filters={managers?.map((manager) => ({
                //   text: getFullName(manager),
                //   value: manager.id,
                // }))}
                // onFilter={(filter, { managers }) => managers.some(({ id }) => id === filter)}
              />

              <Column width={100} label="Cycle" dataKey="cycle" />
              <Column width={100} label="Duration" dataKey="duration" />

              <Column
                label="Contact"
                dataKey="contact"
                width={100}
                cellRenderer={({ id, email, phone }) => [
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
                label="Action"
                dataKey="actions"
                width={100}
                cellRenderer={(client) => [
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
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
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
