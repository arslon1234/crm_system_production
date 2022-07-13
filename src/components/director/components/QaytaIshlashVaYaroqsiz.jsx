import React, { useEffect, useState, useRef, useCallback } from "react";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import { api } from "../../../api/api";
import NumberFormat from "react-number-format";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
const Tabs = {
  YAROQSIZ: "YAROQSIZ",
  QAYTA_ISHLASH: "QAYTA_ISHLASH",
};

export default function YaroqsizvaQayta({ keyword }) {
  const [activeTab, setActiveTab] = useState(Tabs.YAROQSIZ);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next1, setNext1] = useState("");
  const [next2, setNext2] = useState("");
  const timer = useRef(null);
  const function1 = () => {
    let mounted = true;
    setLoading(true);
    api.get("storage/returned-products/?wasted=True").then((res) => {
      if (mounted) {
        setLoading(false);
        setData1(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function2 = () => {
    let mounted = true;
    setLoading(true);
    api.get("storage/returned-products/?wasted=False").then((res) => {
      if (mounted) {
        setLoading(false);
        setData2(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  // useEffect(() => {
  //     function1();
  //     function2();
  // }, []);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/returned-products/?wasted=True", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData1(res.results);
              setNext1(res.next);
            }
          });
        api
          .get("storage/returned-products/?wasted=True", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData2(res.results);
              setNext2(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/returned-products/?wasted=False").then((res) => {
        if (mounted) {
          setLoading(false);
          setData1(res.results);
          setNext1(res.next);
        }
      });
      api.get("storage/returned-products/?wasted=False").then((res) => {
        if (mounted) {
          setLoading(false);
          setData2(res.results);
          setNext2(res.next);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const nextData1 = useCallback(() => {
    api.get(`${next1}`).then((res) => {
      setData1((prev) => [...prev, ...res.results]);
      setNext1(res.next);
    });
  }, [next1]);
  const nextData2 = useCallback(() => {
    api.get(`${next2}`).then((res) => {
      setData1((prev) => [...prev, ...res.results]);
      setNext2(res.next);
    });
  }, [next2]);
  const TAB_LIST = [
    { label: "YAROQSIZ", name: Tabs.YAROQSIZ },
    { label: "QAYTA_ISHLASH", name: Tabs.QAYTA_ISHLASH },
  ];
  const finalSum = data1?.results
    ?.filter((item) => item.product.measurement_unit === "dona")
    .reduce((a, b) => a + b?.quantity, 0);
  const finalSum2 = data1?.results
    ?.filter((item) => item.product.measurement_unit === "litr")
    .reduce((a, b) => a + b?.quantity, 0);

  const finalSum3 = data1?.results
    ?.filter((item) => item.product.measurement_unit === "kg")
    .reduce((a, b) => a + b?.quantity, 0);

  const finalSum4 = data1?.results
    ?.filter((item) => item.product.currency === "dollar")
    .reduce((a, b) => a + b?.summa, 0);
  const finalSum5 = data1?.results
    ?.filter((item) => item.product.currency === "rubl")
    .reduce((a, b) => a + b?.summa, 0);
  const finalSum6 = data1?.results
    ?.filter((item) => item.product.currency === "so'm")
    .reduce((a, b) => a + b?.summa, 0);
  return (
    <div>
      <div className="buyurtma_btn">
        <TabSwitcher
          onChangeTab={setActiveTab}
          activeTab={activeTab}
          tabList={TAB_LIST}
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
      {activeTab === Tabs.YAROQSIZ && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data1?.length}
            next={nextData1}
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
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Miqdori</p>
                  </th>
                  <th>
                    <p> Zarar </p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Javobgar shaxs</p>
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
                        <td style={{ width: "125px", textAlign: "start" }}>
                          {item.product.title}
                        </td>
                        <td>
                          {item.quantity} {item.product.measurement_unit}
                        </td>
                        <td style={{ color: "#FE2626" }}>
                          <NumberFormat
                            value={item.summa}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            // prefix={"$"}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                          {item.product.currency}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.responsible}</td>
                      </tr>
                    );
                  })}
                {data1 && (
                  <tr>
                    <th></th>
                    <th>Jami:</th>
                    <th>
                      {finalSum} - dona <br />
                      {finalSum2} - litr <br />
                      {finalSum3} - kg
                    </th>
                    <th style={{ color: "red" }}>
                      {finalSum4}- dollar <br />
                      {finalSum5} - rubl <br />
                      {finalSum6} - so'm
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                )}
                {loading && (
                  <>
                    <SkeletonLoader count={7} />
                    <SkeletonLoader count={7} />
                    <SkeletonLoader count={7} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
      {activeTab === Tabs.QAYTA_ISHLASH && (
        <div className="table director-table">
          <InfiniteScroll
            dataLength={data2?.length}
            next={nextData2}
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
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Miqdori</p>
                  </th>
                  <th>
                    <p> Zarar </p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Javobgar shaxs</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data2 &&
                  data2.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ width: "120px", textAlign: "start" }}>
                          {item.product.title}
                        </td>
                        <td>{item.quantity}</td>
                        <td style={{ color: "#FE2626" }}>
                          <NumberFormat
                            value={item.summa}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            // prefix={"$"}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                          {item.product.currency}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.responsible}</td>
                      </tr>
                    );
                  })}
                {loading && (
                  <>
                    <SkeletonLoader count={7} />
                    <SkeletonLoader count={7} />
                    <SkeletonLoader count={7} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
