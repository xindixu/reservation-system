import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Typography, Button, Card } from "antd"
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { TEAM } from "lib/commonTypes"

const { Paragraph } = Typography

const TeamsGrid = ({ teams }) => (
  <div className="flex flex-wrap -mx-2 overflow-hidden">
    {teams.map(({ id, name, description, email, phone, managersCount }) => (
      <Link
        key={id}
        to={`/team/${id}`}
        className="my-2 px-2 w-full overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/4"
      >
        <Card
          title={name}
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
          extra={
            <>
              <UserOutlined alt="managers count" /> {managersCount}
            </>
          }
        >
          <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
        </Card>
      </Link>
    ))}
  </div>
)

TeamsGrid.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape(TEAM).isRequired).isRequired,
}

export default TeamsGrid
