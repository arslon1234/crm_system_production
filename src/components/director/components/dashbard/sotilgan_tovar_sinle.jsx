import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DataPick from "../data_pick";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const SotilgantovarSingle = () => {
  // state = {
  //   data: [],
  //   id: this.props.match.params.id,
  // };

  // componentDidMount() {
  //   axios
  //     .get("/api/v1/biscuit/company/sale/" + this.state.id, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({ data });
  //     });
  // }
  // render(props) {
  // console.log(this.state.id);
  return (
    <React.Fragment>
      <div className="data_excel">
        <div className="tovar_switch">
          <DataPick />
        </div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
      </div>
      <div className="links">
        <NavLink activeClassName="act" to="/director/sotilgan">
          Sotilgan
        </NavLink>
        <p>{">"}</p>
        <p className="act">name</p>
      </div>
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Nomi</p>
              </th>
              <th>
                <p> Mijoz</p>
              </th>
              <th>
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Narxi</p>
              </th>
              <th>
                <p> Sotuv miqdori</p>
              </th>
              <th>
                <p> Umumiy summasi</p>
              </th>
              <th>
                <p> Sana</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.data.map((dat, id) => {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>
                        {dat.biscuit.price.split(".")[0]}{" "}
                        {dat.currency === "so'm" ? "so'm" : null}
                      </th>
                      <th>
                        {dat.total_price.split(".")[0]}{" "}
                        {dat.currency === "so'm" ? "so'm" : null}
                      </th>
                      <th>{dat.client.company}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    </tr>
                  );
              })} */}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default SotilgantovarSingle;
