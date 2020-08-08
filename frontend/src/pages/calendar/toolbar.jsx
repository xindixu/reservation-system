import React from "react"
import PropTypes from "prop-types"
import { useLazyQuery } from "@apollo/react-hooks"
import { Form, Select, Row, Col, Button } from "antd"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { GET_ALL_CLIENTS } from "graphql/clients"
import { getFullName } from "lib/utils"
import { GET_ALL_SLOTS } from "graphql/slots"

const { Option } = Select

const Toolbar = ({ onFilterChange }) => {
  const [loadManagers, { loading: loadingManagers, data: managersData }] = useLazyQuery(
    GET_ALL_MANAGERS
  )
  const [loadClients, { loading: loadingClients, data: clientsData }] = useLazyQuery(
    GET_ALL_CLIENTS
  )
  const [loadSlots, { loading: loadingSlots, data: slotsData }] = useLazyQuery(GET_ALL_SLOTS)

  const filters = [
    {
      label: "Managers",
      name: "managerIds",
      onFocus: loadManagers,
      loading: loadingManagers,
      options: managersData?.managers,
      itemToString: (item) => getFullName(item),
    },
    {
      label: "Clients",
      name: "clientIds",
      onFocus: loadClients,
      loading: loadingClients,
      options: clientsData?.clients,
      itemToString: (item) => getFullName(item),
    },
    {
      label: "Slots",
      name: "slotIds",
      onFocus: loadSlots,
      loading: loadingSlots,
      options: slotsData?.slots,
      itemToString: (item) => item.name,
    },
  ]

  const onFinish = (fieldValues) => {
    console.log(fieldValues)
    onFilterChange(fieldValues)
  }

  return (
    <Form className="mb-4 w-full flex" onFinish={onFinish}>
      <Row gutter={24} className="w-full">
        {filters.map(({ label, name, onFocus, loading, options, itemToString }) => (
          <Col span={8} key={name}>
            <Form.Item label={label} name={name}>
              <Select
                allowClear
                onFocus={onFocus}
                mode="multiple"
                placeholder="Select managers"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                loading={loading}
              >
                {options &&
                  options.map((opt) => <Option value={opt.id}>{itemToString(opt)}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        ))}
      </Row>
      <Button type="primary" htmlType="submit">
        Filter
      </Button>
    </Form>
  )
}

Toolbar.propTypes = {}

export default Toolbar
