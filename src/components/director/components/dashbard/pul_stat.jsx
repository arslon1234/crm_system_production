import React, { useEffect, useState, useRef } from "react";
import DataPick from "../data_pick";
import { useHistory } from "react-router-dom";
import SkeletonLoader from "../../../loader/skeleton-loader";
import NumberFormat from "react-number-format";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../../../../api/api";
// import { colors } from "react-select/dist/declarations/src/theme";

////////////  line chart start ////////////
const data = [
  {
    name: "Yan",
    Chiqim: 4000,
    Kirim: 2400,
  },
  {
    name: "Fev",
    Chiqim: 3000,
    Kirim: 1398,
  },
  {
    name: "Mart",
    Chiqim: 2000,
    Kirim: 3800,
  },
  {
    name: "Apr",
    Chiqim: 2780,
    Kirim: 3908,
  },
  {
    name: "May",
    Chiqim: 1890,
    Kirim: 4800,
  },
  {
    name: "Iyun",
    Chiqim: 2390,
    Kirim: 3800,
  },
  {
    name: "Iyul",
    Chiqim: 3490,
    Kirim: 4300,
  },
  {
    name: "Avg",
    Chiqim: 44000,
    Kirim: 24200,
  },
  {
    name: "Sent",
    Chiqim: 30885,
    Kirim: 39855,
  },
  {
    name: "Okt",
    Chiqim: 2000,
    Kirim: 5800,
  },
  {
    name: "Noy",
    Chiqim: 2780,
    Kirim: 3908,
  },
  {
    name: "Dek",
    Chiqim: 1890,
    Kirim: 4800,
  },
];
const data5 = [
  {
    name: "Yan",
    Chiqim: 70000,
    Kirim: 26200,
  },
  {
    name: "Fev",
    Chiqim: 30030,
    Kirim: 26012,
  },
  {
    name: "Mart",
    Chiqim: 20200,
    Kirim: 38030,
  },
  {
    name: "Apr",
    Chiqim: 27810,
    Kirim: 39086,
  },
  {
    name: "May",
    Chiqim: 18905,
    Kirim: 48006,
  },
  {
    name: "Iyun",
    Chiqim: 23908,
    Kirim: 38001,
  },
  {
    name: "Iyul",
    Chiqim: 34901,
    Kirim: 43001,
  },
  {
    name: "Avg",
    Chiqim: 44000,
    Kirim: 24200,
  },
  {
    name: "Sent",
    Chiqim: 70882,
    Kirim: 39855,
  },
  {
    name: "Okt",
    Chiqim: 20000,
    Kirim: 56800,
  },
  {
    name: "Noy",
    Chiqim: 57800,
    Kirim: 69028,
  },
  {
    name: "Dek",
    Chiqim: 70890,
    Kirim: 48005,
  },
];
const datapie = [
  { name: "Kirim", value: 600 },
  { name: "Chiqim", value: 300 },
];
const COLORS = ["#0051FE", "#FA1A03"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function CostomTooltip({ active, payload }) {
  if (active) {
    return (
      <div className="pie_tooltip">
        <p>$ {payload[0].value.toFixed(0)}</p>
      </div>
    );
  }
  return null;
}
////////////  pie chart end ////////////

const PulStatistikasi = ({ keyword, url }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const history = useHistory();
  const [data4, setData4] = useState([]);
  const [circle1, setCircle1] = useState(true);
  const [circle2, setCircle2] = useState(false);
  const [circle3, setCircle3] = useState(false);
  const [circle4, setCircle4] = useState(false);
  const [plastik, setPlastik] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yankirim, setYankirim] = useState([])
  const [fevkirim, setFevkirim] = useState([])
  const [martkirim, setMartkirim] = useState([])
  const timer = useRef(null);
  useEffect(() => {
    let mounted = true
    api.get("finance/income/report/?from=2022-01-01&to=2022-01-31&plastik=True").then(res=>{
      if(mounted){
        setYankirim(res)
        console.log(res, "total")
      }
    })
    api.get("finance/income/report/?from=2022-02-01&to=2022-02-28&plastik=True").then(res=>{
      if(mounted){
        setFevkirim(res)
        console.log(res, "fev")
      }
    })
    api.get("finance/income/report/?from=2022-03-01&to=2022-03-31&plastik=True").then(res=>{
      if(mounted){
        setMartkirim(res)
        console.log(res, "mart")
      }
    })
    return ()=>{
      mounted = true
    }
  }, [])

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const function1 = () => {
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
    api.get("finance/cashbox").then((res) => {
      if (mounted) {
        setData3(res);
      }
    });
    api.get("storage/products/dashboard").then((res) => {
      console.log(res);
      if (mounted) {
        const data = Object.values(res);
        setData4(data);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function6 = () => {
    let mounted = true;
    api.get("finance/income/?plastik=True").then((res) => {
      if (mounted) {
        setPlastik(res);
        console.log(res, "plastik");
      }
    });
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    function1();
    function6();
  }, []);

  const function2 = () => {
    setCircle1(!circle1);
    setCircle2(false);
    setCircle3(false);
    setCircle4(false);
  };
  const function3 = () => {
    setCircle2(!circle2);
    setCircle1(false);
    setCircle3(false);
    setCircle4(false);
  };
  const function4 = () => {
    setCircle3(!circle3);
    setCircle1(false);
    setCircle2(false);
    setCircle4(false);
  };
  const function5 = () => {
    setCircle4(!circle4);
    setCircle1(false);
    setCircle3(false);
    setCircle2(false);
  };
  const sums1 = data3.reduce((sum1, item) => sum1 + item.cash_sum, 0);
  const sums2 = data3.reduce((sum2, item) => sum2 + item.cash_dollar, 0);
  const sums3 = data3.reduce((sum3, item) => sum3 + item.bank, 0);
  const sums4 = data3.reduce((sum3, item) => sum3 + item.card, 0);
  const final = data1.filter((item) => item.company_debt.dollar != undefined);
  const finals = data1.filter((item) => item.company_debt["so'm"] != undefined);
  const finals1 = data2.filter((item) => item.client_debt["so'm"] != undefined);
  const finals2 = data2.filter((item) => item.client_debt.dollar != undefined);
  const final2 = final.reduce((a, b) => a + b.company_debt.dollar, 0);
  const final3 = finals.reduce((a, b) => a + b.company_debt["so'm"], 0);
  const final4 = finals1.reduce((a, b) => a + b.client_debt["so'm"], 0);
  const final5 = finals2.reduce((a, b) => a + b.client_debt.dollar, 0);

  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  return (
    <React.Fragment>
      <DataPick />
      <div className="all_charts">
        <div className="line_chart_head">
          <span className="pul_aylanma">Pul aylanma</span>
          <div className="select_line">
            <p className="line_name" onClick={function2}>
              <span className={circle1 ? "line_circle2" : "line_circle"}></span>
              <span>Plastik</span>
            </p>
            <p className="line_name" onClick={function3}>
              <span className={circle2 ? "line_circle2" : "line_circle"}></span>
              <span>Dollar</span>
            </p>
            <p className="line_name" onClick={function4}>
              <span className={circle3 ? "line_circle2" : "line_circle"}></span>
              <span>Bank</span>
            </p>
            <p className="line_name" onClick={function5}>
              <span className={circle4 ? "line_circle2" : "line_circle"}></span>
              <span>So'm</span>
            </p>
          </div>
        </div>
        <div className="area_chart">
          {circle1 ? (
            <ResponsiveContainer
              width="68%"
              height={300}
              className="line_chart"
            >
              <AreaChart
                data={data}
                margin={{ top: 35, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA1A03" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FA1A03" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="kirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0051FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0051FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Chiqim"
                  stroke="#FA1A03"
                  strokeWidth="4"
                  fillOpacity={1}
                  fill="url(#chiqim)"
                />
                <Area
                  type="monotone"
                  dataKey="Kirim"
                  stroke="#0051FE"
                  strokeWidth="3"
                  fillOpacity={1}
                  fill="url(#kirim)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : circle2 ? (
            <ResponsiveContainer
              width="68%"
              height={300}
              className="line_chart"
            >
              <AreaChart
                data={data5}
                margin={{ top: 35, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA1A03" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FA1A03" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="kirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0051FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0051FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Chiqim"
                  stroke="#FA1A03"
                  strokeWidth="4"
                  fillOpacity={1}
                  fill="url(#chiqim)"
                />
                <Area
                  type="monotone"
                  dataKey="Kirim"
                  stroke="#0051FE"
                  strokeWidth="3"
                  fillOpacity={1}
                  fill="url(#kirim)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : circle3 ? (
            <ResponsiveContainer
              width="68%"
              height={300}
              className="line_chart"
            >
              <AreaChart
                data={data}
                margin={{ top: 35, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA1A03" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FA1A03" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="kirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0051FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0051FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Chiqim"
                  stroke="#FA1A03"
                  strokeWidth="4"
                  fillOpacity={1}
                  fill="url(#chiqim)"
                />
                <Area
                  type="monotone"
                  dataKey="Kirim"
                  stroke="#0051FE"
                  strokeWidth="3"
                  fillOpacity={1}
                  fill="url(#kirim)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : circle4 ? (
            <ResponsiveContainer
              width="68%"
              height={300}
              className="line_chart"
            >
              <AreaChart
                data={data}
                margin={{ top: 35, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA1A03" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FA1A03" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="kirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0051FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0051FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Chiqim"
                  stroke="#FA1A03"
                  strokeWidth="4"
                  fillOpacity={1}
                  fill="url(#chiqim)"
                />
                <Area
                  type="monotone"
                  dataKey="Kirim"
                  stroke="#0051FE"
                  strokeWidth="3"
                  fillOpacity={1}
                  fill="url(#kirim)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer
              width="68%"
              height={300}
              className="line_chart"
            >
              <AreaChart
                data={data}
                margin={{ top: 35, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chiqim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FA1A03" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FA1A03" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="kirim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0051FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0051FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Chiqim"
                  stroke="#FA1A03"
                  strokeWidth="4"
                  fillOpacity={1}
                  fill="url(#chiqim)"
                />
                <Area
                  type="monotone"
                  dataKey="Kirim"
                  stroke="#0051FE"
                  strokeWidth="3"
                  fillOpacity={1}
                  fill="url(#kirim)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          <div className="director_ombor">
            <div className="director_report">
              <p className="director_Ombor" style={{marginLeft:"6px"}}>Ombor</p>
              <p className="director_report_currency" style={{marginLeft:"6px"}}>Homashyo</p>
              <p className="director_report_currency" style={{marginLeft:"6px"}}>Yarim tayyor</p>
              <p className="director_report_currency" style={{marginLeft:"6px"}}>Tayyor</p>
              <p className="director_report_currency" style={{marginLeft:"6px"}}>Inventar</p>
            </div>
            <div className="director_report">
              <p className="director_report_currency">So'm</p>
              {data4.map((item) => {
                return (
                  <p className="director_report_currency">
                    <NumberFormat
                      value={item["so'm"]}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </p>
                );
              })}
            </div>
            <div className="director_report">
              <p className="director_report_currency">Dollar</p>
              {data4.map((item) => {
                return (
                  <p className="director_report_currency">
                    <NumberFormat
                      value={item.dollar}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="director_hisob">
          <div className="director_hisob1">
            <div className="director_hisob2">
              <span>So’m</span>
            </div>
            <div className="director_hisob3">
              <span>
                <NumberFormat
                  value={sums1}
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </span>
            </div>
          </div>
          <div className="director_hisob1">
            <div className="director_hisob2">
              <span>Dollar</span>
            </div>
            <div className="director_hisob3">
              <span>
                <NumberFormat
                  value={sums2}
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </span>
            </div>
          </div>
          <div className="director_hisob1">
            <div className="director_hisob2">
              <span>Bank</span>
            </div>
            <div className="director_hisob3">
              <span>
                <NumberFormat
                  value={sums3}
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </span>
            </div>
          </div>
          <div className="director_hisob1">
            <div className="director_hisob2">
              <span>Plastik karta</span>
            </div>
            <div className="director_hisob3">
              <span>
                <NumberFormat
                  value={sums4}
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="director_table">
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
      </div>
    </React.Fragment>
  );
};

export default PulStatistikasi;
