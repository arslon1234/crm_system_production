import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/Vector (10).svg";
import Icon2 from "../../Icons/icon2.svg";
import Icon3 from "../../Icons/icon3.svg";
import Icon4 from "../../Icons/icon4.svg";
import Icon5 from "../../Icons/Vector (12).svg";
import Icon6 from "../../Icons/Vector (13).svg";
import arrow from "../../Icons/arrow.svg";
const Navbar = ({ url, handlemenu }) => {
  const [nav_two, setNav_two] = useState(false);
  const [nav_three, setNav_three] = useState(false);
  const [nav_four, setNav_four] = useState(false);
  const [nav_five, setNav_five] = useState(false);
  const handletoggle2 = () => {
    setNav_two((prev) => !prev);
  };
  const handletoggle3 = () => {
    setNav_three((prev) => !prev);
  };
  const handletoggle4 = () => {
    setNav_four((prev) => !prev);
  };
  const handletoggle5 = () => {
    setNav_five((prev) => !prev);
  };
  return (
    <React.Fragment>
      <div className="navbar_asos">
        <div className="nav_fix">
          <img className="logo" src={logo} alt="" />
          <nav>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              exact
              to={url}
            >
              <img src={Icon1} alt="" />
              Mijozlar ro`yhati<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              activeClassName="navbar_active"
              to={`${url}/TayyorMaxsulotlar`}
            >
              <img src={Icon2} alt="" /> Tayyor maxsulotlar<button></button>
            </NavLink>
            <div className="div_a">
              <div className={nav_two ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle2} className="toggle_link">
                  <div>
                    <img src={Icon3} alt="" />
                    Mahsulot sotish{" "}
                  </div>

                  <button className={nav_two ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/MaxsulotSotish`}
                    onClick={handlemenu}
                  >
                    Faktura yaratish
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/FakturaTarixi`}
                    onClick={handlemenu}
                  >
                    Fakturalar tarixi
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="div_a">
              <div className={nav_three ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle3} className="toggle_link">
                  <div>
                    <img src={Icon4} alt="" />
                    Yaroqsiz & Qayta ishlash
                  </div>

                  <button className={nav_three ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/MaxsulotQabuli`}
                    onClick={handlemenu}
                  >
                    Mahsulot qabuli
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/QaytaIshlash`}
                    onClick={handlemenu}
                  >
                    Qayta ishlash va yaroqsiz
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="div_a">
              <div className={nav_four ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle4} className="toggle_link">
                  <div>
                    <img src={Icon5} alt="" />
                    Sotuv hisoboti
                  </div>

                  <button className={nav_four ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/FakturalarTarixi`}
                    onClick={handlemenu}
                  >
                    Fakturalar tarixi
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/SotuvHisobi`}
                    onClick={handlemenu}
                  >
                    Sotilgan mahsulotlar hisoboti
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="div_a">
              <div className={nav_five ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle5} className="toggle_link">
                  <div>
                    <img src={Icon6} alt="" />
                    Buyurtmalar
                  </div>

                  <button className={nav_five ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/Boshliqqabuyurtma`}
                    onClick={handlemenu}
                  >
                    Sex boshlig`iga buyurtma
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/Buyurtmatarixi`}
                    onClick={handlemenu}
                  >
                    Buyurmalar tarixi
                  </NavLink>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handlemenu}></div>
    </React.Fragment>
  );
  // }
};

export default Navbar;
