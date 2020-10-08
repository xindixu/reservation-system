import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import PropTypes from "prop-types"
import startOfDay from "date-fns/startOfDay"
import startOfWeek from "date-fns/startOfWeek"
import startOfMonth from "date-fns/startOfMonth"
import endOfDay from "date-fns/endOfDay"
import endOfWeek from "date-fns/endOfWeek"
import endOfMonth from "date-fns/endOfMonth"

import { Form, Select, Switch } from "antd"

import { VISIT, FORM } from "lib/common-types"
import { getFullName } from "lib/utils"
import DatePicker from "components/date-picker"
import { toISOStringWithTZ } from "lib/datetime"

import useClients from "data/use-clients"
import useSlots from "data/use-slots"

import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const TODAY = new Date()

const SelectWithFilterAndDisable = ({
  data,
  disabled = false,
  filtered = [],
  itemToString,
  label,
  name,
}) => {
  const [showAll, setShowAll] = useState(filtered.length === 0)

  const itemsToShow = showAll ? data : data.filter(({ id }) => filtered.includes(id))

  return (
    <>
      <Form.Item label={label} name={name} rules={[{ required: true }]}>
        <Select disabled={!!disabled}>
          {(itemsToShow || []).map((item) => (
            <Select.Option value={item.id} key={item.id}>
              {itemToString(item)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {filtered.length > 0 && (
        <div className="flex space-x-2 mb-4 justify-end">
          <span>Showing All</span>
          <Switch checked={showAll} onChange={setShowAll} />
        </div>
      )}
    </>
  )
}

const VisitForm = ({ initialVisit, form, disabled, onSubmit, filtered }) => {
  const { t } = useTranslation()

  const { slots, loadSlots, fetchMoreSlots } = useSlots()
  const { clients, loadClients, fetchMoreClients } = useClients()

  useEffect(() => {
    loadSlots()
    loadClients()
  }, [])

  const { client, slot, start, end } = initialVisit

  const [allDay, setAllDay] = useState(true)

  const onFinish = (fieldValues) => {
    const { visit } = fieldValues
    const startObj = new Date(visit[0])
    const endObj = new Date(visit[1])
    const newStart = allDay ? startOfDay(startObj) : startObj
    const newEnd = allDay ? endOfDay(endObj) : endObj

    const values = {
      ...fieldValues,
      start: toISOStringWithTZ(newStart),
      end: toISOStringWithTZ(newEnd),
    }
    onSubmit(values)
  }

  return (
    <Form
      {...defaultFormLayout}
      form={form}
      initialValues={{
        clientId: client?.id,
        slotId: slot?.id,
        visit: start && end ? [new Date(start), new Date(end)] : [],
      }}
      validateMessages={defaultValidateMessages}
      onFinish={onFinish}
    >
      <SelectWithFilterAndDisable
        label={t("common.client")}
        name="clientId"
        data={clients?.clients}
        filtered={filtered.clientIds}
        disabled={disabled.clientId}
        itemToString={(item) => getFullName(item)}
      />

      <SelectWithFilterAndDisable
        label={t("common.slot")}
        name="slotId"
        data={slots?.slots}
        filtered={filtered.slotIds}
        disabled={disabled.slotId}
        itemToString={(item) => item.name}
      />
      <Form.Item label={t("common.visit")} name="visit" rules={[{ type: "array", required: true }]}>
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          ranges={{
            [t("common.today")]: [TODAY, TODAY],
            [t("common.thisWeek")]: [startOfWeek(TODAY), endOfWeek(TODAY)],
            [t("common.thisMonth")]: [startOfMonth(TODAY), endOfMonth(TODAY)],
          }}
          showTime={!allDay}
        />
      </Form.Item>
      <div className="flex space-x-2 mb-4 justify-end">
        <span>{t("common.allDay")}</span>
        <Switch checked={allDay} onChange={setAllDay} />
      </div>
    </Form>
  )
}

VisitForm.defaultProps = {
  initialVisit: {},
  disabled: {},
  filtered: {},
}

VisitForm.propTypes = {
  disabled: PropTypes.object,
  filtered: PropTypes.object,
  initialVisit: PropTypes.shape(VISIT),
  form: PropTypes.shape(FORM).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default VisitForm
