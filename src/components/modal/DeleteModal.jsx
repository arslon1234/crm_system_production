import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import trash from "../Icons/Vector.svg";

export default function DeleteModal({ open, close, text1, text2, delate }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      //   onClose={close}
      className="dflax"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="warning-modal">
          <div className="header" />
          <div className="body-modal-alert">
            <img src={trash} alt="" />
            {text1?.length > 0 ? (
              <p className="product-name">{text1}</p>
            ) : (
              <p className="opacity-none">NULL</p>
            )}
            {text2?.length > 0 ? (
              <p>{text2}</p>
            ) : (
              <p className="opacity-none">NULL</p>
            )}
            <button onClick={close}>ok</button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
