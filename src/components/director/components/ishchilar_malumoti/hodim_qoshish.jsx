import React, { useState } from "react";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import tasdiq from "../../../Icons/tasdiq.svg";

import "react-confirm-alert/src/react-confirm-alert.css";

const HodimQoshish = ({ handlehodimclose }) => {
  // state = {
  //   role: "",
  //   first_name: "",
  //   last_name: "",
  //   middle_name: "",
  //   phone_number: "",
  //   started_at: "",
  //   password2: "",
  //   password: "",
  //   dp1: "12345678",
  //   address: "",
  //   order_number: "",
  //   birthday: "",
  //   note: "",
  //   oddiy: true,
  // };
  const [role, setRole] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [started_at, setStarted_at] = useState("");
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [dp1, setDp1] = useState("12345678");
  const [address, setAddress] = useState("");
  const [order_number, setOrder_number] = useState("");
  const [birthday, setBirthday] = useState("");
  const [note, setNote] = useState("");
  const [oddiy, setOddiy] = useState(true);
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
  const handleoddiy = () => {
    // this.setState({
    //   oddiy: false,
    // });
    setOddiy(false);
  };
  const handleoddiy1 = () => {
    // this.setState({
    //   oddiy: true,
    // });
    setOddiy(true);
  };
  const handleSend = () => {
    const data = {
      role: role,
      first_name: first_name,
      last_name: last_name,
      middle_name: middle_name,
      phone_number: phone_number,
      started_at: started_at,
      password: oddiy ? password : dp1,
      password2: oddiy ? password2 : dp1,
      address: address,
      order_number: order_number,
      birthday: birthday,
      note: note,
    };
    axios
      .post("/api/v1/user/users/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    this.submit();
    this.props.handlehodimclose();
    this.refreshPage();
  };
  const refreshPage = () => {
    window.location.reload();
  };
  // componentDidMount() {}
  // render() {
  return (
    <React.Fragment>
      <div className="hodim_royhati_asos">
        <button onClick={handlehodimclose} className="hodim_close">
          <span></span>
          <span></span>
        </button>
        <div className="hodim_inputs_asos">
          <h2>Yangi hodim qo'shish</h2>
          <div className="hodim_inputs">
            <TextField
              // onChange={(event) => {
              //   this.setState({ first_name: event.target.value });
              // }}
              onChange={(e) => setFirst_name(e.target.value)}
              id="outlined-basic"
              label="Ismi"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ password: event.target.value });
              // }}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-basic"
              label="Parol"
              className={oddiy === false ? "disable_input" : ""}
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ last_name: event.target.value });
              // }}
              onChange={(e) => setLast_name(e.target.value)}
              id="outlined-basic"
              label="Familyasi"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ password2: event.target.value });
              // }}
              onChange={(e) => setPassword2(e.target.value)}
              id="outlined-basic"
              label="Parol qayta"
              className={oddiy === false ? "disable_input" : ""}
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ middle_name: event.target.value });
              // }}
              onChange={(e) => setMiddle_name(e.target.value)}
              id="outlined-basic"
              label="Otasini ismi"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ phone_number: event.target.value });
              // }}
              onChange={(e) => setPhone_number(e.target.value)}
              id="outlined-basic"
              label="Telefon raqam"
              variant="outlined"
            />
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Lavozimi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={role}
                // onChange={(event) => {
                //   this.setState({ role: event.target.value });
                // }}
                onChange={(e) => setRole(e.target.value)}
                label="Lavozimi"
              >
                <MenuItem onClick={handleoddiy1} value="director">
                  Direkror
                </MenuItem>
                <MenuItem onClick={handleoddiy1} value="manager">
                  Meneger
                </MenuItem>
                <MenuItem onClick={handleoddiy1} value="warehouseman">
                  Omborchi
                </MenuItem>
                <MenuItem onClick={handleoddiy} value="driver">
                  Haydovchi
                </MenuItem>
                <MenuItem onClick={handleoddiy1} value="texnolog">
                  Bosh texnolog
                </MenuItem>
                <MenuItem onClick={handleoddiy1} value="businesmaneger">
                  Biznes meneger
                </MenuItem>
                <MenuItem value="staff" onClick={handleoddiy}>
                  Oddiy ishchi
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              // onChange={(event) => {
              //   this.setState({ started_at: event.target.value });
              // }}
              onChange={(e) => setStarted_at(e.target.value)}
              className="hodim_data"
              type="date"
              id="outlined-basic"
              label="Hodim ishga kelgan vaqti"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ address: event.target.value });
              // }}
              onChange={(e) => setAddress(e.target.value)}
              id="outlined-basic"
              label="Yashash manzili"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ order_number: event.target.value });
              // }}
              onChange={(e) => setOrder_number(e.target.value)}
              id="outlined-basic"
              label="Buyruq raqami"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ birthday: event.target.value });
              // }}
              onChange={(e) => setBirthday(e.target.value)}
              className="hodim_data1"
              type="date"
              id="outlined-basic"
              label="Tug'ilgan sana"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ note: event.target.value });
              // }}
              onChange={(e) => setNote(e.target.value)}
              id="outlined-basic"
              label="Izoh"
              variant="outlined"
            />

            <div className="tasdiq_div">
              <button onClick={handleSend}>Tasdiqlash</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  // }
};

export default HodimQoshish;
