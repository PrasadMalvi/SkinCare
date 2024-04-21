import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = props => {
  return (
    <div className="backdrop-wrapper">
      {ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}></div>,
        document.getElementById('backdrop-hook')
      )}
    </div>
  );
};

export default Backdrop;