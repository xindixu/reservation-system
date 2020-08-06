import React from "react"
import PropTypes from "prop-types"

import { Button } from "antd"
import { Navigate } from "react-big-calendar"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

const Toolbar = ({ localizer: { messages }, view, views, label, onNavigate }) => (
  <>
    <div className="flex justify-between mb-2">
      <span>
        <Button
          className="mr-1"
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          aria-label={messages.previous}
          onClick={() => onNavigate(Navigate.PREVIOUS)}
        />

        <Button
          className="ml-1"
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          aria-label={messages.next}
          onClick={() => onNavigate(Navigate.NEXT)}
        />
      </span>
      <span className="flex-auto text-xl text-center">{label}</span>
      <Button type="primary" onClick={() => onNavigate(Navigate.TODAY)}>
        {messages.today}
      </Button>
    </div>
  </>
)

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
