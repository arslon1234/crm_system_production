import React, { useState } from "react";
import axios from "axios";
import DataPick from "./data_pick";
import dateFormat from "dateformat";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import tasdiq from "../../Icons/tasdiq.svg";
import { NavLink } from "react-router-dom";

const OmborgaBuyurtma = ({ url }) => {
  const [data, setData] = useState([]);
  const [biscuits, setBiscuits] = useState([]);
  const [modal, setModal] = useState(false);
  const [yangi, setYangi] = useState(null);
  const [tayyor, setTayyor] = useState("completed");
  const [Tayyorlandi, setTayyorlandi] = useState("pending");
  const [biscuit, setBiscuit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [complete_date, setComplete_date] = useState("");
  const [complete_at, setComplete_at] = useState("");
  const [id, setId] = useState("");
  const [narxi, setNarxi] = useState("");
  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };
  const submit = () => {
    confirmAlert({
      childrenElement: () => (
        <div className="alert_tasdiq">
          <img src={tasdiq} alt="" />
          <p>Tasdiqlandi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  const handleSendStatus = () => {
    const status = {
      yangi: yangi,
      tayyor: tayyor,
      Tayyorlandi: Tayyorlandi,
    };
    axios.put("/api/v1/order/client/orders/", status, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    this.refreshPage();
  };
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <div className="data_div">{/* <DataPick /> */}</div>
        <button className="modal_open" type="button" onClick={handleOpen}>
          Yangi buyurtma <span>+</span>
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal}
          onClose={handleClose}
          className="dflax"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal}>
            <div className="modal_input modal_input4">
              <h1>Omborga buyurtma</h1>
              <TextField
                onChange={(e) => setQuantity(e.target.value)}
                id="outlined-basic"
                label="Buyurtma nomi"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setComplete_at(e.target.value)}
                className="hodim_data"
                type="date"
                id="outlined-basic"
                label="Muddati"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setComment(e.target.value)}
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
              />
              <div className="modal_close">
                <NavLink
                  activeClassName="navbar_active2 "
                  to={`${url}/BuyurtmaYaratish`}
                >
                  <button>Buyurtma yaratish</button>
                </NavLink>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p>Buyurtma nomi</p>
              </th>
              <th>
                <p> Miqdori (kg)</p>
              </th>

              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Status </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.biscuit.name}</th>
                    <th>{dat.quantity.split(".")[0]} </th>
                    <th>{dat.biscuit.unit_of_measurement}</th>
                    <th>
                      <select className="select" name="" id="">
                        <option value="">
                          {dat.status === "Tayyorlandi" ? "Tayyorlandi" : null}
                          {dat.status === "Qabul qilindi"
                            ? "Qabul qilindi"
                            : null}
                          {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
                        </option>
                        <option value="Tayyorlandi">Tayyorlandi</option>
                        <option value="Qabul qilindi">Qabul qilindi</option>
                        <option value="Kutilmoqda">Kutilmoqda</option>
                      </select>
                    </th>
                    <th>{dat.comment}</th>
                    <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                  </tr>
                );
              } else {
                if (
                  dat.biscuit.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.quantity.split(".")[0]} </th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>
                        <select className="select" name="" id="">
                          <option value="">
                            {dat.status === "Tayyorlandi"
                              ? "Tayyorlandi"
                              : null}
                            {dat.status === "Qabul qilindi"
                              ? "Qabul qilindi"
                              : null}
                            {dat.status === "Kutilmoqda" ? "Kutilmoqda" : ""}
                          </option>
                          <option value="Tayyorlandi">Tayyorlandi</option>
                          <option value="Qabul qilindi">Qabul qilindi</option>
                          <option value="Kutilmoqda">Kutilmoqda</option>
                        </select>
                      </th>
                      <th>{dat.comment}</th>
                      <th>{dateFormat(dat.modified_date, "dd/mm/yyyy")}</th>
                    </tr>
                  );
                }
              }
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default OmborgaBuyurtma;
