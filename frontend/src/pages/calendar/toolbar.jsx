import React from "react"
import PropTypes from "prop-types"
import { useLazyQuery } from "@apollo/react-hooks"
import { Form, Select, Row, Col, Button, Collapse, Spin } from "antd"
import { GET_ALL_MANAGERS } from "graphql/managers"
import { GET_ALL_CLIENTS } from "graphql/clients"
import { getFullName } from "lib/utils"
import { GET_ALL_SLOTS } from "graphql/slots"

const { Option } = Select
const { Panel } = Collapse

const Toolbar = ({ onFilterChange }) => {
  const [form] = Form.useForm()

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
    onFilterChange(fieldValues)
  }

  return (
    <Collapse defaultActiveKey={["1"]} bordered={false} className="mb-4">
      <Panel header="Filter by..." key="1">
        <Form form={form} className="mb-4 flex-wrap" onFinish={onFinish} layout="vertical">
          <Row gutter={24} className="w-full">
            {filters.map(({ label, name, onFocus, loading, options, itemToString }) => (
              <Col span={8} key={name}>
                <Form.Item label={label} name={name}>
                  <Spin spinning={loading}>
                    <Select
                      allowClear
                      onFocus={onFocus}
                      mode="multiple"
                      placeholder={`Select one or multiple ${label}`}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                      }
                      loading={loading}
                    >
                      {options &&
                        options.map((opt) => <Option value={opt.id}>{itemToString(opt)}</Option>)}
                    </Select>
                  </Spin>
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item>
            <Button
              htmlType="reset"
              onClick={() => {
                form.resetFields()
                form.submit()
              }}
              className="mr-2"
            >
              Clear
            </Button>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  )
}

Toolbar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
}

export default Toolbar
