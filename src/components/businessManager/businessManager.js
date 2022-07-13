import React, {useState} from "react";
import Navbar from "./components/navbar";
import Rasxodlar from "./components/rasxodlar";
import Taminotchi from "./components/taminotchi";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function BusinessManager (props) {
  const [menu , setMenu] = useState(false);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState(true);
  const [search_btn, setSearch_btn] = useState(false);

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
  return (
      <React.Fragment>
        <BrowserRouter>
          <div className="asos container">
            <div className={menu ? "toggle1 asos_1" : "asos_1"}>
              <Navbar url={path} handlemenu={handleMenu} />
            </div>
            <div className="asos_2">
              <div className="switchs">
                <Switch>
                  <Route exact path={path}>
                    <Taminotchi
                        handlemenu={handleMenu}
                        handleSearch_btn={handleSearch_btn}
                        search_btn={search_btn}
                    />
                  </Route>
                  <Route path={`${path}/rasxodlar`}>
                    <Rasxodlar
                        handlemenu={handleMenu}
                        handleSearch_btn={handleSearch_btn}
                        search_btn={search_btn}
                    />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>
  );
}