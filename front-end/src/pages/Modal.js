import React from 'react'

const Modal = ({show, children }) => {
    const showHide = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHide}>
        <section className="modal-main">
          {children}
        </section>
      </div>
    );
};

export default Modal