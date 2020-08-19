import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SlotTable from "components/table/slots-table"
import Modal from "components/modal"
import SlotForm from "components/forms/slot-form"
import FAButton from "components/floating-action-button"
import { GET_ALL_SLOTS, CREATE_SLOT, UPDATE_SLOT, DESTROY_SLOT } from "graphql/slots"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { GET_ALL_TEAMS } from "graphql/teams"
import getConfirm from "components/confirm"
import { GET_ALL_VISITS } from "graphql/visits"

const MODALS = {
  addSlot: "addSlot",
  editSlot: "editSlot",
}

const Slot = () => {
  const { loading, error, data } = useQuery(GET_ALL_SLOTS)
  const { data: managersData } = useQuery(GET_ALL_MANAGERS)
  const { data: teamsData } = useQuery(GET_ALL_TEAMS)
  const [addSlot] = useMutation(CREATE_SLOT, {
    update: (cache, { data: { createSlot } }) => {
      const { slot } = createSlot
      const { slots } = cache.readQuery({ query: GET_ALL_SLOTS })
      cache.writeQuery({
        query: GET_ALL_SLOTS,
        data: {
          slots: [...slots, slot],
        },
      })
    },
  })

  const [editSlot] = useMutation(UPDATE_SLOT)
  const [deleteSlot] = useMutation(DESTROY_SLOT, {
    update: (cache, { data: { destroySlot } }) => {
      const slot = destroySlot
      const slots = cache.readQuery({ query: GET_ALL_SLOTS })
      const visits = cache.readQuery({ query: GET_ALL_VISITS })
      cache.writeQuery({
        query: GET_ALL_SLOTS,
        data: {
          slots: slots.filter((s) => s.id !== slot),
        },
      })
      cache.writeQuery({
        query: GET_ALL_VISITS,
        data: {
          visits: visits.filter((v) => v.slot.id !== slot),
        },
      })
    },
  })

  const [selectedSlot, setSelectedSlot] = useState("")
  const [modalToShow, setModalToShow] = useState("")

  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <SlotTable
        loading={loading}
        slots={data?.slots}
        managers={managersData?.managers}
        teams={teamsData?.teams}
        editSlot={(slot) => {
          setSelectedSlot(slot)
          setModalToShow(MODALS.editSlot)
        }}
        deleteSlot={({ name, id }) =>
          getConfirm({
            content: (
              <p>
                You are about to delete <strong>{name}</strong>. It will remove all data related to
                this slot, including Visits.
              </p>
            ),
            onConfirm: () => {
              deleteSlot({ variables: { id } })
            },
          })
        }
      />
      {modalToShow === MODALS.addSlot && (
        <Modal title="Create New Slot" onClose={() => setModalToShow("")} submitButtonText="Create">
          {({ form }) => (
            <SlotForm form={form} onSubmit={(values) => addSlot({ variables: values })} />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.editSlot && (
        <Modal
          title={`Edit ${selectedSlot.name}`}
          onClose={() => setModalToShow("")}
          submitButtonText="Create"
        >
          {({ form }) => (
            <SlotForm
              form={form}
              initialSlot={{
                ...selectedSlot,
                managerIds: selectedSlot.managers?.map((manager) => manager.id),
                teamId: selectedSlot.team?.id,
              }}
              onSubmit={(values) => editSlot({ variables: { id: selectedSlot.id, ...values } })}
            />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addSlot)}
        ariaLabel="new client"
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Slot
