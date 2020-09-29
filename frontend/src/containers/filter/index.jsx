import React from "react"
import PropTypes from "prop-types"
import { pickBy } from "lodash"
import { Form, Row, Col, Button, Collapse } from "antd"
import ManagerFilter from "./manager"
import SlotFilter from "./slot"
import ClientFilter from "./client"
import TeamFilter from "./team"

const { Panel } = Collapse

const filtersByKey = {
  client: ClientFilter,
  slot: SlotFilter,
  manager: ManagerFilter,
  team: TeamFilter,
}

const Filter = ({ onFilterChange, enabledFilters }) => {
  const [form] = Form.useForm()
  const filters = enabledFilters.map((key) => ({ name: key, Component: filtersByKey[key] }))
  const onFinish = (fieldValues) => {
    onFilterChange(pickBy(fieldValues, (value) => value && value.length > 0))
  }

  return (
    <Collapse defaultActiveKey={["filter-comp"]} bordered={false} className="mb-4">
      <Panel header="Filter by..." key="filter-comp">
        <Form form={form} className="mb-4 flex-wrap" onFinish={onFinish} layout="vertical">
          <Row gutter={24} className="w-full">
            {filters.map(({ name, Component }) => (
              <Col span={8} key={name}>
                <Component />
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

Filter.defaultProps = {
  enabledFilters: [],
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  enabledFilters: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(filtersByKey))),
}

export default Filter
