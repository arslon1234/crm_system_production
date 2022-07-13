import React, { useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Brak = () => {
  // state = {
  //   data: [],
  // };
  const [data, setData] = useState([]);

  // componentDidMount() {
  //   axios
  //     .get("/api/v1/biscuit/biscuits/return/", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({ data });
  //       console.log(data)
  //     });
  // }
  // render() {
  return (
    <React.Fragment>
      <div className="data_excel">
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
                <p> Og’rligi</p>
              </th>
              <th>
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Summa</p>
              </th>
              <th>
                <p> Izoh</p>
              </th>
              <th>
                <p> Sana</p>
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
                    <th>{dat.quantity.split(".")[0]}</th>
                    <th>{dat.biscuit.unit_of_measurement}</th>
                    <th>{dat.biscuit.price.split(".")[0]}</th>
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
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.comment}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
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

export default Brak;
