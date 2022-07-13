import React, {useCallback, useEffect, useRef, useState} from "react";
import DataPick from "./data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {api} from "../../../api/api";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import plus from "../../Icons/plus.png";
import WarningModal from "../../modal/WarningModal";
import InputField from "../../inputs/InputField";
import AcceptModal from "../../modal/AcceptModal";
import FacturaTable from "./FacturaTable";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function FacturaSend({url, keyword}) {
    const [data, setData] = useState([]);
    const [dataSendCreate, setDataSendCreate] = useState([]);
    const [storages, setStorages] = useState([]);
    const [clients, setClients] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading , setLoading] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalAccept, setModalAccept] = useState(false);
    const [filterByFromWho, setFilterByFromWho] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterByPeriod, setFilterByPeriod] = useState("");
    const timer = useRef(null);
    const [next, setNext] = useState("");
    const handleChange = (name, value) => {
        setDataSendCreate({
            ...dataSendCreate,
            [name]: value
        })
    };

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
                    type: "Chiqish",
                    status: "None",
                    from: `${yearStart}-${monthStart}-${dayStart}`,
                    to: `${yearEnd}-${monthEnd}-${dayEnd}`
                }
            }).then((res) => {
                setLoading(false);
                setData(res.results)
            })
        }
    }, [startDate, endDate]);

    const handleCreateFactura = useCallback(() => {
        api.post("storage/invoices/", {
            title: dataSendCreate.title,
            storage: dataSendCreate.storage,
            client: dataSendCreate.client,
            responsible: dataSendCreate.responsible,
            type: "Chiqish"
        }).then((res) => {
            if (res.id) {
                setModal(false);
                api.get("storage/invoices/?type=Chiqish&status=None").then((res) => {
                    setData(res.results)
                    setNext(res.next)
                });
            }
        })
    }, [dataSendCreate]);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if(filterByFromWho && filterByFromWho !== "all") {
            api.get("storage/invoices", {
               params: {
                   type: "Chiqish",
                   status: "None",
                   from_who: filterByFromWho
               }
            }).then(res => {
                if(mounted){
                    setLoading(false);
                    setData(res.results)
                }
            })
        } else if (filterByFromWho === "all") {
            api.get("storage/invoices/?type=Chiqish&status=None").then((res) => {
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
        if (modal) {
            api.get("storage/storages/").then(res => {
                if (mounted) {
                    setStorages(res)
                }
            });
            api.get("sales/clients/").then(res => {
                if (mounted) {
                    setClients(res)
                }
            });
        }
        return () => {
            mounted = false
        }
    }, [modal]);
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
                        status: "None",
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if (mounted) {
                        setLoading(false);
                        setData(res.results)
                        setNext(res.next)
                        console.log(res.results, "resResult")
                    }
                })
            }, 500);
            return () => {
                clearTimeout(timer.current)
            }
        } else if (keyword.length < 1) {
        api.get("storage/invoices/?type=Chiqish&status=None").then((res) => {
            if (mounted) {
                setLoading(false);
                setData(res.results)
                setNext(res.next)
                console.log(res.results, "resResult")
            }
        }); }
        return () => {
            mounted = false
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
                    status: "None",
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
                    status: "None",
                    from: moment(oneMonthAgo).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if(mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        if (filterByPeriod === "week") {
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "None",
                    from: moment(oneWeekAgo).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if(mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        if (filterByPeriod === "day") {
            api.get("storage/invoices/", {
                params: {
                    type: "Chiqish",
                    status: "None",
                    from: moment(monthDate).format("YYYY-MM-DD"),
                    to: moment(monthDate).format("YYYY-MM-DD"),
                },
            }).then((res) => {
                if(mounted) {
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
                <DataPick endDate={endDate}
                          setEndDate={setEndDate} setStartDate={setStartDate}
                          startDate={startDate} filterByDateClick={filterByDateCLick}
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
                <div className="buyurtma_btns">
                    <button
                        className="modal_open create_btn"
                        type="button"
                        onClick={() => setModal(true)}
                    >
                        <p>Factura yaratishzsss</p>
                        <span>
              <img src={plus} alt=""/>
            </span>
                    </button>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modal}
                    onClose={() => setModal(false)}
                    className="dflax"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modal}>
                        <div className="modal_input factura-modal">
                            <h1>Factura yaratish</h1>
                            <InputField
                                text="Factura nomi"
                                width="90%"
                                setData={(e) => handleChange("title", e.target.value)}
                                margin="20px 0  0  0"
                            />
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Kimga
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => handleChange("client", e.target.value)}
                                    label="Kimga"
                                >
                                    {clients.map((x) => {
                                        return <MenuItem value={x.id} key={x.id}>{x.title}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <InputField
                                text="Masul shaxs"
                                width="90%"
                                setData={(e) => handleChange("responsible", e.target.value)}
                                margin="20px 0  0  0"
                            />
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Kimdan
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => handleChange("storage", e.target.value)}
                                    label="Kimdan"
                                >
                                    {storages.map((x) => {
                                        return <MenuItem value={x.id} key={x.id}>{x.title}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <InputField text="Sana" width="90%" margin="20px 0 0 0" disabled={true}/>
                            <div className="modal_close">
                                <button onClick={handleCreateFactura}>Saqlash</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <WarningModal
                    open={modalAlert}
                    close={() => setModalAlert((prev) => !prev)}
                    text2={"Faktura muvaffaqiyatli yuborildi."}
                />
                <AcceptModal
                    open={modalAccept}
                    close={() => setModalAccept((prev) => !prev)}
                />
            </div>
            <FacturaTable btn={false} receive={false} url={url} data={data} setSuppliersClick={setFilterByFromWho} loading={loading} id="to_Excel" next={nextData}/>
        </React.Fragment>
    );
}

export default FacturaSend;
