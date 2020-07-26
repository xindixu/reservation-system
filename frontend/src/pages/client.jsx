import React, { useState } from "react"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import moment from "moment"
import { Typography, Button, Space, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_CLIENT_BY_ID, UPDATE_CLIENT } from "graphql/clients"
import { CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT, GET_ALL_VISITS } from "graphql/visits"
import { getFullName } from "lib/utils"
import VisitForm from "components/forms/visit-form"
import Calendar from "components/calendar"
import ClientFrom from "components/forms/client-form"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"

const { Title } = Typography

const MODALS = {
  editClient: "editClient",
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const PageActions = ({ client: { email, phone }, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      Edit
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

const Client = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_CLIENT_BY_ID, {
    variables: { id },
  })
  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (cache, { data: { createVisit } }) => {
      const { visit } = createVisit
      const { client } = cache.readQuery({ query: GET_CLIENT_BY_ID, variables: { id } })
      cache.writeQuery({
        query: GET_CLIENT_BY_ID,
        variables: { id },
        data: {
          client: { ...client, visits: [...client.visits, visit] },
        },
      })
    },
  })
  const [editClient] = useMutation(UPDATE_CLIENT)
  const [editVisit] = useMutation(UPDATE_VISIT)
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: (cache, { data: { destroyVisit } }) => {
      const { visit } = destroyVisit
      const { client } = cache.readQuery({ query: GET_CLIENT_BY_ID, variables: { id } })
      cache.writeQuery({
        query: GET_CLIENT_BY_ID,
        variables: { id },
        data: {
          client: { ...client, visits: client.visits.filter((v) => v.id !== visit.id) },
        },
      })
    },
  })

  const [selectedVisit, setSelectedVisit] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error!`
  }

  const { client } = data
  const { duration, cycle, managers, visits } = client
  const fullName = getFullName(client)

  return (
    <>
      <div className="flex space-between bg-white rounded-lg px-10 mb-10">
        <div className="flex-grow py-10">
          <Title>{fullName}</Title>

          <p>
            Managers:{" "}
            {managers.map((manager) => (
              <Tag key={manager.id}>{getFullName(manager)}</Tag>
            ))}
          </p>
          <p>Cycle: {cycle}</p>
          <p>Duration: {duration}</p>
          <PageActions client={client} edit={() => setModalToShow(MODALS.editClient)} />
        </div>
      </div>

      <Calendar
        visits={visits.map((visit) => ({ ...visit, client }))}
        initialDate={visits.length ? visits[visits.length - 1].startsAt : ""}
        onClickVisit={(id) => {
          setSelectedVisit(visits.find((v) => v.id === id))
          setModalToShow(MODALS.editVisit)
        }}
        onEditVisit={(id, start, end) => {
          editVisit({
            variables: {
              id,
              startsAt: moment(start).toISOString(true),
              endsAt: moment(end).toISOString(true),
            },
          })
        }}
      />
      {modalToShow === MODALS.editVisit && (
        <Modal
          title={`Edit Visit for ${getFullName(client)}`}
          onClose={() => setModalToShow("")}
          onDelete={() => {
            deleteVisit({ variables: { id: selectedVisit.id } })
          }}
          submitButtonText="Update"
        >
          {({ form }) => (
            <VisitForm
              initialVisit={{ ...selectedVisit, client }}
              form={form}
              disabled={{ clientId: true }}
              onSubmit={(values) => {
                editVisit({ variables: { id: selectedVisit.id, ...values } })
                setSelectedVisit({})
              }}
            />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.addVisit && (
        <Modal
          title="Create New Visit"
          onClose={() => setModalToShow("")}
          submitButtonText="Create"
        >
          {({ form }) => (
            <VisitForm
              initialVisit={{ client }}
              form={form}
              onSubmit={(values) => addVisit({ variables: values })}
            />
          )}
        </Modal>
      )}

      {modalToShow === MODALS.editClient && (
        <Modal
          title={`Edit ${getFullName(client)}`}
          onClose={() => setModalToShow("")}
          submitButtonText="Update"
        >
          {({ form }) => (
            <ClientFrom
              form={form}
              initialClient={{
                ...client,
                managerIds: client.managers.map((m) => m.id),
              }}
              onSubmit={(values) => editClient({ variables: { id: client.id, ...values } })}
            />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addVisit)}
        ariaLabel="New Visit"
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Client
