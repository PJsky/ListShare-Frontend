import React, { Component } from "react";
import ReactDOM from "react-dom";

const WrongListModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={(e)=>{
      e.preventDefault();
      e.stopPropagation();
      if(e.target.classList[0] == "modal")handleClose();
    }}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

  export default WrongListModal;