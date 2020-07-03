import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Button, Card, Space } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_ALL_MANAGERS, CREATE_MANAGER } from "graphql/managers"
import Modal from "components/modal"
import ManagerForm from "components/manager-form"
import FAButton from "components/floating-action-button"
import ManagersGrid from "components/managers-grid"

const MODALS = {
  addManager: "addManager",
}

const Managers = () => {
  const { loading, error, data } = useQuery(GET_ALL_MANAGERS)
  const [addManager] = useMutation(CREATE_MANAGER, {
    update: (cache, { data: { createManager } }) => {
      const { manager } = createManager
      const { managers } = cache.readQuery({ query: GET_ALL_MANAGERS })
      cache.writeQuery({
        query: GET_ALL_MANAGERS,
        data: {
          managers: [...managers, manager],
        },
      })
    },
  })

  const [manager, setManager] = useState({})
  const [modalToShow, setModalToShow] = useState("")

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
          onSubmit={() => {
            console.log(manager)
            addManager({ variables: manager })
          }}
        >
          <ManagerForm manager={manager} setManager={setManager} />
        </Modal>
      )}
    </>
  )
}

Managers.propTypes = {}

export default Managers
