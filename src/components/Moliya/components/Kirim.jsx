import React, { useCallback, useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DataPick from "./data_pick";
import NumberFormat from "react-number-format";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SkeletonLoader from "../../loader/skeleton-loader";
import "react-datepicker/dist/react-datepicker.css";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputField from "../../inputs/InputField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { api } from "../../../api/api";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
export default function Kirim({ keyword }) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [opens, setOpens] = useState(true);
  const [modal4, setModal4] = useState(false);
  const [payment_type, setPayment_Type] = useState({});
  const [excel, setExcel] = useState(false);
  const [productData, setProductData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [next, setNext] = useState("")
  const [loading, setLoading] = useState(true);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const timer = useRef(null);

  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const SendPost = useCallback(() => {
    api
      .post("finance/income/", {
        title: productData.title,
        type: productData.type,
        cashbox: productData.to_where.id,
        from_where: productData.from_where.title,
        payment_type: payment_type,
        client:
          productData.type === "Mijozdan" ? productData.from_where.id : null,
        summa: productData.summa,
        currency:
          payment_type === "Plastik" || payment_type === "Bank"
            ? 1
            : productData.currency,
        description: productData.description,
      })
      .then((res) => {
        setModal(false);
        if (res.id) {
          api.get("finance/income/").then((res) => {
            setData(res.results);
            setNext(res.next)
          });
        }
      });
  }, [productData, payment_type]);
  
  const functions2 = () => {
    let mounted = true;
    api.get("sales/clients/").then((res) => {
      if (mounted) {
        setData2(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const functions3 = () => {
    let mounted = true;
    api.get("finance/extra-income/").then((res) => {
      if (mounted) {
        setData3(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const functions4 = () => {
    let mounted = true;
    api.get("storage/currency/").then((res) => {
      if (mounted) {
        setData4(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const functions5 = () => {
    let mounted = true;
    api.get("finance/cashbox/").then((res) => {
      if (mounted) {
        setData5(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function2 = () => {
    setModal2((p) => !p);
    setModal3(false);
    setModal4(false);
    setPayment_Type("Naqd");
    setOpens(true);
  };
  const function3 = () => {
    setModal3((p) => !p);
    setModal4(false);
    setModal2(false);
    setPayment_Type("Plastik");
    setOpens(false);
  };
  const function4 = () => {
    setModal4((p) => !p);
    setModal2(false);
    setModal3(false);
    setPayment_Type("Bank");
    setOpens(false);
  };

  useEffect(() => {
    // function1();
    functions2();
    functions3();
    functions4();
    functions5();
    nextData()
  }, []);
  useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("finance/income/", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData(res.results);
              setNext(res.next)
              setLoading(false)
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("finance/income/").then((res) => {
        if (mounted) {
          setData(res.results);
          setNext(res.next)
          setLoading(false)
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then(res => {
        setData(prev => [...prev, ...res.results]);
        setNext(res.next)
    })
}, [next]);
  const filterByDate = useCallback(() => {
    setLoading(true);
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + 1;
    const yearEnd = endDate.getFullYear();
    if (startDate && endDate) {
      api
        .get("finance/income/", {
          params: {
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res.results);
        });
    }
  }, [startDate, endDate]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api
        .get("finance/income/", {
          params: {
            from: moment(oneMonthAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByPeriod === "week") {
      api
        .get("finance/income/", {
          params: {
            from: moment(oneWeekAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByPeriod === "day") {
      api
        .get("finance/income/", {
          params: {
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByPeriod === "year") {
      api
        .get("finance/income/", {
          params: {
            from: moment(oneYearsAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    return () => {
      mounted = true;
    };
  }, [filterByPeriod]);
  return (
    <>
      <div className="buyurtma_btn">
        <div className="data_div">
          <DataPick
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            filterByDateClick={filterByDate}
            clickByPeriod={filterByPeriod}
            setClickByPeriod={setFilterByPeriod}
          />
        </div>
        <div className="select_excel">
          <div
            className="select_mah_ex"
            onClick={() => setExcel((prev) => !prev)}
          >
            <p>Funksiyani tanlang</p>
            {excel ? (
              <i class="fa-solid fa-angle-down"></i>
            ) : (
              <i class="fa-solid fa-angle-right"></i>
            )}
          </div>
          <div className="all_excel" onClick={() => setExcel(false)}>
            {excel ? (
              <button
                className="modal_open2"
                type="button"
                onClick={() => setModal((prev) => !prev)}
              >
                Kirim qilish<span>+</span>
              </button>
            ) : (
              ""
            )}
            {excel ? (
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="exel_btn2"
                table="to_Excel"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excelga export"
                onClick={() => setExcel((prev) => !prev)}
              />
            ) : (
              ""
            )}
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
            <div className="modal-input-container">
              <div className="modal_input">
                <h1>Kirim qabul qilish</h1>
                <div className="create-product">
                  <div>
                    <TextField
                      label="Kirim nomi"
                      id="outlined-basic"
                      variant="outlined"
                      width="90%"
                      margin="20px 0  0  4px"
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Kirim turi
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) => handleChange("type", e.target.value)}
                        label="Mahsulot turi"
                      >
                        <MenuItem value="Mijozdan">Mijozdan</MenuItem>
                        <MenuItem value="Tashqaridan">Tashqaridan</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Qayerdan
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Mahsulot guruhi"
                        onChange={(e) =>
                          handleChange("from_where", e.target.value)
                        }
                      >
                        {productData.type === "Mijozdan"
                          ? data2.map((item) => (
                              <MenuItem value={item} key={item.id}>
                                {item.title}
                              </MenuItem>
                            ))
                          : productData.type === "Tashqaridan" &&
                            data3.map((item) => (
                              <MenuItem value={item} key={item.id}>
                                {item.title}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                    <div className="select_type_finance">
                      <span
                        className={
                          modal2
                            ? "finance_payment_types"
                            : "finance_payment_type"
                        }
                        onClick={function2}
                        value={payment_type}
                      >
                        Naqt
                      </span>
                      <span
                        className={
                          modal3
                            ? "finance_payment_types"
                            : "finance_payment_type"
                        }
                        onClick={function3}
                        value={payment_type}
                      >
                        Plastik
                      </span>
                      <span
                        className={
                          modal4
                            ? "finance_payment_types"
                            : "finance_payment_type"
                        }
                        onClick={function4}
                        value={payment_type}
                      >
                        Bank
                      </span>
                    </div>
                    <div className="miqdori">
                      <TextField
                        className="miqdor_input"
                        onChange={(e) => handleChange("summa", e.target.value)}
                        id="outlined-basic"
                        label="Summa"
                        variant="outlined"
                      />
                      {opens ? (
                        <FormControl variant="outlined" className="form_select">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Valyuta
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Valyuta"
                            onChange={(e) =>
                              handleChange("currency", e.target.value)
                            }
                          >
                            {data4.map((x) => (
                              <MenuItem key={x.id} value={x.id}>
                                {x.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <InputField
                          text="O'lchov b."
                          width="80%"
                          margin="20px 0  0  0"
                          value={"so'm"}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Qayerga
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Mahsulot turi"
                        onChange={(e) =>
                          handleChange("to_where", e.target.value)
                        }
                      >
                        {data5.map((x) => (
                          <MenuItem key={x.id} value={x}>
                            {x.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Izoh"
                      width="90%"
                      margin="20px 0 0 4px"
                      id="outlined-basic"
                      variant="outlined"
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                    <span>Info:</span>
                  </div>
                </div>
                <div className="modal_close">
                  <button onClick={SendPost}>Tasdiqlash</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="table">
      <InfiniteScroll
            dataLength={data?.length}
            next={nextData}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
          >
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th style={{ textAlign: "start" }}>
                <p>Kirim nomi</p>
              </th>
              <th>
                <p> Qayerdan</p>
              </th>
              <th>
                <p>Qayerga</p>
              </th>
              <th>
                <p>Kirim summasi</p>
              </th>
              <th>
                <p>Kirim turi</p>
              </th>
              <th>
                <p>Izoh</p>
              </th>
              <th>
                <p>Sana</p>
              </th>
            </tr>
          </thead>
         
            <tbody>
              {!loading && data &&
                data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "start", width: "130px" }}>
                        {item.title}
                      </td>
                      <td>{item.from_where}</td>
                      <td>{item.cashbox}</td>
                      <td>
                      <NumberFormat
                          value={item.summa} 
                          className="foo"
                          displayType={"text"}
                          suffix={item.currency}
                          thousandSeparator={true}
                          renderText={(value, props) => (
                            <div {...props}>{value}</div>
                          )}
                        />
                      </td>
                      <td>{item.type}</td>
                      <td>{item.description}</td>
                      <td>{item.created_at}</td>
                    </tr>
                  );
                })}
                {loading && (
              <>
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
              </>
            )}
            </tbody>
        </table>
          </InfiniteScroll>
      </div>
    </>
  );
}
