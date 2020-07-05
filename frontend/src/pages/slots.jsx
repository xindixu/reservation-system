import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import SlotTable from "components/table/slots-table"
import ClientFrom from "components/forms/client-form"

import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { GET_ALL_SLOTS } from "graphql/slots"

const MODALS = {
  addClient: "addClient",
}

const Slot = () => {
  const { loading, error, data } = useQuery(GET_ALL_SLOTS)
  // const [addClient] = useMutation(CREATE_CLIENT, {
  //   update: (cache, { data: { createClient } }) => {
  //     const { client } = createClient
  //     const { clients } = cache.readQuery({ query: GET_ALL_CLIENTS })
  //     cache.writeQuery({
  //       query: GET_ALL_CLIENTS,
  //       data: {
  //         clients: [...clients, client],
  //       },
  //     })
  //   },
  // })

  const [client, setClient] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (loading) {
    return "Loading..."
  }
  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <SlotTable slots={data.slots} />

      <FAButton
        onClick={() => setModalToShow(MODALS.addClient)}
        ariaLabel="new client"
        rotate={modalToShow}
      />
    </>
  )
}

export default Slot
