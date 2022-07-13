import React, { useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Kletlar = () => {
  const [data, setData] = useState([]);
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
                <p> Firma nomi</p>
              </th>
              <th>
                <p> Rahbar ismi familyasi</p>
              </th>
              <th>
                <p> Telefon raqami</p>
              </th>
              <th>
                <p> Kompaniya manzili</p>
              </th>
              <th>
                <p> XR</p>
              </th>
              <th>
                <p> MFO</p>
              </th>
              <th>
                <p> INN</p>
              </th>
              <th>
                <p> Firma qo'shilgan sana</p>
              </th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default Kletlar;
