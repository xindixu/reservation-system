import React from "react"
import PropTypes from "prop-types"
import { Form, Select, Row, Col, Button, Collapse } from "antd"
import { getFullName } from "lib/utils"
import useSlots from "data/use-slots"
import useClients from "data/use-clients"
import useManagers from "data/use-managers"

const { Option } = Select
const { Panel } = Collapse

const Toolbar = ({ onFilterChange }) => {
  const [form] = Form.useForm()

  const { clients, loadingClients, loadClients } = useClients()
  const { managers, loadingManagers, loadManagers } = useManagers()
  const { slots, loadingSlots, loadSlots } = useSlots()

  const filters = [
    {
      label: "Managers",
      name: "managerIds",
      onFocus: loadManagers,
      loading: loadingManagers,
      options: managers,
      itemToString: (item) => getFullName(item),
    },
    {
      label: "Clients",
      name: "clientIds",
      onFocus: loadClients,
      loading: loadingClients,
      options: clients?.clients,
      itemToString: (item) => getFullName(item),
    },
    {
      label: "Slots",
      name: "slotIds",
      onFocus: loadSlots,
      loading: loadingSlots,
      options: slots?.slots,
      itemToString: (item) => item.name,
    },
  ]

  const onFinish = (fieldValues) => {
    onFilterChange(fieldValues)
  }
  return (
    <Collapse defaultActiveKey={["filter-comp"]} bordered={false} className="mb-4">
      <Panel header="Filter by..." key="filter-comp">
        <Form form={form} className="mb-4 flex-wrap" onFinish={onFinish} layout="vertical">
          <Row gutter={24} className="w-full">
            {filters.map(({ label, name, onFocus, loading, options, itemToString }) => (
              <Col span={8} key={name}>
                <Form.Item label={label} name={name}>
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
                      options.map((opt) => (
                        <Option key={`${name}-${opt.id}`} value={opt.id}>
                          {itemToString(opt)}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            ))}
          </Row>

          <Form.Item>
            <div className="flex justify-end space-x-2 pr-6">
              <Button
                htmlType="reset"
                onClick={() => {
                  form.resetFields()
                  form.submit()
                }}
              >
                Clear
              </Button>
              <Button type="primary" htmlType="submit" onClick={form.submit}>
                Filter
              </Button>
            </div>
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
