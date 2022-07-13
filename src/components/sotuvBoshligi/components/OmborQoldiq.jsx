import React, { useCallback, useEffect, useRef, useState } from "react";
import DataPick from "./data_pick";
import InfiniteScroll from "react-infinite-scroll-component";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import NumberFormat from "react-number-format";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import moment from "moment";
import { keyframes } from "@emotion/react";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Tabs = {
  HOMASHYO: "Homashyo",
  YARIMTAYYOR: "Yarim tayyor",
  TAYYOR: "Tayyor",
};

export default function OmborQoldiq({ keyword }) {
  const [data, setData] = useState([]);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterByGroup, setFilterByGroup] = useState("");
  const [filterByFromWho, setFilterByFromWho] = useState("");
  const [filterByWeight, setFilterByWeight] = useState("");
  const [productGroups, setProductGroups] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.HOMASHYO);
  const timer = useRef(null);
  const [next, setNext] = useState("");

  const TAB_LIST = [
    { label: "HOMASHYO", name: Tabs.HOMASHYO, id: 1 },
    { label: "YARIMTAYYOR", name: Tabs.YARIMTAYYOR, id: 2 },
    { label: "TAYYOR", name: Tabs.TAYYOR, id: 3 },
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
        .get("storage/products/", {
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
    api.get("sales/city/").then((res) => {
      console.log(res, "res");
    });
  }, []);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (filterByGroup && filterByGroup !== "all") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
            group: filterByGroup,
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByWeight && filterByWeight !== "all") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
            critical: filterByWeight.length > 0 && "True",
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByGroup === "all" || filterByWeight === "all") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
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
      mounted = false;
    };
  }, [activeTab, filterByFromWho, filterByGroup, filterByWeight]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/products/", {
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
        .get("storage/products/", {
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
    api.get("storage/product-groups/").then((res) => {
      if (mounted) {
        setProductGroups(res);
      }
    });
    api.get("supplier/suppliers/").then((res) => {
      if (mounted) {
        setSuppliers(res);
      }
    });
    return () => {
      mounted = false;
    };
  }, [activeTab, keyword]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api
        .get("storage/products/", {
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
        .get("storage/products/", {
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
        .get("storage/products/", {
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

    if (filterByPeriod === "year") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
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
  }, [filterByPeriod, activeTab]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
  return (
    <>
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
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text2={"Faktura muvaffaqiyatli yuborildi."}
        />
        <DeleteModal
          open={modalDelete}
          close={() => setModalDelete((prev) => !prev)}
          text2={"Faktura bekor qilindi."}
        />
      </div>
      <TabSwitcher
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabList={TAB_LIST}
      />
      {activeTab === Tabs.HOMASHYO && (
        <div className="table">
          <div className="select-header2">
            <select
              name=""
              id=""
              onChange={(e) => {
                setFilterByWeight(e.target.value);
                setFilterByGroup("");
                setFilterByFromWho("");
              }}
            >
              <option disabled selected hidden>
                Hajmi
              </option>
              <option value="oz">Oz qolgan</option>
              <option value="all">Barchasi</option>
            </select>
            <select
              name=""
              id=""
              onChange={(e) => {
                setFilterByGroup(e.target.value);
                setFilterByFromWho("");
                setFilterByWeight("");
              }}
            >
              <option disabled hidden selected>
                Mahsulot guruhi
              </option>
              {productGroups?.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="all">Barchasi</option>
            </select>
          </div>
          <div className="table-main">
            <InfiniteScroll
              dataLength={data?.length}
              next={nextData}
              hasMore={true}
            >
              <table id="to_Excel">
                <thead>
                  <tr>
                    <th>
                      <p> № </p>
                    </th>
                    <th style={{ textAlign: "start", width: "130px" }}>
                      <p>Nomi</p>
                    </th>
                    <th>
                      <p> Miqdori </p>
                    </th>
                    <th>
                      <p>Kelish narxi</p>
                    </th>
                    <th>
                      <p>Summasi</p>
                    </th>
                    <th>
                      <p>Kodi</p>
                    </th>
                    <th>
                      <p>Keltirilgan sana</p>
                    </th>
                    <th>
                      <p>Yaroqlilik muddati</p>
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
                        <th style={{ textAlign: "start", width: "130px" }}>
                          {x.title}
                        </th>
                        <th>
                          <NumberFormat
                            value={x.quantity}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.measurement_unit.title}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </th>
                        <th>
                        <NumberFormat
                            value={x.arrival_price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.currency}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                           
                        </th>
                        <th>
                        <NumberFormat
                            value={x.costs}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.currency}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </th>
                        <th>{x.code}</th>
                        <th>{x.created_at}</th>
                        <th>{x.shelf_life}</th>
                        <th>{x.description}</th>
                      </tr>
                    ))}
                  {loading && (
                    <>
                      <SkeletonLoader count={10} />
                      <SkeletonLoader count={10} />
                      <SkeletonLoader count={10} />
                    </>
                  )}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </div>
      )}
      {activeTab === Tabs.YARIMTAYYOR && (
        <div className="table">
          <div className="select-header2">
            <select
              name=""
              id=""
              onChange={(e) => {
                setFilterByGroup(e.target.value);
                setFilterByFromWho("");
                setFilterByWeight("");
              }}
            >
              <option disabled hidden selected>
                Mahsulot guruhi
              </option>
              {productGroups?.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="al">Barchasi</option>
            </select>
          </div>
          <div className="table-main">
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
                      <p>Nomi</p>
                    </th>
                    <th>
                      <p> Miqdori </p>
                    </th>
                    <th>
                      <p>Tan narxi</p>
                    </th>
                    <th>
                      <p>Summasi</p>
                    </th>
                    <th>
                      <p>Tayyorlangan</p>
                    </th>
                    <th>
                      <p>Yaroqlilik muddati</p>
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
                        <th style={{ textAlign: "start", width: "130px" }}>
                          {x.title}
                        </th>
                        <th>
                        <NumberFormat
                            value={x.quantity}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.measurement_unit.title}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </th>
                        <th>
                        <NumberFormat
                            value={x.arrival_price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.currency}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </th>
                        <th>
                        <NumberFormat
                            value={x.costs}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.currency}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                        </th>
                        <th>{x.created_at}</th>
                        <th>{x.shelf_life}</th>
                        <th>{x.description}</th>
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
            </InfiniteScroll>
          </div>
        </div>
      )}
      {activeTab === Tabs.TAYYOR && (
        <div className="table">
          <div className="select-header2">
            <select
              name=""
              id=""
              onChange={(e) => {
                setFilterByGroup(e.target.value);
                setFilterByFromWho("");
                setFilterByWeight("");
              }}
            >
              <option disabled hidden selected>
                Mahsulot guruhi
              </option>
              {productGroups?.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="all">Barchasi</option>
            </select>
          </div>
          <div className="table-main">
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
                      <p>Nomi</p>
                    </th>
                    <th>
                      <p> Mahsulot guruhi </p>
                    </th>
                    <th>
                      <p>Modeli</p>
                    </th>
                    <th>
                      <p>Kodi</p>
                    </th>
                    <th>
                      <p>Miqdori</p>
                    </th>
                    <th>
                      <p>Tannarxi</p>
                    </th>
                    <th>
                      <p>Summasi</p>
                    </th>
                    <th>
                      <p>Kimga</p>
                    </th>
                    <th>
                      <p>Tayyorlangan sana</p>
                    </th>
                    <th>
                      <p>Yaroqlilik muddati</p>
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
                        <th style={{ textAlign: "start", width: "130px" }}>
                          {x.title}
                        </th>
                        <th>{x.group}</th>
                        <th>{x.model}</th>
                        <th>{x.code}</th>
                        <th>
                        <NumberFormat
                            value={x.quantity}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.measurement_unit.title}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                           
                        </th>
                        <th>
                        <NumberFormat
                            value={x.arrival_price}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.currency}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                           
                        </th>
                        <th>
                        <NumberFormat
                            value={x.costs}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={x.currency}
                            renderText={(value, props) => (
                              <div {...props}>{value}</div>
                            )}
                          />
                           
                        </th>
                        <th>{x.supplier}</th>
                        <th>{x.created_at}</th>
                        <th>{x.shelf_life}</th>
                        <th>{x.description}</th>
                      </tr>
                    ))}
                  {loading && (
                    <>
                      <SkeletonLoader count={13} />
                      <SkeletonLoader count={13} />
                      <SkeletonLoader count={13} />
                    </>
                  )}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
}
