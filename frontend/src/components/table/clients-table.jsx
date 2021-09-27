import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Column, CellMeasurer } from "react-virtualized"
import { Button, Checkbox, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import InfiniteScrollTable from "./infinite-scroll-table"
import { CLIENT } from "lib/common-types"
import { getFullName } from "lib/utils"

const ClientsTable = ({
  clients = [],
  deleteClient,
  editClient,
  fetchMore,
  hasNext,
  hideActions,
}) => {
  const { t } = useTranslation()

  return (
    <InfiniteScrollTable data={clients} fetchMore={fetchMore} hasNext={hasNext}>
      {({ width, cache }) => {
        const staticColumns = [
          <Column
            key="fullName"
            label={t("common.fullName")}
            dataKey="fullName"
            width={200}
            cellRenderer={({ rowData }) => (
              <Link to={`/client/${rowData.id}`}>{getFullName(rowData)}</Link>
            )}
          />,
          <Column
            key="manager"
            label={t("common.manager_plural")}
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
          <Column key="cycle" width={80} label={t("common.cycle")} dataKey="cycle" />,
          <Column key="duration" width={80} label={t("common.duration")} dataKey="duration" />,
          <Column
            key="contact"
            label={t("common.contact")}
            dataKey="contact"
            width={80}
            cellRenderer={({ rowData: { id, email, phone } }) => [
              <Button
                key={`email-${id}`}
                type="link"
                size="small"
                icon={<MailOutlined />}
                aria-label={t("common.email")}
                href={`mailto:${email}`}
              />,
              <Button
                key={`phone-${id}`}
                type="link"
                size="small"
                icon={<PhoneOutlined />}
                aria-label={t("common.call")}
                href={`tel:${phone}`}
              />,
            ]}
          />,
        ]

        if (hideActions) {
          return staticColumns
        }

        return [
          <Column
            key="checkbox"
            width={20}
            headerRenderer={() => <Checkbox onChange={(e) => console.log(e.target.checked)} />}
            cellRenderer={({ rowData }) => <Checkbox onChange={(e) => console.log(rowData)} />}
          />,
          ...staticColumns,
          <Column
            key="actions"
            label={t("common.action")}
            dataKey="actions"
            width={80}
            cellRenderer={({ rowData: client }) => [
              <Button
                key={`edit-${client.id}`}
                size="small"
                shape="circle"
                icon={<EditOutlined />}
                aria-label={t("common.edit")}
                onClick={() => editClient(client)}
                disabled={typeof editClient !== "function"}
              />,
              <Button
                key={`delete-${client.id}`}
                size="small"
                type="danger"
                shape="circle"
                icon={<DeleteOutlined />}
                aria-label={t("common.delete")}
                onClick={() => deleteClient(client)}
              />,
            ]}
          />,
        ]
      }}
    </InfiniteScrollTable>
  )
}
ClientsTable.defaultProps = {
  fetchMore: () => {},
  hasNext: false,
  hideActions: false,
}
ClientsTable.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
  deleteClient: PropTypes.func.isRequired,
  editClient: PropTypes.func.isRequired,
  fetchMore: PropTypes.func,
  hasNext: PropTypes.bool,
  hideActions: PropTypes.bool,
}

export default ClientsTable
