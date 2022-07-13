import React, {useCallback, useEffect, useRef, useState} from "react";
import DataPick from "./data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {useHistory} from "react-router-dom";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import plus from "../../Icons/plus.png";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import InputField from "../../inputs/InputField";
import AcceptModal from "../../modal/AcceptModal";
import FacturaTable from "./FacturaTable";
import {api} from "../../../api/api";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import AcceptModal3 from "../../modal/AcceptModal3";

function Factura({url, keyword}) {
    const [data, setData] = useState([]);
    const [dataCreate, setDataCreate] = useState([]);
    const [idFactura, setIdFactura] = useState("");
    const [storages, setStorages] = useState([]);
    const [supliers, setSupliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [acceptFactura, setAcceptFactura] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAccept, setModalAccept] = useState(false);
    const [filterByFromWho, setFilterByFromWho] = useState("");
    const timer = useRef(null);
    const [next, setNext] = useState("");

    const handleChange = (name, value) => {
        setDataCreate({
            ...dataCreate,
            [name]: value
        })
    };
    const handleOpen = () => {
        setModal(true);
    };

    const handleClose = () => {
        setModal(false);
    };

    const handleCreateFactura = useCallback(() => {
        api.post("storage/invoices/", {
            title: dataCreate.title,
            supplier: dataCreate.supplier,
            storage: dataCreate.storage,
            responsible: dataCreate.responsible,
            type: "Kirish"
        }).then(res => {
            if (res.id) {
                setModal(false);
                api.get("storage/invoices/", {
                    params: {
                        type: "Kirish",
                        status: "None"
                    }
                }).then(res => {
                    setData(res.results)
                    setNext(res.next)
                });
            }
        })
    }, [dataCreate]);
    const onSaveOrRejectClick = useCallback(() => {
        if (acceptFactura) {
            api.post(`storage/invoices/${idFactura}/save_invoice/`).then(res => {
                if (res.success === true) {
                    setModalAccept(false);
                    setModalAlert(true);
                }
            }).then(() => {
                api.get("storage/invoices/", {
                    params: {
                        type: "Kirish",
                        status: "None"
                    }
                }).then(res => {
                    setData(res.results)
                })
            })
        } else if (!acceptFactura) {
            api.patch(`storage/invoices/${idFactura}/`, {
                status: "Cancelled"
            }).then((res) => {
                if (res.status === "Cancelled") {
                    setModalDelete(true);
                    setModalAccept(false);
                    api.get("storage/invoices/", {
                        params: {
                            type: "Kirish",
                            status: "None"
                        }
                    }).then(res => {
                        setData(res.results)
                    })
                }
            })
        }
    }, [idFactura, acceptFactura]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (filterByFromWho && filterByFromWho !== "all") {
            api.get("storage/invoices/", {
                params: {
                    type: "Kirish",
                    status: "None",
                    from_who: filterByFromWho
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }else if(filterByFromWho === "all") {
            api.get("storage/invoices/", {
                params: {
                    type: "Kirish",
                    status: "None"
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            })
        }
        return () => {
            mounted = false;
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
            api.get("supplier/suppliers/").then(res => {
                if (mounted) {
                    setSupliers(res)
                    console.log(res, "supplier")
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
        if(keyword.length > 0) {
            if(timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("storage/invoices/", {
                    params: {
                        type: "Kirish",
                        status: "None",
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if(mounted) {
                        setLoading(false);
                        setData(res.results)
                        setNext(res.next)
                        console.log(res.results, "results")
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
                status: "None"
            }
        }).then(res => {
            if (mounted) {
                setLoading(false);
                setData(res.results)
                setNext(res.next)
                console.log(res.results, "results")
            }
        });}
        return () => {
            mounted = false;
        }
    }, [keyword]);
    const nextData = useCallback(() => {
        api.get(`${next}`).then(res => {
            setData(prev => [...prev, ...res.results]);
            setNext(res.next)
        })
    }, [next]);
    return (
        <React.Fragment>
            <div className="buyurtma_btn">
                <div className="opacity-none"><DataPick/></div>

                <div className="buyurtma_btns">
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="exel_btn"
                        table="to_Excel"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Excelga export"
                    />
                    <button className="modal_open create_btn" type="button" onClick={handleOpen}>
                        <p>Factura yaratish</p>
                        <span className="plus">
              <img src={plus} alt=""/>
            </span>
                    </button>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modal}
                    onClose={handleClose}
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
                            {/*<TextField*/}
                            {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
                            {/*    id="outlined-basic"*/}
                            {/*    label="Kelish narxi"*/}
                            {/*    variant="outlined"*/}
                            {/*/>*/}
                            <InputField text="Factura nomi" width="90%" margin="20px 0  0  0"
                                        setData={(e) => handleChange("title", e.target.value)}
                            />
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Kimdan
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => handleChange("supplier", e.target.value)}
                                    label="Kimdan"
                                >
                                    {supliers.map((x) => {
                                        return <MenuItem value={x.id} key={x.id}>{x.title}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <InputField text="Masul shaxs" width="90%" margin="20px 0  0  0"
                                        setData={(e) => handleChange("responsible", e.target.value)}
                            />
                            <FormControl variant="outlined" className="form_select">
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Kimga
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={(e) => handleChange("storage", e.target.value)}
                                    label="Kimga"
                                >
                                    {storages.map((x) => {
                                        return <MenuItem value={x.id} key={x.id}>{x.title}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            <InputField text="Sana  " width="90%" margin="20px 0 0 0" disabled={true}/>
                            <div className="modal_close">
                                <button onClick={handleCreateFactura}>Saqlash</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <WarningModal open={modalAlert} close={() => setModalAlert(prev => !prev)}
                              text1={"Faktura muvaffaqiyatli"} text2={"O'chirish"}/>
                <DeleteModal open={modalDelete} close={() => setModalDelete(prev => !prev)}
                             text2={"Faktura bekor qilindi."}
                />
                <AcceptModal3 open={modalAccept} close={() => setModalAccept(prev => !prev)} onSaveClick={onSaveOrRejectClick} acceptFactura={acceptFactura}/>
            </div>
            <FacturaTable btn={true} receive={true} url={url} data={data} openSaveModal={setModalAccept}
                          setId={setIdFactura} setSuppliersClick={setFilterByFromWho}
                          setAcceptFactura={setAcceptFactura} loading={loading} setLoading={setLoading} id="to_Excel" next={nextData}/>
        </React.Fragment>
    );
};

export default Factura;
