import React, {useCallback, useEffect, useRef, useState} from "react";
import DataPick from "./data_pick";
import {api} from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";


const Buyurtmatarixi = ({keyword}) => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterByPeriod, setFilterByPeriod] = useState("");
    const timer = useRef(null);

    const filterByDate = useCallback(() => {
        setLoading(true);
        const dayStart = startDate.getDate();
        const monthStart = startDate.getMonth() + 1;
        const yearStart = startDate.getFullYear();
        const dayEnd = endDate.getDate();
        const monthEnd = endDate.getMonth() + 1;
        const yearEnd = endDate.getFullYear();
        if (startDate && endDate) {
            api.get("sales/production-orders", {
                params: {
                    status: "Tayyor",
                    from: `${yearStart}-${monthStart}-${dayStart}`,
                    to: `${yearEnd}-${monthEnd}-${dayEnd}`,
                },
            })
                .then((res) => {
                    setLoading(false);
                    setData(res.results)
                });
        }
    }, [startDate, endDate]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (keyword.length > 0) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("sales/production-orders", {
                    params: {
                        status: "Tayyor",
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if (mounted) {
                        setLoading(false);
                        setData(res.results)
                    }
                })
            }, 500);
            return () => {
                clearTimeout(timer.current)
            }
        } else if (keyword.length < 1) {
            api.get("sales/production-orders/?status=Tayyor").then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        return () => {
            mounted = false
        }
    }, [keyword]);


    useEffect(() => {
        setLoading(true);
        let mounted = true;
        const monthDate = new Date();
        let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
        let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
        let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
        if (filterByPeriod === "month") {
            api.get("sales/production-orders/", {
                params: {
                    status: "Tayyor",
                    from: moment(oneMonthAgo).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        if (filterByPeriod === "week") {
            api.get("sales/production-orders/", {
                params: {
                    status: "Tayyor",
                    from: moment(oneWeekAgo).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        if (filterByPeriod === "day") {
            api.get("sales/production-orders/", {
                params: {
                    status: "Tayyor",
                    from: moment(monthDate).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        if (filterByPeriod === "year") {
            api.get("sales/production-orders/", {
                params: {
                    status: "Tayyor",
                    from: moment(oneYearsAgo).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }

        return () => {
            mounted = true;
        };
    }, [filterByPeriod]);

    return (
        <React.Fragment>
            <div className="buyurtma_btn">
                <DataPick
                    endDate={endDate}
                    startDate={startDate}
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
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
            <div className="table">
                <table id="to_Excel">
                    <thead>
                    <tr>
                        <th>
                            <p> # </p>
                        </th>
                        <th>
                            <p> Mahsulot nomi</p>
                        </th>
                        <th>
                            <p>Miqdori (kg)</p>
                        </th>
                        <th>
                            <p>Muddati</p>
                        </th>
                        <th>
                            <p>Izoh</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && data && data?.map((x, index) => (
                        <tr key={x.id}>
                            <th>{index + 1}</th>
                            <th>{x.title}</th>
                            <th>{x.quantity}</th>
                            <th>{x.deadline}</th>
                            <th>{x.description}</th>
                        </tr>
                    ))}
                    {loading &&
                    <>
                        <SkeletonLoader count={5}/>
                        <SkeletonLoader count={5}/>
                        <SkeletonLoader count={5}/>
                    </>
                    }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
    // }
};

export default Buyurtmatarixi;
