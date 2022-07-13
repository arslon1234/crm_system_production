import React, {useCallback, useState} from "react";
import Navbar from "./components/Navbar";
import Daromad from "./components/dashbard/daromad";
import PulStatistikasi from "./components/dashbard/pul_stat";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomashyoOmbori from "./components/ombor/homashyo_ombori";
import SotilgantovarSingle from "./components/dashbard/sotilgan_tovar_sinle";
import OmborStatistics from "./components/ombor/OmborStatistics";

// Image import
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import MahsulotlarNarxi from "./components/MahsulotlarNarxi";
import YaroqsizvaQayta from "./components/QaytaIshlashVaYaroqsiz";
import Expenses from "./components/Harajatlar";
import HodimlarBulimi from "./components/HodimlarBulimi";
import HodimlarBulimId from "./components/HodimlarBulimId";
import BuyurtmaTarixi from "./components/BuyurtmalarTarixi";
import KunlikHisobot from "./components/KunlikHisobot";
import {useHistory} from "react-router-dom";
import Cookies from "universal-cookie";
import MijozlarTahlili from "./components/MijozlarTahlili";
import MahsulotlarTahlili from "./components/MahsulotTahlili";
import HodimlarRuyxati from "./components/HodimlarBulimi";
import HodimlarOyligi from "./components/HodimlarBulimId";
import MijozlarId from "./components/MijozlarId";
import FakturaId from "./components/FakturaId";
import FakturaId2 from "./components/FakturaId2";

export default function Director(props) {
  const [menu , setMenu] = useState(false);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(true);
  const [search_btn, setSearch_btn] = useState(false);
  const history = useHistory();
  const [logouts, setLogouts] = useState(false)
  const cookies = new Cookies();

  const handleSearch = () => {
    key.length > 0 && setSearch(true)
  };

  const handleMenu = () => {
    setMenu(prev => !prev)
  };

  const handleSearch_btn = () => {
    setSearch_btn(prev => !prev)
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
              <Route exact to={path}>
                <Navbar url={path} handlemenu={handleMenu} />
              </Route>
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
                  <div className={search_btn === false ? "search" : "search searching"}>
                  {
                   search_btn ?
                   <i onClick={()=>setSearch_btn(prev => !prev)} class="fa-solid fa-xmark" style={{color:"#757575", marginLeft:"10px"}}></i>:""
                  }
                    <input
                        onChange={(e) => setKey(e.target.value)}
                        type="search" name="" placeholder="Izlash..." id=""
                    />

                  </div>
                  <div>
                    <button onClick={handleSearch_btn} className="search_btn">
                      <img src={searchIcon} alt="" />
                    </button>
                    <a className="user_pic" onClick={(e) => setLogouts(prev=>(!prev))}>
                      <img src={user_pic} alt="" />
                    </a>
                    {/* <a className="user_pic" onClick={(e) => {logout() ; e.preventDefault()}}> */}
                  </div>
                </div>
              </div>
              <div className="switchs">
                <Switch>
                  <Route exact path={`${path}/dashboard`}>
                    <PulStatistikasi  keyword={key}
                        search={search}   url={path} />
                  </Route>
                  <Route path={`${path}/ombor-qoldiq`}>
                    <OmborStatistics
                        keyword={key}
                        search={search}
                    />
                  </Route>
                  <Route path={`${path}/KunlikHisobot`}>
                    <KunlikHisobot
                        keyword={key}
                        search={search}
                    />
                  </Route>
                  <Route path={`${path}/MijozlarTahlili`}>
                    <MijozlarTahlili
                        keyword={key}
                        search={search}
                    />
                  </Route>
                  <Route path={`${path}/MahsulotlarTahlili`}>
                    <MahsulotlarTahlili
                        keyword={key}
                        search={search}
                    />
                  </Route>
                  <Route path={`${path}/buyurtmalar`}>
                    <Daromad
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/buyurtmalarTarixi`}>
                    <BuyurtmaTarixi
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/mahlsulot-narxlari`}>
                    <MahsulotlarNarxi
                        keyword={key}
                        search={search}
                    />
                  </Route>
                  <Route path={`${path}/yaroqsiz-va-qayta-ishlash`}>
                    <YaroqsizvaQayta
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route exact path={`/sotilgan/:id`} component={SotilgantovarSingle }/>
                  <Route path={`${path}/harajatlar`}>
                    <Expenses
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/HodimlarRuyxati`}>
                    <HodimlarRuyxati
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/HodimlarOyligi`}>
                    <HodimlarOyligi
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/klientroyhati`}>
                    <HomashyoOmbori
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/MijozlarId`}>
                    <MijozlarId
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/FakturaId`}>
                    <FakturaId
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/FakturaId2`}>
                    <FakturaId2
                        keyword={key}
                        search={search}
                        url={path}
                    />
                  </Route>
                  <Route path={`${path}/klientroyhati`}>
                    <HomashyoOmbori
                        keyword={key}
                        search={search}
                        url={path}
                    />
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