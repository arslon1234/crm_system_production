import React, { useCallback, useEffect, useRef, useState } from "react";
import receiveIcon from "../../Icons/Receive.svg";
import rejectIcon from "../../Icons/Reject.svg";
import redIcon from "../../Icons/RedIcon.svg";
import greenIcon from "../../Icons/GreenIcon.svg";
import DataPick from "./data_pick";
import plus from "../../Icons/plus.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputField from "../../inputs/InputField";
import TextField from "@material-ui/core/TextField/TextField";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function QaytaIshlashReceive({ keyword }) {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [filterByGroup, setFilterByGroup] = useState("");
  const [productGroup, setProductGroup] = useState([]);
  const [productToModal, setProductToModal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [modalCheck, setModalCheck] = useState(false);
  const timer = useRef(null);
  const [next, setNext] = useState("");
  const handleChange = (name, value) => {
    setDataModal({
      ...dataModal,
      [name]: value,
    });
  };
  const sendModalClick = useCallback(() => {
    api
      .post("storage/returned-products/", {
        product: dataModal.product.id,
        quantity: dataModal.quantity,
        responsible: dataModal.responsible,
        wasted: modalCheck,
        summa: dataModal.summa,
      })
      .then((res) => {
        if (res.id) {
          setModalAlert(true);
          setModal(false);
        }
      });
  }, [dataModal, modalCheck]);

  const acceptProduct = (id) => {
    api
      .patch(`storage/returned-products/${id}/`, {
        status: "Saved",
      })
      .then((res) => {
        if (res.id) {
          setModalAlert(true);
        }
      });
  };

  const rejectProduct = (id) => {
    api
      .patch(`storage/returned-products/${id}/`, {
        status: "Cancelled",
      })
      .then((res) => {
        if (res.id) {
          setModalDelete(true);
        }
      });
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (filterByGroup && filterByGroup !== "") {
      api
        .get("storage/returned-products/", {
          params: {
            group: filterByGroup,
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByGroup === "all") {
      api.get("storage/returned-products/").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
        }
      });
    }
    if (modal) {
      api.get("storage/products/?type=Tayyor").then((res) => {
        if (mounted) {
          setLoading(false);
          setProductToModal(res.results);
        }
      });
      api.get("storage/currency/").then((res) => {
        if (mounted) {
          setLoading(false);
          setCurrency(res);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [filterByGroup, modal]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/returned-products/", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
              setNext(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/returned-products/").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
          setNext(res.next);
        }
      });
    }
    api.get("storage/product-groups/").then((res) => {
      if (mounted) {
        setLoading(false);
        setProductGroup(res);
      }
    });
    return () => {
      mounted = false;
    };
  }, [keyword]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
  return (
    <>
      <div className="buyurtma_btn">
        <span style={{ opacity: "0" }}>
          <DataPick />
        </span>
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
            <p>Mahsulot qabuli</p>
            <span>
              <img src={plus} alt="" />
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
            <div className="modal_input factura-modal-4">
              <h1>Mahsulot qabuli</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Mahsulot nomi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => handleChange("product", e.target.value)}
                  label=" Mahsulot nomi"
                >
                  {productToModal.map((x) => (
                    <MenuItem value={x} key={x.id}>
                      {x.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  id="outlined-basic"
                  label="Miqdori"
                  variant="outlined"
                  type="number"
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <InputField
                  text="O'lchov b."
                  width="81%"
                  margin="20px 0 0 0"
                  value={dataModal?.product?.measurement_unit?.title}
                />
              </div>
              <div className="ombor-modal-check">
                <label htmlFor="">Yaroqsiz</label>
                <input
                  type="checkbox"
                  checked={modalCheck}
                  onClick={() => setModalCheck((prev) => !prev)}
                />
              </div>
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  id="outlined-basic"
                  label="Zarar summasi"
                  type="number"
                  variant="outlined"
                  onChange={(e) => handleChange("summa", e.target.value)}
                />
                <InputField
                  text="Valyuta"
                  width="81%"
                  margin="20px 0 0 0"
                  value={dataModal?.product?.currency}
                />
              </div>
              <InputField
                text="Javobgar shaxs"
                width="92%"
                margin="20px 0 0 0"
                setData={(e) => handleChange("responsible", e.target.value)}
              />
              <InputField
                text="Sana"
                width="92%"
                margin="20px 0 0 0"
                disabled={true}
              />
              <div className="modal_close">
                <button onClick={sendModalClick}>Saqlash</button>
              </div>
            </div>
          </Fade>
        </Modal>
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text2={"omborga qabul qilindi."}
          text1={"Mahsulot muvaffaqiyatli"}
        />
        <DeleteModal
          open={modalDelete}
          close={() => setModalDelete((prev) => !prev)}
          text2={"Mahsulot bekor qilindi."}
        />
      </div>
      <div className="table">
        <div className="select-header">
          <select
            name=""
            id=""
            onChange={(e) => setFilterByGroup(e.target.value)}
          >
            <option disabled hidden selected>
              Mahsulot guruhi
            </option>
            {productGroup.map((x) => (
              <option value={x.title} key={x.id}>
                {x.title}
              </option>
            ))}
            <option value="all">Barchasi</option>
          </select>
        </div>
        <div className="table-main">
          <InfiniteScroll
            dataLength={data?.length}
            next={nextData}
            hasMore={true}
            //   loader={"loading..."}
          >
            <table id="to_Excel">
              <thead>
                <tr>
                  <th>
                    <p> № </p>
                  </th>
                  <th style={{ textAlign: "start" }}>
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p> Miqdori </p>
                  </th>
                  <th>
                    <p>Zarar summasi</p>
                  </th>
                  <th>
                    <p>Yaroqsiz</p>
                  </th>
                  <th>
                    <p>Sana</p>
                  </th>
                  <th>
                    <p>Javobgar shaxs</p>
                  </th>
                  <th>
                    <p>Qabul</p>
                  </th>
                  <th>
                    <p>Bekor</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data &&
                  data.map((x, index) => (
                    <tr key={x.id}>
                      <th>{index + 1}</th>
                      <th style={{ textAlign: "start", width: "130px" }}>
                        {x.product.title}
                      </th>
                      <th>
                        {x.quantity} {x.product.measurement_unit}
                      </th>
                      <th style={{ color: "red" }}>50 dona</th>
                      <th>
                        <img
                          src={x.wasted === false ? greenIcon : redIcon}
                          alt=""
                        />
                      </th>
                      <th>{x.returned_at}</th>
                      <th>{x.responsible}</th>
                      <th>
                        <div
                          className="receive-icon"
                          onClick={() => acceptProduct(x.id)}
                        >
                          <img src={receiveIcon} alt="" />
                        </div>
                      </th>
                      <th>
                        <div
                          className="reject-icon"
                          onClick={() => rejectProduct(x.id)}
                        >
                          <img src={rejectIcon} alt="" />
                        </div>
                      </th>
                    </tr>
                  ))}
                {loading && (
                  <>
                    <SkeletonLoader count={10} />
                    <SkeletonLoader count={10} />
                    <SkeletonLoader count={10} />
                  </>
                )}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
