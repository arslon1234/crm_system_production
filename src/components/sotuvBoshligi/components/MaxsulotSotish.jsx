import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import NumberFormat from "react-number-format";
import "react-confirm-alert/src/react-confirm-alert.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { api } from "../../../api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import rejectIcon from "../../Icons/Reject.svg";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const MaxsulotSotish = ({ url, keyword }) => {
  const [data, setData] = useState([]);
  const [facturaData, setFacturaData] = useState([]);
  const [clients, setClients] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const timer = useRef(null);
  const [next, setNext] = useState("");
  const handleChange = (name, value) => {
    setFacturaData({
      ...facturaData,
      [name]: value,
    });
  };

  const handleOpen = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(false);
  };
  const handleCreateFactura = useCallback(() => {
    api
      .post("storage/invoices/", {
        title: facturaData.title,
        storage: facturaData.from_who,
        client: facturaData.client.id,
        bonus: facturaData.bonus,
        deadline: facturaData.deadline,
        description: facturaData.description,
        type: "Chiqish",
        status: "Sales",
      })
      .then((res) => {
        if (res.id) {
          setModal(false);
          api.get("storage/invoices/?type=Chiqish&status=Sales").then((res) => {
            setData(res.results);
            setNext(res.next)
          });
        }
      });
  }, [facturaData]);

  const rejectCLick = (id) => {
    api.delete(`storage/invoices/${id}/`).then((res) => {
      api.get("storage/invoices/?type=Chiqish&status=Sales").then((res) => {
        setData(res.results);
        setNext(res.next)
      });
    });
  };

  useEffect(() => {
    let mounted = true;
    if (modal) {
      api.get("storage/storages").then((res) => {
        setWarehouse(res);
      });
      api.get("sales/clients").then((res) => {
        setClients(res);
      });
    }
    return () => {
      mounted = false;
    };
  }, [modal]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/invoices", {
            params: {
              type: "Chiqish",
              status: "Sales",
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
              setNext(res.next)
              console.log(res.results, "res")
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/invoices/?type=Chiqish&status=Sales").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
          setNext(res.next)
          console.log(res.results, "res")
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
        <div className="yangi_faktura" onClick={handleOpen}>
          <span>Yangi faktura</span>
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
          <div className="modal_input factura-modal-6">
            <h1>Yangi faktura</h1>
            <TextField
              style={{ marginTop: "40px" }}
              id="outlined-basic"
              label="Faktura nomi"
              variant="outlined"
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Ombor nomi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => handleChange("from_who", e.target.value)}
                label="Ombor nomi"
              >
                {warehouse?.map((x) => {
                  return (
                    <MenuItem value={x.id} key={x.id}>
                      {x.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Mijoz nomi
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={(e) => handleChange("client", e.target.value)}
                label="Mijoz nomi"
              >
                {clients?.map((x) => {
                  return (
                    <MenuItem value={x} key={x.id}>
                      {x.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="text"
              label="Bonus"
              variant="outlined"
              onChange={(e) => handleChange("bonus", e.target.value)}
            />
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
              className="hodim_data"
              type="text"
              label="Izoh"
              onChange={(e) => handleChange("description", e.target.value)}
              variant="outlined"
            />
            <div className="modal_close">
              <button onClick={handleCreateFactura}>Faktura yaratish</button>
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
                  <p> № </p>
                </th>
                <th style={{textAlign:"start", width:"120px"}}>
                  <p> Mijoz</p>
                </th>
                <th>
                  <p> Faktura nomi</p>
                </th>
                <th>
                  <p>Umumiy summa(so'm)</p>
                </th>
                <th>
                  <p>Umumiy summa(dollar)</p>
                </th>
                <th>
                  <p> Izox</p>
                </th>
                <th>
                  <p>Bekor</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data?.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th
                      onClick={() =>
                        history.replace(
                          `${url}/Faktura-yaratish/${x.client}/${x.id}`
                        )
                      }
                      style={{ cursor: "pointer", textDecoration: "underline", textAlign:"start", width:"120px" }}
                    >
                      {x.client}
                    </th>
                    <th>{x.title}</th>
                    <th>
                      {x.summa.map((x) => (
                        <p style={{ paddingTop: "5px" }}>
                          {x.currency === "so'm" && (
                            <NumberFormat
                              value={x.total_price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          )}
                        </p>
                      ))}
                    </th>
                    <th>
                      {x.summa.map((x) => (
                        <p style={{ paddingTop: "5px" }}>
                          {x.currency === "dollar" && (
                            <NumberFormat
                              value={x.total_price}
                              className="foo"
                              displayType={"text"}
                              thousandSeparator={true}
                              renderText={(value, props) => (
                                <div {...props}>{value}</div>
                              )}
                            />
                          )}
                        </p>
                      ))}
                    </th>
                    <th>{x.description}</th>
                    <th className="reject-icon">
                      <img
                        src={rejectIcon}
                        onClick={() => rejectCLick(x.id)}
                        alt=""
                      />
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

export default MaxsulotSotish;
