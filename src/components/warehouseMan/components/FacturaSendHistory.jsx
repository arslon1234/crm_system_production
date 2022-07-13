import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import DataPick from "./data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import {confirmAlert} from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {useHistory} from "react-router-dom";
import {api} from "../../../api/api";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import InputField from "../../inputs/InputField";
import AcceptModal from "../../modal/AcceptModal";
import FacturaTable from "./FacturaTable";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function FacturaSendHistory({url, keyword}) {
    const [data, setData] = useState([]);
    const [filterByFromWho, setFilterByFromWho] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [loading ,setLoading] = useState(false);
    const [filterByPeriod, setFilterByPeriod] = useState("");
    const timer = useRef(null);

    const filterByDateCLick = useCallback(() => {
        const dayStart = startDate.getDate();
        setLoading(true);
        const monthStart = startDate.getMonth() + 1;
        const yearStart = startDate.getFullYear();
        const dayEnd = endDate.getDate();
        const monthEnd = endDate.getMonth() + 1;
        const yearEnd = endDate.getFullYear();
        if (startDate && endDate) {
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "Saved",
                    from: `${yearStart}-${monthStart}-${dayStart}`,
                    to: `${yearEnd}-${monthEnd}-${dayEnd}`
                }
            }).then((res) => {
                setLoading(false);
                setData(res.results)
            })
        }
    }, [startDate, endDate]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (filterByFromWho && filterByFromWho !== "all") {
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "Saved",
                    from_who: filterByFromWho
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            })
        } else if (filterByFromWho === "all") {
            api.get("storage/invoices/?type=Chiqish&status=Saved").then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        return () => {
            mounted = false
        }
    }, [filterByFromWho]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (keyword.length > 0) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("storage/invoices", {
                    params: {
                        type: "Chiqish",
                        status: "Saved",
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
            api.get("storage/invoices/?type=Chiqish&status=Saved").then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        return () => {
            mounted = false;
        }
    }, [keyword]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        const monthDate = new Date();
        let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
        let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
        let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
        if (filterByPeriod === "year") {
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "Saved",
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
        if (filterByPeriod === "month") {
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "Saved",
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
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "Saved",
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
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "Saved",
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

        return () => {
            mounted = true;
        };
    }, [filterByPeriod]);

    return (
        <React.Fragment>
            <div className="buyurtma_btn">
                <DataPick startDate={startDate} setStartDate={setStartDate} setEndDate={setEndDate}
                          endDate={endDate} filterByDateClick={filterByDateCLick} setClickByPeriod={setFilterByPeriod}
                          clickByPeriod={filterByPeriod}/>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="exel_btn"
                    table="to_Excel"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Excelga export"
                />
            </div>
            <FacturaTable btn={false} url={url} receive={false} data={data} setSuppliersClick={setFilterByFromWho}
                          historyPage={true} loading={loading} id="to_Excel"/>
        </React.Fragment>
    );
};

export default FacturaSendHistory;
