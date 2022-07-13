import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/Vector (10).svg";
import Icon2 from "../../Icons/icon2.svg";
import Icon3 from "../../Icons/icon3.svg";
import Icon5 from "../../Icons/Vector (12).svg";
import Icon6 from "../../Icons/Vector (13).svg";
import Icon7 from "../../Icons/Vector (14).svg";
import arrow from "../../Icons/arrow.svg";
import tekstil from "../../Icons/tekstil3.png"
import Cookies from "universal-cookie";

const Navbar = ({ url, handlemenu, setKeyword }) => {
  const [nav_two, setNav_two] = useState(false);
  const [nav_two2, setNav_two2] = useState(false);
  const [nav_three, setNav_three] = useState(false);
  const [nav_four, setNav_four] = useState(false);
  const [nav_five, setNav_five] = useState(false);
  const cookies = new Cookies();
  const role = cookies.get("role");
  const handletoggle2 = () => {
    setNav_two((prev) => !prev);
    setKeyword("");
    setNav_three(false);
    setNav_four(false);
    setNav_five(false)
  };
  const handletoggle3 = () => {
    setNav_three((prev) => !prev);
    setNav_two(false);
    setKeyword("");
    setNav_four(false);
    setNav_five(false)
  };
  const handletoggle4 = () => {
    setNav_four((prev) => !prev);
    setNav_two(false);
    setNav_three(false);
    setKeyword("");
    setNav_five(false)
  };
  const handletoggle5 = () => {
    setNav_five((prev) => !prev);
    setNav_two(false);
    setNav_four(false);
    setKeyword("");
    setNav_three(false)
  };
  const handletoggle6 = () => {
    setNav_five(false);
    setNav_two(false);
    setNav_two2((prev)=>!prev);
    setNav_four(false);
    setKeyword("");
    setNav_three(false)
  };
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
              exact
              to={`${url}/MijozlarRuyxati`}
            >
              <img src={Icon1} alt="" />
              Mijozlar ro`yhati<button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              onClick={handlemenu}
              to={`${url}/OmborQoldiq`}
              activeClassName="navbar_active"
            >
              <img src={Icon2} alt="" />
              Ombor qoldiq<button></button>
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
              <div className={nav_two2 ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle6} className="toggle_link">
                  <div>
                  <i style={{fontSize:"19px", marginRight:"20px"}} class="fa-solid fa-chart-pie"></i>
                    Biznes tahlili
                  </div>

                  <button className={nav_two2 ? "btn1 btnlar" : "btnlar"}>
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
            <div className="div_a">
              <div className={nav_three ? `${role === "Sotuv boshlig'i" ? "link_active2" : "link_active6"} alar` : "alar"}>
                <div onClick={handletoggle3} className="toggle_link">
                  <div>
                    <img src={Icon5} alt="" />
                    Sotuv hisoboti{" "}
                  </div>

                  <button className={nav_three ? "btn1 btnlar" : "btnlar"}>
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
                  {role === "Sotuv boshlig'i" && <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/SotuvHisobi`}
                    onClick={handlemenu}
                  >
                    Sotilgan maxsulotlar hisobi
                  </NavLink>}
                </div>
              </div>
            </div>
            <div className="div_a">
              <div className={nav_four ? "link_active2 alar" : "alar"}>
                <div onClick={handletoggle4} className="toggle_link">
                  <div>
                    <img src={Icon6} alt="" />
                    Buyurtmalar{" "}
                  </div>

                  <button className={nav_four ? "btn1 btnlar" : "btnlar"}>
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
                    Sex boshlig'iga buyurtma
                  </NavLink>
                  <NavLink
                    activeClassName="navbar_active2 "
                    to={`${url}/Buyurtmatarixi`}
                    onClick={handlemenu}
                  >
                    Buyurtmalar tarixi
                  </NavLink>
                </div>
              </div>
            </div>
           {role === "Sotuv boshlig'i" && <div className="div_a">
              <div className={nav_five ? "link_active6 alar" : "alar"}>
                <div onClick={handletoggle5} className="toggle_link">
                  <div>
                    <img src={Icon7} alt="" />
                    Menejerlar oynasi{" "}
                  </div>

                  <button className={nav_five ? "btn1 btnlar" : "btnlar"}>
                    <img className="arrow" src={arrow} alt="" />
                  </button>
                </div>
                <div className="toggle">
                  <NavLink
                    activeClassName="navbar_active2"
                    exact
                    to={`${url}/SavdoHisoboti`}
                    onClick={handlemenu}
                  >
                    Savdo hisoboti
                  </NavLink>
                </div>
              </div>
            </div>}
          </nav>
        </div>
      </div>
      <div className="toggle_close" onClick={handlemenu}></div>
    </React.Fragment>
  );
  // }
};

export default Navbar;
