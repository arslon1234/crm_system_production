import React, { useState } from "react";
import receiveIcon from "../../Icons/Receive.svg";
import rejectIcon from "../../Icons/Reject.svg";
import redIcon from "../../Icons/RedIcon.svg";
import greenIcon from "../../Icons/GreenIcon.svg";
import DataPick from "./data_pick";
import plus from "../../Icons/plus.png";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import InputField from "../../inputs/InputField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function MaxsulotQabuli() {
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
      <div className="buyurtma_btn">
        <span style={{ opacity: "0" }}>
          <DataPick />
        </span>
        <div className="buyurtma_btns">
          <button
            className="modal_open create_btn"
            type="button"
            onClick={() => setModal(true)}
          >
            <p>Mahsulot qabuli</p>
            <span>
              <img src={plus} alt="" />
            </span>
          </button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal}
          onClose={() => setModal(false)}
          className="dflax"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal}>
            <div className="modal_input">
              <h1>Mahsulot qabuli</h1>
              <InputField
                text="Mahsulot nomi"
                width="90%"
                margin="20px 0  0  0"
              />
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  id="outlined-basic"
                  label="Miqdori"
                  variant="outlined"
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    O'lchov b.
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="O'lchov b."
                  >
                    <MenuItem value="Kg">kg</MenuItem>
                    <MenuItem value="Tonna">gramm</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  id="outlined-basic"
                  label="Zarar summasi"
                  variant="outlined"
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Valyuta
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Valyuta"
                  >
                    <MenuItem value="Kg">so'm</MenuItem>
                    <MenuItem value="Tonna">dollar</MenuItem>
                    <MenuItem value="Litr">euro</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Javobgar shaxs
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Kimdan"
                >
                  <MenuItem>Sardor</MenuItem>
                  <MenuItem>Sardor</MenuItem>
                  <MenuItem>Sardor</MenuItem>
                </Select>
              </FormControl>
              <InputField text="Sana & vaqt " width="90%" margin="20px 0 0 0" />
              <div className="modal_close">
                <button>Saqlash</button>
              </div>
            </div>
          </Fade>
        </Modal>
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text2={"Faktura muvaffaqiyatli yuborildi."}
        />
        <DeleteModal
          open={modalDelete}
          close={() => setModalDelete((prev) => !prev)}
          text2={"Faktura bekor qilindi."}
        />
      </div>
      <div className="table">
        <div className="select-header2">
          <select name="" id="">
            <option value="">Mahsulot guruhi</option>
            <option value="">Mahsulot guruhi</option>
            <option value="">Mahsulot guruhi</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Nomi</p>
              </th>
              <th>
                <p> Miqdori </p>
              </th>
              <th>
                <p>Zarar summasi</p>
              </th>
              <th>
                <p>Yaroq</p>
              </th>
              <th>
                <p>Sana</p>
              </th>
              <th>
                <p>Javobgar shaxs</p>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}
