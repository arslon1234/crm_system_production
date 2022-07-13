import React, {useCallback, useEffect, useRef, useState} from "react";
import DataPick from "./data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import eye from "../../Icons/View.svg"
// import hide from "../../Icons/Hide.svg";
import WarningModal from "../../modal/WarningModal";
import InputField from "../../inputs/InputField";
import plus from "../../Icons/plus.png";
import arrow from "../../Icons/rightIcon.svg";
import {api} from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function Taminotchi({keyword}) {
    const [data, setData] = useState([]);
    const [bankDetails, setBankDetails] = useState(false);
    const [addSuppliers, setAddSuppliers] = useState([]);
    const [inn, setInn] = useState("");
    const [mfo, setMfo] = useState("");
    const [bankNumber, setBankNumber] = useState("");
    const [bankNumber1, setBankNumber1] = useState("");
    const [modal, setModal] = useState(false);
    const [modalBank, setModalBank] = useState(false);
    const [loading ,setLoading] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [firstModal, setFirstModal] = useState(true);
    const [secondModal, setSecondModal] = useState(false);
    const [idBank, setIdBank] = useState("");
    const timer = useRef(null);

    const handleChange = (name, value) => {
        setAddSuppliers({
            ...addSuppliers,
            [name]: value
        })
    };

    const addSuppliersClick = useCallback(() => {
        api.post("supplier/banks/", {
            MFO: addSuppliers.MFO,
            INN: addSuppliers.INN,
            BANK_ACCOUNT_1: addSuppliers.BANK_ACCOUNT_1,
            BANK_ACCOUNT_2: addSuppliers.BANK_ACCOUNT_2
        }).then(res => {
            if (res.id) {
                api.post("supplier/suppliers/", {
                    title: addSuppliers.title,
                    fullname: addSuppliers.responsible,
                    phone_number1: addSuppliers.phone_number1,
                    phone_number2: addSuppliers.phone_number2,
                    responsible: addSuppliers.responsible,
                    address: addSuppliers.adress,
                    bank_details: res.id,
                    description: addSuppliers.description
                }).then(res => {
                    if (res.id) {
                        setModal(false);
                        setAddSuppliers([]);
                        setModalAlert(true);
                        api.get("supplier/suppliers/").then(res => setData(res))
                    }
                })
            }
        })
    }, [addSuppliers]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if(keyword.length > 0) {
            if(timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("supplier/suppliers/", {
                    params: {
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if(mounted) {
                        setLoading(false);
                        setData(res)
                    }
                })
            }, 500);
            return () => {
                clearTimeout(timer.current)
            }
        } else if (keyword.length < 1) {
        api.get("supplier/suppliers/").then(res => {
            if (mounted) {
                setLoading(false);
                setData(res);
            }
        }); }
        return () => {
            mounted = false
        }
    }, [keyword]);

    return (
        <React.Fragment>
            <div className="buyurtma_btn">
                <div className="d-none"><DataPick/></div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="exel_btn"
                    table="to_Excel"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Excelga export"
                />
                <div className="buyurtma_btns">
                    <button className="modal_open create_btn" type="button" onClick={() => setModal(true)}>
                        <p>Yangi taminotchi qo'shish</p>
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
                        <div className="modal_input factura-modal ">
                            <h1>Taminotchi qo'shish</h1>
                            {/*<TextField*/}
                            {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
                            {/*    id="outlined-basic"*/}
                            {/*    label="Kelish narxi"*/}
                            {/*    variant="outlined"*/}
                            {/*/>*/}
                            <div className="modal-taminotchi" onClick={() => {
                                setFirstModal(prev => !prev);
                                setSecondModal(false)
                            }}>
                                <h1>Taminotchi ma'lumotlari</h1>
                                <div className={`arrow-img ${firstModal && "active-arrow-img"}`}>
                                    <img src={arrow} alt=""/>
                                </div>
                            </div>
                            {firstModal &&
                            <>
                                <InputField text="Taminotchi tashkilot nomi" width="90%" margin="20px 0  0  0"
                                            setData={(e) => handleChange("title", e.target.value)}/>
                                <InputField text="Telefon raqami" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("phone_number1", e.target.value)}/>
                                <InputField text="Telefon raqami 2" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("phone_number2", e.target.value)}/>
                                <InputField text="Mas'ul shaxs ismi familiyasi" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("responsible", e.target.value)}/>
                                <InputField text="Kompaniya manzili" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("adress", e.target.value)}/>
                                <InputField text="Izoh" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("description", e.target.value)}/>
                            </>
                            }
                            <div className="modal-taminotchi" onClick={() => {
                                setSecondModal(prev => !prev);
                                setFirstModal(false)
                            }}>
                                <h1>Bank rekvizitlari</h1>
                                <div className={`arrow-img ${secondModal && "active-arrow-img"}`}>
                                    <img className="arrow" src={arrow} alt=""/>
                                </div>
                            </div>
                            {secondModal &&
                            <>
                                <InputField text="MFO" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("MFO", e.target.value)}/>
                                <InputField text="INN" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("INN", e.target.value)}/>
                                <InputField text="Hisob raqami" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("BANK_ACCOUNT_1", e.target.value)}/>
                                <InputField text="Hisob raqami 2" width="90%" margin="20px 0 0 0"
                                            setData={(e) => handleChange("BANK_ACCOUNT_2", e.target.value)}/>
                            </>
                            }
                            <div className="modal_close">
                                <button onClick={addSuppliersClick}>Qo'shish</button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modalBank}
                    onClose={() => setModalBank(false)}
                    className="dflax"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalBank}>
                        <div className="modal_input7">
                            <h1>Bank ma'lumotlari</h1>
                            <div className="bank_rek">
                                <span>MFO:</span>{" "}
                                <span>{mfo}</span>
                            </div>
                            <div className="bank_rek">
                                <span>INN:</span>{" "}
                                <span>{inn}</span>
                            </div>
                            <div className="bank_rek">
                                <span>BANK_ACCOUNT_1:</span>{" "}
                                <span>{bankNumber}</span>
                            </div>
                            <div className="bank_rek">
                                <span>BANK_ACCOUNT_2:</span>
                                <span>{bankNumber1}</span>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                <WarningModal open={modalAlert} close={() => setModalAlert(prev => !prev)}
                              text1={"Taminotchi"} text2={"muvaffaqiyatli qo'shildi"}/>
                {/*<DeleteModal open={modalDelete} close={() => setModalDelete(prev => !prev)}*/}
                {/*             text1={"Faktura muvaffaqiyatli"} text2={"qabul qilindi."}/>*/}
                {/*<AcceptModal open={modalAccept} close={() => setModalAccept(prev => !prev)}/>*/}
            </div>
            <div className="table taminotchi-table">
                <table id="to_Excel">
                    <thead>
                    <tr>
                        <th>
                            <p> № </p>
                        </th>
                        <th style={{textAlign:"start"}}>
                            <p>Taminotchilar nomi</p>
                        </th>
                        <th>
                            <p>Manzil</p>
                        </th>
                        <th>
                            <p> Masul shaxs ismi va familiyasi</p>
                        </th>
                        <th>
                            <p>Telefon raqami</p>
                        </th>
                        <th>
                            <p>Bank rekvizitlari</p>
                        </th>
                        {/*<th>*/}
                        {/*    <p> Kelish narxi</p>*/}
                        {/*</th>*/}

                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((x, index) => (
                        <tr key={x.id}>
                            <th>{index + 1}</th>
                            <th style={{textAlign:"start", width:"130px"}}>{x.title}</th>
                            <th>{x.address}</th>
                            <th>{x.fullname}</th>
                            <th>{x.phone_number1}</th>
                            <th>
                            {/* <img src={modalBank && (idBank === x.id) ? hide : eye} alt=""
                                     onClick={() => {
                                         setInn(x.bank_details.INN);
                                         setMfo(x.bank_details.MFO);
                                         setBankNumber(x.bank_details.BANK_ACCOUNT_1);
                                         setBankNumber1(x?.bank_details?.BANK_ACCOUNT_2);
                                         setModalBank(true);
                                         setIdBank(x.id)
                                     }
                                     }
                                     className="img-hide"/> */}
                                     </th>
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
            </div>
        </React.Fragment>
    );
};

export default Taminotchi;
