import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"

import moment from "moment"
import { Form, Select, DatePicker, Checkbox } from "antd"
import { GET_ALL_CLIENTS } from "graphql/clients"
import { GET_ALL_SLOTS } from "graphql/slots"
import { VISIT, FORM } from "lib/commonTypes"
import { defaultValidateMessages, defaultFormLayout } from "lib/constants"

const VisitForm = ({ initialVisit, form, disabled, onSubmit }) => {
  const { data: clientData } = useQuery(GET_ALL_CLIENTS)
  const { data: slotData } = useQuery(GET_ALL_SLOTS)
  const { client, slot, startsAt, endsAt } = initialVisit

  const [allDay, setAllDay] = useState(true)

  const onFinish = (fieldValues) => {
    const { visit } = fieldValues
    const newStartsAt = allDay ? moment(visit[0]).startOf("day") : moment(visit[0])
    const newEndsAt = allDay ? moment(visit[1]).endOf("day") : moment(visit[1])

    const values = {
      ...fieldValues,
      startsAt: newStartsAt.toISOString(true),
      endsAt: newEndsAt.toISOString(true),
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
        visit: startsAt && endsAt ? [moment(startsAt), moment(endsAt)] : [],
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
        <Select>
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
            Today: [moment(), moment()],
            "This Week": [moment().startOf("week"), moment().endOf("week")],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
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
