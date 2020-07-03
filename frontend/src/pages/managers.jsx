import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Card, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_ALL_MANAGERS } from "graphql/managers"
import Modal from "components/modal"
import ManagerForm from "components/manager-form"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/managers-grid"

const { Title } = Typography

const MODALS = {
  addManager: "addManager",
}

const Managers = () => {
  const [manager, setManager] = useState({})
  const [modalToShow, setModalToShow] = useState("")
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ALL_MANAGERS)

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <ManagersGrid managers={data.managers} />
      <FAButton
        onClick={() => setModalToShow(MODALS.addManager)}
        ariaLabel="new manager"
        rotate={modalToShow}
      />
      {modalToShow === MODALS.addManager && (
        <Modal
          title="Create New Manager"
          onClose={() => setModalToShow("")}
          // onSubmit={() => addManager({ variables: manager })}
        >
          <ManagerForm manager={manager} setManager={setManager} />
        </Modal>
      )}
    </>
  )
}

Managers.propTypes = {}

export default Managers
