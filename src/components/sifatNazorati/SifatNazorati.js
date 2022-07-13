import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Yaroqsiz from "./components/Yaroqsiz";
import Baxolash from "./components/Baxolash";
import Cookies from "universal-cookie";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useHistory} from "react-router-dom";
//Import Images
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import MaxsulotQabuli from "./components/MaxsulotQabuli";

export default function SifatNazorati(props) {
  const [menu, setMenu] = useState(false);
  const [key, setKey] = useState("");
  const [logouts, setLogouts] = useState(false)
  const cookies = new Cookies();
  const [search, setSearch] = useState(true);
  const [search_btn, setSearch_btn] = useState(false);
  const history = useHistory();
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
    cookies.remove("role" , {path: "/"});
    cookies.remove("access", {path: "/"});
    cookies.remove("refresh", {path: "/"});
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
                  <a className="user_pic" onClick={(e) => setLogouts(prev=>(!prev))}>
                      <img src={user_pic} alt="" />
                    </a>
                </div>
              </div>
            </div>
            <div className="switchs">
              <Switch>
                <Route exact path={`${path}/yaroqsiz`}>
                  <Yaroqsiz keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/maxsulotQabuli`}>
                  <MaxsulotQabuli keyword={key} search={search} />
                </Route>
                <Route exact path={`${path}/baholash`}>
                  <Baxolash keyword={key} search={search} />
                </Route>
              </Switch>
            </div>
          </div>
          <div className={logouts ? "logOut" : "d-none"}>
          <span>Login qismiga o'tish</span>
          <span className="logOk"  onClick={(e) => {logout() ; e.preventDefault()}}>Ok</span>
        </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
