import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_CLIENT_BY_ID, UPDATE_CLIENT } from "graphql/clients"
import { CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import { getFullName, calculateNextVisit } from "lib/utils"
import VisitForm from "components/forms/visit-form"
import Calendar from "components/calendar"
import ClientFrom from "components/forms/client-form"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { toISOStringWithTZ } from "lib/datetime"

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
  const [presetDate, setPresetDate] = useState({})
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

  const [start, end] = calculateNextVisit(client, visits)

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
        initialDate={visits.length ? visits[visits.length - 1].start : ""}
        onClickVisit={(id) => {
          setSelectedVisit(visits.find((v) => v.id === id))
          setModalToShow(MODALS.editVisit)
        }}
        onEditVisit={(id, start, end) => {
          editVisit({
            variables: {
              id,
              start: toISOStringWithTZ(new Date(start)),
              end: toISOStringWithTZ(new Date(end)),
            },
          })
        }}
        onSelectDateRange={(start, end, allDay) => {
          setPresetDate({ start, end, allDay })
          setModalToShow(MODALS.addVisit)
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
          title={`Create New Visit for ${getFullName(client)}`}
          onClose={() => {
            setModalToShow("")
            setPresetDate({})
          }}
          submitButtonText="Create"
        >
          {({ form }) => (
            <VisitForm
              initialVisit={{ client, ...presetDate }}
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
