import React, { useCallback, useEffect, useState, useRef } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputField from "../../inputs/InputField";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import plusss from "../../Icons/plusss.svg";
import DeleteModal from "../../modal/DeleteModal";
import SkeletonLoader from "../../loader/skeleton-loader";
import plus from "../../Icons/plus.png";
export default function MaxsulotQabuli({ handlemenu, url, keyword }) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data2, setData2] = useState([]);
  const [productData, setProductData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [joinInput, setJoinInput] = useState(false);
  const [check, setCheck] = useState(false);
  const timer = useRef(null);
  const handleClose = () => {
    setModal(false);
  };
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const sendData = useCallback(() => {
    api
      .post("storage/returned-products/", {
        product: productData.product.id,
        quantity: productData.quantity,
        responsible: productData.responsible,
        wasted: check,
        summa: productData.summa,
        currency: productData.currency.id,
        description: productData.description,
      })
      .then((res) => {
        if (res) {
          let mounted = true;
          api.get("storage/returned-products/", {}).then((res) => {
            if (mounted) {
              setData(res);
              console.log(res.results);
            }
          });
        }
      });
  }, [productData, check]);
  console.log(productData, "productData");
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("storage/returned-products/", {}).then((res) => {
      if (mounted) {
        setLoading(false);
        setData(res);
        console.log(res.results);
      }
    });
    api.get("storage/products/?type=Tayyor", {}).then((res) => {
      if (mounted) {
        setData1(res);
        console.log(res.results);
      }
    });
    api.get("storage/currency/").then((res) => {
      if (mounted) {
        setData2(res);
        console.log(res.results);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
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
              setData(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/returned-products/").then((res) => {
        if (mounted) {
          setData(res);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  return (
    <React.Fragment>
      <div className="buyurtma_btns">
      <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
        <button
          className="modal_open create_btn"
          type="button"
          onClick={() => setModal(true)}
        >
          <p>Qayta ishlash</p>
          <span>
            <img src={plus} alt="" />
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
          <div className="modal_input modal_input2">
            <h1>Qayta ishlash</h1>
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Maxsulot nomi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Maxsuolot nomi"
                onChange={(e) => handleChange("product", e.target.value)}
              >
                {data1.results &&
                  data1?.results.map((item) => (
                    <MenuItem value={item} key={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="miqdori">
              <TextField
                className="miqdor_input"
                label="Miqdori"
                variant="outlined"
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
              <InputField
                text="O'lchov b."
                width="80%"
                margin="20px 0  0  0"
                value={productData?.product?.measurement_unit?.title}
              />
            </div>
            <div className="quality_select">
              <span className="yaroqsiz">Yaroqsiz</span>
              <input
                type="checkbox"
                checked={check}
                onClick={() => setCheck((p) => !p)}
              />
            </div>
            <div className="miqdori">
              <TextField
                label="Zarar summasi"
                variant="outlined"
                onChange={(e) => handleChange("summa", e.target.value)}
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel>Valyuta</InputLabel>
                <Select
                  label="Valyuta"
                  onChange={(e) => handleChange("currency", e.target.value)}
                >
                  {data2.map((x) => (
                    <MenuItem value={x} key={x.id}>
                      {x.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              label="Javobgar shaxs"
              variant="outlined"
              onChange={(e) => handleChange("responsible", e.target.value)}
            />
            <InputField
              text="Sana & vaqt "
              width="90%"
              margin="20px 0 0 0"
              value={
                new Date().getFullYear() +
                ":" +
                new Date().getMonth() +
                "1" +
                ":" +
                new Date().getDate()
              }
            />
            {joinInput ? (
              <TextField
                label="Izoh"
                variant="outlined"
                onChange={(e) => handleChange("description", e.target.value)}
              />
            ) : (
              ""
            )}
            {joinInput ? (
              ""
            ) : (
              <button
                className="join_input"
                onClick={() => setJoinInput(!joinInput)}
              >
                <img src={plusss} alt="" />
              </button>
            )}

            <div className="modal_close">
              <button onClick={sendData}>Saqlash</button>
            </div>
          </div>
        </Fade>
      </Modal>
      <DeleteModal
        open={modalDelete}
        close={() => setModalDelete((prev) => !prev)}
        text2={"Buyurtmani bekor qilish"}
      />
      <div className="table">
        <div className="select-header2">
          <select name="" id="">
            <option value="">Mahsulot guruhi</option>
            <option value="">Mahsulot guruhi</option>
          </select>
        </div>
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
                <p>Miqdori</p>
              </th>
              <th>
                <p>Narxi</p>
              </th>
              <th>
                <p>Zarar</p>
              </th>
              <th>
                <p>Yaroqli</p>
              </th>
              <th>
                <p>Sana</p>
              </th>
              <th>
                <p>Javobgar shaxs</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data?.results
              ? data.results.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "start", width: "130px" }}>
                        {item.product.title}
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.product.selling_price} {item.product.currency}
                      </td>
                      <td style={{ color: "#FE2626" }}>{item.summa}</td>
                      <td>
                        <button
                          style={
                            item.wasted === false
                              ? { backgroundColor: "#FE2626" }
                              : { backgroundColor: "#98CC63" }
                          }
                          className="topilish"
                        ></button>
                      </td>
                      <td>{item.created_by}</td>
                      <td style={{ width: "120px" }}>{item.responsible}</td>
                    </tr>
                  );
                })
              : ""}
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
}
