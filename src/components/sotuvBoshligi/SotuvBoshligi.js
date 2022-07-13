import React, {useCallback, useState} from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Image import
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import MijozlarRuyxati from "./components/MijozlarRuyxati";
import OmborQoldiq from "./components/OmborQoldiq";
import MaxsulotSotish from "./components/MaxsulotSotish";
import FakturaTarixi from "./components/FakturaTarixi";
import FakturaYaratish from "./components/FakturaYaratish";
import FakturalarTarixi from "./components/FakturalarTarixi";
import SotuvHisobi from "./components/SotuvHisobi";
import Boshliqqabuyurtma from "./components/Boshliqqabuyurtma";
import Buyurtmatarixi from "./components/Buyurtmatarixi";
import SavdoHisoboti from "./components/SavdoHisoboti";
import MaxsulotSotishId from "./components/MaxsulotSotishId";
import FacturaTarixId from "./components/FacturaTarixiId";
import MenedjerId from "./components/MenedjerId";
import Cookies from "universal-cookie";
import {useHistory} from "react-router-dom";
import MijozlarTahlili from "./components/MijozlarTahlili";
import MahsulotlarTahlili from "../director/components/MahsulotTahlili";
import MijozlarId from "./components/MijozlarId";

export default function SotuvBoshligi(props) {
  const [menu, setMenu] = useState(false);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(true);
  const [search_btn, setSearch_btn] = useState(false);
  const cookies = new Cookies();
  const [logouts, setLogouts] = useState(false)
  const role = cookies.get("role");
  const history = useHistory();

  const handleSearch = () => {
    key.length > 0 && setSearch(true);
  };

  const handleMenu = () => {
    setMenu((prev) => !prev);
    setKey("")
  };

  const handleSearch_btn = () => {
    setSearch_btn((prev) => !prev);
  };
  const logout = useCallback(() => {
    history.replace("/");
    cookies.remove("role", {path: "/"});
    cookies.remove("access", {path: "/"});
    cookies.remove("refresh", {path: "/"});
  }, [history, cookies]);
  const { path } = props.match;
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="asos container">
          <div className={menu ? "toggle1 asos_1" : "asos_1"}>
            <Navbar url={path} handlemenu={handleMenu} setKeyword={setKey} />
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
                    value={key}
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
                  <a className="user_pic" onClick={(e) => setLogouts(prev=>(!prev))}>
                    <img src={user_pic} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="switchs">
              <Switch>
                <Route path={`${path}/MijozlarRuyxati`}>
                  <MijozlarRuyxati keyword={key} setKeyword={setKey} search={search} url={path} />
                </Route>
                <Route path={`${path}/MijozlarId`}>
                  <MijozlarId keyword={key} setKeyword={setKey} search={search} url={path} />
                </Route>
                <Route path={`${path}/OmborQoldiq`}>
                  <OmborQoldiq keyword={key} search={search} />
                </Route>
                <Route path={`${path}/MaxsulotSotish`}>
                  <MaxsulotSotish keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/Faktura-yaratish`}>
                  <MaxsulotSotishId url={path} keyword={key}/>
                </Route>
                <Route path={`${path}/FakturaTarixi`}>
                  <FakturaTarixi keyword={key} search={search} />
                </Route>
                <Route path={`${path}/MijozlarTahlili`}>
                  <MijozlarTahlili keyword={key} search={search} />
                </Route>
                <Route path={`${path}/MahsulotlarTahlili`}>
                  <MahsulotlarTahlili keyword={key} search={search} />
                </Route>
                <Route path={`${path}/FakturaYaratish`}>
                  <FakturaYaratish keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/FakturalarTarixi`}>
                  <FakturalarTarixi keyword={key} search={search} url={path} />
                </Route>
                <Route path={`${path}/Faktura-tarixi`}>
                  <FacturaTarixId url={path} keyword={key} />
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
                <Route path={`${path}/SavdoHisoboti`}>
                  <SavdoHisoboti keyword={key} search={search} url={path} />
                </Route>
                {role === "Sotuv boshlig'i" &&  <Route path={`${path}/menedjer`}>
                  <MenedjerId keyword={key} search={search} url={path} />
                </Route>}
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
