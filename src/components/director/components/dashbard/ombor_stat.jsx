import axios from "axios";
import React, { useState } from "react";
import DataPick from "../data_pick";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const OmborStatistikasi = () => {
  const [data, setData] = useState([]);

  // componentDidMount() {
  //   axios
  //     .get("/api/v1/biscuit/produced/filter/", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       this.setState({ data });
  //     });
  // }
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
                <p> O’lchov birligi</p>
              </th>
              <th>
                <p> Narxi</p>
              </th>
              <th>
                <p> Valyuta</p>
              </th>
              <th>
                <p> Umumiy miqdori</p>
              </th>
              <th>
                <p> Umumiy narxi</p>
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
                      <th>{dat.biscuit.name}</th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
                      <th>{dat.currency}</th>
                      <th>{dat.quantity.split(".")[0]}</th>
                      <th>{dat.biscuit.price.split(".")[0]}</th>
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
                        <th>{dat.biscuit.unit_of_measurement}</th>
                        <th>{dat.biscuit.price.split(".")[0]}</th>
                        <th>{dat.currency}</th>
                        <th>{dat.quantity.split(".")[0]}</th>
                        <th>{dat.biscuit.price.split(".")[0]}</th>
                        <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                      </tr>
                    );
                  }
                }
              })} */}
          </tbody>
        </table>
      </div>
      <div className="paginations"></div>
    </React.Fragment>
  );
};

export default OmborStatistikasi;
