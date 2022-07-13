import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DataPick from "./data_pick";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import cashIcon from "../../Icons/cash.png";
import { api } from "../../../api/api";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
import NumberFormat from "react-number-format";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Expenses({ keyword, searchT }) {
  const [costType, setCostType] = useState([]);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
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
        .get("finance/payment/", {
          params: {
            type: activeTab,
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res.results);
        });
    }
  }, [startDate, endDate, activeTab]);

  useEffect(() => {
    let mounted = true;
    api.get("finance/cost-type/").then((res) => {
      if (mounted) {
        setCostType(res);
        setActiveTab(res[0].id);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    if (filterByPeriod === "month") {
      api
        .get("finance/payment/", {
          params: {
            type: activeTab,
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
        .get("finance/payment/", {
          params: {
            type: activeTab,
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
        .get("finance/payment/", {
          params: {
            type: activeTab,
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
    return () => {
      mounted = true;
    };
  }, [filterByPeriod, activeTab]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("finance/payment", {
            params: {
              type: activeTab,
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
              setNext(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api
        .get("finance/payment", {
          params: {
            type: activeTab,
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
            setNext(res.next);
          }
        });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword, activeTab]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
  return (
    <div>
      <div className="buyurtma_btn">
        <DataPick
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
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
      <TabSwitcher
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabList={costType}
        widthSwitcher="97%"
        director
      />
      <div className="table director-table">
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
                  <p>Qayerga</p>
                </th>
                <th>
                  <p>Qayerdan</p>
                </th>
                <th>
                  <p>Chiqim summasi</p>
                </th>
                <th>
                  <p>To'lov turi</p>
                </th>
                <th>
                  <p>Izoh</p>
                </th>
                <th>
                  <p>Sana</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data &&
                data.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th>{x.to_where}</th>
                    <th className="cash-icon">
                      <img src={cashIcon} alt="" />
                      {x.cashbox}
                    </th>
                    <th style={{ color: "red" }}>
                      <NumberFormat
                        value={x.summa}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        // prefix= {x.currency}
                        renderText={(value, props) => (
                          <div {...props}>{value}</div>
                        )}
                      />
                     {x.currency}
                    </th>
                    <th>{x.type}</th>
                    <th>{x.description}</th>
                    <th>{x.created_at}</th>
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
    </div>
  );
}
