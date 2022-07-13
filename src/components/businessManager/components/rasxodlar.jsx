import React, { useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import { confirmAlert } from "react-confirm-alert";
import Backdrop from "@material-ui/core/Backdrop";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

// Image import
import close_i from "../../Icons/close.svg";
import search from "../../Icons/search.svg";
import user_pic from "../../Icons/user_pic.svg";
import tasdiq from "../../Icons/tasdiq.svg";

const Rasxodlar = ({ handlemenu, search_btn, handleSearch_btn }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [turi, setTuri] = useState("");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("");
  const [note, setNote] = useState("");
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");
  const [payment_method, setPayment_method] = useState("");
  const [search, setSearch] = useState(false);
  const handleOpen = () => {
    // this.setState({
    //   modal: true,
    // });
    setModal(true);
  };
  const handleSearch = () => {
    if (key !== "") {
      // this.setState({ search: true });
      setSearch({ search: true });
    }
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
  const handleClose = () => {
    // this.setState({
    //   modal: false,
    // });
    setModal(false);
  };
  const handleSend = () => {
    const buyurtma = {
      name: name,
      status: status,
      cost: cost,
      payment_method: payment_method,
      note: note,
      currency: currency,
    };
    axios
      .post("/api/v1/expense/add/quantity/", buyurtma, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    submit();
    refreshPage();
  };
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <React.Fragment>
      <div className="modal_btn">
        <div className="up_nav">
          <div></div>
          <div className="up_nav_2">
            <button onClick={handlemenu} className="dnone">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div
              className={search_btn === false ? "search" : "search searching"}
            >
              <input
                onChange={(e) => setKey(e.target.value)}
                type="search"
                name=""
                placeholder="Izlash..."
                id=""
              />
              <button onClick={handleSearch_btn}>
                <span></span>
                <span></span>
                <img src={search} alt="" />
              </button>
            </div>
            <div>
              <button className="modal_open" type="button" onClick={handleOpen}>
                Rasxod qo’shish
              </button>
              <button onClick={handleSearch_btn} className="search_btn">
                <img src={search} alt="" />
              </button>
              <a className="user_pic" href="/">
                <img src={user_pic} alt="" />
              </a>
            </div>
          </div>
        </div>
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
              <div className="modal_x">
                <button onClick={handleClose}>
                  <img src={close_i} alt="" />
                </button>
              </div>
              <TextField
                // onChange={(event) => {
                //   this.setState({ name: event.target.value });
                // }}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="Chiqim nomi"
                variant="outlined"
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Holati
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={status}
                  // onChange={(event) => {
                  //   this.setState({ status: event.target.value });
                  // }}
                  onChange={(e) => setStatus(e.target.value)}
                  label="status"
                >
                  <MenuItem value="new">Yangi</MenuItem>
                  <MenuItem value="completed">Tugallangan</MenuItem>
                </Select>
              </FormControl>
              <TextField
                // onChange={(event) => {
                //   this.setState({ cost: event.target.value });
                // }}
                onChange={(e) => setCost(e.target.value)}
                id="outlined-basic"
                label="Summa"
                variant="outlined"
              />
              <TextField
                // onChange={(event) => {
                //   this.setState({ payment_method: event.target.value });
                // }}
                onChange={(e) => setPayment_method(e.target.value)}
                id="outlined-basic"
                label="To'lov usuli"
                variant="outlined"
              />

              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  To'lov turi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={currency}
                  // onChange={(event) => {
                  //   this.setState({ currency: event.target.value });
                  // }}
                  onChange={(e) => setCurrency(e.target.value)}
                  label="To'lov turi"
                >
                  <MenuItem value="So'm">So'm</MenuItem>
                  <MenuItem value="Dollor">Dollor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                // onChange={(event) => {
                //   this.setState({ note: event.target.value });
                // }}
                onChange={(e) => setNote(e.target.value)}
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
              />
              <div className="modal_close">
                <button onClick={handleSend} type="submit">
                  Tasdiqlash
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="data_excel">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
      </div>
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p>№</p>
              </th>
              <th>
                <p> Chiqim nomi</p>
              </th>
              <th>
                <p> Turi</p>
              </th>
              <th>
                <p> Summa</p>
              </th>
              <th>
                <p> To'lov turi</p>
              </th>
              <th>
                <p> Datatime</p>
              </th>
              <th>
                <p> Izoh</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, id) => {
              if (this.state.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.expense.name}</th>
                    <th>
                      {dat.status === "new" ? "Yangi" : null}
                      {dat.status === "completed" ? "Tugallangan" : null}
                    </th>
                    <th>{dat.cost.split(".")[0]}</th>
                    <th>{dat.currency}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    <th>{dat.note}</th>
                  </tr>
                );
              } else {
                if (
                  dat.expense.name
                    .toUpperCase()
                    .includes(this.state.key.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.expense.name}</th>
                      <th>
                        {dat.status === "new" ? "Yangi" : null}
                        {dat.status === "completed" ? "Tugallangan" : null}
                      </th>
                      <th>{dat.cost.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dat.note}</th>
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

export default Rasxodlar;
