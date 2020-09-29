import React from "react"
import PropTypes from "prop-types"
import { pickBy, identity } from "lodash"
import { Form, Row, Col, Button, Collapse } from "antd"
import ManagerFilter from "./manager"
import SlotFilter from "./slot"
import ClientFilter from "./client"
import TeamFilter from "./team"
import Checkbox from "./base-checkbox"

const { Panel } = Collapse

const Shareable = () => <Checkbox name="shareable" label="Shareable" />

const filtersByKey = {
  client: ClientFilter,
  slot: SlotFilter,
  manager: ManagerFilter,
  team: TeamFilter,
  shareable: Shareable,
}

const Filter = ({ onFilterChange, enabledFilters }) => {
  const [form] = Form.useForm()
  const filters = enabledFilters.map((key) => ({ name: key, Component: filtersByKey[key] }))
  const onFinish = (fieldValues) => {
    console.log(fieldValues)
    onFilterChange(
      pickBy(fieldValues, (value) => {
        if (!value) {
          return false
        }
        if (Array.isArray(value)) {
          return value.length > 0
        }
        return !!identity(value)
      })
    )
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
