import React, { useState } from "react";
import DatePicker from "react-datepicker";
import calendar from "../../Icons/calendar.svg";
import "react-datepicker/dist/react-datepicker.css";

const DataPick = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  filterByDateClick,
}) => {
  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);

  const [filter, setFilter] = useState(false);

  const handleFilter = () => {
    setFilter(!filter);
  };
  return (
    <React.Fragment>
      <div className="data_div">
        <button className="filter_btn" onClick={handleFilter}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={filter === false ? "data" : "data filter_on"}>
          <button onClick={handleFilter} className="filter_close">
            <span></span>
            <span></span>
          </button>
          <img src={calendar} alt="" />
          <a href="#kun">Kun</a>
          <a href="#hafta">Hafta</a>
          <a href="#oy">Oy</a>
          <DatePicker
            selected={startDate1 || startDate}
            onChange={(date) => {
              setStartDate1(date) || setStartDate(date);
            }}
            selectsStart
            startDate={startDate1 || startDate}
            endDate={endDate1 || endDate}
            dateFormat="dd MMM yyyy"
            placeholderText="dan..."
          />
          <DatePicker
            selected={endDate1 || endDate}
            onChange={(date) => {
              setEndDate1(date) || setEndDate(date);
            }}
            selectsEnd
            startDate={startDate1 || startDate}
            endDate={endDate1 || endDate}
            dateFormat="dd MMM yyyy"
            minDate={startDate1 || startDate}
            placeholderText="gacha..."
          />
          <button className="saralash" onClick={filterByDateClick}>
            Saralash
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataPick;
