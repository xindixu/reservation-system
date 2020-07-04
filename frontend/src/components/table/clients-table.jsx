import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table } from "antd"
import { getFullName } from "lib/utils"

const { Column } = Table

const ClientsTable = ({ clients }) => (
  <Table dataSource={clients}>
    <Column title="Name" key="name" render={(record) => getFullName(record)} />
    <Column title="Cycle" key="cycle" dataIndex="cycle" />
    <Column title="Duration" key="duration" dataIndex="duration" />
  </Table>
)

ClientsTable.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default ClientsTable
