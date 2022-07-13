import React, { useState } from "react";
import axios from "axios";
import DataPick from "./data_pick";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-confirm-alert/src/react-confirm-alert.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import image
import dollar from "../../Icons/Vector (11).svg";
import circle from "../../Icons/Ellipse 30.png";
import left from "../../Icons/Vector (7).png";
import { NavLink } from "react-router-dom";
const FakturaYaratish = ({ handleSend, url }) => {
  const [data, setData] = useState([]);
  const [biscuits, setBiscuits] = useState([]);
  const [biscuit, setBiscuit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(false);
  };
  return (
    <React.Fragment>
      <div className="manager_head2">
        <div className="faktura_name">
          <NavLink
            activeClassName="navbar_active2 "
            to={`${url}/MaxsulotSotish`}
          >
            <div className="prev_icon">
              <i class="fa-regular fa-circle-left"></i>
            </div>
          </NavLink>

          <div className="nameFaktura">
            <span>Oltin vodiy</span>
          </div>
        </div>
        <div className="faktura_yaratilishi">
          <div className="maxsulot_qushish" onClick={handleOpen}>
            <span>Mahsulot qo`shish</span>
            <div className="icon">
              <i class="fas fa-plus"></i>
            </div>
          </div>
          <div className="maxsulot_sotish">
            <span>Sotish</span>
            <div className="icon">
              <img src={dollar} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        style={{ height: "500" }}
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
          <div className="modal_input">
            <h1>Yangi faktura</h1>
            <TextField
              style={{ marginTop: "40px" }}
              id="outlined-basic"
              label="Faktura nomi"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="text"
              label="Mijoz nomi"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="text"
              label="Bonus"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="date"
              label="Buyurtma vaqti"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="text"
              label="Izoh"
              variant="outlined"
            />
            <div className="modal_close">
              <button onClick={handleSend}>Faktura yaratish</button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Mijoz</p>
              </th>
              <th>
                <p> Faktura nomi</p>
              </th>
              <th>
                <p>Umumiy summa (so`mda)</p>
              </th>
              <th>
                <p>Umumiy summa (dollarda)</p>
              </th>
              <th>
                <p> Izox</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.data.map((dat, id) => {
                if (this.props.search === false) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.client.company}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>
                        {dat.quantity.split(".")[0]}
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>
                        {dat.payment_type === "cash" ? "Naqd" : null}
                        {dat.payment_type === "credit_card" ? "Plastik" : null}
                        {dat.payment_type === "debt" ? "Nasiya" : null}
                      </th>
                      <th>{dat.total_price.split(".")[0]}</th>
                      <th>{dat.comment}</th>
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
                        <th>{dat.client.company}</th>
                        <th>{dat.biscuit.name}</th>
                        <th>
                          {dat.quantity.split(".")[0]}{" "}
                          {dat.biscuit.unit_of_measurement}
                        </th>
                        <th>
                          {dat.biscuit.price.split(".")[0]} {dat.currency}
                        </th>
                        <th>
                          {dat.payment_type === "cash" ? "Naqd" : null}
                          {dat.payment_type === "credit_card" ? "Plastik" : null}
                          {dat.payment_type === "debt" ? "Nasiya" : null}
                        </th>
                        <th>{dat.total_price.split(".")[0]}</th>
                        <th>{dat.comment}</th>
                      </tr>
                    );
                  }
                  if (
                    dat.client.company
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.client.company}</th>
                        <th>{dat.biscuit.name}</th>
                        <th>
                          {dat.quantity.split(".")[0]}{" "}
                          {dat.biscuit.unit_of_measurement}
                        </th>
                        <th>
                          {dat.biscuit.price.split(".")[0]} {dat.currency}
                        </th>
                        <th>
                          {dat.payment_type === "cash" ? "Naqd" : null}
                          {dat.payment_type === "credit_card" ? "Plastik" : null}
                          {dat.payment_type === "debt" ? "Nasiya" : null}
                        </th>
                        <th>{dat.total_price.split(".")[0]}</th>
                        <th>{dat.comment}</th>
                      </tr>
                    );
                  }
                }
              })} */}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default FakturaYaratish;
