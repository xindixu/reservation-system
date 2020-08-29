import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/react-hooks"
import SlotTable from "components/table/slots-table"
import Modal from "components/modal"
import SlotForm from "components/forms/slot-form"
import FAButton from "components/floating-action-button"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { GET_ALL_TEAMS } from "graphql/teams"
import getConfirm from "components/confirm"
import useSlots from "data/use-slots"

const MODALS = {
  addSlot: "addSlot",
  editSlot: "editSlot",
}

const Slot = () => {
  const { slots, errorSlots, loadingSlots, loadSlots, addSlot, editSlot, deleteSlot } = useSlots()

  const { data: managersData } = useQuery(GET_ALL_MANAGERS)
  const { data: teamsData } = useQuery(GET_ALL_TEAMS)

  const [selectedSlot, setSelectedSlot] = useState("")
  const [modalToShow, setModalToShow] = useState("")

  useEffect(() => {
    loadSlots()
  }, [])

  if (errorSlots) {
    return `Error! ${errorSlots.message}`
  }

  return (
    <>
      <SlotTable
        loading={loadingSlots}
        slots={slots}
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
