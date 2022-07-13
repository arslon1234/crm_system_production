import React, { useState } from "react";
import DataPick from "./data_pick";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Chiqimlar = () => {
  const [data, setData] = useState([]);
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
                <p> Summa</p>
              </th>
              <th>
                <p> Izoh</p>
              </th>
              <th>
                <p> Oxirgi kiritilgan kun</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dat, id) => {
              if (this.props.search === false) {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <th>{dat.expense.name}</th>
                    <th>{dat.cost.split(".")[0]}</th>
                    <th>{dat.status}</th>
                    <th>{dateFormat(dat.created_date, "dd/mm/yyyy")}</th>
                  </tr>
                );
              } else {
                if (
                  dat.expense.name
                    .toUpperCase()
                    .includes(this.props.keyword.toUpperCase())
                ) {
                  return (
                    <tr>
                      <th>{id + 1}</th>
                      <th>{dat.expense.name}</th>
                      <th>{dat.cost.split(".")[0]}</th>
                      <th>{dat.status}</th>
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

export default Chiqimlar;
