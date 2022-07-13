import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import DataPick from "./data_pick";
import InfiniteScroll from "react-infinite-scroll-component";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import { confirmAlert } from "react-confirm-alert";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import Autocomplete from "@material-ui/lab/Autocomplete";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import tasdiq from "../../Icons/tasdiq.svg";
import plus from "../../Icons/plus.png";
import TabSwitcher from "./TabSwitcher";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import InputField from "../../inputs/InputField";
import { api } from "../../../api/api";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Tabs = {
  HOMASHYO: "Homashyo",
  YARIMTAYYOR: "Yarim tayyor",
  TAYYOR: "Tayyor",
  INVENTAR: "Inventar",
};

function OmborMaxsulotlar({keyword}) {
  const [data, setData] = useState([]);
  const [notSavedProducts, setNotSavedProducts] = useState([]);
  const [newOrderData, setNewOrderData] = useState([]);
  const [newProductData, setNewProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const [storages, setStorages] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [activeTab, setActiveTab] = useState(Tabs.HOMASHYO);
  const [filterByFromWho, setFilterByFromWho] = useState("");
  const [filterByGroup, setFilterByGroup] = useState("");
  const [filterByCapacity, setFilterByCapacity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productGroups, setProductGroups] = useState([]);
  const [loading ,setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const timer = useRef(null);
  const [next, setNext] = useState("");

  const handleChangeNewProduct = (name, value) => {
    setNewProductData({
      ...newProductData,
      [name]: value,
    });
  };
  const handleChangeNewOrder = (name, value) => {
    setNewOrderData({
      ...newOrderData,
      [name]: value,
    });
  };
  const TAB_LIST = [
    { label: "Homashyo", name: Tabs.HOMASHYO },
    { label: "Yarim tayyor", name: Tabs.YARIMTAYYOR },
    { label: "Tayyor", name: Tabs.TAYYOR },
    { label: "Inventar", name: Tabs.INVENTAR },
  ];
  const filterByDateCLick = useCallback(() => {
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
            storage: 1,
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) =>{
          setLoading(false);
          setData(res.results)
        });
    }
  }, [startDate, endDate]);
  const addOrderClick = useCallback(() => {
    api
      .post("storage/product-orders/", {
        invoice: newOrderData.invoice,
        product: newOrderData.product.id,
        asked_quantity: newOrderData.asked_quantity,
        group: "Order",
        description: newOrderData.description,
      })
      .then((res) => {
        if (res.id) {
          setModal(false);
          setModalAlert(true);
        }
      });
  }, [newOrderData]);
  const addProductClick = useCallback(() => {
    api
      .post("storage/invoices/", {
        title: newProductData.title,
        from_who: newProductData.from_who,
        to_who: newProductData.to_who,
        deadline: newProductData.deadline,
        type: "Kirish",
        group: "Order",
      })
      .then((res) => {
        if (res.id) {
          setModal(true);
        }
      });
  }, [newProductData]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (activeTab === Tabs.HOMASHYO) {
      if (filterByGroup && filterByGroup !== "all") {
        api
          .get("storage/products/", {
            params: {
              type: activeTab,
              storage: 1,
              group: filterByGroup,
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
            }
          });
      } else if (filterByCapacity && filterByCapacity !== "all") {
        api
          .get("storage/products/", {
            params: {
              type: activeTab,
              storage: 1,
              critical: setFilterByCapacity.length > 0 ? "True" : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
            }
          });
      } else if (filterByCapacity === "all" || filterByGroup === "all") {
        api
            .get("storage/products/", {
              params: {
                type: activeTab,
                storage: 1,
              },
            })
            .then((res) => {
              if (mounted) {
                setLoading(false);
                setData(res.results);
              }
            });
      }
    }
    if (activeTab === Tabs.YARIMTAYYOR) {
      if (filterByGroup && filterByGroup !== "all") {
        api
          .get("storage/products/", {
            params: {
              type: activeTab,
              storage: 1,
              group: filterByGroup,
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
            }
          });
      }else  if (filterByGroup === "all") {
        api
            .get("storage/products/", {
              params: {
                type: activeTab,
                storage: 1,
              },
            })
            .then((res) => {
              if (mounted) {
                setLoading(false);
                setData(res.results);
              }
            });
      }
    }
    if (activeTab === Tabs.TAYYOR) {
      if (filterByGroup && filterByGroup !== "all") {
        api
          .get("storage/products/", {
            params: {
              type: activeTab,
              storage: 1,
              group: filterByGroup,
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
            }
          });
      }else if (filterByGroup === "all") {
        api
            .get("storage/products/", {
              params: {
                type: activeTab,
                storage: 1,
              },
            })
            .then((res) => {
              if (mounted) {
                setLoading(false);
                setData(res.results);
              }
            });
      }
    }
    if (activeTab === Tabs.INVENTAR) {
      if (filterByGroup && filterByGroup !== "all") {
        api
          .get("storage/products/", {
            params: {
              type: activeTab,
              storage: 1,
              group: filterByGroup,
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
            }
          });
      } else if (filterByGroup === "all") {
        api
            .get("storage/products/", {
              params: {
                type: activeTab,
                storage: 1,
              },
            })
            .then((res) => {
              if (mounted) {
                setLoading(false);
                setData(res.results);
              }
            });
      }
    }
    return () => {
      mounted = false;
    };
  }, [activeTab, filterByGroup, filterByCapacity]);
  useEffect(() => {
    let mounted = true;
    if (modal) {
      api
        .get("storage/invoices/?type=Kirish&status=None&group=Order")
        .then((res) => {
          if (mounted) {
            setNotSavedProducts(res.results);
          }
        });
      api.get("storage/products/?type=Homashyo").then((res) => {
        if (mounted) {
          setProducts(res.results);
        }
      });
    }
    if (modal2) {
      api.get("storage/storages").then((res) => {
        if (mounted) {
          setStorages(res);
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
    if(keyword.length > 0) {
      if(timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        api.get("storage/products/", {
          params: {
            type: activeTab,
            storage: 1,
            search: keyword.length > 0 ? keyword : ""
          }
        }).then(res => {
          if(mounted) {
            setLoading(false);
            setData(res.results)
            setNext(res.next)
          }
        })
      }, 500);
      return () => {
        clearTimeout(timer.current)
      }
    } else if (keyword.length < 1) {
    api
      .get("storage/products/", {
        params: {
          type: activeTab,
          storage: 1,
        },
      })
      .then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
          setNext(res.next)
        }
      }); }
    return () => {
      mounted = false;
    };
  }, [activeTab, keyword]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "year") {
      api.get("storage/products/", {
        params: {
          type: activeTab,
          storage: 1,
          from: moment(oneYearsAgo).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results)
        }
      });
    }
    if (filterByPeriod === "month") {
      api.get("storage/products/", {
        params: {
          type: activeTab,
          storage: 1,
          from: moment(oneMonthAgo).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if(mounted) {
          setLoading(false);
          setData(res.results)
        }
      });
    }
    if (filterByPeriod === "week") {
      api.get("storage/products/", {
        params: {
          type: activeTab,
          storage: 1,
          from: moment(oneWeekAgo).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if(mounted) {
          setLoading(false);
          setData(res.results)
        }
      });
    }
    if (filterByPeriod === "day") {
      api.get("storage/products/", {
        params: {
          type: activeTab,
          storage: 1,
          from: moment(monthDate).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if(mounted) {
          setLoading(false);
          setData(res.results)
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
          filterByDateClick={filterByDateCLick}
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
        {activeTab === Tabs.HOMASHYO && (
          <div className="buyurtma_btns">
            <button
              className="modal_open create_btn"
              type="button"
              onClick={() => setModal(true)}
            >
              <p>Taminotchiga buyurtma</p>
              <span>
                <img src={plus} alt="" />
              </span>
            </button>
          </div>
        )}
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
            <div className="modal_input factura-modal-3">
              <h1>Taminotchiga buyurtma</h1>
              {/*<TextField*/}
              {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
              {/*    id="outlined-basic"*/}
              {/*    label="Kelish narxi"*/}
              {/*    variant="outlined"*/}
              {/*/>*/}
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Mahsulot nomi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) =>
                    handleChangeNewOrder("invoice", e.target.value)
                  }
                  label="Mahsulot turi"
                >
                  {notSavedProducts?.map((x) => (
                    <MenuItem value={x.id}>{x.title}</MenuItem>
                  ))}
                  <MenuItem
                    className="menu-item-add"
                    onClick={() => {
                      setModal2(true);
                      setModal(false);
                    }}
                  >
                    <span>Mahsulot qoshish</span>
                    <img src={plus} alt="" style={{ marginLeft: "100px" }} />
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Mahsulot nomi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) =>
                    handleChangeNewOrder("product", e.target.value)
                  }
                  label="Mahsulot turi"
                >
                  {products?.map((x) => (
                    <MenuItem value={x}>{x.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <InputField
                text="Modeli"
                width="91%"
                margin="20px 0 0 0"
                value={newOrderData?.product?.model}
              />
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  onChange={(e) =>
                    handleChangeNewOrder("asked_quantity", e.target.value)
                  }
                  id="outlined-basic"
                  label="Miqdori"
                  type="number"
                  variant="outlined"
                />
                <InputField
                  text="O'lchov b."
                  width="81%"
                  margin="20px 0 0 0"
                  value={newOrderData?.product?.measurement_unit?.title}
                />
              </div>
              <InputField
                text="Muddati"
                width="90%"
                margin="20px 0 0 0"
                disabled={true}
              />
              <InputField
                text="Izoh"
                width="90%"
                margin="20px 0 0 0"
                setData={(e) =>
                  handleChangeNewOrder("description", e.target.value)
                }
              />
              <div className="modal_close">
                <button onClick={addOrderClick}>Buyurtma berish</button>
              </div>
            </div>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modal2}
          onClose={() => setModal2(false)}
          className="dflax"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal2}>
            <div className="modal_input factura-modal-2">
              <h1>Buyurtma yaratish</h1>
              {/*<TextField*/}
              {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
              {/*    id="outlined-basic"*/}
              {/*    label="Kelish narxi"*/}
              {/*    variant="outlined"*/}
              {/*/>*/}
              <InputField
                text="Taminotchi nomi"
                width="90%"
                margin="20px 0  0  0"
                setData={(e) => handleChangeNewProduct("title", e.target.value)}
              />
              <InputField
                text="Taminotchi nomi"
                width="90%"
                margin="20px 0  0  0"
                setData={(e) =>
                  handleChangeNewProduct("from_who", e.target.value)
                }
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Kimga
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) =>
                    handleChangeNewProduct("to_who", e.target.value)
                  }
                  label="Kimga"
                >
                  {storages.map((x) => {
                    return <MenuItem value={x.id}>{x.title}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <TextField
                // className="hodim_data"
                type="date"
                id="outlined-basic"
                label="Muddat"
                variant="outlined"
                onChange={(e) =>
                  handleChangeNewProduct("deadline", e.target.value)
                }
              />
              <div className="modal_close">
                <button onClick={addProductClick}>Buyurtma berish</button>
              </div>
            </div>
          </Fade>
        </Modal>
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text1={"Buyurtma"}
          text2={"muaffaqiyatli yaratildi!!!"}
        />
      </div>
      <TabSwitcher
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabList={TAB_LIST}
      />
      {activeTab === Tabs.HOMASHYO && (
        <div className="table">
          <div className="select-header">
            <select
              name=""
              id=""
              onChange={(e) => {
                setFilterByCapacity(e.target.value);
                setFilterByGroup("");
              }}
            >
              <option hidden selected disabled>
                Hajmi
              </option>
              <option value="oz">Oz qolgan</option>
              <option value="all">Barchasi</option>
            </select>
            <select
              name=""
              id=""
              onChange={(e) => {
                setFilterByGroup(e.target.value);
                setFilterByCapacity("");
              }}
            >
              <option hidden selected disabled>
                Guruhi
              </option>
              {productGroups.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="all">Barchasi</option>
            </select>
            {/*<select name="" id="">*/}
            {/*    <option hidden selected disabled>Kimdan</option>*/}
            {/*    {suppliers.map(x => (*/}
            {/*        <option value={x.id} key={x.id}>{x.title}</option>*/}
            {/*    ))}*/}
            {/*</select>*/}
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
                  <th style={{textAlign:"start"}}>
                    <p>Nomi</p>
                  </th>
                  <th>
                    <p>Mahsulot guruhi</p>
                  </th>
                  <th>
                    <p> Modeli</p>
                  </th>
                  <th>
                    <p> Miqdori </p>
                  </th>
                  <th>
                    <p> Kelish narxi</p>
                  </th>
                  <th>
                    <p>Summasi</p>
                  </th>
                  <th>
                    <p> Kodi</p>
                  </th>
                  <th>
                    <p> Keltirilgan sana</p>
                  </th>
                  <th>
                    <p> Yatoqlilik muddati</p>
                  </th>
                  <th>
                    <p> Izoh</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && data &&
                  data?.map((x, index) => (
                    <tr key={x?.id}>
                      <th>{index + 1}</th>
                      <th style={{textAlign:"start", width:"130px"}}>{x.title}</th>
                      <th>{x.group}</th>
                      <th>{x.model}</th>
                      <th>
                        {x.quantity} {x?.measurement_unit?.title}
                      </th>
                      <th>{x.arrival_price}</th>
                      <th>{x.quantity * x.arrival_price}</th>
                      <th>{x.code}</th>
                      <th>{x.created_at}</th>
                      <th>{x.shelf_life}</th>
                      <th>{x.description}</th>
                    </tr>
                  ))}
                {loading &&
                <>
                  <SkeletonLoader count={12}/>
                  <SkeletonLoader count={12}/>
                  <SkeletonLoader count={12}/>
                </>
                }
              </tbody>
            </table>
          </InfiniteScroll>
          </div>
        </div>
      )}
      {activeTab === Tabs.YARIMTAYYOR && (
        <div className="table">
          <div className="select-header">
            <select
              name=""
              id=""
              onChange={(e) => setFilterByGroup(e.target.value)}
            >
              <option selected hidden disabled>
                Mahsulot guruhi
              </option>
              {productGroups.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="all">Barchasi</option>
            </select>
          </div>
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Mahsulot guruhi</p>
                </th>
                <th>
                  <p> Kodi</p>
                </th>
                <th>
                  <p> Miqdori </p>
                </th>
                <th>
                  <p>Tan narxi</p>
                </th>
                <th>
                  <p>Summasi</p>
                </th>
                <th>
                  <p> Tayyorlangan sana</p>
                </th>
                <th>
                  <p> Yatoqlilik muddati</p>
                </th>
                <th>
                  <p> Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && data?.map((x, index) => (
                <tr key={x.id}>
                  <th>{index + 1}</th>
                  <th>{x.title}</th>
                  <th>{x.group}</th>
                  <th>{x.code}</th>
                  <th>
                    {x.quantity} {x?.measurement_unit?.title}
                  </th>
                  <th>
                    {x.selling_price} {x.currency}
                  </th>
                  <th>{x.quantity * x.selling_price}</th>
                  <th>{x.created_at}</th>
                  <th>{x.shelf_life}</th>
                  <th>{x.description}</th>
                </tr>
              ))}
              {loading &&
              <>
                <SkeletonLoader count={11}/>
                <SkeletonLoader count={11}/>
                <SkeletonLoader count={11}/>
              </>
              }
            </tbody>
          </table>
        </div>
      )}
      {activeTab === Tabs.TAYYOR && (
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
              {productGroups.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="all">Barchasi</option>
            </select>
            {/*<select name="" id="">*/}
            {/*    <option value="">Kimga</option>*/}
            {/*    <option value="">Kimga</option>*/}
            {/*    <option value="">Kimga</option>*/}
            {/*</select>*/}
          </div>
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Mahsulot guruhi</p>
                </th>
                <th>
                  <p> Modeli</p>
                </th>
                <th>
                  <p> Kodi</p>
                </th>
                <th>
                  <p> Miqdori </p>
                </th>
                <th>
                  <p>Tan narxi</p>
                </th>
                <th>
                  <p>Summasi</p>
                </th>
                <th>
                  <p> Tayyorlangan sana</p>
                </th>
                <th>
                  <p> Yatoqlilik muddati</p>
                </th>
                <th>
                  <p> Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && data &&
                data?.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th>{x.title}</th>
                    <th>{x.group}</th>
                    <th>{x.model}</th>
                    <th>{x.code}</th>
                    <th>
                      {x.quantity} {x?.measurement_unit?.title}
                    </th>
                    <th>
                      {x.selling_price} {x.currency}
                    </th>
                    <th>
                      {x.quantity * x.selling_price} {x.currency}
                    </th>
                    <th>{x.created_at}</th>
                    <th>{x.shelf_life}</th>
                    <th>{x.description}</th>
                  </tr>
                ))}
              {loading &&
              <>
                <SkeletonLoader count={12}/>
                <SkeletonLoader count={12}/>
                <SkeletonLoader count={12}/>
              </>
              }
            </tbody>
          </table>
        </div>
      )}
      {activeTab === Tabs.INVENTAR && (
        <div className="table">
          <div className="select-header">
            <select
              name=""
              id=""
              onChange={(e) => setFilterByGroup(e.target.value)}
            >
              <option selected hidden disabled>
                Mahsulot guruhi
              </option>
              {productGroups.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.title}
                </option>
              ))}
              <option value="all">Barchasi</option>
            </select>
          </div>
          <table id="to_Excel">
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p> Modeli</p>
                </th>
                <th>
                  <p> Miqdori </p>
                </th>
                <th>
                  <p>Tan narxi</p>
                </th>
                <th>
                  <p>Summasi</p>
                </th>
                <th>
                  <p> Tayyorlangan sana</p>
                </th>
                <th>
                  <p> Yatoqlilik muddati</p>
                </th>
                <th>
                  <p> Izoh</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading && data &&
                data?.map((x, index) => (
                  <tr key={x.id}>
                    <th>{index + 1}</th>
                    <th>{x.title}</th>
                    <th>{x.model}</th>
                    <th>
                      {x.quantity} {x?.measurement_unit?.title}
                    </th>
                    <th>
                      {x.selling_price} {x.currency}
                    </th>
                    <th>{x.quantity * x.selling_price}</th>
                    <th>{x.created_at}</th>
                    <th>{x.shelf_life}</th>
                    <th>{x.description}</th>
                  </tr>
                ))}
              {loading &&
              <>
                <SkeletonLoader count={10}/>
                <SkeletonLoader count={10}/>
                <SkeletonLoader count={10}/>
              </>
              }
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}

export default OmborMaxsulotlar;
