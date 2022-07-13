import React, { useState } from "react";
import DataPick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";

const SotuvHisobi = () => {
  const [data, setData] = useState([]);
  // componentDidMount() {
  //   axios
  //     .get("/api/v1/biscuit/saled/filter/", {
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
      <DataPick />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p>Mahsulot nomi</p>
              </th>
              <th>
                <p>Miqdori</p>
              </th>
              <th>
                <p>O’lchov birligi</p>
              </th>
              <th>
                <p>Umumiy summa</p>
              </th>
              <th>
                <p>Valyuta</p>
              </th>
              <th>
                <p>Sana</p>
              </th>
              <th>
                <p>Izoh</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.data.map((dat, id) => {
                if (this.props.search === false) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.client.company}</th>
                      <th>{dat.biscuit.name}</th>
                      <th>
                        {dat.quantity.split(".")[0]}{" "}
                        {dat.biscuit.unit_of_measurement}
                      </th>
                      <th>
                        {dat.biscuit.price.split(".")[0]} {dat.currency}
                      </th>
                      <th>
                        {dat.total_price.split(".")[0]} {dat.currency}
                      </th>
                      <th>{dat.comment}</th>
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
                        <th>{dat.client.company}</th>
                        <th>{dat.biscuit.name}</th>
                        <th>
                          {dat.quantity.split(".")[0]}{" "}
                          {dat.biscuit.unit_of_measurement}
                        </th>
                        <th>
                          {dat.biscuit.price.split(".")[0]} {dat.currency}
                        </th>
                        <th>
                          {dat.total_price.split(".")[0]} {dat.currency}
                        </th>
                        <th>{dat.comment}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      </tr>
                    );
                  }
                  if (
                    dat.client.company
                      .toUpperCase()
                      .includes(this.props.keyword.toUpperCase())
                  ) {
                    return (
                      <tr>
                        <th>{id + 1}</th>
                        <th>{dat.client.company}</th>
                        <th>{dat.biscuit.name}</th>
                        <th>
                          {dat.quantity.split(".")[0]}{" "}
                          {dat.biscuit.unit_of_measurement}
                        </th>
                        <th>
                          {dat.biscuit.price.split(".")[0]} {dat.currency}
                        </th>
                        <th>
                          {dat.total_price.split(".")[0]} {dat.currency}
                        </th>
                        <th>{dat.comment}</th>
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

export default SotuvHisobi;
