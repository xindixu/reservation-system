import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'
import VisitForm from './visit-form'

const NewEventModal = ({ onClose }) => {
  const [visit, setVisit] = useState({ allDay: true })
  return (
    <Modal
      title="Create a New Visit"
      visible
      footer={[
        <Button key="cancel" type="default" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            onClose()
            console.log(visit)
          }}
        >
          Create
        </Button>,
      ]}
      onCancel={onClose}
    >
      <VisitForm visit={visit} setVisit={setVisit} />
    </Modal>
  )
}

NewEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default NewEventModal
