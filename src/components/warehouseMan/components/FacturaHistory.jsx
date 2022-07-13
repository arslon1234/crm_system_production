import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import DataPick from "./data_pick";
import {useHistory} from "react-router-dom";
// import Autocomplete from "@material-ui/lab/Autocomplete";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import AcceptModal from "../../modal/AcceptModal";
import FacturaTable from "./FacturaTable";
import {api} from "../../../api/api";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function FacturaHistory({url, keyword}) {
    const [data, setData] = useState([]);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAccept, setModalAccept] = useState(false);
    const [loading , setLoading] = useState(false);
    const [filterByFromWho, setFilterByFromWho] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [page, setPage] = useState(1);
    const timer = useRef(null);
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const observer = useRef();
    const [next, setNext] = useState("");

    const [filterByPeriod, setFilterByPeriod] = useState("");

    const filterByDateCLick = useCallback(() => {
        setLoading(true);
        const dayStart = startDate.getDate();
        const monthStart = startDate.getMonth() + 1;
        const yearStart = startDate.getFullYear();
        const dayEnd = endDate.getDate();
        const monthEnd = endDate.getMonth() + 1;
        const yearEnd = endDate.getFullYear();
        if (startDate && endDate) {
            api.get("storage/invoices/", {
                params: {
                    type: "Kirish",
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
                    type: "Kirish",
                    status: "Saved",
                    from_who: filterByFromWho
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        } else if(filterByFromWho === "all") {
            api.get("storage/invoices/", {
                params: {
                    type: "Kirish",
                    status: "Saved"
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        return () => {
            mounted = false;
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
                api.get("storage/invoices/", {
                    params: {
                        type: "Kirish",
                        status: "Saved",
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if (mounted) {
                        setLoading(false);
                        setData(res.results);
                        setNext(res.next)
                    }
                })
            }, 500);
            return () => {
                clearTimeout(timer.current)
            }
        } else if (keyword.length < 1) {
            api.get("storage/invoices/", {
                params: {
                    type: "Kirish",
                    status: "Saved"
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results);
                    setNext(res.next)
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
                    type: "Kirish",
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
                    type: "Kirish",
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
                    type: "Kirish",
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
                    type: "Kirish",
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

    const nextData = useCallback(() => {
        api.get(`${next}`).then(res => {
            setData(prev => [...prev, ...res.results]);
            setNext(res.next)
        })
    }, [next]);
    return (
        <React.Fragment>
            <div className="buyurtma_btn">
                <DataPick startDate={startDate}
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                          endDate={endDate}
                          filterByDateClick={filterByDateCLick}
                          setClickByPeriod={setFilterByPeriod}
                          clickByPeriod={filterByPeriod}
                />
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="exel_btn"
                    table="to_Excel"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Excelga export"
                />
                <WarningModal open={modalAlert} close={() => setModalAlert(prev => !prev)}
                              text2={"Faktura bekor qilindi."}/>
                <DeleteModal open={modalDelete} close={() => setModalDelete(prev => !prev)}
                             text1={"Faktura muvaffaqiyatli"} text2={"qabul qilindi."}/>
                <AcceptModal open={modalAccept} close={() => setModalAccept(prev => !prev)}/>
            </div>
            <FacturaTable btn={false} url={url} receive={true} data={data} setSuppliersClick={setFilterByFromWho}
                          historyPage={true} loading={loading} setLoading={setLoading} id="to_Excel" childRef={childRef} parentRef={parentRef} next={nextData}/>
        </React.Fragment>
    );
};

export default FacturaHistory;
