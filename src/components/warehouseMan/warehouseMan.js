import React, {useCallback, useState} from "react";
import Navbar from "./components/Navbar";
import Maxsulotlar from "./components/Maxsulotlar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import searchIcon from "../Icons/search.svg";
import user_pic from "../Icons/user_pic.svg";
import Factura from "./components/Factura";
import FacturaId from "./components/FacturaId";
import FacturaHistory from "./components/FacturaHistory";
import FacturaSend from "./components/FacturaSend";
import FacturaSendHistory from "./components/FacturaSendHistory";
import OmborMaxsulotlar from "./components/OmborMahsulotlar";
import QaytaIshlashReceive from "./components/QaytaIshlashRecieve";
import QaytaIshlashNotValid from "./components/QaytaIshlashNotValid";
import Taminotchi from "./components/Taminotchi";
import FacturaSendId from "./components/FacturaSendId";
import {useHistory} from "react-router-dom";
import Cookies from "universal-cookie";

export default function WarehouseMan(props) {
    const [menu, setMenu] = useState(false);
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
    const {path} = props.match;
    const logout = useCallback(() => {
        history.replace("/");
        cookies.remove("role", {path: "/"});
        cookies.remove("access", {path: "/"});
        cookies.remove("refresh", {path: "/"});
    }, [history, cookies]);
    return (
        <React.Fragment>
            <BrowserRouter>
                <div className="asos container">
                    <div className={menu ? "toggle1 asos_1" : "asos_1"}>
                        <Navbar url={path} handlemenu={handleMenu}/>
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
                                        search_btn === false
                                            ? "search"
                                            : "search searching"
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
                                        <img src={searchIcon} alt=""/>
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch_btn}
                                        className="search_btn"
                                    >
                                        <img src={searchIcon} alt=""/>
                                    </button>
                                    <a className="user_pic" onClick={()=> setLogouts(prev=>(!prev))}>
                                        <img src={user_pic} alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="switchs">
                            <Switch>
                                {/* First-Block */}
                                <Route exact path={`${path}/mahsulotlar-ro'yhati/homashyo`}>
                                    <Maxsulotlar
                                        keyword={key}
                                        search={search}
                                    />
                                </Route>
                                <Route path={`${path}/mahsulotlar-ro'yhati/yarimtayyor`}>
                                    <Maxsulotlar
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/mahsulotlar-ro'yhati/tayyor`}>
                                    <Maxsulotlar
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/mahsulotlar-ro'yhati/inventar`}>
                                    <Maxsulotlar
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/qabul/fakturalar`}>
                                    <Factura
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/qabul/fakturalar-tarixi`}>
                                    <FacturaHistory
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/qabul/faktura`}>
                                    <FacturaId
                                        url={path}
                                        keyword={key}
                                    />
                                </Route>
                                <Route path={`${path}/chiqarish/fakturalar`}>
                                    <FacturaSend
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/chiqarish/faktura`}>
                                    <FacturaSendId
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/chiqarish/fakturalar-tarixi`}>
                                    <FacturaSendHistory
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>

                                {/*Fourth Block*/}

                                <Route path={`${path}/mahsulotlar-ombori/homashyo`}>
                                    <OmborMaxsulotlar
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                {/*Fifth Block*/}
                                <Route path={`${path}/mahsulot-qabuli`}>
                                    <QaytaIshlashReceive
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                <Route path={`${path}/qayta-ishlash`}>
                                    <QaytaIshlashNotValid
                                        keyword={key}
                                        search={search}
                                        url={path}
                                    />
                                </Route>
                                {/*Last Block*/}
                                <Route path={`${path}/taminotchilar`}>
                                    <Taminotchi
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

