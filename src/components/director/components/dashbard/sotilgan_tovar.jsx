import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DataPick from "../data_pick";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Sotilgantovar = ({ url }) => {
  // state = {
  //   data: [],
  // };

  // componentDidMount() {
  //   axios
  //     .get("/api/v1/biscuit/company/sale/", {
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
  // const { url } = this.props;
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
        <NavLink activeClassName="act" to={`${url}/sotilgan`}>
          Sotilgan
        </NavLink>
        <NavLink activeClassName="act" to={`${url}/ishlabchiqarilgan`}>
          Ishlab chiqarilgan
        </NavLink>
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
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Narxi</p>
              </th>
              <th>
                <p> Umumiy narxi</p>
              </th>
              <th>
                <p> Firma nomi</p>
              </th>
              <th>
                <p> Sana</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.data.map((dat, id) => {
                if (this.props.search === false) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>
                        <Link exact to={`/sotilgan` + dat.biscuit.id}>
                          {" "}
                          {dat.biscuit.name}
                        </Link>
                      </th>
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
                } else {
                  if (
                    dat.biscuit.name
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>
                          <Link exact to={`/sotilgan/` + dat.biscuit.id}>
                            {" "}
                            {dat.biscuit.name}
                          </Link>
                        </th>
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
                  }
                }
              })} */}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default Sotilgantovar;
