import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//Import Imges
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/Vector (20).svg";
import Icon2 from "../../Icons/Vector (21).svg";
import Icon3 from "../../Icons/Vector (22).svg";
import Icon4 from "../../Icons/Vector (23).svg";
import arrow from "../../Icons/arrow.svg";

const Navbar = ({ url, handlemenu }) => {
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
  useEffect(() => {
    axios
      .get("http://68.183.222.195:8080/api/v1/storage/products")
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  const handletoggle = () => {
    setT1(!t1);
    setT2(false);
    setT3(false);
  };
  const handletoggle1 = () => {
    setT2(!t2);
    setT1(false);
    setT3(false);
  };
  const handletoggle2 = () => {
    setT2(false);
    setT1(false);
    setT3(!t3);
  };
  const handletoggleclose = () => {
    setT1(false);
    handlemenu();
  };
  return (
    <React.Fragment>
      <div className="navbar_asos">
        <div className="nav_fix">
          <img style={{opacity:"0"}} className="logo" src={logo} alt="" />
          <nav>
            <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/retsept`}
            >
              <img src={Icon1} alt="" />
              Mahsulotlar<button></button>
            </NavLink>
            <div className="div_a">
              <div className={t1 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle} className="toggle_link">
                  <div>
                    <img src={Icon2} alt="" />
                    Kunlik rejalar
                  </div>

                  <button className={t1 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/rejalar`}
                    onClick={handlemenu}
                  >
                    Rejalar
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/rejalarhisobi`}
                    onClick={handlemenu}
                  >
                    Rejalar hisoboti
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/RejaniYakunlash`}
            >
              <img src={Icon3} alt="" />
              Rejani yakunlash<button></button>
            </NavLink>
            <div className="div_a">
              <div className={t3 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle2} className="toggle_link">
                  <div>
                    <img src={Icon4} alt="" />
                    Qayta ishalash
                  </div>

                  <button className={t3 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/qaytaishlash`}
                    onClick={handlemenu}
                  >
                    Qayta ishalash
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/qaytaishlashtarixi`}
                    onClick={handlemenu}
                  >
                    Qayta ishalash tarixi
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handletoggleclose}></div>
    </React.Fragment>
  );
};

export default Navbar;
