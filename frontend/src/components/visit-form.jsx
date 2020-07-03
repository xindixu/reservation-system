import React from "react"
import PropTypes from "prop-types"
import { useQuery } from "@apollo/react-hooks"

import moment from "moment"
import { Form, Input, Select, DatePicker, Checkbox } from "antd"
import { GET_ALL_CLIENTS } from "graphql/clients"

const VisitForm = ({ visit, setVisit }) => {
  const { data } = useQuery(GET_ALL_CLIENTS)

  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      size="middle"
    >
      <Form.Item label="Client">
        <Select onChange={(client) => setVisit({ ...visit, client })}>
          {data
            ? data.clients.map(({ id, firstName, lastName }) => (
                <Select.Option value={id} key={id}>
                  {firstName} {lastName}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item label="Visit">
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          onCalendarChange={(_, [start, end]) => setVisit({ ...visit, start, end })}
          ranges={{
            Today: [moment(), moment()],
            "This Week": [moment().startOf("week"), moment().endOf("week")],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          showTime={!visit.allDay}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={visit.allDay}
          onChange={(e) => setVisit({ ...visit, allDay: e.target.checked })}
        >
          All day
        </Checkbox>
      </Form.Item>
      <Form.Item label="Note">
        <Input.TextArea
          rows={5}
          allowClear
          onChange={(e) => setVisit({ ...visit, note: e.target.value })}
        />
      </Form.Item>
    </Form>
  )
}

VisitForm.propTypes = {
  visit: PropTypes.object.isRequired,
  setVisit: PropTypes.func.isRequired,
}

export default VisitForm
