import React from "react";
import Login from "./components/login/login";
import Manager from "./components/Manager/manager";
import Director from "./components/director/director";
import Technolog from "./components/technolog/technolog";
import IshBoshligi from "./components/IshBoshligi/IshBoshligi";
import WarehouseMan from "./components/warehouseMan/warehouseMan";
import SifatNazorati from "./components/sifatNazorati/SifatNazorati";
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import BusinessManager from "./components/businessManager/businessManager";
import Cookies from "universal-cookie";

//Import css
import "./components/css/style.css";
import "./components/css/navbar.css";
import SotuvBoshligi from "./components/sotuvBoshligi/SotuvBoshligi";
import Taminotchi from "./components/taminotchi/Taminotchi";
import Moliya from "./components/Moliya/Moliya";
function App() {
    const cookies = new Cookies();
    const role = cookies.get("role");
    return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/manager" component={Manager}/>
                    {role === "Direktor" && <Route path="/director" component={Director}/>}
                    {/* <Route path="/technolog" component={Technolog}/> */}
                    <Route path="/ishBoshligi" component={IshBoshligi}/>
                    {role === "Omborchi" && <Route path="/warehouseMan" component={WarehouseMan}/>}
                    {/* <Route path="/sifatNazorati" component={SifatNazorati}/> */}
                    <Route path="/businessManager" component={BusinessManager}/>
                    {role === "Sotuv boshlig'i" && <Route path="/sotuvboshligi" component={SotuvBoshligi}/>}
                    {role === "Sotuv meneger" && <Route path="/sotuv-meneger" component={SotuvBoshligi}/>}
                    {role === "Ta'minotchi" && <Route path="/taminotchi" component={Taminotchi}/>}
                    {role === "Kassir" && <Route path="/moliya" component={Moliya}/>}
                    {role === "Texnolog" && <Route path="/technolog" component={Technolog}/>}
                    {role === "Nazoratchi" && <Route path="/sifatNazorati" component={SifatNazorati}/>}
                    <Route render={() => <h1 style={{
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        height: "100vh",
                        justifyContent: "center"
                    }}>Yuklanmoqda....</h1>}/>
                    {role === "Direktor" &&
                    <Redirect to="/director/dashboard" from="/(sotuvboshligi|warehouseMan|sotuv-meneger|taminotchi)/"/>}
                    {role === "Sotuv boshlig'i" &&
                    <Redirect to="/sotuvboshligi/MijozlarRuyxati" from="/(director|warehouseMan|sotuv-meneger|taminotchi)/"/>}
                    {role === "Omborchi" &&
                    <Redirect to="/warehouseMan/mahsulotlar-ro'yhati/homashyo"
                              from="/(sotuvboshligi|director|sotuv-meneger
                              taminotchi)/"/>}
                    {role === "Sotuv meneger" &&
                    <Redirect to="/sotuv-meneger/MijozlarRuyxati" from="/(warehouseMan|director|sotuvboshligi|taminotchi)/"/>}
                    {role === "Ta'minotchi" &&
                    <Redirect to="/taminotchi/OmborQoldiq" from="/(warehouseMan|director|sotuvboshligi|sotuv-meneger)/"/>}
                    {role === "Kassir" &&
                    <Redirect to="/moliya/dashboard" from="/(warehouseMan|director|sotuvboshligi|sotuv-meneger)/"/>}
                    {role === "Texnolog" &&
                    <Redirect to="/technolog/retsept" from="/(warehouseMan|director|sotuvboshligi|sotuv-meneger)/"/>}
                    {role === "Nazoratchi" &&
                    <Redirect to="/sifatNazorati/yaroqsiz" from="/(warehouseMan|director|sotuvboshligi|sotuv-meneger)/"/>}
                </Switch>
            </Router>
    );
}

export default App;
