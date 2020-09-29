import React, { useState, useEffect } from "react"
import Filter from "containers/filter"
import SlotTable from "components/table/slots-table"
import SlotForm from "components/forms/slot-form"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import getConfirm from "components/confirm"
import useSlots from "data/use-slots"
import useManagers from "data/use-managers"
import useTeams from "data/use-teams"

const MODALS = {
  addSlot: "addSlot",
  editSlot: "editSlot",
}

const Slot = () => {
  const {
    slots,
    errorSlots,
    loadingSlots,
    loadSlots,
    fetchMoreSlots,
    addSlot,
    editSlot,
    deleteSlot,
    setSlotFilters,
  } = useSlots()

  const { managers, loadingManagers, loadManagers } = useManagers()
  const { teams, loadingTeams, loadTeams } = useTeams()

  const [selectedSlot, setSelectedSlot] = useState("")
  const [modalToShow, setModalToShow] = useState("")

  useEffect(() => {
    loadSlots()
    loadManagers()
    loadTeams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (errorSlots) {
    return `Error! ${errorSlots.message}`
  }

  return (
    <>
      <Filter enabledFilters={["manager", "team"]} onFilterChange={setSlotFilters} />
      <SlotTable
        loading={loadingSlots || loadingManagers || loadingTeams}
        slots={slots?.slots}
        hasNext={slots?.hasNext}
        fetchMore={fetchMoreSlots}
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
