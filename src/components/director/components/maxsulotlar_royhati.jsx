import React, { useState } from "react";
import DataPick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const MaxsulotlarRoyhati = () => {
  // state = {
  //   data: [],
  // };
  const [data, setData] = useState([]);
  // componentDidMount() {
  //   axios
  //     .get("/api/v1/biscuit/default/cost/", {
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
  return (
    <React.Fragment>
      <div className="data_excel">
        <DataPick />
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
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
                <p> Tan narxi</p>
              </th>
              <th>
                <p> Sotish narxi </p>
              </th>
              <th>
                <p> Pul birligi</p>
              </th>
              <th>
                <p> O'zgartirilgan kuni</p>
              </th>
              <th>
                <p> O'zgartirilgan vaqti</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.biscuit.name}</th>
                    <th>{dat.biscuit.price.split(".")[0]}</th>
                    <th>{dat.price.split(".")[0]}</th>
                    <th>{dat.currency}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    <th>{dateFormat(dat.created_date, "HH:MM")}</th>
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
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.price.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dateFormat(dat.created_date, "HH:MM")}</th>
                    </tr>
                  );
                }
              }
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default MaxsulotlarRoyhati;
