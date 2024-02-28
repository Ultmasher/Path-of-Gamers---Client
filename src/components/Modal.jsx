import React from 'react'
import PropTypes from 'prop-types';

const MODAL_STYLES = {
    flexDirection: 'column-reverse',
    display: 'flex',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#525050',
    padding: '50px',
    zIndex: 1000,
    borderRadius: '0.8rem',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',

}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}



export default function Modal({ open ,children , onClose }) {
    if (!open) return null;
    return (
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <button className ="landingButton"onClick={onClose}>Close Notification</button>
            {children}
        </div>
        </>
    )
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired // Added onClose prop validation
};
