import React from "react"
import PropTypes from "prop-types"
import { Button, Radio } from "antd"
import { Navigate } from "react-big-calendar"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

const Toolbar = ({
  localizer: { messages },
  view: currentView,
  views,
  label,
  onNavigate,
  onView,
}) => (
  <>
    <div className="flex justify-between mb-2">
      <span className="flex space-x-2">
        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          aria-label={messages.previous}
          onClick={() => onNavigate(Navigate.PREVIOUS)}
        />

        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          aria-label={messages.next}
          onClick={() => onNavigate(Navigate.NEXT)}
        />
        <Button type="primary" onClick={() => onNavigate(Navigate.TODAY)}>
          {messages.today}
        </Button>
      </span>
      <span className="flex-auto text-xl text-center">{label}</span>
      <Radio.Group value={currentView} onChange={(e) => onView(e.target.value)}>
        {views.map((view) => (
          <Radio.Button key={view} value={view}>
            {messages[view]}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  </>
)

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.shape({
    messages: PropTypes.object.isRequired,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
