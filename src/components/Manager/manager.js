import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Mijozlar from "./components/mijozlarRoyxati";
import ByurtmaBerish from "./components/ByurtmaBerish";
import MaxsulotSotish from "./components/MaxsulotSotish";
import TayyorMaxsulotlar from "./components/TayyorMaxsulotlar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Image import
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import Fakturayaratish from "./components/Fakturayaratish";
import FakturaTarixi from "./components/FakturaTarixi";
import MaxsulotQabuli from "./components/MaxsulotQabuli";
import QaytaIshlash from "./components/QaytaIshlash";
import FakturalarTarixi from "./components/FakturalarTarixi";
import SotuvHisobi from "./components/SotuvHisobi";
import Boshliqqabuyurtma from "./components/Boshliqqabuyurtma";
import Buyurtmatarixi from "./components/Buyurtmatarixi";

export default function Manager(props) {
  const [menu, setMenu] = useState(false);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(true);
  const [search_btn, setSearch_btn] = useState(false);

  const handleSearch = () => {
    key.length > 0 && setSearch(true);
  };

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleSearch_btn = () => {
    setSearch_btn((prev) => !prev);
  };

  const { path } = props.match;
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="asos container">
          <div className={menu ? "toggle1 asos_1" : "asos_1"}>
            <Navbar url={path} handlemenu={handleMenu} />
          </div>
          <div className="asos_2">
            <div className="up_nav">
              <div></div>
              <div className="up_nav_2">
                <button onClick={handleMenu} className="dnone">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div
                  className={
                    search_btn === false ? "search" : "search searching"
                  }
                >
                  <input
                    onChange={(event) => setKey(event.target.value)}
                    type="search"
                    name=""
                    placeholder="Izlash..."
                    id=""
                  />
                  <button onClick={handleSearch_btn}>
                    <span></span>
                    <span></span>
                    <img src={searchIcon} alt="" />
                  </button>
                </div>
                <div>
                  <button onClick={handleSearch_btn} className="search_btn">
                    <img src={searchIcon} alt="" />
                  </button>
                  <a className="user_pic" href="/">
                    <img src={user_pic} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="switchs">
              <Switch>
                <Route exact path={path}>
                  <Mijozlar keyword={key} search={search} />
                </Route>
                <Route path={`${path}/TayyorMaxsulotlar`}>
                  <TayyorMaxsulotlar keyword={key} search={search} />
                </Route>
                <Route path={`${path}/MaxsulotSotish`}>
                  <MaxsulotSotish keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/ByurtmaBerish`}>
                  <ByurtmaBerish keyword={key} search={search} />
                </Route>
                <Route path={`${path}/Fakturayaratish`}>
                  <Fakturayaratish keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/FakturaTarixi`}>
                  <FakturaTarixi keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/MaxsulotQabuli`}>
                  <MaxsulotQabuli keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/QaytaIshlash`}>
                  <QaytaIshlash keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/FakturalarTarixi`}>
                  <FakturalarTarixi keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/SotuvHisobi`}>
                  <SotuvHisobi keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/Boshliqqabuyurtma`}>
                  <Boshliqqabuyurtma keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/Buyurtmatarixi`}>
                  <Buyurtmatarixi keyword={key} search={search} url={path} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
