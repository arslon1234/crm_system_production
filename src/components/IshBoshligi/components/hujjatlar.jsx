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

function Hujjatlar () {
  // state = {
  //   data: [],
  //   biscuits: [],
  //   modal: false,
  //   yangi: null,
  //   tayyor: "completed",
  //   Tasdiqlangan: "pending",
  //   biscuit: "",
  //   quantity: "",
  //   comment: "",
  //   complete_date: "",
  //   complete_at: "",
  //   id: "",
  // };
  const [data, setData] = useState([]);
  const [biscuits, setBiscuits] = useState([]);
  const [modal, setModal] = useState(false);
  const [yangi, setYangi] = useState(null);
  const [tayyor, setTayyor] = useState("completed");
  const [Tasdiqlangan, setTasdiqlangan] = useState("pending");
  const [biscuit, setBiscuit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [complete_date, setComplete_date] = useState("");
  const [complete_at, setComplete_at] = useState("");
  const [id, setId] = useState("");
  const [narxi, setNarxi] = useState("");
  const handleOpen = () => {
    // this.setState({
    //   modal: true,
    // });
    setModal(true);
  };

  const handleClose = () => {
    // this.setState({
    //   modal: false,
    // });
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
      Tasdiqlangan: Tasdiqlangan,
    };
    axios.put("/api/v1/order/client/orders/", status, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    refreshPage();
  };
  const handleSendBuyurtma = () => {
    const buyurtma = {
      biscuit: biscuit,
      quantity: quantity,
      comment: comment,
      complete_at: complete_at,
    };
    axios.post("api/v1/order/client/orders/", buyurtma, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    submit();
    handleClose();
    refreshPage();
  };
  const refreshPage = () => {
    window.location.reload();
  };
  // componentDidMount() {
  //   axios
  //     .get("/api/v1/order/client/orders/", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({ data });
  //     });
  //   axios
  //     .get("/api/v1/warehouse/biscuits/", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const biscuits = res.data;
  //       this.setState({ biscuits });
  //       console.log(biscuits);
  //     });
  // }
  // render(props) {
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <div className="data_div">
          <DataPick />
        </div>
        <button className="modal_open" type="button" onClick={handleOpen}>
          Yangi harajat yaratish <span>+</span>
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
            <div className="modal_input">
              <h1>Yangi harajat</h1>
              <TextField
                onChange={(e) => setQuantity(e.target.value)}
                id="outlined-basic"
                label="Nomi"
                variant="outlined"
              />
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  // onChange={(event) => {
                  //   this.setState({ narxi: event.target.value });
                  // }}
                  onChange={(e) => setNarxi(e.target.value)}
                  label="Summa"
                  variant="outlined"
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel> Valyuta </InputLabel>
                  <Select
                    // onChange={(event) => {this.setState({unit_of_measurement: event.target.value})}}
                    label="Valyuta"
                  >
                    <MenuItem value="Som">So'm</MenuItem>
                    <MenuItem value="Dollor">Dollor</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                // onChange={(event) => {
                //   this.setState({ comment: event.target.value });
                // }}
                onChange={(e) => setComment(e.target.value)}
                id="outlined-basic"
                label="Kimdan"
                variant="outlined"
              />
              <TextField
                // onChange={(event) => {
                //   this.setState({ comment: event.target.value });
                // }}
                onChange={(e) => setComment(e.target.value)}
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
              />
              <TextField
                // onChange={(event) => {
                //   this.setState({ complete_at: event.target.value });
                // }}
                onChange={(e) => setComplete_at(e.target.value)}
                className="hodim_data"
                type="date"
                id="outlined-basic"
                label="Tayyor bo`lish sanasi"
                variant="outlined"
              />
              <div className="modal_close">
                <button onClick={handleSendBuyurtma}>Buyurtma berish</button>
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
                <p> Nomi </p>
              </th>
              <th>
                <p> Summa </p>
              </th>
              <th>
                <p> Valyuta </p>
              </th>
              <th>
                <p> Status </p>
              </th>
              <th>
                <p> Masul hodim </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Muddati </p>
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
                      {dat.status === "Tasdiqlangan" ? "Tasdiqlangan" : null}
                      {dat.status === "Bekor qilingan"
                        ? "Bekor qilingan"
                        : null}
                      {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
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
                        {dat.status === "Tasdiqlangan" ? "Tasdiqlangan" : null}
                        {dat.status === "Bekor qilingan"
                          ? "Bekor qilingan"
                          : null}
                        {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
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

export default Hujjatlar;
