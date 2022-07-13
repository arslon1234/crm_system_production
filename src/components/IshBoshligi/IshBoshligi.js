import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Rejalar from "./components/rejalar";
import Buyurtma from "./components/buyurtma";
import Hujjatlar from "./components/hujjatlar";
import Takliflar from "./components/takliflar";
import ReajalarTarixi from "./components/rejalartarixi";
import BuyurtmaTarixi from "./components/buyurtmaTarixi";
import HujjatlarTarixi from "./components/hujjatlartarixi";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Image import
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import BuyurtmaTarixi2 from "./components/BuyurtmaTarixi2";
import OmborgaBuyurtma from "./components/OmborgaBuyurtma";
import BuyurtmaYaratish from "./components/BuyurtmaYaratish";

export default function IshBoshligi(props) {
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
                <Route exact path={`${path}/rejalar`}>
                  <Rejalar keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/rejalarhisobi`}>
                  <ReajalarTarixi keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/harajat`}>
                  <Hujjatlar keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/harajattarixi`}>
                  <HujjatlarTarixi keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/buyurtmalar`}>
                  <Buyurtma keyword={key} search={search} url={path} />
                </Route>
                <Route exact path={`${path}/buyurtmalartarixi`}>
                  <BuyurtmaTarixi keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/takliflar`}>
                  <Takliflar keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/BuyurtmaTarixi2`}>
                  <BuyurtmaTarixi2 keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/OmborgaBuyurtma`}>
                  <OmborgaBuyurtma keyword={key} search={search} url={path} />
                </Route>
                <Route exact path={`${path}/BuyurtmaYaratish`}>
                  <BuyurtmaYaratish keyword={key} search={search} url={path} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
