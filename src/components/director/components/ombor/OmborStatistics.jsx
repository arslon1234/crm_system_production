import React, { useCallback, useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import InfiniteScroll from "react-infinite-scroll-component";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NumberFormat from "react-number-format";
// import Autocomplete from "@material-ui/lab/Autocomplete";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";
//Import Image
import WarningModal from "../../../modal/WarningModal";
import DeleteModal from "../../../modal/DeleteModal";
import InputField from "../../../inputs/InputField";
import { api } from "../../../../api/api";
import TabSwitcher from "../../../warehouseMan/components/TabSwitcher";
import DataPick from "../../../warehouseMan/components/data_pick";
import SkeletonLoader from "../../../loader/skeleton-loader";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Tabs = {
  HOMASHYO: "Homashyo",
  YARIMTAYYOR: "Yarim tayyor",
  TAYYOR: "Tayyor",
  INVENTAR: "Inventar",
};
const OmborStatistics = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [measurement, setMeasurement] = useState([]);
  const [storages, setStorages] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [filterByGroup, setFilterByGroup] = useState("");
  const [filterByFromWho, setFilterByFromWho] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState(Tabs.HOMASHYO);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const [next, setNext] = useState("");
  const timer = useRef(null);
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const click = useCallback(() => {
    api.post("storage/products/", productData).then((res) => {
      if (res.id) {
        setModalAlert(true);
        setModal(false);
        api
          .get("storage/products/", {
            params: {
              type: activeTab,
            },
          })
          .then((res) => setData(res.results));
      }
    });
  }, [productData]);
  const TAB_LIST = [
    { label: "HOMASHYO", name: Tabs.HOMASHYO, id: 1 },
    { label: "YARIMTAYYOR", name: Tabs.YARIMTAYYOR, id: 2 },
    { label: "TAYYOR", name: Tabs.TAYYOR, id: 3 },
    { label: "INVENTAR", name: Tabs.INVENTAR, id: 4 },
  ];
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
        .get("storage/products/", {
          params: {
            type: activeTab,
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res.results);
        });
    }
  }, [startDate, endDate, activeTab]);
  useEffect(() => {
    let mounted = false;
    setLoading(true);
    api
      .get("storage/products/", {
        params: {
          type: activeTab,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.results);
      });
    return () => {
      mounted = true;
    };
  }, [activeTab]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (filterByFromWho && filterByFromWho !== "all") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
            supplier: filterByFromWho,
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
          }
        });
    }
    if (filterByGroup && filterByGroup !== "all") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
            // supplier: filterByGroup,
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
    if (filterByFromWho === "all" || filterByGroup === "all") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
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
      mounted = false;
    };
  }, [activeTab, filterByFromWho, filterByGroup]);
  useEffect(() => {
    let mounted = true;
    if (modal) {
      api.get("storage/measurements/").then((res) => {
        if (mounted) {
          setMeasurement(res);
        }
      });
      api.get("storage/currency/").then((res) => {
        if (mounted) {
          setCurrency(res);
        }
      });
      api.get("storage/storages/").then((res) => {
        if (mounted) {
          setStorages(res);
        }
      });
      api.get("storage/clients/").then((res) => {
        if (mounted) {
          setClients(res);
        }
      });
    }
    api.get("storage/product-groups/").then((res) => {
      if (mounted) {
        setProductGroups(res);
      }
    });
    api.get("supplier/suppliers/").then((res) => {
      if (mounted) {
        setSuppliers(res);
      }
    });
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
          .get("storage/products/", {
            params: {
              type: activeTab,
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
              setNext(res.next)
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results);
            setNext(res.next)
          }
        });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword, activeTab]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api
        .get("storage/products/", {
          params: {
            type: activeTab,
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
        .get("storage/products/", {
          params: {
            type: activeTab,
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
        .get("storage/products/", {
          params: {
            type: activeTab,
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
        .get("storage/products/", {
          params: {
            type: activeTab,
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
  }, [filterByPeriod, activeTab]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then(res => {
        setData(prev => [...prev, ...res.results]);
        setNext(res.next)
    })
}, [next]);
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <DataPick
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          filterByDateClick={filterByDate}
          clickByPeriod={filterByPeriod}
          setClickByPeriod={setFilterByPeriod}
        />
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
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
                <h1>Yangi mahsulot yaratish</h1>
                {/*<TextField*/}
                {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
                {/*    id="outlined-basic"*/}
                {/*    label="Kelish narxi"*/}
                {/*    variant="outlined"*/}
                {/*/>*/}
                <div className="create-product">
                  <div>
                    <InputField
                      text="Mahsulot nomi"
                      width="90%"
                      margin="20px 0  0  4px"
                      setData={(e) => handleChange("title", e.target.value)}
                    />
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Mahsulot turi
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) => handleChange("type", e.target.value)}
                        label="Mahsulot turi"
                      >
                        <MenuItem value="Homashyo">Homashyo</MenuItem>
                        <MenuItem value="Yarim tayyor">Yarim tayyor</MenuItem>
                        <MenuItem value="Tayyor">Tayyor</MenuItem>
                        <MenuItem value="Inventar">Inventar</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Mahsulot guruhi
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) => handleChange("group", e.target.value)}
                        label="Mahsulot guruhi"
                      >
                        {productGroups.map((x) => (
                          <MenuItem value={x.id} key={x.id}>
                            {x.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <InputField
                      text="Modeli"
                      width="90%"
                      margin="20px 0  0  4px"
                      setData={(e) => handleChange("model", e.target.value)}
                    />
                    <InputField
                      text="Kod"
                      width="90%"
                      margin="20px 0  0  4px"
                      setData={(e) => handleChange("code", e.target.value)}
                    />
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        O'lchov birligi
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) =>
                          handleChange("measurement_unit", e.target.value)
                        }
                        label="O'lchov birligi"
                      >
                        {measurement.map((x) => (
                          <MenuItem value={x.id} key={x.id}>
                            {x.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="miqdori">
                      <TextField
                        className="miqdor_input"
                        onChange={(e) =>
                          handleChange("arrival_price", e.target.value)
                        }
                        id="outlined-basic"
                        label="Kelish narxi"
                        variant="outlined"
                      />
                      <FormControl variant="outlined" className="form_select">
                        <InputLabel id="demo-simple-select-outlined-label">
                          Valyuta
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) =>
                            handleChange("currency", e.target.value)
                          }
                          label="Valyuta"
                        >
                          {currency.map((x) => (
                            <MenuItem value={x.id} key={x.id}>
                              {x.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div>
                    <div className="miqdori">
                      <TextField
                        className="miqdor_input"
                        disabled={true}
                        id="outlined-basic"
                        label="Tashqi Harajatlari"
                        variant="outlined"
                      />
                      <FormControl
                        variant="outlined"
                        className="form_select"
                        disabled={true}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Valyuta
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Valyuta"
                        >
                          {currency.map((x) => (
                            <MenuItem value={x.id} key={x.id}>
                              {x.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="miqdori">
                      <TextField
                        className="miqdor_input"
                        onChange={(e) =>
                          handleChange("selling_price", e.target.value)
                        }
                        id="outlined-basic"
                        label="Sotish narxi"
                        variant="outlined"
                      />
                      <FormControl variant="outlined" className="form_select">
                        <InputLabel id="demo-simple-select-outlined-label">
                          Valyuta
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) =>
                            handleChange("currency", e.target.value)
                          }
                          label="valyuta"
                        >
                          {currency.map((x) => (
                            <MenuItem value={x.id} key={x.id}>
                              {x.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <FormControl variant="outlined" className="form_select">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Ombori
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) =>
                          handleChange("storage", e.target.value)
                        }
                        label="Ombori"
                      >
                        {storages.map((x) => {
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
                        Kimdan kelgani
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) =>
                          handleChange("supplier", e.target.value)
                        }
                        label=" Kimdan kelgani"
                      >
                        {suppliers.map((x) => {
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
                        Kim uchun
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        onChange={(e) =>
                          handleChange("clients", e.target.value)
                        }
                        label="Kim uchun"
                      >
                        {clients.map((x) => {
                          return (
                            <MenuItem value={x.id} key={x.id}>
                              {x.title}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <InputField
                      text="Yaroqlilik muddati"
                      width="90%"
                      margin="20px 0 0 4px"
                      setData={(e) =>
                        handleChange("shelf_life", e.target.value)
                      }
                    />
                    <InputField
                      text="Izoh"
                      width="90%"
                      margin="20px 0 0 4px"
                      setData={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="modal_close">
                  <button onClick={click}>Buyurtma berish</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text1={productData?.title}
          text2={"mahsulotlar omboriga saqlandi."}
        />
        <DeleteModal
          open={modalDelete}
          close={() => setModalDelete((prev) => !prev)}
          text1={"“Product N”"}
          text2={"mahsulotlar omboridan o`chirildi."}
        />
      </div>
      <TabSwitcher
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabList={TAB_LIST}
      />
      <div className="table">
        <div className="select-header">
          <select
            name=""
            id=""
            onChange={(e) => {
              setFilterByGroup(e.target.value);
              setFilterByFromWho("");
            }}
          >
            <option disabled selected hidden value="">
              Mahsulot guruhi
            </option>
            {productGroups.map((x) => (
              <option value={x.id} key={x.id}>
                {x.title}
              </option>
            ))}
            <option value="all">Barchasi</option>
          </select>
          <select
            name=""
            id=""
            onChange={(e) => {
              setFilterByFromWho(e.target.value);
              setFilterByGroup("");
            }}
          >
            <option disabled selected hidden>
              Kimdan
            </option>
            {suppliers.map((x) => (
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
                <th>
                  <p> Maxsulot nomi</p>
                </th>
                <th>
                  <p>Mahsulot guruhi</p>
                </th>
                <th>
                  <p> Modeli</p>
                </th>
                <th>
                  <p> Kodi </p>
                </th>
                <th>
                  <p> Miqdori</p>
                </th>
                <th>
                  <p> Kelish narxi</p>
                </th>
                <th>
                  <p> Sotish narxi</p>
                </th>
                <th>
                  <p>Qo'shilgan sana</p>
                </th>
                <th>
                  <p>Yaroqlilik muddati</p>
                </th>
                <th>
                  <p> Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th style={{ width: "100px", textAlign: "start" }}>
                      {x.title}
                    </th>
                    <th>{x.group}</th>
                    <th>{x.model}</th>
                    <th>{x.code}</th>
                    <th>
                      {x.quantity} {x.measurement_unit.title}
                    </th>
                    <th>
                    <NumberFormat
                      value={x.arrival_price} 
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                      {x.currency}
                    </th>
                    <th>
                    <NumberFormat
                      value={x.selling_price}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                       {x.currency}
                    </th>
                    <th>{x.created_at} </th>
                    <th>{x.shelf_life} </th>
                    <th>{x.discription} </th>
                  </tr>
                ))}
              {loading && (
                <>
                  <SkeletonLoader count={12} />
                  <SkeletonLoader count={12} />
                  <SkeletonLoader count={12} />
                </>
              )}
            </tbody>
          </table>
          </InfiniteScroll>
        </div>
      </div>
    </React.Fragment>
  );
};
export default OmborStatistics;
