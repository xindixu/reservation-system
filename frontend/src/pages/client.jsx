import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { Typography, Button, Space, Tag } from "antd"
import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons"
import { GET_CLIENT_BY_ID } from "graphql/clients"
import { CREATE_VISIT, UPDATE_VISIT, DESTROY_VISIT } from "graphql/visits"
import { getFullName, calculateNextVisit } from "lib/utils"
import VisitForm from "components/forms/visit-form"
import Calendar from "components/calendar"
import ClientFrom from "components/forms/client-form"
import Modal from "components/modal"
import FAButton from "components/floating-action-button"
import { toISOStringWithTZ } from "lib/datetime"
import useClients from "data/use-clients"

const { Title } = Typography

const MODALS = {
  editClient: "editClient",
  addVisit: "addVisit",
  editVisit: "editVisit",
}

const PageActions = ({ t, client: { email, phone }, edit }) => (
  <Space size="middle" className="py-4">
    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={edit}>
      {t("common.edit")}
    </Button>
    <Button key="email" type="default" icon={<MailOutlined />} href={`mailto:${email}`}>
      {t("common.email")}
    </Button>
    <Button key="phone" type="default" icon={<PhoneOutlined />} href={`tel:${phone}`}>
      {t("common.call")}
    </Button>
  </Space>
)

const Client = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { client, loadingClient, errorClient, editClient, loadClient } = useClients(id)

  useEffect(() => {
    loadClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [addVisit] = useMutation(CREATE_VISIT, {
    update: (cache, { data: { createVisit } }) => {
      const visit = createVisit
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

  const [editVisit] = useMutation(UPDATE_VISIT)
  const [deleteVisit] = useMutation(DESTROY_VISIT, {
    update: (cache, { data: { destroyVisit } }) => {
      const visitId = destroyVisit
      const { client } = cache.readQuery({ query: GET_CLIENT_BY_ID, variables: { id } })
      cache.writeQuery({
        query: GET_CLIENT_BY_ID,
        variables: { id },
        data: {
          client: { ...client, visits: client.visits.filter((v) => v.id !== visitId) },
        },
      })
    },
  })

  const [selectedVisit, setSelectedVisit] = useState({})
  const [presetDate, setPresetDate] = useState({})
  const [modalToShow, setModalToShow] = useState("")

  if (loadingClient) {
    return "Loading..."
  }
  if (errorClient) {
    return `Error!`
  }

  const { duration, cycle, managers = [], visits = [] } = client
  const fullName = getFullName(client)

  const [start, end] = calculateNextVisit(client, visits)

  return (
    <>
      <div className="flex space-between bg-white rounded-lg px-10 mb-10">
        <div className="flex-grow py-10 capitalize">
          <Title>{fullName}</Title>

          <p>
            {t("common.manager_plural")}:{" "}
            {managers.map((manager) => (
              <Tag key={manager.id}>{getFullName(manager)}</Tag>
            ))}
          </p>
          <p>
            {t("common.cycle")}: {cycle}
          </p>
          <p>
            {t("common.duration")}: {duration}
          </p>
          <PageActions client={client} edit={() => setModalToShow(MODALS.editClient)} t={t} />
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
          title={`${t("common.edit")} ${t("message.visitForClient", {
            client: getFullName(client),
          })}`}
          onClose={() => setModalToShow("")}
          onDelete={() => {
            deleteVisit({ variables: { id: selectedVisit.id } })
          }}
          submitButtonText={t("common.update")}
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
          title={`${t("common.create")} ${t("message.visitForClient", {
            client: getFullName(client),
          })} `}
          onClose={() => {
            setModalToShow("")
            setPresetDate({})
          }}
          submitButtonText={t("common.create")}
        >
          {({ form }) => (
            <VisitForm
              initialVisit={{ client, ...presetDate }}
              form={form}
              disabled={{ clientId: true }}
              onSubmit={(values) => addVisit({ variables: values })}
            />
          )}
        </Modal>
      )}

      {modalToShow === MODALS.editClient && (
        <Modal
          title={`Edit ${getFullName(client)}`}
          onClose={() => setModalToShow("")}
          submitButtonText={t("common.update")}
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
        ariaLabel={`${t("common.create")} ${t("message.visitForClient", {
          client: getFullName(client),
        })} `}
        rotate={!!modalToShow}
      />
    </>
  )
}

export default Client
