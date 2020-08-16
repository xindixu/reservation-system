import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { Typography, Button, Space } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { GET_SLOT_BY_ID, UPDATE_SLOT } from "graphql/slots"
import { CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import { getFullName } from "lib/utils"
import VisitForm from "components/forms/visit-form"
import SlotForm from "components/forms/slot-form"
import Calendar from "components/calendar"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { toISOStringWithTZ } from "lib/datetime"

const { Title } = Typography

const MODALS = {
  editSlot: "editSlot",
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const PageActions = ({ slot, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      Edit
    </Button>
    {/* <Button
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
    </Button> */}
  </Space>
)

const Slot = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_SLOT_BY_ID, {
    variables: { id },
  })
  const [editSlot] = useMutation(UPDATE_SLOT)

  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (cache, { data: { createVisit } }) => {
      const { visit } = createVisit
      const { slot } = cache.readQuery({ query: GET_SLOT_BY_ID, variables: { id } })
      cache.writeQuery({
        query: GET_SLOT_BY_ID,
        variables: { id },
        data: {
          slot: { ...slot, visits: [...slot.visits, visit] },
        },
      })
    },
  })
  const [editVisit] = useMutation(UPDATE_VISIT)
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: (cache, { data: { destroyVisit } }) => {
      const { visit } = destroyVisit
      const { slot } = cache.readQuery({ query: GET_SLOT_BY_ID, variables: { id } })
      cache.writeQuery({
        query: GET_SLOT_BY_ID,
        variables: { id },
        data: {
          slot: { ...slot, visits: slot.visits.filter((v) => v.id !== visit.id) },
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

  const { slot } = data
  const { name, sharable, visits, team, manager } = slot

  return (
    <>
      <div className="flex space-between bg-white rounded-lg px-10 mb-10">
        <div className="flex-grow py-10">
          <Title>{name}</Title>

          <p>Manager: {getFullName(manager)}</p>
          <p>Team: {team.name}</p>
          <p>Shareable: {sharable ? "yes" : "no"} </p>
          <PageActions slot={slot} edit={() => setModalToShow(MODALS.editSlot)} />
        </div>
      </div>

      <Calendar
        visits={visits}
        initialDate={visits.length ? visits[visits.length - 1].startsAt : ""}
        onClickVisit={(id) => {
          setSelectedVisit(visits.find((v) => v.id === id))
          setModalToShow(MODALS.editVisit)
        }}
        onDropVisit={(event, start, end, allDay) => {
          console.log(event, start, end, allDay)
        }}
        onEditVisit={(id, start, end) => {
          editVisit({
            variables: {
              id,
              startsAt: toISOStringWithTZ(new Date(start)),
              endsAt: toISOStringWithTZ(new Date(end)),
            },
          })
        }}
        onSelectDateRange={(startsAt, endsAt, allDay) => {
          setPresetDate({ startsAt, endsAt, allDay })
          setModalToShow(MODALS.addVisit)
        }}
      />
      {modalToShow === MODALS.editVisit && (
        <Modal
          title={`Edit Visit at ${name}`}
          onClose={() => setModalToShow("")}
          onDelete={() => {
            deleteVisit({ variables: { id: selectedVisit.id } })
          }}
          submitButtonText="Update"
        >
          {({ form }) => (
            <VisitForm
              initialVisit={selectedVisit}
              form={form}
              disabled={{ slotId: true }}
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
          title={`Create a new Visit at ${name}`}
          onClose={() => {
            setModalToShow("")
            setPresetDate({})
          }}
          submitButtonText="Create"
        >
          {({ form }) => (
            <VisitForm
              initialVisit={{ slot, ...presetDate }}
              disabled={{ slotId: true }}
              form={form}
              onSubmit={(values) => addVisit({ variables: values })}
            />
          )}
        </Modal>
      )}

      {modalToShow === MODALS.editSlot && (
        <Modal title={`Edit ${name}`} onClose={() => setModalToShow("")} submitButtonText="Update">
          {({ form }) => (
            <SlotForm
              form={form}
              initialSlot={{
                ...slot,
                managerId: manager?.id,
                teamId: team?.id,
              }}
              onSubmit={(values) => editSlot({ variables: { id, ...values } })}
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

export default Slot
