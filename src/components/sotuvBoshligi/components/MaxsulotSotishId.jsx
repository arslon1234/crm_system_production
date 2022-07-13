import React, {useCallback, useEffect, useRef, useState} from "react";
import {LeftIcon} from "../../iconComponents/LeftIcon";
import plus from "../../Icons/plus.png";
import {useHistory} from "react-router-dom"
import InputField from "../../inputs/InputField";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import {api} from "../../../api/api";
import WarningModal from "../../modal/WarningModal";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function MaxsulotSotishId({url, keyword}) {
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [modalAccept, setModalAccept] = useState(false);
    const [createData, setCreateData] = useState([]);
    const [loading , setLoading]  = useState(false);
    const [modal, setModal] = useState(false);
    const urlId = window.location.href.split('/');
    const history = useHistory();
    const timer = useRef(null);

    const handleChange = (name, value) => {
        setCreateData({
            ...createData,
            [name]: value
        })
    };

    const sellCLick = () => {
        api.patch(`storage/invoices/${urlId[6]}/`).then(res => {
            if(res.id) {
                setModalAccept(true);
            }
        })
    };

    const createProduct = useCallback(() => {
        api.post("sales/orders/", {
            invoice: urlId[6],
            product: createData.product.id,
            quantity: createData.quantity,
            selling_price: createData.selling_price
        }).then(res => {
            if (res.id) {
                setModal(false);
                api.get(`sales/orders?invoice=${urlId[6]}`).then(res => {
                    setData(res)
                });
            }
        })
    }, [createData, urlId]);

    useEffect(() => {
        let mounted = true;
        if (modal) {
            api.get("storage/products/?type=Tayyor").then(res => {
                if (mounted) {
                    setProduct(res.results)
                }
            });
        }
        return () => {
            mounted = false
        }
    }, [modal]);
    useEffect(() => {
        let mounted = true;
        setLoading(false);
        if (keyword) {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("sales/orders", {
                    params: {
                        invoice: urlId[6],
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if (mounted) {
                        setLoading(false);
                        setData(res)
                    }
                })
            }, 500);
            return () => {
                clearTimeout(timer.current)
            }
        } else if(keyword.length < 1) {
            api.get(`sales/orders?invoice=${urlId[6]}`).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res)
                }
            });
        }
        return () => {
            mounted = false;
            clearTimeout()
        }
    }, [keyword]);
    return (
        <div>
            <div className="buyurtma_btn id-factura">
                <div className="back-block">
                    <div onClick={() => history.replace(`${url}/MaxsulotSotish`)}>
                        <LeftIcon/>
                    </div>
                    <span>{urlId[5].replace(/%20/g, " ")}</span>
                </div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="exel_btn"
                    table="to_Excel"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Excelga export"
                />
                <div className="modal-btn-block">
                    <div className="buyurtma_btns" onClick={() => setModal(true)}>
                        <button className="modal_open create_btn" type="button">
                            <p>Mahsulot qo'shish</p>
                            <span>
                <img src={plus} alt=""/>
              </span>
                        </button>
                    </div>
                    <div className="buyurtma_btns" onClick={sellCLick}>
                        <button className="modal_open create_btn" type="button">
                            <p>Sotish</p>
                            <span>
                <img src={plus} alt=""/>
              </span>
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
                        <div className="modal_input factura-modal-7">
                            <h1>Mahsulot kiritish</h1>
                            <div>
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
                                        {product && product.map((x) => (
                                            <MenuItem value={x} key={x.id}>{x.title}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                                <div className="miqdori">
                                    <TextField
                                        className="miqdor_input"
                                        onChange={(e) => handleChange("selling_price", e.target.value)}
                                        id="outlined-basic"
                                        label="Sotish narxi"
                                        variant="outlined"
                                    />
                                    <InputField text="valyuta" width="80%" margin="20px 0  0  0"
                                                value={createData?.product?.currency}/>
                                </div>
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

                            </div>
                            <div className="modal_close">
                                <button onClick={createProduct}>Saqlash</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <WarningModal open={modalAccept} close={() => setModalAccept(prev => !prev)}
                              text1={"Sotish muvaffaqiyatli"} text2={"amalga oshirildi"} salesBackClick={() => history.replace(`${url}/MaxsulotSotish`)}/>
            </div>
            <div className="table-main">
                <table id="to_Excel">
                    <thead>
                    <tr>
                        <th>
                            <p> # </p>
                        </th>
                        <th>
                            <p>Mahsulotlar</p>
                        </th>
                        <th>
                            <p>Miqdor</p>
                        </th>
                        <th>
                            <p>O'lchov birligi</p>
                        </th>
                        <th>
                            <p>Sotish narxi</p>
                        </th>
                        <th>
                            <p>Valyuta</p>
                        </th>
                        <th>
                            <p>Umumiy summa</p>
                        </th>
                        <th>
                            <p>Izoh</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && data && data.map((x, index) => (
                        <tr>
                            <th>{index + 1}</th>
                            <th>{x.product.title}</th>
                            <th>{x.quantity} </th>
                            <th>{x.product.measurement_unit}</th>
                            <th>{x.price}</th>
                            <th>{x.currency}</th>
                            <th>{x.quantity * x.price}</th>
                            <th>{x.description}</th>
                        </tr>
                    ))}
                    {loading &&
                    <>
                        <SkeletonLoader count={9}/>
                        <SkeletonLoader count={9}/>
                        <SkeletonLoader count={9}/>
                    </>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}