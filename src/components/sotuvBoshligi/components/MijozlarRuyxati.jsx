import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import NumberFormat from "react-number-format";
import FormControl from "@material-ui/core/FormControl";
import Fade from "@material-ui/core/Fade";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import { useHistory } from "react-router-dom";
import eye from "../../Icons/View.svg";
// import hide from "../../Icons/Hide.svg";
import WarningModal from "../../modal/WarningModal";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const MijozlarRuyxati = ({ keyword, setKeyword, url }) => {
  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalBank, setModalBank] = useState(false);
  const [inn, setInn] = useState("");
  const [mfo, setMfo] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankNumber1, setBankNumber1] = useState("");
  const [modal, setModal] = useState(false);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [idBank, setIdBank] = useState("");
  const timer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState([]);
  const history = useHistory();
  const handleChange = (name, value) => {
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleOpen = () => {
    setModal(!modal);
  };
  const handleOpen1 = () => {
    setOpen1((prev) => !prev);
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2((prev) => !prev);
    setOpen1(false);
  };
  const handleClose = () => {
    setModal(false);
  };
  const addClientClick = useCallback(() => {
    api
      .post("sales/banks/", {
        MFO: clientData.mfo,
        INN: clientData.inn,
        BANK_ACCOUNT_1: clientData.bankAcc,
      })
      .then((res) => {
        if (res.id) {
          api
            .post("sales/clients/", {
              title: clientData.title,
              fullname: clientData.fullname,
              phone_number: clientData.phone_number,
              responsible: clientData.responsible,
              address: clientData.address,
              bank_details: res.id,
              description: clientData.description,
              city: clientData.city
            })
            .then((res) => {
              if (res.id) {
                setModalAlert(true);
                setModal(false);
                setClientData([]);
                api.get("sales/clients").then((res) => setData(res));
              }
            });
        }
      });
  }, [clientData]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("sales/clients", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("sales/clients").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res);
        }
      });
    }
    api.get("sales/city/").then((res) => {
      if (mounted) {
        setCity(res);
        console.log(res, "city");
      }
    });
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);

  return (
    <React.Fragment>
      <div className="manager_head sotuv-head">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
        <div className="mizoj_qushish" onClick={handleOpen}>
          <span>Yangi mijoz qo`shish</span>
          <div className="icon">
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <Modal
        style={{ height: "500" }}
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
          <div className="modal_input sales-modal ">
            <h1>Mijoz qo`shish</h1>
            <div className="mijoz_qush" onClick={handleOpen1}>
              <span>Mijoz ma’lumotlari</span>
              <div className="mijoz_icon1">
                <i
                  className={
                    open1 ? "d-none" : " open1 fa-solid fa-angle-right"
                  }
                ></i>
                <i
                  className={open1 ? " open1 fa-solid fa-angle-down" : "d-none"}
                ></i>
              </div>
            </div>
            {open1 ? (
              <div className="open2">
                <TextField
                  id="outlined-basic"
                  label="Tashkilot nomi"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                <FormControl variant="outlined" className="form_select">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Shahar nomi
                  </InputLabel>
                  <Select
                    onChange={(e) =>
                      handleChange("city", e.target.value)
                    }
                    label="Shahar nomi"
                  >
                    {city.map((x) => (
                      <MenuItem value={x.id} key={x.id}>
                        {x.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="outlined-basic"
                  label="Rahbar ismi va familiyasi"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("fullname", e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Telefon raqami"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Ma'sul shaxs ism familiyasi"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("responsible", e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Kompaniya manzili"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Izoh"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
            ) : (
              ""
            )}
            <div className="mijoz_qush" onClick={handleOpen2}>
              <span>Bank rekvizitlari</span>
              <div className="mijoz_icon1">
                <i
                  className={
                    open2 ? "d-none" : " open1 fa-solid fa-angle-right"
                  }
                ></i>
                <i
                  className={open2 ? " open1 fa-solid fa-angle-down" : "d-none"}
                ></i>
              </div>
            </div>
            {open2 ? (
              <div className="open2">
                <TextField
                  id="outlined-basic"
                  label="Hisob raqami"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("bankAcc", e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="MFO"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("mfo", e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="INN"
                  variant="outlined"
                  className="ruyxat_input"
                  onChange={(e) => handleChange("inn", e.target.value)}
                />
              </div>
            ) : (
              ""
            )}

            <div className="modal_close">
              <button onClick={addClientClick}>Qo`shish</button>
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
              <span>MFO:</span> <span>{mfo}</span>
            </div>
            <div className="bank_rek">
              <span>INN:</span> <span>{inn}</span>
            </div>
            <div className="bank_rek">
              <span>BANK_ACCOUNT_1:</span> <span>{bankNumber}</span>
            </div>
            <div className="bank_rek">
              <span>BANK_ACCOUNT_2:</span>
              <span>{bankNumber1}</span>
            </div>
          </div>
        </Fade>
      </Modal>
      <WarningModal
        open={modalAlert}
        close={() => setModalAlert((prev) => !prev)}
        text1={"Mijoz"}
        text2={"muvaffaqiyatli qo'shildi"}
      />
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Firma nomi</p>
              </th>
              <th>
                <p>Rahbar ismi</p>
              </th>
              <th>
                <p> Telefon</p>
              </th>
              <th>
                <p> Mas’ul shaxs</p>
              </th>
              <th>
                <p>Kompaniya manzili</p>
              </th>
              <th>
                <p>Izoh</p>
              </th>
              <th>
                <p>Bank rekvizitlari</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data?.map((x, index) => (
                <tr key={x.id}>
                  <th>{index + 1}</th>
                  <th
                   className="a_lar"
                    onClick={() =>
                      history.replace(
                        `${url}/MijozlarId/${x.id}/${x.title}/${x.client_debt.dollar}/${x.client_debt["so'm"]}`
                      )
                    }
                    style={{
                      width: "120px",
                      textAlign: "start",
                      cursor: "pointer",
                    }}
                  >
                 
                  {x.title}</th>
                  <th>{x.fullname}</th>
                  <th>{x.phone_number}</th>
                  <th>{x.responsible}</th>
                  <th>{x.address}</th>
                  <th>{x.description}</th>
                  <th>
                    {/* <img
                      src={modalBank && idBank === x.id ? hide : eye}
                      alt=""
                      onClick={() => {
                        setInn(x.bank_details.INN);
                        setMfo(x.bank_details.MFO);
                        setBankNumber(x.bank_details.BANK_ACCOUNT_1);
                        setBankNumber1(x?.bank_details?.BANK_ACCOUNT_2);
                        setModalBank(true);
                        setIdBank(x.id);|
                      }}
                      className="img-hide"
                    /> */}
                  </th>
                </tr>
              ))}
            {loading && (
              <>
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default MijozlarRuyxati;
