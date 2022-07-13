import React, {useCallback, useEffect, useRef, useState} from "react";
import DataPick from "./data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import {api} from "../../../api/api";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import plus from "../../Icons/plus.png";
import TabSwitcher from "./TabSwitcher";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import InputField from "../../inputs/InputField";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Tabs = {
    YAROQSIZ: "YAROQSIZ",
    QAYTA_ISHLASH: "QAYTA ISHLASH",
}

function QaytaIshlashNotValid({keyword}) {
    const [data, setData] = useState([]);
    const [createData, setCreateData] = useState([]);
    const [loading ,setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [activeTab, setActiveTab] = useState(Tabs.YAROQSIZ);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterByPeriod, setFilterByPeriod] = useState("");
    const timer = useRef(null);

    const handleChange = (name, value) => {
        setCreateData({
            ...createData,
            [name]: value
        })
    };

    const TAB_LIST = [
        {label: "YAROQSIZ", name: Tabs.YAROQSIZ},
        {label: "QAYTA ISHLASH", name: Tabs.QAYTA_ISHLASH},
    ];

    const totalQuantity = data?.reduce((sum, {quantity}) => sum + quantity, 0);
    const totalCost = data?.reduce((sum, {summa}) => sum + summa, 0);

    const sendToClick = useCallback(() => {
        api.post("storage/send-valid/", {
            product: createData.product.id,
            to_who: "",
            quantity: createData.quantity,
            description: createData.description
        }).then(res => {
            if (res.id) {
                setModal(false);
                api.get("storage/returned-products/", {
                    params: {
                        wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
                        status: "Saved"
                    }
                }).then(res => setData(res.results))
            }
        })
    }, [createData]);

    const filterByDateCLick = useCallback(() => {
        setLoading(true);
        const dayStart = startDate.getDate();
        const monthStart = startDate.getMonth() + 1;
        const yearStart = startDate.getFullYear();
        const dayEnd = endDate.getDate();
        const monthEnd = endDate.getMonth() + 1;
        const yearEnd = endDate.getFullYear();
        if (startDate && endDate) {
            api.get("storage/returned-products/", {
                params: {
                    wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
                    status: "Saved",
                    from: `${yearStart}-${monthStart}-${dayStart}`,
                    to: `${yearEnd}-${monthEnd}-${dayEnd}`
                }
            }).then((res) => {
                setLoading(false);
                setData(res.results)
            })
        }
    }, [startDate, endDate, activeTab]);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (keyword.length > 0) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("storage/returned-products/", {
                    params: {
                        wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
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
        api.get("storage/returned-products/", {
            params: {
                wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
                status: "Saved"
            }
        }).then(res => {
            if (mounted) {
                setLoading(false);
                setData(res.results)
            }
        }); }
        return () => {
            mounted = false
        }
    }, [activeTab, keyword]);

    useEffect(() => {
        setLoading(true);
        let mounted = true;
        const monthDate = new Date();
        let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
        let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
        let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
        if (filterByPeriod === "year") {
            api.get("storage/returned-products/", {
                params: {
                    wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
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
            api.get("storage/returned-products/", {
                params: {
                    wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
                    status: "Saved",
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
            api.get("storage/returned-products/", {
                params: {
                    wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
                    status: "Saved",
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
            api.get("storage/returned-products/", {
                params: {
                    wasted: activeTab === Tabs.YAROQSIZ ? "True" : "False",
                    status: "Saved",
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
    }, [filterByPeriod, activeTab]);

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
                {activeTab === Tabs.QAYTA_ISHLASH && <div className="buyurtma_btns">
                    <button className="modal_open create_btn" type="button" onClick={() => setModal(true)}>
                        <p>Qata ishlashga yuborish</p>
                        <span>
              <img src={plus} alt=""/>
            </span>
                    </button>
                </div>}
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
                            <h1>Qayta ishlashga yuborish</h1>
                            {/*<TextField*/}
                            {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
                            {/*    id="outlined-basic"*/}
                            {/*    label="Kelish narxi"*/}
                            {/*    variant="outlined"*/}
                            {/*/>*/}
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Brak mahsulot nomi
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => handleChange("product", e.target.value)}
                                    label="Brak_mahsulot_nomi"
                                >{data && data.map((x) => (
                                    <MenuItem value={x} key={x.id}>{x.product.title}</MenuItem>
                                ))
                                }
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Kimga
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => handleChange("to_who", e.target.value)}
                                    label="Kimga"
                                >
                                    <MenuItem value="Sardor">Sardor</MenuItem>
                                    <MenuItem value="Islom">Islom</MenuItem>
                                </Select>
                            </FormControl>
                            <div className="miqdori">
                                <TextField
                                    className="miqdor_input"
                                    onChange={(e) => handleChange("quantity", e.target.value)}
                                    id="outlined-basic"
                                    label="Miqdori"
                                    variant="outlined"
                                />
                                <InputField
                                    width="80%"
                                    margin="20px 0 0 0"
                                    text="O'lchov b."
                                    value={createData?.product?.product?.measurement_unit}
                                />
                            </div>
                            <InputField text="Izoh" width="90%" margin="20px 0 0 0"
                                        setData={(e) => handleChange("description", e.target.value)}/>
                            <div className="modal_close">
                                <button onClick={sendToClick}>Buyurtma berish</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <WarningModal open={modalAlert} close={() => setModalAlert(prev => !prev)} text1={"“Product N”"}
                              text2={"mahsulotlar omboriga saqlandi."}/>
                <DeleteModal open={modalDelete} close={() => setModalDelete(prev => !prev)} text1={"“Product N”"}
                             text2={"mahsulotlar omboridan o`chirildi."}/>
            </div>
            <TabSwitcher onChangeTab={setActiveTab} activeTab={activeTab} tabList={TAB_LIST}/>
            {activeTab === Tabs.YAROQSIZ &&
            <div className="table">
                <table id="to_Excel">
                    <thead>
                    <tr>
                        <th>
                            <p> № </p>
                        </th>
                        <th style={{textAlign:"start"}}>
                            <p>Nomi</p>
                        </th>
                        <th>
                            <p> Miqdori </p>
                        </th>
                        <th>
                            <p> Zarar </p>
                        </th>
                        <th>
                            <p> Sana</p>
                        </th>
                        <th>
                            <p> Javobgar shaxs</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && data && data.map((x, index) => (
                        <tr key={x.id}>
                            <th>{index + 1}</th>
                            <th style={{textAlign:"start", width:"130px"}}>{x.product.title}</th>
                            <th>{x.quantity} {x.product.measurement_unit}</th>
                            <th className="color-danger">{x.summa}</th>
                            <th>{x.returned_at}</th>
                            <th>{x.responsible}</th>
                        </tr>
                    ))
                    }
                   {!loading && data.length > 0 && <tr>
                        <th></th>
                        <th>Jami:</th>
                        <th>{totalQuantity} {data[0]?.product?.measurement_unit}</th>
                        <th className="color-danger">{totalCost}</th>
                        <th></th>
                        <th></th>
                    </tr>}
                    {loading &&
                    <>
                        <SkeletonLoader count={7}/>
                        <SkeletonLoader count={7}/>
                        <SkeletonLoader count={7}/>
                    </>
                    }
                    </tbody>
                </table>
            </div>}
            {activeTab === Tabs.QAYTA_ISHLASH &&
            <div className="table">
                <table id="to_Excel">
                    <thead>
                    <tr>
                        <th style={{textAlign:"start"}}>
                            <p> № </p>
                        </th>
                        <th>
                            <p>Nomi</p>
                        </th>
                        <th>
                            <p> Miqdori </p>
                        </th>
                        <th>
                            <p> Zarar </p>
                        </th>
                        <th>
                            <p> Sana</p>
                        </th>
                        <th>
                            <p> Javobgar shaxs</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && data && data.map((x, index) => (
                        <tr key={x.id}>
                            <th>{index + 1}</th>
                            <th style={{textAlign:"start", width:"130px"}}>{x.product.title}</th>
                            <th>{x.quantity} {x.measurement_unit}</th>
                            <th className="color-danger">{x.summa}</th>
                            <th>{x.returned_at}</th>
                            <th>{x.responsible}</th>
                        </tr>
                    ))}
                    {loading &&
                    <>
                        <SkeletonLoader count={7}/>
                        <SkeletonLoader count={7}/>
                        <SkeletonLoader count={7}/>
                    </>
                    }
                    </tbody>
                </table>
            </div>}
        </React.Fragment>
    );
};

export default QaytaIshlashNotValid;
