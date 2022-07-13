import React, { useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";

function BuyurtmaTarixi2() {
  const [data, setData] = useState([]);

  return (
    <React.Fragment>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Buyurtma nomi</p>
              </th>
              <th>
                <p> Mahsulot miqdori</p>
              </th>
              <th>
                <p> Izoh </p>
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
                    <th>{dat.quantity.split(".")[0]} </th>
                    <th>{dat.biscuit.unit_of_measurement}</th>
                    <th>
                      {dat.status === "Tayyorlandi" ? "Tayyorlandi" : null}
                      {dat.status === "Qabul qilindi" ? "Qabul qilindi" : null}
                      {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
                    </th>
                    <th>{dat.comment}</th>
                    <th>{dateFormat(dat.end_date, "dd/mm/yyyy")}</th>
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
                      <th>{dat.quantity.split(".")[0]} </th>
                      <th>{dat.biscuit.unit_of_measurement}</th>
                      <th>
                        {dat.status === "Tayyorlandi" ? "Tayyorlandi" : null}
                        {dat.status === "Qabul qilindi"
                          ? "Qabul qilindi"
                          : null}
                        {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
                      </th>
                      <th>{dat.comment}</th>
                      <th>{dateFormat(dat.end_date, "dd/mm/yyyy")}</th>
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
}

export default BuyurtmaTarixi2;
