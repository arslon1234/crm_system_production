import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import accept from "../Icons/Accept.svg";

export default function AcceptModal({
  open,
  close,
  onSaveClick,
  send,
  sendInvoice,
  acceptFactura,
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={close}
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
            <img src={accept} alt="" />
            <p>
              {send
                ? "Yukni chiqarishga"
                : acceptFactura
                ? "Fakturani qabul qilishga"
                : "Facturani bekor qilishga"}
            </p>
            <p> ishonchingiz komilmu?</p>
            <div className="btn-accept-modal">
              <button onClick={close}>Ozgartirsh</button>
              <button onClick={send ? sendInvoice : onSaveClick}>
                Qabul qilish
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
