import React from 'react'
import ReactDOM from 'react-dom';
const MODAL_STYLES = {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: 1000,
}
const OVERLAY_STYLES = {
    position: "fixed",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 1000
}

export default function Modal({open, children, onClose}) {
    if(!open) return null;
  return ReactDOM.createPortal (
    <>
    <div style={OVERLAY_STYLES}>
    <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close Modal</button>
      {children}
    </div>
    </div>
    </>,
    document.getElementById("portal")
  )
}
