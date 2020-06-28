import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Modal as BSModal,
} from 'reactstrap';

const Modal = ({
  show, onClose, title, children, submitButton,
}) => (
  <BSModal
    className="modal-dialog-centered"
    isOpen={show}
    toggle={onClose}
  >
    <div className="modal-header">
      <h5 className="modal-title">
        {title}
      </h5>
      <button
        aria-label="Close"
        className="close"
        data-dismiss="modal"
        type="button"
        onClick={onClose}
      >
        <span aria-hidden>×</span>
      </button>
    </div>
    <div className="modal-body">{children}</div>
    <div className="modal-footer">
      <Button
        color="secondary"
        data-dismiss="modal"
        type="button"
        onClick={onClose}
      >
        Close
      </Button>
      {submitButton}
    </div>
  </BSModal>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  submitButton: PropTypes.node.isRequired,
};

export default Modal;
