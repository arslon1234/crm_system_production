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
import eye from "../../Icons/eye.svg";
import close_i from "../../Icons/close.svg";
import search from "../../Icons/search.svg";
import user_pic from "../../Icons/user_pic.svg";
import tasdiq from "../../Icons/tasdiq.svg";

const Taminotchi = ({ handlemenu, search_btn, handleSearch_btn }) => {
  // state = {
  //   data: [],
  //   hodim:[],
  //   modal: false,
  //   name: "",
  //   address: "",
  //   phone_number: "",
  //   inn: "",
  //   first_name: "",
  //   xr: "",
  //   mfo: "",
  //   key: "",
  //   responsible_person: "",
  //   search: true,
  // };
  const [data, setData] = useState([]);
  const [hodim, setHodim] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [inn, setInn] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [xr, setXr] = useState("");
  const [mfo, setMfo] = useState("");
  const [key, setKey] = useState("");
  const [responsible_person, setResponsible_person] = useState("");
  const [search, setSearch] = useState(true);

  const handleOpen = () => {
    // this.setState({
    //   modal: true,
    // });
    setModal(true);
  };
  const handleSearch = () => {
    if (key !== "") {
      // this.setState({ search: true });
      setKey(true);
    }
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

  const handleSend = () => {
    const buyurtma = {
      name: name,
      address: address,
      phone_number: phone_number,
      inn: inn,
      xr: xr,
      mfo: mfo,
      responsible_person: responsible_person,
    };
    axios
      .post("/api/v1/supplier/", buyurtma, {
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
  // componentDidMount() {
  //   axios
  //     .get("api/v1/supplier/", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({ data });
  //       console.log(data)
  //     });
  //   axios
  //       .get("api/v1/user/users/", {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then((res) => {
  //         const hodim = res.data;
  //         this.setState({ hodim });
  //         console.log(hodim)
  //       });
  // };

  // render() {
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
                // onChange={(event) => {
                //   this.setState({ key: event.target.value });
                // }}
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
                Ro'yxad qo’shish
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
            <div className="modal_input mi_1">
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
                label="Ta'minotchi nomi"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setAddress(e.target.value)}
                id="outlined-basic"
                label="Manzil"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setPhone_number(e.target.value)}
                id="outlined-basic"
                label="Telefon raqami"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setXr(e.target.value)}
                id="outlined-basic"
                label="XR"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setMfo(e.target.value)}
                id="outlined-basic"
                label="MFO"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setInn(e.target.value)}
                id="outlined-basic"
                label="INN"
                variant="outlined"
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Mas'ul shaxs
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setResponsible_person(e.target.value)}
                  label="Mas'ul shaxs"
                >
                  {hodim.map((hodim) => {
                    return (
                      <MenuItem value={hodim.id}>
                        {hodim.first_name} {hodim.last_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div className="modal_close">
                <button onClick={handleSend}>Tasdiqlash</button>
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
                <p> # </p>
              </th>
              <th>
                <p> Nomi</p>
              </th>
              <th>
                <p> Manzili</p>
              </th>
              <th>
                <p> Masul shaxs ismi</p>
              </th>
              <th>
                <p> Bank rekviziti</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, id) => {
              if (this.state.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.name}</th>
                    <th>{dat.address}</th>
                    <th>{dat.responsible_person_name}</th>
                    <th>
                      <div className="koz">
                        <button>
                          <img src={eye} alt="" />
                          <div className="mfoinn">
                            <p>x/r: {dat.xr}</p>
                            <p>mfo: {dat.mfo}</p>
                            <p>inn: {dat.inn}</p>
                            <p>
                              Sana: {dateFormat(dat.created_date, "dd/mm/yyyy")}
                            </p>
                          </div>
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              } else {
                if (
                  dat.name.toUpperCase().includes(this.state.key.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{dat.id}</th>
                      <th>{dat.name}</th>
                      <th>{dat.address}</th>
                      <th>{dat.responsible_person_name}</th>
                      <th>
                        <div className="koz">
                          <button>
                            <img src={eye} alt="" />
                            <div className="mfoinn">
                              <p>x/r: {dat.xr}</p>
                              <p>mfo: {dat.mfo}</p>
                              <p>inn: {dat.inn}</p>
                              <p>
                                Sana:{" "}
                                {dateFormat(dat.created_date, "dd/mm/yyyy")}
                              </p>
                            </div>
                          </button>
                        </div>
                      </th>
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

export default Taminotchi;
