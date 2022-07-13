import React, { Component, useCallback, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import tekstil from "../Icons/tekstil3.png";
import "./login.css";

import logo from "./Logo.svg";
import login from "./login.svg";
import parol from "./parol.svg";
import Loader from "../loader/Loader";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([
    {
      login: "",
      password: "",
    },
  ]);
  const cookies = new Cookies();
  const history = useHistory();

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const loginClick = useCallback(() => {
    setLoading(true);
    axios
      .post("http://68.183.222.195:8080/api/v1/user/token/", {
        username: userData.login,
        password: userData.password,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          cookies.set("access", res.data.access, { expires: 0, path: "/" });
          cookies.set("refresh", res.data.refresh, { expires: 0, path: "/" });
          cookies.set("role", res.data.role, { expires: 0, path: "/" });
          if (res.data.role === "Omborchi") {
            history.replace("/warehouseMan/mahsulotlar-ro'yhati/homashyo");
            // window.location.reload();
          } else if (res.data.role === "Sotuv boshlig'i") {
            history.replace("/sotuvboshligi/MijozlarRuyxati");
            // window.location.reload();
          } else if (res.data.role === "Direktor") {
            history.replace("/director/dashboard");
            // window.location.reload();
          } else if (res.data.role === "Sotuv meneger") {
            history.replace("/sotuv-meneger/MijozlarRuyxati");
            // window.location.reload();
          } else if (res.data.role === "Ta'minotchi") {
            history.replace("/taminotchi/OmborQoldiq");
            // window.location.reload();
          } else if (res.data.role === "Kassir") {
            history.replace("/moliya/dashboard");
            // window.location.reload();
          } else if (res.data.role === "Texnolog") {
            history.replace("/technolog/retsept");
            // window.location.reload();
          } else if (res.data.role === "Nazoratchi") {
            history.replace("/sifatNazorati/yaroqsiz");
            // window.location.reload();
          }
          cookies.remove("error", { path: "/" });
        }
      })
      .catch(() =>
        cookies.set("error", "Bunday foydalanuvchi mavjud emas!", { path: "/" })
      )
      .finally(() => setLoading(false));
  }, [userData, cookies, history]);
  return (
    <React.Fragment>
      {!loading && (
        <div className="login">
          <div className="form_group">
            <div className="login_logo">
              <img className="logo" src={tekstil} alt="" />
            </div>
            <div className="login_inputs">
              <p>Login</p>
              <div className="forms">
                <img src={login} alt="" />
                <input
                  type="text"
                  name="phone_number"
                  onChange={(e) => handleChange("login", e.target.value)}
                  required
                />
              </div>
              <p>Parol</p>
              <div className="forms">
                <img src={parol} alt="" />
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="invalid-text">{cookies.get("error")}</div>
            <div className="login_buttons">
              <button type="submit" onClick={loginClick}>
                Kirish
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="loader-login">
          <Loader />
        </div>
      )}
    </React.Fragment>
  );
}
