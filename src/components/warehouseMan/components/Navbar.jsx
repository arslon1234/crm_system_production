import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import tekstil from "../../Icons/tekstil3.png"
//Import Imges
import logo from "../../Icons/Logo.svg";
import Icon1 from "../../Icons/icon1.svg";
import Icon2 from "../../Icons/icon2.svg";
import Icon4 from "../../Icons/pie.svg";
import Icon3 from "../../Icons/icon3.svg";
import arrow from "../../Icons/arrow.svg";


const Navbar = ({handlemenu, url}) => {
    const [nav_one, setNav_one] = useState(false);
    const [nav_two, setNav_two] = useState(false);
    const [nav_three, setNav_three] = useState(false);
    const [nav_four, setNav_four] = useState(false);
    const [nav_five, setNav_five] = useState(false);
    const [nav_six, setNav_six] = useState(false);
    const handletoggle1 = () => {
        setNav_one(prev => !prev);
        setNav_two(false);
        setNav_three(false);
        setNav_four(false);
        setNav_five(false);
        setNav_six(false);
    };
    const handletoggle2 = () => {
        setNav_one(false);
        setNav_two(prev => !prev);
        setNav_three(false);
        setNav_four(false);
        setNav_five(false);
        setNav_six(false);
    };
    const handletoggle3 = () => {
        setNav_one(false);
        setNav_two(false);
        setNav_three(prev => !prev);
        setNav_four(false);
        setNav_five(false);
        setNav_six(false);
    };
    const handletoggle4 = () => {
        setNav_one(false);
        setNav_two(false);
        setNav_three(false);
        setNav_four(prev => !prev);
        setNav_five(false);
        setNav_six(false);

    };
    const handletoggle5 = () => {
        setNav_one(false);
        setNav_two(false);
        setNav_three(false);
        setNav_four(false);
        setNav_five(prev => !prev);
        setNav_six(false);
    };
    const handletoggle6 = () => {
        setNav_one(false);
        setNav_two(false);
        setNav_three(false);
        setNav_four(false);
        setNav_five(false);
        setNav_six(prev => !prev);

    };
    const handletoggleclose = () => {
        setNav_one(false);
        setNav_two(false);
        setNav_three(false);
        setNav_four(false);
        setNav_five(false);
    };

    return (
        <React.Fragment>
            <div className="navbar_asos">
                <div className="nav_fix">
                <img  className="logo" src={tekstil} alt="" />
                    <nav>
                        <div className="div_a">
                            <div className={nav_one ? "link_active6 alar" : "alar"}>
                                <div onClick={handletoggle1} className="toggle_link">
                                    <div>
                                        <img src={Icon1} alt=""/>
                                        Mahsulotlar ro`yhati{" "}
                                    </div>

                                    <button className={nav_one ? "btn1 btnlar" : "btnlar"}>
                                        <img className="arrow" src={arrow} alt=""/>
                                    </button>
                                </div>
                                <div className="toggle">
                                    <NavLink
                                        activeClassName="navbar_active4"
                                        exact
                                        to={`${url}/mahsulotlar-ro'yhati/homashyo`}
                                        onClick={handlemenu}
                                    >
                                        Ombor qoldiq
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="div_a">
                            <div className={nav_two ? "link_active2 alar" : "alar"}>
                                <div onClick={handletoggle2} className="toggle_link">
                                    <div>
                                        <img src={Icon2} alt=""/>
                                        Mahsulot qabuli{" "}
                                    </div>

                                    <button className={nav_two ? "btn1 btnlar" : "btnlar"}>
                                        <img className="arrow" src={arrow} alt=""/>
                                    </button>
                                </div>
                                <div className="toggle">
                                    <NavLink
                                        activeClassName="navbar_active2 "
                                        exact
                                        to={`${url}/qabul/fakturalar`}
                                        onClick={handlemenu}
                                    >
                                        Fakturalar
                                    </NavLink>
                                    <NavLink
                                        activeClassName="navbar_active2 "
                                        to={`${url}/qabul/fakturalar-tarixi`}
                                        onClick={handlemenu}
                                    >
                                        Fakturalar tarixi
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="div_a">
                            <div className={nav_three ? "link_active2 alar" : "alar"}>
                                <div onClick={handletoggle3} className="toggle_link">
                                    <div>
                                        <img src={Icon2} alt=""/>
                                        Yuk chiqarish{" "}
                                    </div>

                                    <button className={nav_three ? "btn1 btnlar" : "btnlar"}>
                                        <img className="arrow" src={arrow} alt=""/>
                                    </button>
                                </div>
                                <div className="toggle">
                                    <NavLink
                                        activeClassName="navbar_active3"
                                        exact
                                        to={`${url}/chiqarish/fakturalar`}
                                        onClick={handlemenu}
                                    >
                                        Fakturalar
                                    </NavLink>
                                    <NavLink
                                        activeClassName="navbar_active3"
                                        to={`${url}/chiqarish/fakturalar-tarixi`}
                                        onClick={handlemenu}
                                    >
                                        Fakturalar tarixi
                                    </NavLink>
                                    <div style={{display: "none"}}>
                                        <NavLink
                                            activeClassName="navbar_active3"
                                            exact
                                            to={`${url}/chiqarish/faktura`}
                                        >
                                            FacturaId
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <NavLink
                            className="a_lar"
                            onClick={handlemenu}
                            activeClassName="navbar_active4"
                            to={`${url}/mahsulotlar-ombori/homashyo`}
                        >
                            <img src={Icon3} alt=""/> Ombor qoldiq <button></button>
                        </NavLink> */}
                        <div className="div_a">
                            <div className={nav_five ? "link_active2 alar" : "alar"}>
                                <div onClick={handletoggle5} className="toggle_link">
                                    <div>
                                        <img src={Icon4} alt=""/>
                                        Qayta ishlash{" "}
                                    </div>

                                    <button className={nav_five ? "btn1 btnlar" : "btnlar"}>
                                        <img className="arrow" src={arrow} alt=""/>
                                    </button>
                                </div>
                                <div className="toggle">
                                    <NavLink
                                        activeClassName="navbar_active5"
                                        exact
                                        to={`${url}/mahsulot-qabuli`}
                                        onClick={handlemenu}
                                    >
                                        Mahsulot qabuli
                                    </NavLink>
                                    <NavLink
                                        activeClassName="navbar_active5"
                                        to={`${url}/qayta-ishlash`}
                                        onClick={handlemenu}
                                    >
                                        Yaroqsiz va Qayta ishlash
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="div_a">
                            <div className={nav_six ? "link_active6 alar" : "alar"}>
                                <div onClick={handletoggle6} className="toggle_link">
                                    <div>
                                        <img src={Icon3} alt=""/>
                                        Taminot{" "}
                                    </div>

                                    <button className={nav_six ? "btn1 btnlar" : "btnlar"}>
                                        <img className="arrow" src={arrow} alt=""/>
                                    </button>
                                </div>
                                <div className="toggle">
                                    <NavLink
                                        activeClassName="navbar_active6"
                                        to={`${url}/taminotchilar`}
                                        onClick={handlemenu}
                                    >
                                        Taminotchilar
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        {/*<NavLink*/}
                        {/*  className="a_lar"*/}
                        {/*  onClick={handletoggleclose}*/}
                        {/*  activeClassName="navbar_active"*/}
                        {/*  to={`${url}/tayyormaxsulotlar`}*/}
                        {/*>*/}
                        {/*  <img src={Icon2} alt="" /> Tayyor maxsulot ombori<button></button>*/}
                        {/*</NavLink>*/}
                        {/*<NavLink*/}
                        {/*  className="a_lar"*/}
                        {/*  onClick={handletoggleclose}*/}
                        {/*  activeClassName="navbar_active"*/}
                        {/*  to={`${url}/drabilka`}*/}
                        {/*>*/}
                        {/*  <img src={Icon2} alt="" />*/}
                        {/*  Drabilka ombori<button></button>*/}
                        {/*</NavLink>*/}
                        {/*<NavLink*/}
                        {/*  className="a_lar"*/}
                        {/*  onClick={handletoggleclose}*/}
                        {/*  activeClassName="navbar_active"*/}
                        {/*  to={`${url}/vazvrat`}*/}
                        {/*>*/}
                        {/*  <img src={Icon3} alt="" />*/}
                        {/*  Vozvratlar ombori<button></button>*/}
                        {/*</NavLink>*/}
                    </nav>
                </div>
            </div>
            <div className="toggle_close" onClick={handlemenu}></div>
        </React.Fragment>
    );
};

export default Navbar;