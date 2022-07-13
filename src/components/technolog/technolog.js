import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Rejalar from "./components/rejalar";
import Cookies from "universal-cookie";
import Hujjatlar from "./components/hujjatlar";
import Takliflar from "./components/takliflar";
import Retseptlar from "./components/retseptlar";
import Qaytaishlash from "./components/qaytaishlash";
import ReajalarTarixi from "./components/rejalartarixi";
import HujjatlarTarixi from "./components/hujjatlartarixi";
import RetseplarSingle from "./components/retseptlar_single";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import QaytaishlashTarixi from "./components/qaytaishlashtarixi";
import { useHistory } from "react-router-dom";
// Image import
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import RejaniYakunlash from "./components/RejaniYakunlash";
import SingleRetsept from "./components/retseptlar_single";
import RetseptQushish from "./components/RetseptQushish";

export default function Technolog(props) {
  const [menu, setMenu] = useState(false);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(true);
  const cookies = new Cookies();
  const history = useHistory();
  const [logouts, setLogouts] = useState(false);
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
  const logout = useCallback(() => {
    history.push("/");
    cookies.remove("role", { path: "/" });
    cookies.remove("access", { path: "/" });
    cookies.remove("refresh", { path: "/" });
  }, [history, cookies]);
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
                  <a
                    className="user_pic"
                    onClick={(e) => setLogouts((prev) => !prev)}
                  >
                    <img src={user_pic} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="switchs">
              <Switch>
                {/* <Route path="/">
                  <Retseptlar keyword={key} search={search} url={path} />
                </Route> */}
                <Route exact path={`${path}/retsept`}>
                  <Retseptlar keyword={key} search={search} url={path} />
                </Route>
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
                <Route exact path={`${path}/qaytaishlash`}>
                  <Qaytaishlash keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/qaytaishlashtarixi`}>
                  <QaytaishlashTarixi keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/takliflar`}>
                  <Takliflar keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/RejaniYakunlash`}>
                  <RejaniYakunlash keyword={key} search={search} />
                </Route>
                <Route path={`${path}/retsep`}>
                  <SingleRetsept keyword={key} search={search} url={path} />
                </Route>
                <Route exact path={`${path}/RetseptQushish`}>
                  <RetseptQushish keyword={key} search={search} url={path} />
                </Route>
              </Switch>
            </div>
          </div>
          <div className={logouts ? "logOut" : "d-none"}>
            <span>Login qismiga o'tish</span>
            <span
              className="logOk"
              onClick={(e) => {
                logout();
                e.preventDefault();
              }}
            >
              Ok
            </span>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
