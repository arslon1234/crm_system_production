import React, { useState, useEffect, useCallback } from "react";
import DataPick from "./data_pick";
import { api } from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const ReajalarTarixi = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    setLoading(true)
    api.get("texnolog/plans/?saved=True").then((res) => {
      if (mounted) {
        setLoading(false)
        setData(res);
        console.log(res, "res");
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  const filterByDateCLick = useCallback(() => {
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + 1;
    const yearEnd = endDate.getFullYear();
    if (startDate && endDate) {
      api
        .get("texnolog/plans/?saved=True", {
          params: {
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => setData(res));
    }
  }, [startDate, endDate]);
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <DataPick
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          filterByDateClick={filterByDateCLick}
        />
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
                <p> № </p>
              </th>
              <th style={{textAlign:"start"}}>
                <p>Maxsulot nomi</p>
              </th>
              <th>
                <p> Miqdori</p>
              </th>
              <th>
                <p> O`lchov birligi </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Masul shaxs </p>
              </th>
              <th>
                <p> Sana </p>
              </th>
              <th>
                <p> Status </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&  data.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{textAlign:"start", width:"130px"}}>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.measurement_unit}</td>
                <td style={{width:"130px"}}>{item.description}</td>
                <td>{item.to_who}</td>
                <td>{item.created_at}</td>
                <td
                  style={
                    item.status === "Jarayonda"
                      ? { color: "#2597D6" }
                      : { color: "#FE8950" }
                  }
                >
                  {item.status}
                </td>
              </tr>
            ))}
            {loading && (
              <>
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default ReajalarTarixi;
