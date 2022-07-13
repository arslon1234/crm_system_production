import React, { useCallback, useEffect, useRef, useState } from "react";
import DataPick from "./data_pick";
import InfiniteScroll from "react-infinite-scroll-component";
import dateFormat from "dateformat";
import { api } from "../../../api/api";
import moment from "moment";
import NumberFormat from "react-number-format";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const FakturaTarixi = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const [next, setNext] = useState("");
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
        .get("storage/invoices/", {
          params: {
            type: "Chiqish",
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res.results);
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/invoices", {
            params: {
              type: "Chiqish",
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
              setNext(res.next);
              console.log(res.results, "results");
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/invoices/?type=Chiqish").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
          setNext(res.next);
          console.log(res.results, "results");
        }
      });
    }
    return () => {
      mounted = false;
      clearTimeout();
    };
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api
        .get("storage/invoices/", {
          params: {
            type: "Chiqish",
            from: moment(oneMonthAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByPeriod === "week") {
      api
        .get("storage/invoices/", {
          params: {
            type: "Chiqish",
            from: moment(oneWeekAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByPeriod === "day") {
      api
        .get("storage/invoices/", {
          params: {
            type: "Chiqish",
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByPeriod === "year") {
      api
        .get("storage/invoices/", {
          params: {
            type: "Chiqish",
            from: moment(oneYearsAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    return () => {
      mounted = true;
    };
  }, [filterByPeriod]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <DataPick
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          filterByDateClick={filterByDate}
          clickByPeriod={filterByPeriod}
          setClickByPeriod={setFilterByPeriod}
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
        <InfiniteScroll
          dataLength={data?.length}
          next={nextData}
          hasMore={true}
          //   loader={"loading..."}
        >
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p> Mijoz</p>
                </th>
                <th>
                  <p>Faktura nomi</p>
                </th>
                <th>
                  <p>Umumiy summa (so'm)</p>
                </th>
                <th>
                  <p>Umumiy summa (dollar)</p>
                </th>
                <th>
                  <p>Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data?.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th>{x.client}</th>
                    <th>{x.title}</th>
                    <th>
                      {x.summa.map((x) => (
                        <p style={{ paddingTop: "5px" }}>
                          {x.currency === "so'm" && (
                            <NumberFormat
                              value={x.total_price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          )}
                        </p>
                      ))}
                    </th>
                    <th>
                      {x.summa.map((x) => (
                        <p style={{ paddingTop: "5px" }}>
                          {x.currency === "dollar" && (
                            <NumberFormat
                              value={x.total_price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          )}
                        </p>
                      ))}
                    </th>
                    <th>{x?.description}</th>
                  </tr>
                ))}
              {loading && (
                <>
                  <SkeletonLoader count={5} />
                  <SkeletonLoader count={5} />
                  <SkeletonLoader count={5} />
                </>
              )}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
  // }
};

export default FakturaTarixi;
