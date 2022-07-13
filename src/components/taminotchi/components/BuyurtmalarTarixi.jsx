import React, { useCallback, useEffect, useState, useRef } from "react";
import DataPick from "./data_pick";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
export default function BuyurtalarTarixi({ keyword }) {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const timer = useRef(null);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("storage/invoices/?type=Kirish&group=Order", {}).then((res) => {
      if (mounted) {
        setLoading(false);
        setData(res);
        console.log(res.results, "history");
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
          .get("storage/invoices/?type=Kirish&group=Order", {
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
      api.get("storage/invoices/?type=Kirish&group=Order").then((res) => {
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
  const filterByDate = useCallback(() => {
    setLoading(true);
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + 1;
    const yearEnd = endDate.getFullYear();
    if (startDate && endDate) {
      api
        .get("storage/invoices/?type=Kirish&group=Order", {
          params: {
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res);
        });
    }
  }, [startDate, endDate]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
        api.get("storage/invoices/?type=Kirish&group=Order", {
            params: {
                from: moment(oneMonthAgo).format("YYYY-MM-DD"),
                to: moment(monthDate).format("YYYY-MM-DD"),
            },
        }).then((res) => {
            if (mounted) {
                setLoading(false);
                setData(res)
            }
        });
    }
    if (filterByPeriod === "week") {
        api.get("storage/invoices/?type=Kirish&group=Order", {
            params: {
                from: moment(oneWeekAgo).format("YYYY-MM-DD"),
                to: moment(monthDate).format("YYYY-MM-DD"),
            },
        }).then((res) => {
            if (mounted) {
                setLoading(false);
                setData(res)
            }
        });
    }
    if (filterByPeriod === "day") {
        api.get("storage/invoices/?type=Kirish&group=Order", {
            params: {
                from: moment(monthDate).format("YYYY-MM-DD"),
                to: moment(monthDate).format("YYYY-MM-DD"),
            },
        }).then((res) => {
            if (mounted) {
                setLoading(false);
                setData(res)
            }
        });
    }
    if (filterByPeriod === "year") {
        api.get("storage/invoices/?type=Kirish&group=Order", {
            params: {
                from: moment(oneYearsAgo).format("YYYY-MM-DD"),
                to: moment(monthDate).format("YYYY-MM-DD"),
            },
        }).then((res) => {
            if (mounted) {
                setLoading(false);
                setData(res)
            }
        });
    }
    return () => {
        mounted = true;
    };
}, [filterByPeriod]);
  return (
    <>
      <DataPick
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        filterByDateClick={filterByDate}
        clickByPeriod={filterByPeriod}
        setClickByPeriod={setFilterByPeriod}
      />
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p>№</p>
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
              <th>
                <p>Topildi</p>
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
                        {item.title}
                      </td>
                      <td>
                        {item.summa.map((x) => {
                          return <span>{x["so'm"]} </span>;
                        })}
                      </td>
                      <td>{item.updated_at}</td>
                      <td>
                        <button
                          style={
                            item.status === "Saved"
                              ? { backgroundColor: "#99CF63" }
                              : { backgroundColor: "#BCBCBC" }
                          }
                          className="topilish"
                        ></button>
                      </td>
                    </tr>
                  );
                })
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
    </>
  );
}
