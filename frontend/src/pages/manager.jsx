import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space, Row, Col, Card } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_MANAGER_BY_ID } from "graphql/managers"
import { getFullName, getDefaultAvatar } from "lib/utils"
import Modal from "components/modal"
import ManagerForm from "components/manager-form"
import FAButton from "components/floating-action-button"

const { Title } = Typography

const PageActions = ({ manager: { email, phone } }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={() => {}}>
      Update
    </Button>
    <Button
      key="email"
      type="default"
      icon={<MailOutlined />}
      aria-label="email team"
      href={`mailto:${email}`}
    >
      Email
    </Button>

    <Button
      key="phone"
      type="default"
      icon={<PhoneOutlined />}
      aria-label="call team"
      href={`tel:${phone}`}
    >
      Call
    </Button>
  </Space>
)

const MODALS = {
  addManager: "addManager",
}

const Manager = () => {
  const [modalToShow, setModalToShow] = useState("")
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_MANAGER_BY_ID, {
    variables: { id },
  })

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error! ${error.message}`
  }

  const { manager } = data
  const {
    firstName,
    avatar: { lg },
  } = manager

  return (
    <>
      <Title>{getFullName(manager)}</Title>
      <PageActions manager={manager} />
      <div className="bg-white rounded-lg w-2/3">
        <img src={lg || getDefaultAvatar(firstName, "lg")} alt={getFullName(manager)} />
      </div>

      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={modalToShow}
      />
    </>
  )
}

Manager.propTypes = {}

export default Manager
