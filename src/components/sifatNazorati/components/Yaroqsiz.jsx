import React, { useCallback, useEffect, useState, useRef } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import plus from "../../Icons/plus.png";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import InputField from "../../inputs/InputField";
import { api } from "../../../api/api";
const Tabs = {
  YAROQSIZ: "Maxsulotlar",
  QAYTA_ISHLASH: "Buyurtma nomeri",
};

function Yaroqsiz({ handlemenu, url, keyword }) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.YAROQSIZ);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const Sendpost = useCallback(() => {
    setModal(false);
    api
      .post("storage/send-valid/", {
        product: productData.product.id,
        to_who: productData.to_who,
        quantity: productData.quantity,
        description: productData.description,
      })
      .then((res) => {
        console.log(res);
      });
  }, [productData]);
  const function1 = () => {
    let mounted = true;
    setLoading(true);
    api.get("storage/returned-products/?wasted=True", {}).then((res) => {
      if (mounted) {
        setLoading(false);
        setData1(res);
        console.log(res.results);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function2 = () => {
    let mounted = true;
    setLoading(true);
    api.get("storage/returned-products/?wasted=False", {}).then((res) => {
      if (mounted) {
        setLoading(false);
        setData2(res);
        console.log(res.results, "data2");
      }
    });
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    function1();
    function2();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/returned-products/?wasted=True", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData1(res);
            }
          });
        api
          .get("storage/returned-products/?wasted=False", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData2(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/returned-products/?wasted=True").then((res) => {
        if (mounted) {
          setData1(res);
        }
      });
      api.get("storage/returned-products/?wasted=False").then((res) => {
        if (mounted) {
          setData2(res);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const handleClose = () => {
    setModal(false);
  };

  const TAB_LIST = [
    { label: "Yaroqsiz", name: Tabs.YAROQSIZ },
    { label: "Qayta ishlash", name: Tabs.QAYTA_ISHLASH },
  ];
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <Modal
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
            <div className="modal_input modal_input5">
              <h1>Qata ishlashga yuborish</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Brak maxsulotlar
                </InputLabel>
                <Select
                  label="Mas'ul shaxs"
                  onChange={(e) => handleChange("product", e.target.value)}
                >
                  {data2?.results
                    ? data2.results.map((item, index) => (
                        <MenuItem key={item.id} value={item}>
                          {item.product.title}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Kimga
                </InputLabel>
                <Select
                  label="Mas'ul shaxs"
                  onChange={(e) => handleChange("to_who", e.target.value)}
                >
                  <MenuItem value="Texnolog1">Texnolog1</MenuItem>
                  <MenuItem value="Texnolog2">Texnolog2</MenuItem>
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
                  value={productData?.product?.product.measurement_unit}
                />
              </div>
              <TextField
                label="Izoh"
                variant="outlined"
                onChange={(e) => handleChange("decsription", e.target.value)}
              />
              <div className="modal_close">
                <button onClick={Sendpost}>Saqlash</button>
              </div>
            </div>
          </Fade>
        </Modal>
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text1={"“Product N”"}
          text2={"mahsulotlar ombori ga saqlandi."}
        />
        <DeleteModal
          open={modalDelete}
          close={() => setModalDelete((prev) => !prev)}
          text1={"“Product N”"}
          text2={"mahsulotlar omboridan o`chirildi."}
        />
      </div>
      <div className="sifat_head">
      
        <TabSwitcher
          onChangeTab={setActiveTab}
          activeTab={activeTab}
          tabList={TAB_LIST}
        />
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
        {activeTab === Tabs.QAYTA_ISHLASH ? (
          <div className="buyurtma_btns" onClick={() => setModal(true)}>
            <button className="modal_open create_btn" type="button">
              <p>Qayta ishlashga yuborish</p>
              <span>
                <img src={plus} alt="" />
              </span>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      {activeTab === Tabs.YAROQSIZ && (
        <div className="table">
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p>№</p>
                </th>
                <th style={{ textAlign: "start" }}>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Miqdori</p>
                </th>
                <th>
                  <p>Zarar</p>
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
              {!loading && data1?.results
                ? data1.results.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td style={{ textAlign: "start", width: "130px" }}>
                          {item.product.title}
                        </td>
                        <td>{item.quantity}</td>
                        <td style={{ color: "#FE2626" }}>
                          {item.product.selling_price * item.quantity}
                        </td>
                        <td>{item.created_at}</td>
                        <td>{item.responsible}</td>
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
      )}
      {activeTab === Tabs.QAYTA_ISHLASH && (
        <div className="table">
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p>№</p>
                </th>
                <th style={{ textAlign: "start" }}>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Miqdori</p>
                </th>
                <th>
                  <p>Zarar</p>
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
              {!loading && data2?.results
                ? data2.results.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "start", width: "130px" }}>
                          {item.product.title}
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.product.selling_price * item.quantity}</td>
                        <td>{item.created_at}</td>
                        <td>{item.responsible}</td>
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
      )}
    </React.Fragment>
  );
}

export default Yaroqsiz;
