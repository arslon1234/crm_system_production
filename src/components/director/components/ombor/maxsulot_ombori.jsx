import React, { useState } from "react";
import DataPick from "../data_pick";
import axios from "axios";
import dateFormat from "dateformat";

const MaxsulotOmbori = () => {
  // state = {
  //   data: [],
  // };
  const [data, setData] = useState([]);

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
  // render() {
  return (
    <React.Fragment>
      <DataPick />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Nomi</p>
              </th>
              <th>
                <p> Og’rligi</p>
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
                <p> O’rtacha narxi</p>
              </th>
              <th>
                <p> Pul birligi</p>
              </th>
              <th>
                <p> Izoh</p>
              </th>
              <th>
                <p> Sana</p>
              </th>
              <th>
                <p> Vaqt</p>
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
                    <th>{dat.quantity.split(".")[0]} kg</th>
                    <th>{dat.biscuit.unit_of_measurement}</th>
                    <th>{dat.biscuit.price.split(".")[0]}</th>
                    <th>{dat.total_price.split(".")[0]}</th>
                    <th>{dat.biscuit.price.split(".")[0]}</th>
                    <th>{dat.currency}</th>
                    <th>{dat.comment}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    <th>{dateFormat(dat.modified_date, "HH:MM")}</th>
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
                      <th>{dat.quantity.split(".")[0]} kg</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.total_price.split(".")[0]}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dat.comment}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dateFormat(dat.modified_date, "HH:MM")}</th>
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

export default MaxsulotOmbori;
