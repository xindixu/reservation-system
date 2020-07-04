import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Typography, Card } from "antd"
import { getDefaultAvatar } from "lib/utils"

const { Meta } = Card
const { Paragraph } = Typography

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

export default ClientGrid
