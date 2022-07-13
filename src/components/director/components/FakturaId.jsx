import React, { useEffect, useState, useRef, useCallback } from "react";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import { api } from "../../../api/api";
import { NavLink } from "react-router-dom";
import NumberFormat from "react-number-format";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
const Tabs = {
  Faktura: "Faktura",
  Chiqim: "Chiqim",
};

export default function FakturaId({ keyword, url }) {
  const [activeTab, setActiveTab] = useState(Tabs.Faktura);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState("");
  const [next2, setNext2] = useState("");
  const timer = useRef(null);
  const urlId = window.location.href.split("/");
  console.log(urlId, "urlId");
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get(
            `storage/invoices/?type=Kirish&status=Saved&supplier=${urlId[5]}`,
            {
              params: {
                search: keyword.length > 0 ? keyword : "",
              },
            }
          )
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData1(res.results);
              // setNext(res.next);
              console.log(res, "res");
            }
          });
        api
          .get(`finance/payment/?to_where=${urlId[6]}`, {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData2(res.results);
              // setNext2(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api
        .get(`storage/invoices/?type=Kirish&status=Saved&supplier=${urlId[5]}`)
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData1(res.results);
            // setNext(res.next);
            console.log(res, "res");
          }
        });
      api.get(`finance/payment/?to_where=${urlId[6]}`).then((res) => {
        if (mounted) {
          setLoading(false);
          setData2(res.results);
          // setNext2(res.next);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword, urlId]);
  // const nextData1 = useCallback(() => {
  //   api.get(`${next}`).then((res) => {
  //     setData1((prev) => [...prev, ...res.results]);
  //     setNext(res.next);
  //   });
  // }, [next]);
  // const nextData2 = useCallback(() => {
  //   api.get(`${next}`).then((res) => {
  //     setData2((prev) => [...prev, ...res.results]);
  //     setNext2(res.next);
  //   });
  // }, [next]);
  const TAB_LIST = [
    { label: "Faktura", name: Tabs.Faktura },
    { label: "Chiqim", name: Tabs.Chiqim },
  ];
  const finalSum = data1?.results
    ?.filter((item) => item.summa.map(x=> x.currency === "dollar"))
    .reduce((a, b) => a + b?.quantity, 0);
  return (
    <div>
      <div className="faktura_name" style={{ display: "flex" }}>
        <NavLink activeClassName="navbar_active2" to={`${url}/dashboard`}>
          <div className="prev_icon">
            <i class="fa-regular fa-circle-left"></i>
          </div>
        </NavLink>
        <div className="nameFaktura2">
          <span>{urlId[6].replace(/%20/g, " ")}</span>
        </div>
      </div>
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
      {activeTab === Tabs.Faktura && (
        <div className="table director-table">
          {/* <InfiniteScroll
            dataLength={data1?.length}
            next={nextData1}
            hasMore={true}
          > */}
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Title</p>
                  </th>
                  <th>
                    <p>sana</p>
                  </th>
                  <th>
                    <p>so'm</p>
                  </th>
                  <th>
                    <p>dollar</p>
                  </th>
                  <th>
                    <p>izoh</p>
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
                          {item.title}
                        </td>
                        <td>{item.updated_at}</td>
                        <td>
                          {item.summa.map((x) => {
                            return (
                              x.currency === "so'm" && (
                                <NumberFormat
                                  value={x.total_price}
                                  className="foo"
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffic={x.currency}
                                  renderText={(value, props) => (
                                    <div {...props}>{value}</div>
                                  )}
                                />
                              )
                            );
                          })}
                        </td>
                        <td>
                          {item.summa.map((x) => {
                            return (
                              x.currency === "dollar" && (
                                <NumberFormat
                                  value={x.total_price}
                                  className="foo"
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  suffic={x.currency}
                                  renderText={(value, props) => (
                                    <div {...props}>{value}</div>
                                  )}
                                />
                              )
                            );
                          })}
                        </td>
                        <td>{item.description}</td>
                      </tr>
                    );
                  })}
                {data1 && (
                  <tr>
                    <th></th>
                    <th>Jami:</th>
                    <th>
                    </th>
                    <th>
                     111
                    </th>
                    <th>23</th>
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
          {/* </InfiniteScroll> */}
        </div>
      )}
      {activeTab === Tabs.Chiqim && (
        <div className="table director-table">
          {/* <InfiniteScroll
            dataLength={data2?.length}
            next={nextData2}
            hasMore={true}
          > */}
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th>
                    <p>Type </p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Naqd(so'm)</p>
                  </th>
                  <th>
                    <p>Naqd(dollar)</p>
                  </th>
                  <th>
                    <p>Bank</p>
                  </th>
                  <th>
                    <p>Plastik</p>
                  </th>
                  <th>
                    <p>Izoh</p>
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
                        <td>{item.type}</td>
                        <td>{item.created_at}</td>
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
                          )}
                        </td>
                        <td>
                          {item.payment_type === "Bank" &&
                          item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              suffix={item.currency}
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
                          {item.payment_type === "Plastik" &&
                          item.currency === "so'm" ? (
                            <NumberFormat
                              value={item.summa}
                              className="foo"
                              displayType={"text"}
                              suffix={item.currency}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{item.description}</td>
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
          {/* </InfiniteScroll> */}
        </div>
      )}
    </div>
  );
}
