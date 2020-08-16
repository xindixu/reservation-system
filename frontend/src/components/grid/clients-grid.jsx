import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Card } from "antd"
import { CLIENT } from "lib/common-types"

const ClientGrid = ({ clients }) => (
  <div className="flex flex-wrap -mx-2 overflow-hidden">
    {clients.map(({ id, firstName, lastName, cycle, duration }) => (
      <Link
        key={id}
        to={`/client/${id}`}
        className="my-2 px-2 w-1/2 overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/6"
      >
        <Card hoverable title={`${firstName} ${lastName}`}>
          <p>Every {cycle} days</p>
          <p>Stay for {duration} days</p>
        </Card>
      </Link>
    ))}
  </div>
)

ClientGrid.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape(CLIENT).isRequired).isRequired,
}

export default ClientGrid
