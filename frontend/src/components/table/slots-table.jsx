import React from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import { CheckSquareOutlined, BorderOutlined } from "@ant-design/icons"
import { getFullName } from "lib/utils"
import { SLOT, MANAGER, TEAM } from "lib/commonTypes"
import { defaultTableSettings } from "lib/constants"

const { Column } = Table

const Slots = ({ loading, slots, managers, teams }) => {
  return (
    <Table loading={loading} dataSource={slots} rowKey={({ id }) => id} {...defaultTableSettings}>
      <Column title="Name" key="name" dataIndex="name" />
      <Column
        title="Manager"
        key="manager"
        render={({ manager }) => getFullName(manager)}
        filters={managers?.map((manager) => ({ text: getFullName(manager), value: manager.id }))}
        onFilter={(filter, { manager }) => manager.id === filter}
      />
      <Column
        title="Team"
        key="team"
        render={({ team }) => team.name}
        filters={teams?.map(({ name, id }) => ({ text: name, value: id }))}
        onFilter={(filter, { team }) => team.id === filter}
      />
      <Column
        title="Shareable"
        key="shareable"
        align="center"
        render={({ shareable }) => (shareable ? <CheckSquareOutlined /> : <BorderOutlined />)}
        filters={[
          { text: <CheckSquareOutlined />, value: true },
          { text: <BorderOutlined />, value: false },
        ]}
        onFilter={(filter, { shareable }) => shareable === filter}
      />
    </Table>
  )
}

Slots.propTypes = {
  loading: PropTypes.bool.isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape(SLOT).isRequired).isRequired,
  managers: PropTypes.arrayOf(PropTypes.shape(MANAGER).isRequired).isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape(TEAM).isRequired).isRequired,
}

export default Slots
