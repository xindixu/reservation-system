import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';


const Modal = ({
  show, title, children, footer, onClose,
}) => {
  const [containerEl] = useState(document.getElementById('modal-root'));

  return ReactDOM.createPortal(show ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content */}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h1 className="text-3xl font-semibold">
                {title}
              </h1>

              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                type="button"
                onClick={onClose}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-600 text-lg leading-relaxed">
                {children}
              </p>
            </div>
            {/* footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              {footer}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  ) : null, containerEl);
};

Modal.propTypes = {

};

export default Modal;
