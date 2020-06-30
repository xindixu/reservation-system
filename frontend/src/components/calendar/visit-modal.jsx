import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
} from 'reactstrap';
import Modal from '../modal';
import RangeDatepicker from '../datepicker/range';
import Textarea from '../form/textarea';
import Select from '../form/select';
import Checkbox from '../form/checkbox';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const NewEventModal = ({ onClose }) => {
  const [newVisit, setNewVisit] = useState({});
  return (
    <Modal
      title="Create a New Visit"
      show
      submitButton={(
        <Button
          color="primary"
          type="button"
          onClick={() => {
            onClose();
            console.log(newVisit);
          }}
        >
          Create
        </Button>
      )}
      onClose={onClose}
    >
      <Form>
        <Select
          title="Client"
          name="client"
          options={options}
          onChange={e => setNewVisit({ ...newVisit, client: e ? e.value : null })}
        />
        <RangeDatepicker
          onChange={e => setNewVisit({ ...newVisit, ...e })}
        />
        <Checkbox
          title="All day"
          name="allDay"
          onChange={e => setNewVisit({ ...newVisit, allDay: e })}
          checked={newVisit.allDay}
        />
        <Textarea
          title="Notes"
          onChange={e => setNewVisit({ ...newVisit, note: e.target.value })}
        />
      </Form>

    </Modal>
  );
};

NewEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NewEventModal;
