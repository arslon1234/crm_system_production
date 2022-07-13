import React, {useCallback, useEffect, useRef, useState} from "react";
import plus from "../../Icons/plus.png";
import {LeftIcon} from "../../iconComponents/LeftIcon";
import FacturaIdTable from "./FacturaIdTable";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {useHistory} from "react-router-dom";
import {api} from "../../../api/api";
import AcceptModal from "../../modal/AcceptModal";
import WarningModal from "../../modal/WarningModal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InputField from "../../inputs/InputField";
import TextField from "@material-ui/core/TextField/TextField";
export default function FacturaSendId({url, keyword}) {
    const [data, setData] = useState([]);
    const [createData, setCreateData] = useState([]);
    const [modalAccept, setModalAccept] = useState(false);
    const [productData, setProductData] = useState([]);
    const [modalAlert, setModalAlert] = useState(false);
    const [filterByFromWho, setFilterFromWho] = useState("");
    const [loading , setLoading] = useState(false);
    const [filterProduct, setFilterProduct] = useState("");
    const timer = useRef(null);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const urlId = window.location.href.split('/');

    const handleChange = (name, value) => {
        setCreateData({
            ...createData,
            [name]: value
        })
    };
    const handleCreateProduct = useCallback(() => {
        api.post("storage/product-orders/", {
            invoice: urlId[6],
            product: createData.product.id,
            asked_quantity: createData.quantity,
            found_quantity: createData.quantity,
            status: "Full",
            description: createData.description
        }).then(res => {
            if (res.id) {
                setModal(false);
                api.get("storage/product-orders/", {
                    params: {
                        invoice: urlId[6]
                    }
                }).then(res => setData(res.results))
            }
        })
    }, [createData]);
    useEffect(() => {
        let mounted = true;
        if (modal) {
            api.get("storage/products/", {
                params: {
                    type: createData.type
                }
            }).then(res => {
                if (mounted) {
                    setProductData(res.results)
                }
            });
            return () => {
                mounted = false;
            }
        }
    }, [createData.type]);
    const sendProducts = () => {
        api.post(`storage/invoices/${urlId[6]}/save_invoice/`).then(res => {
            if (res.success === true) {
                setModalAccept(false);
                setModalAlert(true);
                setData(res.results)
            }
        })
    };
    console.log(urlId, "urld")
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (filterByFromWho && filterByFromWho !== "all") {
            api.get("storage/product-orders/", {
                params: {
                    invoice: urlId[6],
                    from_who: filterByFromWho
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            })
        }
        if(filterByFromWho === "all" || filterProduct === "all") {
            api.get("storage/product-orders/", {
                params: {
                    invoice: urlId[6]
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            });
        }
        if (filterProduct && filterProduct !== "all") {
            api.get("storage/product-orders/", {
                params: {
                    invoice: urlId[6],
                    group: filterProduct
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                }
            })
        }
        return () => {
            mounted = false
        }
    }, [filterByFromWho, filterProduct]);
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if (keyword.length > 0) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("storage/product-orders/", {
                    params: {
                        invoice: urlId[6],
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
            api.get("storage/product-orders/", {
                params: {
                    invoice: urlId[6]
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
            clearTimeout()
        }
    }, [keyword]);
    return (
        <>
            <div className="buyurtma_btn id-factura">
                <div className="back-block">
                    <div onClick={() => history.replace(`${url}/chiqarish/fakturalar/`)}>
                        <LeftIcon/>
                    </div>
                    <span>{urlId[7].replace(/%20/g, " ") || data[0].invoice.title}</span>
                </div>
                <div className="modal-btn-block">
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
                        <p>Maxsulot qo'shish</p>
                        <span>
              <img src={plus} alt=""/>
            </span>
                    </button>
                </div>
                    <div className="buyurtma_btns">
                        <button className="modal_open create_btn" type="button" onClick={() => setModalAccept(true)}>
                            <p>Yukni chiqarish</p>
                            {/*<span>*/}
                            {/*  <img src={plus} alt=""/>*/}
                            {/*</span>*/}
                        </button>
                    </div>
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
                            <h1>Mahsulot qo'shish</h1>
                            <div>
                                <FormControl variant="outlined" className="form_select">
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Mahsulot turi
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => handleChange("type", e.target.value)}
                                        label="Mahsulot guruhi"
                                    >
                                        <MenuItem value="Tayyor">Tayyor</MenuItem>
                                        <MenuItem value="Yarim tayyor">Yarim tayyor</MenuItem>
                                        <MenuItem value="Homashyo">Homashyo</MenuItem>
                                        <MenuItem value="Inventar">Inventar</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className="form_select">
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Mahsulot nomi
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => handleChange("product", e.target.value)}
                                        label="Mahsulot guruhi"
                                    >
                                        {productData && productData.map((x) => (
                                            <MenuItem value={x}>{x.title}</MenuItem>
                                        ))
                                        }
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
                                    <InputField text="O'l. bir." width="80%" margin="20px 0  0  0"
                                                value={createData?.product?.measurement_unit?.title}/>
                                </div>
                                <InputField text="Yaroqlilik muddati" width="91%" margin="20px 0  0  0"
                                            value={createData?.product?.shelf_life}
                                />
                                <InputField text="Izoh" width="91%" margin="20px 0  0  0"
                                            setData={(e) => handleChange("description", e.target.value)}
                                />
                            </div>
                            <div className="modal_close">
                                <button  onClick={handleCreateProduct}>Saqlash</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <WarningModal open={modalAlert} close={() => setModalAlert(prev => !prev)} text1={"Yuk muvaffaqiyatli"}
                              text2={"chiqarildi."}/>
                <AcceptModal open={modalAccept} close={() => setModalAccept(prev => !prev)} send={true}
                             sendInvoice={sendProducts}/>
            </div>
            <FacturaIdTable send={true} data={data} setFilterFromWho={setFilterFromWho}
                            setFilterProduct={setFilterProduct} loading={loading} id="to_Excel"/>
        </>
    );
}
