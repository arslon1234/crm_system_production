import React, { useState } from "react";
import DataPick from "./data_pick";
import DatePicker from "react-datepicker";
import { PieChart, Pie, Cell } from "recharts";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import shape from "../../Icons/Shape.svg";

import "react-datepicker/dist/react-datepicker.css";

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
    Chiqim: 4000,
    Kirim: 2400,
  },
  {
    name: "Sent",
    Chiqim: 3000,
    Kirim: 1398,
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
//  function CostomTooltip1({ active, payload }) {
// 	if (active) {
// 	  return (
// 		 <div className="pie_tooltip">
// 			<p>Chiqim : $ {payload[0].value.toFixed(0)}</p>
// 			<p>Kirim : $ {payload[0].value.toFixed(0)}</p>
// 		 </div>
// 	  );
// 	}
// 	return null;
//  }
////////////  line chart end ////////////

////////////  pie chart start ////////////
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

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  return (
    <React.Fragment>
      <DataPick />
      <div className="all_charts">
        <div className="area_chart">
          <h2>Faoliyat</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
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
                strokeWidth="3"
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
        </div>
        <div className="chart_down">
          <div className="chart_1">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
          <div className="chart_2">
            <div className="pie_data">
              <h2>Umumiy Statistika</h2>
              <div className="pie_data_pick">
                <DatePicker
                  selected={startDate1}
                  onChange={(date) => setStartDate1(date)}
                  selectsStart
                  startDate={startDate1}
                  endDate={endDate1}
                  dateFormat="dd/MMM/yyyy"
                  placeholderText="dan..."
                />
                <img className="shape" src={shape} alt="" />
                <DatePicker
                  selected={endDate1}
                  onChange={(date) => setEndDate1(date)}
                  selectsEnd
                  startDate={startDate1}
                  endDate={endDate1}
                  dateFormat="dd/MMM/yyyy"
                  minDate={startDate1}
                  placeholderText="gacha..."
                />
              </div>
            </div>
            <PieChart width={300} height={300}>
              <Pie
                data={datapie}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CostomTooltip />} />
            </PieChart>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
