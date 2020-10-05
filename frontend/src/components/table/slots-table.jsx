import React from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Button, Tag } from "antd"
import {
  CheckSquareOutlined,
  BorderOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { Column, CellMeasurer } from "react-virtualized"

import InfiniteScrollTable from "./infinite-scroll-table"
import { SLOT } from "lib/common-types"
import { getFullName } from "lib/utils"

const SlotsTable = ({ slots = [], deleteSlot, editSlot, fetchMore, hasNext }) => {
  const { t } = useTranslation()
  return (
    <InfiniteScrollTable data={slots} fetchMore={fetchMore} hasNext={hasNext}>
      {({ width, cache }) => [
        <Column
          key="name"
          label={t("common.name")}
          dataKey="name"
          width={300}
          cellRenderer={({ rowData: { name, id } }) => <Link to={`/slot/${id}`}>{name}</Link>}
        />,
        <Column
          key="manager"
          label={t("term.manager.plural")}
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
        <Column
          key="team"
          label={t("term.team.singular")}
          dataKey="team"
          width={width / 5}
          cellRenderer={({ rowData: { team } }) => team?.name}
        />,
        <Column
          key="shareable"
          label={t("common.shareable")}
          width={100}
          dataKey="shareable"
          cellRenderer={({ rowData: { shareable } }) =>
            shareable ? <CheckSquareOutlined /> : <BorderOutlined />
          }
        />,
        <Column
          key="actions"
          label={t("common.action")}
          dataKey="actions"
          width={80}
          cellRenderer={({ rowData: slot }) => [
            <Button
              key={`edit-${slot.id}`}
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              aria-label="edit"
              onClick={() => editSlot(slot)}
            />,
            <Button
              key={`delete-${slot.id}`}
              size="small"
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              aria-label="delete"
              onClick={() => deleteSlot(slot)}
            />,
          ]}
        />,
      ]}
    </InfiniteScrollTable>
  )
}

SlotsTable.defaultProps = {
  fetchMore: () => {},
  hasNext: false,
}

SlotsTable.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape(SLOT).isRequired).isRequired,
  deleteSlot: PropTypes.func.isRequired,
  editSlot: PropTypes.func.isRequired,
  fetchMore: PropTypes.func,
  hasNext: PropTypes.bool,
}

export default SlotsTable
