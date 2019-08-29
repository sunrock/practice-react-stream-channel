import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = () => {
  return ReactDOM.createPortal(
    <div
      onClick={() => history.push('/')}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">Delete Stream [Stream Name]</div>
        <div className="content">
          Are you sure you want to delete this stream?
        </div>
        <div className="actions">
          <button className="ui clickable button negative">Delete</button>
          <button className="ui clickable button">Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

// ui dimmer modals visible active
// ui standard modal visible active

// <div className="ui modal">
// <div className="header">Header</div>
// <div className="content">Content</div>
// </div>,

export default Modal;
