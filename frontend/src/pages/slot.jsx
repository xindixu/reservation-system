import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useMutation } from "@apollo/client"
import { Typography, Button, Space, Tag } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { GET_SLOT_BY_ID } from "graphql/slots"
import { CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import { getFullName } from "lib/utils"
import VisitForm from "components/forms/visit-form"
import SlotForm from "components/forms/slot-form"
import Calendar from "components/calendar"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { toISOStringWithTZ } from "lib/datetime"
import useSlots from "data/use-slots"

const { Title } = Typography

const MODALS = {
  editSlot: "editSlot",
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const PageActions = ({ t, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      {t("common.edit")}
    </Button>
  </Space>
)

const Slot = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { slot, errorSlot, loadingSlot, loadSlot, editSlot } = useSlots(id)

  useEffect(() => {
    loadSlot()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (cache, { data: { createVisit } }) => {
      const visit = createVisit
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
      const visitId = destroyVisit
      const { slot } = cache.readQuery({ query: GET_SLOT_BY_ID, variables: { id } })
      cache.writeQuery({
        query: GET_SLOT_BY_ID,
        variables: { id },
        data: {
          slot: { ...slot, visits: slot.visits.filter((v) => v.id !== visitId) },
        },
      })
    },
  })

  const [selectedVisit, setSelectedVisit] = useState({})
  const [presetDate, setPresetDate] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (loadingSlot) {
    return "Loading..."
  }
  if (errorSlot) {
    return `Error!`
  }

  const { name, shareable, team, managers = [], visits = [] } = slot

  return (
    <>
      <div className="flex space-between bg-white rounded-lg px-10 mb-10">
        <div className="flex-grow py-10 capitalize">
          <Title>{name}</Title>

          <p>
            {t("term.manager.plural")}:{" "}
            {managers.map((manager) => (
              <Tag key={manager.id}>{getFullName(manager)}</Tag>
            ))}
          </p>
          <p>
            {t("term.team.plural")}: {team.name}
          </p>
          <p>
            {t("common.shareable")}: {t(`common.${!!shareable}`)}
          </p>
          <PageActions t={t} slot={slot} edit={() => setModalToShow(MODALS.editSlot)} />
        </div>
      </div>

      <Calendar
        visits={visits}
        initialDate={visits.length ? visits[visits.length - 1].start : ""}
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
          title={`${t("common.edit")} ${t("term.visit.singular")}`}
          onClose={() => setModalToShow("")}
          onDelete={() => {
            deleteVisit({ variables: { id: selectedVisit.id } })
          }}
          submitButtonText={t("common.update")}
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
          title={`${t("common.create")} ${t("term.visit.singular")}`}
          onClose={() => {
            setModalToShow("")
            setPresetDate({})
          }}
          submitButtonText={t("common.create")}
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
        <Modal
          title={`${t("common.edit")} ${name}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.update")}
        >
          {({ form }) => (
            <SlotForm
              form={form}
              initialSlot={{
                ...slot,
                managerIds: managers.map((manager) => manager.id),
                teamId: team?.id,
              }}
              onSubmit={(values) => editSlot({ variables: { id, ...values } })}
            />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addVisit)}
        ariaLabel={`${t("common.create")} ${t("term.visit.plural")}`}
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Slot
