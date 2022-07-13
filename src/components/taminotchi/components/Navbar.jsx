import React, { useState } from "react";
import { NavLink } from "react-router-dom";

//Import Imges
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/Vector (16).svg";
import Icon2 from "../../Icons/Vector (17).svg";
import Icon3 from "../../Icons/Vector (18).svg";
import Icon4 from "../../Icons/Vector (19).svg";
import arrow from "../../Icons/arrow.svg";
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
        <img  className="logo" src={tekstil} alt="" />
          <nav>
            <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/OmborQoldiq`}
            >
              <img src={Icon1} alt="" />
              Ombor qoldiq<button></button>
            </NavLink>

            <div className="div_a">
              <div className={t3 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle2} className="toggle_link">
                  <div>
                    <img src={Icon2} alt="" />
                    Mol yetkazib beruvchi
                  </div>

                  <button className={t3 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active3"
                    exact
                    to={`${url}/Active`}
                    onClick={handlemenu}
                  >
                    Active yetkazuvchi
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active3"
                    exact
                    to={`${url}/Passive`}
                    onClick={handlemenu}
                  >
                    Passive yetkazuvchi
                  </NavLink>
                </div>
              </div>
            </div>
            {/* <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/Topilganlar`}
            >
              <img src={Icon3} alt="" />
              Topilganlar<button></button>
            </NavLink> */}
            {/* <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/Kassa`}
            >
              <img src={Icon4} alt="" />
              Pul statistiaksi<button></button>
            </NavLink> */}
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handletoggleclose}></div>
    </React.Fragment>
  );
};

export default Navbar;
