import React, { useCallback, useEffect, useState, useRef } from "react";
import DataPick from "./data_pick";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../../loader/skeleton-loader";
import Fade from "@material-ui/core/Fade";
import NumberFormat from "react-number-format";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import InputField from "../../inputs/InputField";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import moment from "moment";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Chiqim({ keyword }) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [payment_type, setPayment_Type] = useState({});
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [productData, setProductData] = useState([]);
  const [productGroup, setProductGroup] = useState([]);
  const [group, setGroup] = useState("");
  const [filter1, setFilter1] = useState([]);
  const [filter2, setFilter2] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [excel, setExcel] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [opens, setOpens] = useState(true);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const [next, setNext] = useState("");
  const notify = () => toast("Hisobingizda mablag'ingiz yetmadi");
  const handleOpen = () => {
    setModal((prev) => !prev);
  };
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleSelect = (name, value) => {
    const filter1 = data3.filter((item) => item.type === value);
    setFilter1(filter1);
    setFilter2(filter2);
    const newValue = data5.filter((item) => item.id === value);
    setTitle(newValue[0]);
  };
  const SendPost = useCallback(() => {
    setModal(false);
    api
      .post("finance/payment/", {
        type: title?.id,
        cashbox: productData.from_where,
        to_where:
          title?.to_employee === true
            ? productData.to_where.first_name
            : productData.to_where.title,
        supplier: title?.to_supplier === true ? productData.to_where.id : null,
        employee: title?.to_employee === true ? productData.to_where.id : null,
        payment_type: payment_type,
        summa: productData.summa,
        currency:
          payment_type === "Plastik" || payment_type === "Bank"
            ? 1
            : productData.currency,
        description: productData.description,
        bonus: productData.bonus,
        bonus_reason: productData.bonus_reason,
        fine: productData.fine,
        fine_reason: productData.fine_reason,
      })
      .then((res) => {
        if (res) {
          api.get("finance/payment/").then((res) => {
            setData(res.results);
            setNext(res.next);
            setModal(false);
          });
        }
      });
  }, [productData, payment_type, title]);
  console.log(productData, "productData")
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
  const functions1 = () => {
    let mounted = true;
    setLoading(true);
    api.get("finance/payment/").then((res) => {
      if (mounted) {
        setLoading(false);
        setData(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const functions2 = () => {
    let mounted = true;
    api.get("finance/cashbox").then((res) => {
      if (mounted) {
        setData2(res);
        console.log(res, "data2");
      }
    });
    return () => {
      mounted = false;
    };
  };
  const a = data2
    .filter((item) => item.title === "Kassa 1")
    .map((item) => item.card);
  const a2 = data2
    .filter((item) => item.title === "Kassa 1")
    .map((item) => item.cash_sum);
  const a3 = data2
    .filter((item) => item.title === "Kassa 1")
    .map((item) => item.bank);
  const a4 = data2
    .filter((item) => item.title === "Kassa 1")
    .map((item) => item.cash_dollar);
  const b = data2
    .filter((item) => item.title === "Kassa 2")
    .map((item) => item.card);
  const b2 = data2
    .filter((item) => item.title === "Kassa 2")
    .map((item) => item.cash_sum);
  const b3 = data2
    .filter((item) => item.title === "Kassa 2")
    .map((item) => item.bank);
  const b4 = data2
    .filter((item) => item.title === "Kassa 2")
    .map((item) => item.cash_dollar);
  const c = Math.floor(a);
  const c2 = Math.floor(a2);
  const c3 = Math.floor(a3);
  const c4 = Math.floor(a4);
  const d = Math.floor(b);
  const d2 = Math.floor(b2);
  const d3 = Math.floor(b3);
  const d4 = Math.floor(b4);
  const f = c + d;
  const f2 = c2 + d2;
  const f3 = c3 + d3;
  const f4 = c4 + d4;
  console.log(f);
  console.log(f2);
  console.log(f3);
  console.log(f4);
  const functions3 = () => {
    let mounted = true;
    api.get("finance/sub-cost-type/").then((res) => {
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
    api.get("finance/cost-type/").then((res) => {
      if (mounted) {
        setData5(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const functions5 = () => {
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
  const functions6 = () => {
    let mounted = true;
    api.get("user/salary/").then((res) => {
      if (mounted) {
        setData6(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const functions7 = () => {
    let mounted = true;
    api.get("supplier/suppliers/").then((res) => {
      if (mounted) {
        setData7(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    // functions1();
    functions2();
    functions3();
    functions4();
    functions5();
    functions6();
    functions7();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("finance/payment/", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData(res.results);
              setNext(res.next);
              setLoading(false);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("finance/payment/").then((res) => {
        if (mounted) {
          setData(res.results);
          setNext(res.next);
          setLoading(false);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
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
        .get("finance/payment/", {
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
        .get("finance/payment/", {
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
        .get("finance/payment/", {
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
        .get("finance/payment/", {
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
        .get("finance/payment/", {
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
  const resultsFunctions1 = ()=>{
    if(payment_type === "Naqd"){
      return (
         productData.currency === 1 ? c2 >= productData.summa  ? SendPost() : notify() : c4 >= productData.summa ? SendPost() : notify()
      )
    }
    else if(payment_type === "Plastik"){
      return (
        c >= productData.summa ? SendPost() : notify()
      )
    }
    else if(payment_type === "Bank"){
      return (
        c3 >= productData.summa ? SendPost() : notify()
      )
    }
  }
  const resultsFunctions2 = ()=>{
    if(payment_type === "Naqd"){
      return (
         productData.currency === 1 ? d2 >= productData.summa  ? SendPost() : notify() : d4 >= productData.summa ? SendPost() : notify()
      )
    }
    else if(payment_type === "Plastik"){
      return (
        d >= productData.summa ? SendPost() : notify()
      )
    }
    else if(payment_type === "Bank"){
      return (
        d3 >= productData.summa ? SendPost() : notify()
      )
    }
  }
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
      <ToastContainer />

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
                onClick={handleOpen}
              >
                Chiqim qilish<span>+</span>
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
                <h1>Chiqim qilish</h1>
                <div className="create-product">
                  <div>
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Chiqim turi
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Mahsulot turi"
                        onChange={(e) => handleSelect("type", e.target.value)}
                      >
                        {data5.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                        {title?.to_employee === true
                          ? data6.map((item) => (
                              <MenuItem value={item} key={item.id}>
                                {item.first_name}
                              </MenuItem>
                            ))
                          : title?.to_supplier === false &&
                            title.to_employee === false
                          ? filter1.map((item) => (
                              <MenuItem value={item} key={item.id}>
                                {item.title}
                              </MenuItem>
                            ))
                          : title?.to_supplier === true &&
                            data7.map((item) => (
                              <MenuItem value={item} key={item.id}>
                                {item.title}
                              </MenuItem>
                            ))}
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
                        {data2.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
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
                    {title.to_employee === true ? (
                      <TextField
                        label="Bonus"
                        width="90%"
                        margin="20px 0 0 4px"
                        id="outlined-basic"
                        variant="outlined"
                        type="number"
                        onChange={(e) => handleChange("bonus", e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {title.to_employee === true ? (
                      <TextField
                        label="Bonus sababi"
                        width="90%"
                        margin="20px 0 0 4px"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e) =>
                          handleChange("bonusSababi", e.target.value)
                        }
                      />
                    ) : (
                      ""
                    )}
                    {title.to_employee === true ? (
                      <TextField
                        label="Jarima"
                        type="number"
                        width="90%"
                        margin="20px 0 0 4px"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e) => handleChange("fine", e.target.value)}
                      />
                    ) : (
                      ""
                    )}
                    {title.to_employee === true ? (
                      <TextField
                        label="Jarima sababi"
                        width="90%"
                        margin="20px 0 0 4px"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e) =>
                          handleChange("fineReason", e.target.value)
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="modal_close">
                {
                  productData.from_where === 1 ?
                  <button onClick={resultsFunctions1}>Tasdiqlash</button>
                  :
                  productData.from_where === 3 ? 
                  <button onClick={resultsFunctions2}>Tasdiqlash</button> :
                  <button>Tasdiqlash</button>
                }
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="table">
        <div className="select-header2">
          <select
            name=""
            id=""
            onChange={(e) => (setOptionValue(e.target.value), setGroup(""))}
          >
            <option value="barchasi">Barchasi</option>
            <option value="ozqolgan">Ozqolgan</option>
          </select>
          <select
            name=""
            id=""
            onChange={(e) => (setGroup(e.target.value), setOptionValue(""))}
          >
            <option hidden disabled selected>
              Mahsulot guruhi
            </option>
            {productGroup.map((x) => (
              <option value={x.id} key={x.id}>
                {x.title}
              </option>
            ))}
          </select>
        </div>
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
                  <p>Chiqim turi</p>
                </th>
                <th>
                  <p>Qayerdan</p>
                </th>
                <th>
                  <p>Qayerga</p>
                </th>
                <th>
                  <p>Kirim summasi</p>
                </th>
                <th>
                  <p>To'lov turi</p>
                </th>
                <th>
                  <p>Sana</p>
                </th>
                <th>
                  <p>Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data &&
                data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "start", width: "130px" }}>
                        {item.type}
                      </td>
                      <td>{item.cashbox}</td>
                      <td>{item.to_where}</td>
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
                      <td>{item.payment_type}</td>
                      <td>{item.created_at}</td>
                      <td>{item.description}</td>
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
