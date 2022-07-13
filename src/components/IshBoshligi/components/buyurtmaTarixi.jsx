import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../../api/api";
import DataPick from "./data_pick";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SkeletonLoader from "../../loader/skeleton-loader";
function BuyurtmaTarixi() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    setLoading(true)
    api.get("sales/production-orders/?status=Tayyor").then((res) => {
      if (mounted) {
        setLoading(false)
        setData(res);
        console.log(res, "resultss");
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
        .get("sales/production-orders/?status=Tayyor", {
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
                <p>№</p>
              </th>
              <th>
                <p> Buyurtma nomi</p>
              </th>
              <th>
                <p> Mahsulot miqdori</p>
              </th>
              <th>
                <p>Muddati</p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Sana </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data?.results
              ? data.results.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product.title}</td>
                    <td>
                      {item.quantity} {item.product.measurement_unit}
                    </td>
                    <td>{item.deadline}</td>
                    <td>{item.description}</td>
                    <td>{item.created_at}</td>
                  </tr>
                ))
              : ""}
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
}

export default BuyurtmaTarixi;
