import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Filter from "containers/filter"
import SlotTable from "components/table/slots-table"
import SlotForm from "components/forms/slot-form"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import getConfirm from "components/confirm"
import useSlots from "data/use-slots"

const MODALS = {
  addSlot: "addSlot",
  editSlot: "editSlot",
}

const Slot = () => {
  const { t } = useTranslation()

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

  const [selectedSlot, setSelectedSlot] = useState("")
  const [modalToShow, setModalToShow] = useState("")

  useEffect(() => {
    loadSlots()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (errorSlots) {
    return `Error! ${errorSlots.message}`
  }

  return (
    <>
      <Filter enabledFilters={["manager", "team", "shareable"]} onFilterChange={setSlotFilters} />
      <SlotTable
        loading={loadingSlots}
        slots={slots?.slots}
        hasNext={slots?.hasNext}
        fetchMore={fetchMoreSlots}
        editSlot={(slot) => {
          setSelectedSlot(slot)
          setModalToShow(MODALS.editSlot)
        }}
        deleteSlot={({ name, id }) =>
          getConfirm({
            content: <p>{t("message.deleteSlot", { name })}</p>,
            onConfirm: () => {
              deleteSlot({ variables: { id } })
            },
          })
        }
      />
      {modalToShow === MODALS.addSlot && (
        <Modal
          title={`${t("common.create")} ${t("term.slot.plural")}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.create")}
        >
          {({ form }) => (
            <SlotForm form={form} onSubmit={(values) => addSlot({ variables: values })} />
          )}
        </Modal>
      )}
      {modalToShow === MODALS.editSlot && (
        <Modal
          title={`${t("common.edit")} ${selectedSlot.name}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.update")}
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
        ariaLabel={`${t("common.create")} ${t("term.slot.plural")}`}
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Slot
