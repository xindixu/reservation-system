import React, { useState } from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"

import moment from "moment"
import { Form, Select, DatePicker, Checkbox } from "antd"
import { GET_ALL_CLIENTS } from "graphql/clients"
import { GET_ALL_SLOTS } from "graphql/slots"
import { VISIT } from "lib/commonTypes"

const VisitForm = ({ initialVisit, visit, setVisit, disabled }) => {
  const { data: clientData } = useQuery(GET_ALL_CLIENTS)
  const { data: slotData } = useQuery(GET_ALL_SLOTS)
  const { client, slot, startsAt, endsAt } = initialVisit

  const [allDay, setAllDay] = useState(true)

  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <Form.Item label="Client">
        <Select
          disabled={disabled.client}
          defaultValue={client?.id}
          onChange={(v) => setVisit({ ...visit, clientId: v })}
        >
          {clientData?.clients.map(({ id, firstName, lastName }) => (
            <Select.Option value={id} key={id}>
              {firstName} {lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Slot">
        <Select defaultValue={slot?.id} onChange={(v) => setVisit({ ...visit, slotId: v })}>
          {slotData?.slots.map(({ id, name }) => (
            <Select.Option value={id} key={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Visit">
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          defaultValue={startsAt && endsAt ? [moment(startsAt), moment(endsAt)] : []}
          onCalendarChange={(dateArr) =>
            dateArr &&
            setVisit({
              ...visit,
              startsAt: dateArr[0]?.toISOString(),
              endsAt: dateArr[1]?.toISOString(),
            })
          }
          ranges={{
            Today: [moment(), moment()],
            "This Week": [moment().startOf("week"), moment().endOf("week")],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          showTime={!allDay}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox checked={allDay} onChange={(e) => setAllDay(!allDay)}>
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
  visit: PropTypes.object.isRequired,
  setVisit: PropTypes.func.isRequired,
}

export default VisitForm
