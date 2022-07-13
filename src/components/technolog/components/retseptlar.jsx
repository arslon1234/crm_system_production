import React, { useState, useEffect, useCallback, useRef } from "react";
import DataPick from "./data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
const Maxsulotlar = ({ url, handlemenu, keyword }) => {
  const [data, setData] = useState([]);
  const [createData, setCreateData] = useState([]);
  const [measurement, setMeasurement] = useState([]);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [excel, setExcel] = useState(false)
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const history = useHistory();
  const timer = useRef(null);
  const handleChange = (name, value) => {
    setCreateData({
      ...createData,
      [name]: value,
    });
  };
  const handleOpen =()=>{
    setModal((prev)=>!prev)
  }
  console.log(createData, " data");
  const sendResetp = useCallback(() => {
    api
      .post("texnolog/recipes/", {
        title: createData.title,
        measurement_unit: createData.measurement_unit,
        description: createData.description,
        created_by: createData.created_by,
        currency: 1,
      })
      .then((res) => {
        if (res.id) {
          setModal(false);
          api.get("texnolog/recipes/").then((res) => {
            setData(res);
          });
        }
      });
  }, [createData]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("texnolog/recipes/").then((res) => {
      if (mounted) {
        setLoading(false);
        setData(res);
        console.log(res.results);
      }
    });
    api.get("storage/measurements/").then((res) => {
      if (mounted) {
        setMeasurement(res);
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
          .get("texnolog/recipes/", {
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
      api.get("texnolog/recipes/").then((res) => {
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
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api
        .get("texnolog/recipes/", {
          params: {
            from: moment(oneMonthAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "week") {
      api
        .get("texnolog/recipes/", {
          params: {
            from: moment(oneWeekAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "day") {
      api
        .get("texnolog/recipes/", {
          params: {
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "year") {
      api
        .get("texnolog/recipes/", {
          params: {
            from: moment(oneYearsAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    return () => {
      mounted = true;
    };
  }, [filterByPeriod]);
  const handleClose = () => {
    setModal(false);
  };
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
        .get("texnolog/recipes/", {
          params: {
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res);
        });
    }
  }, [startDate, endDate]);
  return (
    <React.Fragment>
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
        <div className="select_mah_ex" onClick={()=>setExcel((prev)=>!prev)}>
            <p>Funksiyani tanlang</p>
            {
              excel ? 
            <i class="fa-solid fa-angle-down"></i>
            :
            <i class="fa-solid fa-angle-right"></i>
            }
          </div>
          <div className="all_excel" onClick={()=>setExcel((prev)=>!prev)}>
          {
            excel ? 
            <button className="modal_open2" type="button" onClick={handleOpen}>
              Yangi mahsulot yaratish<span>+</span>
            </button> 
            : ""
          }
          {
            excel ? 
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="exel_btn2"
            table="to_Excel"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excelga export"
            onClick={()=>setExcel((prev)=>!prev)}
        /> :""
          }
          </div>
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
            <div className="modal_input modal_input5">
              <h1>Yangi maxsulot</h1>
              <TextField
                label="Nomi"
                variant="outlined"
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  O`lchov birligi
                </InputLabel>
                <Select
                  onChange={(e) =>
                    handleChange("measurement_unit", e.target.value)
                  }
                  label="O`lchov birligi"
                >
                  {measurement.map((x) => (
                    <MenuItem value={x.id} key={x.id}>
                      {x.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                onChange={(e) => handleChange("created_by", e.target.value)}
                label="Muallif"
                variant="outlined"
              />
              <TextField
                onChange={(e) => handleChange("description", e.target.value)}
                label="Izoh"
                variant="outlined"
              />
              <div className="modal_close">
                <button onClick={sendResetp}>Qo`shish</button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th style={{ textAlign: "start" }}>
                <p> Nomi </p>
              </th>
              <th>
                <p> Masalliqlar soni </p>
              </th>
              <th>
                <p> o`lchov birligi </p>
              </th>
              <th>
                <p> Birlik summasi </p>
              </th>
              <th>
                <p> Muallifi </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Asos s. sana </p>
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
                        <div
                          style={{ cursor: "pointer" }}
                          className="a_lar"
                          onClick={() =>
                            history.replace(
                              `${url}/retsep/${item.id}/${item.title}/${item.status}`
                            )
                          }
                        >
                          {item.title}
                        </div>
                      </td>
                      <td>{item.materials_count}</td>
                      <td>{item.measurement_unit}</td>
                      <td>
                        {item.unit_sum} {item.currency}
                      </td>
                      <td>{item.created_by}</td>
                      <td style={{ textAlign: "start", width: "130px" }}>
                        {item.description}
                      </td>
                      <td>{item.created_at}</td>
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
};

export default Maxsulotlar;
