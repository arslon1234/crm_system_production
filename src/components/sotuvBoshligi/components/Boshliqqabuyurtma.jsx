import React, { useCallback, useEffect, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-confirm-alert/src/react-confirm-alert.css";
import NumberFormat from "react-number-format";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { api } from "../../../api/api";
import InputField from "../../inputs/InputField";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
const Boshliqqabuyurtma = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [product, setProduct] = useState([]);
  const timer = useRef(null);
  const [next, setNext] = useState("");
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleOpen = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(false);
  };
  const createOrder = useCallback(() => {
    api
      .post("sales/production-orders/", {
        title: productData.title,
        product: productData.product.id,
        quantity: productData.quantity,
        deadline: productData.deadline,
        description: productData.description,
      })
      .then((res) => {
        if (res.id) {
          setModal(false);
          api.get("sales/production-orders/?status=active").then((res) => {
            setData(res.results);
          });
        }
      });
  }, [productData]);

  useEffect(() => {
    let mounted = true;
    if (modal) {
      api.get("storage/products/?type=Tayyor").then((res) => {
        if (mounted) {
          setProduct(res.results);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [modal]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("sales/production-orders", {
            params: {
              status: "active",
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
      api.get("sales/production-orders/?status=active").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
          setNext(res.next);
        }
      });
    }
    return () => {
      mounted = false;
      clearTimeout();
    };
  }, [keyword]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
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
          <span>Yangi buyurtma</span>
          <div className="icon">
            <i class="fas fa-plus"></i>
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
          <div className="modal_input factura-modal-4">
            <h1>Sex boshlig`iga buyurtma</h1>
            <TextField
              style={{ marginTop: "40px" }}
              id="outlined-basic"
              label="Buyurtma nomi"
              variant="outlined"
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Mahsulot nomi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Mahsulot guruhi"
                onChange={(e) => handleChange("product", e.target.value)}
              >
                {product &&
                  product.map((x) => (
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
                type="number"
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
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="date"
              label="Muddati"
              onChange={(e) => handleChange("deadline", e.target.value)}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Izoh"
              variant="outlined"
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className="modal_close">
              <button onClick={createOrder}>Buyurtma berish</button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="table">
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
                  <p> # </p>
                </th>
                <th>
                  <p> Buyurtma nomi</p>
                </th>
                <th>
                  <p>Mahsulot nomi</p>
                </th>
                <th>
                  <p> Miqdori</p>
                </th>
                <th>
                  <p>Muddati</p>
                </th>
                <th>
                  <p>Izoh</p>
                </th>
                <th>
                  <p>Status</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data &&
                data.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th>{x.title}</th>
                    <th>{x.product.title}</th>
                    <th>
                      <NumberFormat
                        value={x.quantity}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value, props) => (
                          <div {...props}>{value}</div>
                        )}
                      />
                    </th>
                    <th>{x.deadline}</th>
                    <th>{x.description}</th>
                    <th
                      style={{
                        color: `${
                          x.status === "Kutilmoqda"
                            ? "orange"
                            : x.status === "Qabul qilindi"
                            ? "blue"
                            : "green"
                        }`,
                      }}
                    >
                      {x.status}
                    </th>
                  </tr>
                ))}
              {loading && (
                <>
                  <SkeletonLoader count={8} />
                  <SkeletonLoader count={8} />
                  <SkeletonLoader count={8} />
                </>
              )}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
  // }
};

export default Boshliqqabuyurtma;
