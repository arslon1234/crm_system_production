import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "../../Icons/Logo.svg";
import home from "../../Icons/Home.svg";
import Icon1 from "../../Icons/Vector (16).svg";
import Icon4 from "../../Icons/Vector (23).svg";
import Icon2 from "../../Icons/Group 644 (1).svg";
import Icon5 from "../../Icons/Vector (13).svg";
import Icon6 from "../../Icons/Vector (12).svg";
import person from "../../Icons/person.svg";
import chartline from "../../Icons/chartline.svg";
import marketing from "../../Icons/marketing.svg";
import pie from "../../Icons/pie.svg";
import user from "../../Icons/user.svg";
import client from "../../Icons/client.svg";
import chiqim from "../../Icons/chiqim.svg";
import arrow from "../../Icons/arrow.svg";
import dash_1 from "../../Icons/dash_1.svg";
import tekstil from "../../Icons/tekstil3.png"
import brak from "../../Icons/brak.svg";

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
    setT2(false);
    setT3(false);
    handlemenu();
  };

  return (
    <React.Fragment>
      <div className="navbar_asos">
        <div className="nav_fix">
        <img  className="logo" src={tekstil} alt="" />
          <button onClick={handletoggleclose} className="burger_close">
            <span></span>
            <span></span>
          </button>
          <nav>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/dashboard`}
              onClick={handletoggleclose}
            >
              <img src={dash_1} alt="" />
              Dashboard <button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/KunlikHisobot`}
              onClick={handletoggleclose}
            >
              <i style={{fontSize:"19px", marginRight:"20px"}} class="fa-solid fa-receipt"></i>
              Kunlik Hisobot <button></button>
            </NavLink>
            <div className="div_a">
              <div className={t3 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle2} className="toggle_link">
                  <div>
                  <i style={{fontSize:"19px", marginRight:"20px"}} class="fa-solid fa-chart-pie"></i>
                    Biznes tahlili
                  </div>

                  <button className={t3 ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/MijozlarTahlili`}
                    onClick={handlemenu}
                  >
                    Mijozlar tahlili
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    exact
                    to={`${url}/MahsulotlarTahlili`}
                    onClick={handlemenu}
                  >
                   Mahsulotlar tahlili
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/ombor-qoldiq`}
              onClick={handletoggleclose}
            >
              <img src={Icon1} alt="" />
              Ombor qoldiq <button></button>
            </NavLink>
            <div className="div_a">
              <div className={t2 ? "link_active6 alar" : "alar"}>
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
                    activeClassName="navbar_active4 "
                    to={`${url}/buyurtmalarTarixi`}
                    onClick={handletoggleclose}
                  >
                    Buyurmalar tarixi
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              onClick={handletoggleclose}
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/mahlsulot-narxlari`}
            >
              <img src={Icon6} alt="" />
              Mahsulot narxlari
              <button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/yaroqsiz-va-qayta-ishlash`}
            >
              <img src={Icon4} alt="" /> Yaroqsiz & Qayta ishlash
              <button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handletoggleclose}
              activeClassName="navbar_active"
              to={`${url}/harajatlar`}
            >
              <img src={Icon2} alt="" />
              Harajatlar
              <button></button>
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
                  onClick={handletoggleclose}
                    activeClassName="navbar_active4 "
                    exact
                    to={`${url}/HodimlarRuyxati`}
                  >
                    Hodimlar ro`yhati
                  </NavLink>
                </div>
              </div>
            </div>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/klientroyhati`}
              onClick={handletoggleclose} 
            >
              <img src={client} alt="" />
              Mijozlar ro’yxati
              <button></button>
            </NavLink>
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handlemenu}></div>
    </React.Fragment>
  );
};

export default withRouter(Navbar);
