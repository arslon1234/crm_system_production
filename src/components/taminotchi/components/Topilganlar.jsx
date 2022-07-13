import React, { useCallback, useEffect, useState, useRef } from "react";
import DataPick from "./data_pick";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {useHistory } from "react-router-dom";
import SkeletonLoader from "../../loader/skeleton-loader";
export default function Topilganlar({ url, handlemenu, keyword }) {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get("storage/invoices/?type=Kirish&found_Status=Full&group=Order", {})
      .then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res);
          console.log(res, "data");
        }
      });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/invoices/?type=Kirish&found_Status=Full&group=Order", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api
        .get("storage/invoices/?type=Kirish&found_Status=Full&group=Order")
        .then((res) => {
          if (mounted) {
            setData(res);
          }
        });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const filterByDateCLick = useCallback(() => {
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + 1;
    const yearEnd = endDate.getFullYear();
    if (startDate && endDate) {
      api
        .get("storage/invoices/?type=Kirish&found_Status=Full&group=Order", {
          params: {
            type: "Kirish",
            group: "Order",
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => setData(res));
    }
  }, [startDate, endDate]);
  return (
    <>
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
              <th style={{ textAlign: "start" }}>
                <p>Buyurtmalar</p>
              </th>
              <th>
                <p>Summasi</p>
              </th>
              <th>
                <p>Muddati</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data.results
              ? data.results.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "start", width: "130px" }}>
                        <div
                          onClick={() =>
                            history.replace(
                              `${url}/TopilganlarId/${item.id}/${item.title}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {item.title}
                        </div>
                      </td>
                      <td>
                        {" "}
                        {item.summa.map((x) => {
                          return <span>{x["so'm"]}</span>;
                        })}
                      </td>
                      <td>{item.created_at}</td>
                    </tr>
                  );
                })
              : ""}
            {loading && (
              <>
                <SkeletonLoader count={4} />
                <SkeletonLoader count={4} />
                <SkeletonLoader count={4} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
