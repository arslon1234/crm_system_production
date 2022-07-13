import React, { useState } from 'react';
import DatePicker from "react-datepicker"
import calendar from "../../Icons/calendar.svg"
import "react-datepicker/dist/react-datepicker.css";

const DataPick = () =>{

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const [filter, setFilter] = useState(false)

	const handleFilter = () =>{
		setFilter(!filter)
	}
	return(
		<React.Fragment>
			<div className="data_div">
				<button className="filter_btn" onClick={handleFilter}>
					<span></span><span></span><span></span>
				</button>
				<div className={filter === false ? "data" : "data filter_on"}>
					<button onClick={handleFilter} className="filter_close"><span></span><span></span></button>
					<img src={calendar} alt="" />
					<a href="#kun">Kun</a>
					<a href="#hafta">Hafta</a>
					<a href="#oy">Oy</a>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						dateFormat="dd MMM yyyy"
						placeholderText="dan..."
					/>
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						dateFormat="dd MMM yyyy"
						minDate={startDate}
						placeholderText="gacha..."
					/>
					<button className="saralash" onClick={handleFilter}>Saralash</button>
				</div>
			</div>
			
		</React.Fragment>
	)
}

export default DataPick;
