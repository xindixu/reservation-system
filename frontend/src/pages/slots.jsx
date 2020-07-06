import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SlotTable from "components/table/slots-table"
import Modal from "components/modal"
import SlotForm from "components/forms/slot-form"
import FAButton from "components/floating-action-button"
import { GET_ALL_SLOTS, CREATE_SLOT } from "graphql/slots"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { GET_ALL_TEAMS } from "graphql/teams"

const MODALS = {
  addSlot: "addSlot",
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
      />
      {modalToShow === MODALS.addSlot && (
        <Modal title="Create New Slot" onClose={() => setModalToShow("")} submitButtonText="Create">
          {({ form }) => (
            <SlotForm form={form} onSubmit={(values) => addSlot({ variables: values })} />
          )}
        </Modal>
      )}
      <FAButton
        onClick={() => setModalToShow(MODALS.addSlot)}
        ariaLabel="new client"
        rotate={modalToShow}
      />
    </>
  )
}

export default Slot
