import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Icons/Logo.svg";
import pie from "../../Icons/pie.svg";
import chiqim from "../../Icons/chiqim.svg";

const Navbar = ({ url, handlemenu }) => {
  // state = {};

  // render() {
  // const { url } = this.props;
  return (
    <React.Fragment>
      <div className="navbar_asos">
        <div className="nav_fix">
          <img className="logo" src={logo} alt="" />
          <nav>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              exact
              to={url}
              onClick={handlemenu}
            >
              <img src={pie} alt="" />
              Ta’minotchi ro’yxati va ularni qo’shish <button></button>
            </NavLink>
            <NavLink
              className="a_lar"
              activeClassName="navbar_active"
              to={`${url}/rasxodlar`}
              onClick={handlemenu}
            >
              <img src={chiqim} alt="" />
              Rasxodlar hisobi
              <button></button>
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
