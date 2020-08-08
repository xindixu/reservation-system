import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"

import startOfDay from "date-fns/startOfDay"
import startOfWeek from "date-fns/startOfWeek"
import startOfMonth from "date-fns/startOfMonth"
import endOfDay from "date-fns/endOfDay"
import endOfWeek from "date-fns/endOfWeek"
import endOfMonth from "date-fns/endOfMonth"

import { Form, Select, Checkbox } from "antd"

import { VISIT, FORM } from "lib/common-types"
import DatePicker from "components/date-picker"
import { toISOStringWithTZ } from "lib/datetime"
import { GET_ALL_CLIENTS } from "graphql/clients"
import { GET_ALL_SLOTS } from "graphql/slots"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const TODAY = new Date()
const VisitForm = ({ initialVisit, form, disabled, onSubmit }) => {
  const { data: clientData } = useQuery(GET_ALL_CLIENTS)
  const { data: slotData } = useQuery(GET_ALL_SLOTS)
  const { client, slot, startsAt, endsAt } = initialVisit

  const [allDay, setAllDay] = useState(true)

  const onFinish = (fieldValues) => {
    const { visit } = fieldValues
    const startsAtObj = new Date(visit[0])
    const endsAtObj = new Date(visit[1])
    const newStartsAt = allDay ? startOfDay(startsAtObj) : startsAtObj
    const newEndsAt = allDay ? endOfDay(endsAtObj) : endsAtObj

    const values = {
      ...fieldValues,
      startsAt: toISOStringWithTZ(newStartsAt),
      endsAt: toISOStringWithTZ(newEndsAt),
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
        visit: startsAt && endsAt ? [new Date(startsAt), new Date(endsAt)] : [],
      }}
      validateMessages={defaultValidateMessages}
      onFinish={onFinish}
    >
      <Form.Item label="Client" name="clientId" rules={[{ required: true }]}>
        <Select disabled={disabled.clientId}>
          {clientData?.clients.map(({ id, firstName, lastName }) => (
            <Select.Option value={id} key={id}>
              {firstName} {lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Slot" name="slotId" rules={[{ required: true }]}>
        <Select disabled={disabled.slotId}>
          {slotData?.slots.map(({ id, name }) => (
            <Select.Option value={id} key={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
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
      <Form.Item>
        <Checkbox checked={allDay} onChange={() => setAllDay(!allDay)}>
          All day
        </Checkbox>
      </Form.Item>
    </Form>
  )
}

VisitForm.defaultProps = {
  initialVisit: {},
  disabled: {},
}

VisitForm.propTypes = {
  disabled: PropTypes.object,
  initialVisit: PropTypes.shape(VISIT),
  form: PropTypes.shape(FORM).isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default VisitForm
