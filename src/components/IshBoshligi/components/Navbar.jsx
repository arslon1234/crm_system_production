import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//Import Imges
import logo from "../../Icons/Logo.svg";
import Icon4 from "../../Icons/Vector (15).svg";
import Icon5 from "../../Icons/Vector (13).svg";
import arrow from "../../Icons/arrow.svg";

const Navbar = ({ url, handlemenu }) => {
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
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
    setT3(!t3);
    setT1(false);
    setT2(false);
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
            <div className="div_a">
              <div className={t3 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle2} className="toggle_link">
                  <div>
                    <img src={Icon4} alt="" />
                    Rejalar
                  </div>

                  <button className={t3 ? "btn1 btnlar" : "btnlar"}>
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
                    Rejalar hisobi
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="div_a">
              <div className={t2 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle1} className="toggle_link">
                  <div>
                    <img src={Icon5} alt="" />
                    Buyurtmalar
                  </div>

                  <button className={t2 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/buyurtmalar`}
                    onClick={handlemenu}
                  >
                    Buyurtmalar
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/buyurtmalartarixi`}
                    onClick={handlemenu}
                  >
                    Buyurmalar tarixi
                  </NavLink>
                </div>
              </div>
            </div>
            {/* <div className="div_a">
              <div className={t1 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle} className="toggle_link">
                  <div>
                    <img src={Icon5} alt="" />
                    Omborga buyurtma
                  </div>

                  <button className={t1 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/OmborgaBuyurtma`}
                    onClick={handlemenu}
                  >
                    Omborga buyurtma
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/BuyurtmaTarixi2`}
                    onClick={handlemenu}
                  >
                    Buyurmalar tarixi
                  </NavLink>
                </div>
              </div>
            </div> */}
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handletoggleclose}></div>
    </React.Fragment>
  );
};

export default Navbar;
