import React, { useCallback, useEffect, useRef, useState } from "react";
import DataPick from "./data_pick";
import { api } from "../../../api/api";
import NumberFormat from "react-number-format";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
const SotuvHisobi = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterByPeriod, setFilterByPeriod] = useState("");
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
        .get("sales/orders/check_by_product", {
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
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("sales/orders/check_by_product", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res);
              setNext(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("sales/orders/check_by_product").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res);
          setNext(res.next);
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
    if (filterByPeriod === "month") {
      api
        .get("sales/orders/check_by_product/", {
          params: {
            from: moment(oneMonthAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "week") {
      api
        .get("sales/orders/check_by_product/", {
          params: {
            from: moment(oneWeekAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "day") {
      api
        .get("sales/orders/check_by_product/", {
          params: {
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
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
                <th style={{ textAlign: "start", width: "130px" }}>
                  <p>Mahsulot nomi</p>
                </th>
                <th>
                  <p>Miqdori</p>
                </th>
                <th>
                  <p>O’lchov birligi</p>
                </th>
                <th>
                  <p>Umumiy summa</p>
                </th>
                <th>
                  <p>Valyuta</p>
                </th>
                <th>
                  <p>Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data &&
                data.map((x, index) => (
                  <tr key={x.product.id}>
                    <th>{index + 1}</th>
                    <th style={{ textAlign: "start", width: "130px" }}>
                      {x.product.title}
                    </th>
                    <th>
                    <NumberFormat
                        value={x.quantity}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value, props) => (
                          <div {...props}>{value}</div>
                        )}
                      />
                    </th>
                    <th>{x.product.measurement_unit}</th>
                    <th>
                      <NumberFormat
                        value={x.summa}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={x.currency}
                        renderText={(value, props) => (
                          <div {...props}>{value}</div>
                        )}
                      />
                    </th>
                    <th>{x.product.currency}</th>
                    <th>{x.description}</th>
                  </tr>
                ))}
              {loading && (
                <>
                  <SkeletonLoader count={8} />
                  <SkeletonLoader count={8} />
                  <SkeletonLoader count={8} />
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

export default SotuvHisobi;
