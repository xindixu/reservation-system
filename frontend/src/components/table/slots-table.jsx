import React from "react"
import PropTypes from "prop-types"
import { Table, Button } from "antd"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { getFullName } from "lib/utils"
import { CLIENT } from "lib/commonTypes"

const { Column } = Table

const Slots = ({ slots }) => (
  <Table dataSource={slots} rowKey={({ id }) => id}>
    <Column title="Name" key="name" dataIndex="name" />
    {slots[0]?.manager && (
      <Column title="Manager" key="manager" render={({ manager }) => getFullName(manager)} />
    )}
  </Table>
)

Slots.propTypes = {
  // slots: PropTypes.arrayOf(PropTypes.shape(SLOTS).isRequired).isRequired,
}

export default Slots
