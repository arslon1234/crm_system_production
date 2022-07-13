import React, { useEffect, useState, useRef, useCallback } from "react";
import DataPick from "./data_pick";
import InfiniteScroll from "react-infinite-scroll-component";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import { api } from "../../../api/api";
import NumberFormat from "react-number-format";
import DayReport from "./Day_report";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const Tabs = {
  Kirim: "income",
  Chiqim: "payment",
  Homashyo: "Homashyo",
  Inventar: "Inventar",
  Tayyor: "Tayyor",
  YarimTayyor: "Yarim tayyor",
  Brak: "Brak",
  Vozvrat: "Vozvrat",
  Sotuv: "Sotuv",
};
export default function KunlikHisobot({ keyword }) {
  const [activeTab, setActiveTab] = useState(Tabs.Kirim);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [next, setNext] = useState("");
  const [next2, setNext2] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const timer = useRef(null);
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  const fullYear = `${year}-0${month}-${day}`;
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get(`finance/${activeTab}/?from=${fullYear}&to=${fullYear}`, {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData1(res.results);
              setNext(res.next);
            }
          });
        api
          .get(
            `storage/product-orders/?receive-saved=True&product-type=${activeTab}&invoice-from=${fullYear}&invoice-to=${fullYear}`
          )
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData3(res.results);
              setNext2(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api
        .get(`finance/${activeTab}/?from=${fullYear}&to=${fullYear}`)
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData1(res.results);
            setNext(res.next);
          }
        });
      api
        .get(
          `storage/product-orders/?receive-saved=True&product-type=${activeTab}&invoice-from=${fullYear}&invoice-to=${fullYear}`
        )
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData3(res.results);
            setNext2(res.next);
          }
        });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword, fullYear, activeTab]);
  
  const TAB_LIST = [
    { label: "Kassa kirim", name: Tabs.Kirim },
    { label: "Kassa chiqim", name: Tabs.Chiqim },
    { label: "Homashyo", name: Tabs.Homashyo },
    { label: "Inventar", name: Tabs.Inventar },
    { label: "Tayyor", name: Tabs.Tayyor },
    { label: "Yarim tayyor", name: Tabs.YarimTayyor },
    { label: "Brak", name: Tabs.Brak },
    { label: "Vozvrat", name: Tabs.Vozvrat },
    { label: "Sotuv", name: Tabs.Sotuv },
  ];
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
        .get(`finance/${activeTab}/`, {
          params: {
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData1(res.results);
          setNext(res.next);
        });
      api
        .get(
          `storage/product-orders/?receive-saved=True&product-type=${activeTab}`,
          {
            params: {
              from: `${yearStart}-${monthStart}-${dayStart}`,
              to: `${yearEnd}-${monthEnd}-${dayEnd}`,
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setData3(res.results);
          setNext2(res.next);
        });
      api
        .get("storage/product-orders/?output-saved=True", {
          params: {
            type: activeTab,
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData7(res);
        });
    }
  }, [startDate, endDate, activeTab]);
  useEffect(() => {
    let mounted = true;
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api
        .get(`finance/${activeTab}/`, {
          params: {
            from: moment(oneMonthAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setData1(res.results);
            setNext(res.next);
          }
        });
      api
        .get(
          `storage/product-orders/?receive-saved=True&product-type=${activeTab}`,
          {
            params: {
              from: moment(oneMonthAgo).format("YYYY-MM-DD"),
              to: moment(monthDate).format("YYYY-MM-DD"),
            },
          }
        )
        .then((res) => {
          if (mounted) {
            setData3(res.results);
            setNext2(res.next);
          }
        });
    }
    if (filterByPeriod === "week") {
      api
        .get(`finance/${activeTab}/`, {
          params: {
            from: moment(oneWeekAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData1(res.results);
            setNext(res.next);
          }
        });
      api
        .get(
          `storage/product-orders/?receive-saved=True&product-type=${activeTab}`,
          {
            params: {
              from: moment(oneWeekAgo).format("YYYY-MM-DD"),
              to: moment(monthDate).format("YYYY-MM-DD"),
            },
          }
        )
        .then((res) => {
          if (mounted) {
            setData3(res.results);
            setNext2(res.next);
          }
        });
    }
    if (filterByPeriod === "day") {
      api
        .get(`finance/${activeTab}/`, {
          params: {
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setData1(res.results);
            setNext(res.next);
          }
        });
      api
        .get(`storage/product-orders/?receive-saved=True&product-type=${activeTab}`, {
          params: {
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setData3(res.results);
            setNext2(res.next);
          }
        });
    }
    if (filterByPeriod === "year") {
      api
        .get(`finance/${activeTab}/`, {
          params: {
            from: moment(oneYearsAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData1(res.results);
            setNext(res.next);
          }
        });
      api
        .get(
          `storage/product-orders/?receive-saved=True&product-type=${activeTab}`,
          {
            params: {
              from: moment(oneYearsAgo).format("YYYY-MM-DD"),
              to: moment(monthDate).format("YYYY-MM-DD"),
            },
          }
        )
        .then((res) => {
          if (mounted) {
            setData3(res.results);
            setNext2(res.next);
          }
        });
    }
    return () => {
      mounted = true;
    };
  }, [filterByPeriod, activeTab]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData1((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
  const nextData2 = useCallback(() => {
    api.get(`${next2}`).then((res) => {
      setData3((prev) => [...prev, ...res.results]);
      setNext2(res.next);
    });
  }, [next2]);
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
      <DayReport />
      <TabSwitcher
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabList={TAB_LIST}
        widthSwitcher="90%"
      />
      {activeTab === Tabs.Kirim && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data1?.length}
            next={nextData}
            hasMore={true}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Izoh</p>
                  </th>
                  <th>
                    <p>Qayerdan</p>
                  </th>
                  <th>
                    <p>So'm</p>
                  </th>
                  <th>
                    <p>Dollar</p>
                  </th>
                  <th>
                    <p>Bank</p>
                  </th>
                  <th>
                    <p>Plastik</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data1 &&
                  data1.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.created_at}</td>
                        <td>{item.description}</td>
                        <td>{item.from_where}</td>
                        <td>
                          {item.payment_type === "Naqd" &&
                          item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          {item.payment_type === "Naqd" &&
                          item.currency === "dollar"
                            ? item.summa
                            : ""}
                        </td>
                        <td>
                          {item.payment_type === "Bank" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.payment_type === "Bank" &&
                          item.currency === "so'm"
                            ? item.currency
                            : ""}
                        </td>
                        <td>
                          {item.payment_type === "Plastik" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.payment_type === "Plastik" &&
                          item.currency === "so'm"
                            ? item.currency
                            : ""}
                        </td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.Chiqim && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data1?.length}
            next={nextData}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Izoh</p>
                  </th>
                  <th>
                    <p>Qayerga</p>
                  </th>
                  <th>
                    <p>So'm</p>
                  </th>
                  <th>
                    <p>Dollar</p>
                  </th>
                  <th>
                    <p>Bank</p>
                  </th>
                  <th>
                    <p>Plastik</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data1 &&
                  data1.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.created_at}</td>
                        <td>{item.description}</td>
                        <td>{item.to_where}</td>
                        <td>
                          {item.payment_type === "Naqd" &&
                          item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.payment_type === "Naqd" &&
                          item.currency === "so'm"
                            ? item.currency
                            : ""}
                        </td>
                        <td>
                          {item.payment_type === "Naqd" &&
                          item.currency === "dollar" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.payment_type === "Naqd" &&
                          item.currency === "dollar"
                            ? item.currency
                            : ""}
                        </td>
                        <td>
                          {item.payment_type === "Bank" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.payment_type === "Bank" &&
                          item.currency === "so'm"
                            ? item.currency
                            : ""}
                        </td>
                        <td>
                          {item.payment_type === "Plastik" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.payment_type === "Plastik" &&
                          item.currency === "so'm"
                            ? item.currency
                            : ""}
                        </td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.Homashyo && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data3?.length}
            next={nextData}
            hasMore={true}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Kimdan</p>
                  </th>
                  <th>
                    <p>Miqdor </p>
                  </th>
                  <th>
                    <p>So'm</p>
                  </th>
                  <th>
                    <p>Dollar</p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Ombor</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data3 &&
                  data3.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.product.title}</td>
                        <td>{item.invoice.supplier}</td>
                        <td>
                          <NumberFormat
                            value={item.found_quantity * item.price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            // prefix={"$"}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </td>
                        <td>
                          {item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "so'm" ? item.currency : ""}
                        </td>
                        <td>
                          {item.currency === "dollar" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "dollar" ? item.currency : " "}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.invoice.storage}</td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.Inventar && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data3?.length}
            next={nextData}
            hasMore={true}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Kimdan</p>
                  </th>
                  <th>
                    <p>Miqdor </p>
                  </th>
                  <th>
                    <p>So'm</p>
                  </th>
                  <th>
                    <p>Dollar</p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Ombor</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data3 &&
                  data3.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.product.title}</td>
                        <td>{item.invoice.supplier}</td>
                        <td>
                          <NumberFormat
                            value={item.found_quantity * item.price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </td>
                        <td>
                          {item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "so'm" ? item.currency : ""}
                        </td>
                        <td>
                          {item.currency === "dollar" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "dollar" ? item.currency : " "}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.invoice.storage}</td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.Tayyor && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data3?.length}
            next={nextData2}
            hasMore={true}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th style={{ textAlign: "start" }}>
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Kimdan</p>
                  </th>
                  <th>
                    <p>Miqdor </p>
                  </th>
                  <th>
                    <p>So'm</p>
                  </th>
                  <th>
                    <p>Dollar</p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Ombor</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data3 &&
                  data3.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "start", width: "130px" }}>
                          {item.product.title}
                        </td>
                        <td>{item.invoice.supplier}</td>
                        <td>
                          <NumberFormat
                            value={item.found_quantity * item.price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </td>
                        <td>
                          {item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "so'm" ? item.currency : ""}
                        </td>
                        <td>
                          {item.currency === "dollar" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "dollar" ? item.currency : " "}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.invoice.storage}</td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.YarimTayyor && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data3?.length}
            next={nextData}
            hasMore={true}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Kimdan</p>
                  </th>
                  <th>
                    <p>Miqdor </p>
                  </th>
                  <th>
                    <p>So'm</p>
                  </th>
                  <th>
                    <p>Dollar</p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Ombor</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data3 &&
                  data3.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "start", width: "130px" }}>
                          {item.product.title}
                        </td>
                        <td>{item.invoice.supplier}</td>
                        <td>
                          {" "}
                          <NumberFormat
                            value={item.found_quantity * item.price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </td>
                        <td>
                          {item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "so'm" ? item.currency : ""}
                        </td>
                        <td>
                          {item.currency === "dollar" ? (
                            <NumberFormat
                              value={item.price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}{" "}
                          {item.currency === "dollar" ? item.currency : " "}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.invoice.storage}</td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                    <SkeletonLoader count={9} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.Brak && (
        <div className="table director-table">
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Kimdan</p>
                </th>
                <th>
                  <p>Miqdor </p>
                </th>
                <th>
                  <p>So'm</p>
                </th>
                <th>
                  <p>Dollar</p>
                </th>
                <th>
                  <p>Sana</p>
                </th>
                <th>
                  <p>Ombor</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>salat1</td>
                <td>Sayfullodan</td>
                <td>100kg</td>
                <td>20000</td>
                <td>20$</td>
                <td>02.02.2022</td>
                <td>Nuriddin Obidjonov</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {activeTab === Tabs.Vozvrat && (
        <div className="table director-table">
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Kimdan</p>
                </th>
                <th>
                  <p>Miqdor </p>
                </th>
                <th>
                  <p>So'm</p>
                </th>
                <th>
                  <p>Dollar</p>
                </th>
                <th>
                  <p>Sana</p>
                </th>
                <th>
                  <p>Ombor</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>salat1</td>
                <td>Sayfullodan</td>
                <td>100kg</td>
                <td>20000</td>
                <td>20$</td>
                <td>02.02.2022</td>
                <td>Nuriddin Obidjonov</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {activeTab === Tabs.Sotuv && (
        <div className="table director-table">
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Kimdan</p>
                </th>
                <th>
                  <p>Miqdor </p>
                </th>
                <th>
                  <p>So'm</p>
                </th>
                <th>
                  <p>Dollar</p>
                </th>
                <th>
                  <p>Sana</p>
                </th>
                <th>
                  <p>Ombor</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && data7?.results
                ? data7.results.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "start", width: "130px" }}>
                          {item.product.title}
                        </td>
                        <td>{item.invoice.supplier}</td>
                        <td>{item.found_quantity * item.price}</td>
                        <td>
                          {item.currency === "so'm" ? item.price : ""}{" "}
                          {item.currency === "so'm" ? item.currency : ""}
                        </td>
                        <td>
                          {item.currency === "dollar" ? item.price : ""}{" "}
                          {item.currency === "dollar" ? item.currency : " "}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.invoice.storage}</td>
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
      )}
    </div>
  );
}
