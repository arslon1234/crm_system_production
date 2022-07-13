import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/icon1.svg";
import Icon2 from "../../Icons/icon2.svg";
import Icon4 from "../../Icons/Vector (23).svg";
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
  // state = {};
  // render() {
  // const { url } = this.props;
  return (
    <React.Fragment>
      <div className="navbar_asos">
        <div className="nav_fix">
        <img  className="logo" src={tekstil} alt="" />
          <nav>
            <div className="div_a">
              <div className={t1 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle} className="toggle_link">
                  <div>
                    <img src={Icon4} alt="" />
                    Qayta ishlash
                  </div>

                  <button className={t1 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/maxsulotQabuli`}
                    onClick={handlemenu}
                  >
                    Maxsulot qabuli
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/yaroqsiz`}
                    onClick={handlemenu}
                  >
                    Qayta ishlash va yaroqsiz
                  </NavLink>
                </div>
              </div>
            </div>
            {/* <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              exact
              to={url}
            >
              <img src={Icon1} alt="" />
              Yaroqsiz {` & `} Qayta ishlash<button></button>
            </NavLink> */}
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/baholash`}
            >
              <img src={Icon2} alt="" />
              Baholash<button></button>
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
