import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Typography, Card } from "antd"
import { MANAGER } from "lib/common-types"
import { getDefaultAvatar } from "lib/utils"

const { Meta } = Card
const { Paragraph } = Typography

const ManagersGrid = ({ managers }) => (
  <div className="flex flex-wrap -mx-2 overflow-hidden">
    {managers.map((manager) => {
      const { id, firstName, lastName, jobTitle, email, phone } = manager
      return (
        <Link
          key={id}
          to={`/manager/${id}`}
          className="my-2 px-2 w-1/2 overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/6"
        >
          <Card
            cover={<img alt={`${firstName} ${lastName}`} src={getDefaultAvatar(manager, "md")} />}
            hoverable
          >
            <Meta
              title={`${firstName} ${lastName}`}
              description={<Paragraph ellipsis>{jobTitle}</Paragraph>}
            />
          </Card>
        </Link>
      )
    })}
  </div>
)

ManagersGrid.propTypes = {
  managers: PropTypes.arrayOf(PropTypes.shape(MANAGER).isRequired).isRequired,
}

export default ManagersGrid
