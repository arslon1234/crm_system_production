import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/Group 644.svg";
import Icon2 from "../../Icons/Group 644 (1).svg";
import Icon4 from "../../Icons/Vector (23).svg";
import arrow from "../../Icons/arrow.svg";
import person from "../../Icons/person.svg";
import dash_1 from "../../Icons/dash_1.svg";
import tekstil from "../../Icons/tekstil3.png"
const Navbar = ({ url, handlemenu }) => {
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
  const handletoggle = () => {
    setT1(!t1);
    setT2(false);
    setT3(false);
  };
  // state = {};
  // render() {
  // const { url } = this.props;
  return (
    <React.Fragment>
      <div className="navbar_asos">
        <div className="nav_fix">
          <img  className="logo" src={tekstil} alt="" />
          <nav>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/dashboard`}
            >
              <img src={dash_1} alt="" />
              Dashboard<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/kirim`}
            >
              <img src={Icon1} alt="" /> KIRIM<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/chiqim`}
            >
              <img src={Icon2} alt="" /> CHIQIM<button></button>
            </NavLink>
            <div className="div_a">
              <div className={t1 ? "link_active6 alar" : "alar"}>
                <div onClick={handletoggle} className="toggle_link">
                  <div>
                    <img src={person} alt="" />
                    Hodimlar bo'limi
                  </div>

                  <button className={t1 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active4"
                    exact
                    to={`${url}/hodimlarRuyxati`}
                    onClick={handlemenu}
                  >
                    Hodimlar ro`yhati
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/QarzHaq`}
            >
              <img src={Icon2} alt="" />Qarzdorli & Haqdorlik<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/harajatlar`}
            >
              <img src={Icon2} alt="" /> Harajatlar<button></button>
            </NavLink>
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handlemenu}></div>
    </React.Fragment>
  );
  // }
};

export default Navbar;

//http://sururbackend.backoffice.uz/api/v1/client/
