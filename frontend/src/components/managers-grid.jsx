import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Button, Card } from "antd"
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"

const { Meta } = Card

const ManagersGrid = ({ managers }) => (
  <div className="flex flex-wrap -mx-2 overflow-hidden">
    {managers.map(({ id, firstName, lastName, jobTitle, email, phone, avatar: { md } }) => (
      <Link
        key={id}
        to={`/manager/${id}`}
        className="my-2 px-2 w-1/2 overflow-hidden sm:w-1/2 md:w-1/4 lg:w-1/6"
      >
        <Card
          cover={<img alt={`${firstName} ${lastName}`} src={md} />}
          hoverable
          actions={[
            <Button
              key="email"
              type="link"
              size="small"
              icon={<MailOutlined />}
              aria-label="email team"
              href={`mailto:${email}`}
            />,
            <Button
              key="phone"
              type="link"
              size="small"
              icon={<PhoneOutlined />}
              aria-label="call team"
              href={`tel:${phone}`}
            />,
          ]}
        >
          <Meta title={`${firstName} ${lastName}`} description={jobTitle} />
        </Card>
      </Link>
    ))}
  </div>
)

ManagersGrid.propTypes = {
  managers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      avatar: PropTypes.shape({
        md: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default ManagersGrid
