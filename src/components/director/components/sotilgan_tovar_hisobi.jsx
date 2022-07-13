import React, { useState } from "react";
import DataPick from "./data_pick";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const SotilganTovarHisobi = () => {
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
                <p> Mahsulot nomi</p>
              </th>
              <th>
                <p> O'lchov birligi </p>
              </th>
              <th>
                <p> Miqdori</p>
              </th>
              <th>
                <p> Narxi</p>
              </th>
              <th>
                <p> Valyuta</p>
              </th>
              <th>
                <p> Sana</p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Status Holati </p>
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
                    <th>{dat.biscuit.unit_of_measurement}</th>
                    <th>{dat.quantity.split(".")[0]}</th>
                    <th>{dat.biscuit.price.split(".")[0]}</th>
                    <th>{dat.currency}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                    <th>{dat.comment}</th>
                    <th>
                      {dat.status === "delivered" ? "Etkazib berildi" : null}
                      {dat.status === "take_driver"
                        ? "Haydovchini yuboring"
                        : null}
                      {dat.status === "pending" ? "Yo'lda" : null}
                    </th>
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
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      <th>{dat.comment}</th>
                      <th>
                        {dat.status === "delivered" ? "Etkazib berildi" : null}
                        {dat.status === "take_driver"
                          ? "Haydovchini yuboring"
                          : null}
                        {dat.status === "pending" ? "Yo'lda" : null}
                      </th>
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

export default SotilganTovarHisobi;
