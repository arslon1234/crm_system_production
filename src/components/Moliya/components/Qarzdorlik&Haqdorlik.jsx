import React, { useState, useEffect, useRef, useCallback } from "react";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import NumberFormat from "react-number-format";
import DataPick from "./data_pick";
import { useHistory } from "react-router-dom";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
const QarzHaq = ({ url, keyword }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();
  const timer = useRef(null);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  useEffect(() => {
       let mounted = true;
       setLoading(true);
       api.get("supplier/suppliers").then((res) => {
         if (mounted) {
           setData1(res);
           setLoading(false);
         }
       });
       api.get("sales/clients").then((res) => {
         if (mounted) {
           setData2(res);
           setLoading(false);
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
          .get("user/salary/", {
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
      api.get("user/salary/").then((res) => {
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
           .get("supplier/suppliers", {
             params: {
               from: `${yearStart}-${monthStart}-${dayStart}`,
               to: `${yearEnd}-${monthEnd}-${dayEnd}`,
             },
           })
           .then((res) => {
             setLoading(false);
             setData1(res.results);
           });
       }
     }, [startDate, endDate]);
  const final = data1.filter((item) => item.company_debt.dollar != undefined);
  const finals = data1.filter((item) => item.company_debt["so'm"] != undefined);
  const finals1 = data2.filter((item) => item.client_debt["so'm"] != undefined);
  const finals2 = data2.filter((item) => item.client_debt.dollar != undefined);
  const final2 = final.reduce((a, b) => a + b.company_debt.dollar, 0);
  const final3 = finals.reduce((a, b) => a + b.company_debt["so'm"], 0);
  const final4 = finals1.reduce((a, b) => a + b.client_debt["so'm"], 0);
  const final5 = finals2.reduce((a, b) => a + b.client_debt.dollar, 0);
  return (
    <React.Fragment>
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
      <div className="director_table" style={{marginTop:"10px"}}>
          <div className="director_table1">
            <div className="director_table_head">
              <span>Qarzdorlik</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th style={{ textAlign: "start" }}>Qayerdan</th>
                  <th>So'm</th>
                  <th>Dollar</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data1 &&
                  data1.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td
                        className="a_lar"
                        onClick={() =>
                          history.replace(
                            `${url}/FakturaId/${item.id}/${item.title}`
                          )
                        }
                        style={{
                          width: "120px",
                          textAlign: "start",
                          cursor: "pointer",
                        }}
                      >
                        {item.title}
                      </td>
                      <td>
                        <NumberFormat
                          value={item.company_debt["so'm"]}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                      <td>
                        <NumberFormat
                          value={item.company_debt.dollar}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                {loading && (
                  <>
                    <SkeletonLoader count={4} />
                    <SkeletonLoader count={4} />
                    <SkeletonLoader count={4} />
                  </>
                )}
                <tr>
                  <td></td>
                  <td style={{ textAlign: "start" }}>jami:</td>
                  <td>
                    <NumberFormat
                      value={final3}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                  <td>
                    <NumberFormat
                      value={final2}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="director_table2">
            <div className="director_table_head">
              <span>Haqdorlik</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th style={{ textAlign: "start" }}>Qayerdan</th>
                  <th>So'm</th>
                  <th>Dollar</th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data2 &&
                  data2.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="a_lar"
                        onClick={() =>
                          history.replace(
                            `${url}/FakturaId2/${item.id}/${item.title}`
                          )
                        }
                        style={{
                          width: "120px",
                          textAlign: "start",
                          cursor: "pointer",
                        }}>
                        {item.title}
                      </td>
                      <td>
                        <NumberFormat
                          value={item.client_debt["so'm"]}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                      <td>
                        <NumberFormat
                          value={item.client_debt.dollar}
                          className="foo"
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                {loading && (
                  <>
                    <SkeletonLoader count={4} />
                    <SkeletonLoader count={4} />
                    <SkeletonLoader count={4} />
                  </>
                )}
                <tr>
                  <td></td>
                  <td style={{ textAlign: "start" }}>jami:</td>
                  <td>
                    <NumberFormat
                      value={final4}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                  <td>
                    <NumberFormat
                      value={final5}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </React.Fragment>
  );
};

export default QarzHaq;
