import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"

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
import { GET_ALL_CLIENTS } from "graphql/clients"
import { GET_ALL_SLOTS } from "graphql/slots"
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
  const { data: clientData } = useQuery(GET_ALL_CLIENTS)
  const { data: slotData } = useQuery(GET_ALL_SLOTS)
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
        label="Client"
        name="clientId"
        data={clientData?.clients}
        filtered={filtered.clientIds}
        disabled={disabled.clientId}
        itemToString={(item) => getFullName(item)}
      />

      <SelectWithFilterAndDisable
        label="Slot"
        name="slotId"
        data={slotData?.slots}
        filtered={filtered.slotIds}
        disabled={disabled.slotId}
        itemToString={(item) => item.name}
      />
      <Form.Item
        label="Visit"
        name="visit"
        rules={[{ type: "array", required: true, message: "Please select time!" }]}
      >
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          ranges={{
            Today: [TODAY, TODAY],
            "This Week": [startOfWeek(TODAY), endOfWeek(TODAY)],
            "This Month": [startOfMonth(TODAY), endOfMonth(TODAY)],
          }}
          showTime={!allDay}
        />
      </Form.Item>
      <div className="flex space-x-2 mb-4 justify-end">
        <span>All day</span>
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
