import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import tasdiq from "../../../Icons/tasdiq.svg";

const OylikBelgilash = ({ handlehodimclose }) => {
  // state = {
  //   data: [],
  //   hodim: [],
  //   role: "",
  //   id: "",
  //   salary: "",
  // };
  const [data, setData] = useState([]);
  const [hodim, setHodim] = useState([]);
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [salary, setSalary] = useState("");
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
  const refreshPage = () => {
    window.location.reload();
  };
  // componentDidMount() {
  //   axios
  //     .get("/api/v1/user/users/", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({ data });
  //     });
  // }
  const handlePost = () => {
    const send = {
      id: id,
      salary: salary,
    };
    axios.post("/api/v1/user/users/salary/", send, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    submit();
    handlehodimclose();
    refreshPage();
  };
  // render(props) {
  return (
    <React.Fragment>
      <div className="hodim_royhati_asos oylik_asos">
        <button onClick={handlehodimclose} className="hodim_close">
          <span></span>
          <span></span>
        </button>
        <div className="hodim_inputs_asos">
          <div className="hodim_inputs oylik_belgilash">
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
                <MenuItem value="director">Direkror</MenuItem>
                <MenuItem value="manager">Meneger</MenuItem>
                <MenuItem value="warehouseman">Omborchi</MenuItem>
                <MenuItem value="driver">Haydovchi</MenuItem>
                <MenuItem value="texnolog">Bosh texnolog</MenuItem>
                <MenuItem value="businesmaneger">Biznes meneger</MenuItem>
                <MenuItem value="staff">Oddiy ishchi</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Hodim ismi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                // onChange={(event) => {
                //   this.setState({ id: event.target.value });
                // }}
                onChange={(e) => setId(e.target.value)}
                label="Hodim ismi"
              >
                {data.map((dat, id) => {
                  if (dat.role === role) {
                    return (
                      <MenuItem value={dat.id}>
                        {dat.first_name} {dat.last_name}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
            <TextField
              // onChange={(event) => {
              //   this.setState({ salary: event.target.value });
              // }}
              onChange={(e) => setSalary(e.target.value)}
              id="outlined-basic"
              label="Oylik summa"
              variant="outlined"
            />
            <div className="tasdiq_div">
              <button onClick={handlePost}>Tasdiqlash</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
  // }
};

export default OylikBelgilash;
