// import React, { useCallback, useEffect, useState, useRef } from "react";
// import DataPick from "./data_pick";
// import plus from "../../Icons/plus.png";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import Fade from "@material-ui/core/Fade";
// import Modal from "@material-ui/core/Modal";
// import Select from "@material-ui/core/Select";
// import Backdrop from "@material-ui/core/Backdrop";
// import MenuItem from "@material-ui/core/MenuItem";
// import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import WarningModal from "../../modal/WarningModal";
// import SkeletonLoader from "../../loader/skeleton-loader";
// import DeleteModal from "../../modal/DeleteModal";
// import InputField from "../../inputs/InputField";
// import plusss from "../../Icons/plusss.svg";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { api } from "../../../api/api";
// import AcceptModal2 from "../../modal/AcceptModal2";
// export default function OmborQoldiq({ keyword }) {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [data4, setData4] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [modal2, setModal2] = useState(false);
//   const [modalAlert, setModalAlert] = useState(false);
//   const [modalDelete, setModalDelete] = useState(false);
//   const [productData, setProductData] = useState([]);
//   const [productData2, setProductData2] = useState([]);
//   const [joinInput, setJoinInput] = useState(false);
//   const [productGroup, setProductGroup] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [group, setGroup] = useState("");
//   const [optionValue, setOptionValue] = useState("");
//   const [modalAccept2, setModalAccept2] = useState(false);
//   const timer = useRef(null);
//   const handleChange = (name, value) => {
//     setProductData({
//       ...productData,
//       [name]: value,
//     });
//   };
//   const handleChange2 = (name, value) => {
//     setProductData2({
//       ...productData2,
//       [name]: value,
//     });
//   };
//   const sendData1 = useCallback(() => {
//     setModal(false);
//     api
//       .post("storage/product-orders/", {
//         invoice: productData.invoice.id,
//         product: productData.productName.id,
//         asked_quantity: productData.quantity,
//         description: productData.description,
//         further: productData.descriptions,
//         group: "Order",
//       })
//       .then((res) => {
//         setModal(false);
//       });
//   }, [productData]);
//   console.log(productData, "data");

//   const sendData2 = useCallback(() => {
//     api
//       .post("storage/invoices/", {
//         title: productData2.title,
//         to_who: productData2.ombor,
//         type: "Kirish",
//         group: "Order",
//       })
//       .then((res) => {
//         console.log(res, "data2");
//         setModal2(!modal2);
//       });
//   }, [productData2, modal2]);
//   // "storage/products/?type=Homashyo&group={id}"
//   const function1 = useCallback(() => {
//     if (optionValue) {
//       if (optionValue === "barchasi") {
//         api.get("storage/products/?type=Homashyo").then((res) => {
//           setData(res);
//           console.log(res, "HAMMASI");
//         });
//       } else {
//         api.get("storage/products/?type=Homashyo&critical=True").then((res) => {
//           setData(res);
//           console.log(res, "ozqolgan");
//         });
//       }
//     } else if (group) {
//       api.get(`storage/products/?type=Homashyo&group=${group}`).then((res) => {
//         setData(res);
//         console.log(res, "ozqolgan");
//       });
//     }
//   }, [group, optionValue]);

//   const funciton2 = () => {
//     let mounted = true;
//     api
//       .get("storage/invoices/?type=Kirish&status=None&group=Order")
//       .then((res) => {
//         if (mounted) {
//           setData2(res);
//           console.log(res.results);
//         }
//       });
//     return () => {
//       mounted = false;
//     };
//   };
//   const funciton3 = () => {
//     let mounted = true;
//     api.get("storage/products/?type=Homashyo").then((res) => {
//       if (mounted) {
//         setData3(res);
//         console.log(res.results, "data3");
//       }
//     });
//     return () => {
//       mounted = false;
//     };
//   };
//   const function4 = () => {
//     let mounted = true;
//     api.get("storage/storages").then((res) => {
//       if (mounted) {
//         setData4(res);
//         console.log(res, "result");
//       }
//     });
//     return () => {
//       mounted = false;
//     };
//   };
//   const function5 = () => {
//     api.get("storage/product-groups").then((res) => {
//       setProductGroup(res);
//     });
//   };
//   useEffect(() => {
//     function1();
//     funciton2();
//     funciton3();
//     function4();
//     function5();
//   }, [optionValue, group, function1]);
//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     api.get("storage/products/?type=Homashyo").then((res) => {
//       if (mounted) {
//         setLoading(false);
//         setData(res);
//       }
//     });
//     return () => {
//       mounted = false;
//     };
//   }, []);
//   useEffect(() => {
//     let mounted = true;
//     if (keyword.length > 0) {
//       if (timer.current) {
//         clearTimeout(timer.current);
//       }
//       timer.current = setTimeout(() => {
//         api
//           .get("storage/products/?type=Homashyo", {
//             params: {
//               search: keyword.length > 0 ? keyword : "",
//             },
//           })
//           .then((res) => {
//             if (mounted) {
//               setData(res);
//             }
//           });
//       }, 500);
//       return () => {
//         clearTimeout(timer.current);
//       };
//     } else if (keyword.length < 1) {
//       api.get("storage/products/?type=Homashyo").then((res) => {
//         if (mounted) {
//           setData(res);
//         }
//       });
//     }
//     return () => {
//       clearTimeout();
//       mounted = false;
//     };
//   }, [keyword]);
//   return (
//     <>
//       <div className="buyurtma_btn">
//       <ReactHTMLTableToExcel
//           id="test-table-xls-button"
//           className="exel_btn"
//           table="to_Excel"
//           filename="tablexls"
//           sheet="tablexls"
//           buttonText="Excelga export"
//         />
//         <div className="buyurtma_btns">
//           <button
//             className="modal_open create_btn"
//             type="button"
//             onClick={() => setModal(true)}
//           >
//             <p>Buyurtma berish</p>
//             <span>
//               <img src={plus} alt="" />
//             </span>
//           </button>
//         </div>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           open={modal}
//           onClose={() => setModal(false)}
//           className="dflax"
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={modal}>
//             <div className="modal_input modal_input2">
//               <h1>Buyurtma berish</h1>
//               <FormControl variant="outlined" className="form_select">
//                 <InputLabel id="demo-simple-select-outlined-label">
//                   Buyurtma nomi
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-outlined-label"
//                   id="demo-simple-select-outlined"
//                   label="Buyurtma nomi"
//                   onChange={(e) => handleChange("invoice", e.target.value)}
//                 >
//                   {data2.results &&
//                     data2?.results.map((item) => (
//                       <MenuItem value={item} key={item.id}>
//                         {item.title}
//                       </MenuItem>
//                     ))}
//                   <MenuItem
//                     value="yangi maxsulot"
//                     onClick={() => setModal2(!modal2)}
//                   >
//                     <span>yangi buyurtma qushish</span>
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl variant="outlined" className="form_select">
//                 <InputLabel id="demo-simple-select-outlined-label">
//                   Maxsulot nomi
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-outlined-label"
//                   id="demo-simple-select-outlined"
//                   label="Maxsuolot nomi"
//                   onChange={(e) => handleChange("productName", e.target.value)}
//                 >
//                   {data3.results &&
//                     data3?.results.map((item) => (
//                       <MenuItem value={item} key={item.id}>
//                         {item.title}
//                       </MenuItem>
//                     ))}
//                 </Select>
//               </FormControl>
//               <InputField
//                 text="Modeli"
//                 width="90%"
//                 margin="20px 0  0  0"
//                 value={productData?.productName?.model}
//               />
//               <div className="miqdori">
//                 <TextField
//                   className="miqdor_input"
//                   id="outlined-basic"
//                   label="Miqdori"
//                   variant="outlined"
//                   onChange={(e) => handleChange("quantity", e.target.value)}
//                 />
//                 <InputField
//                   text="O'lchov b."
//                   width="80%"
//                   margin="20px 0  0  0"
//                   value={productData?.productName?.measurement_unit?.title}
//                 />
//               </div>
//               <InputField
//                 text="Sana & vaqt "
//                 width="90%"
//                 margin="20px 0 0 0"
//                 value={
//                   new Date().getFullYear() +
//                   ":" +
//                   new Date().getMonth() +
//                   "1" +
//                   ":" +
//                   new Date().getDate()
//                 }
//               />
//               <TextField
//                 label="Izoh"
//                 variant="outlined"
//                 onChange={(e) => handleChange("description", e.target.value)}
//               />
//               {joinInput ? (
//                 <TextField
//                   label="Qo'shimcha Izoh"
//                   variant="outlined"
//                   onChange={(e) => handleChange("descriptions", e.target.value)}
//                 />
//               ) : (
//                 ""
//               )}
//               {joinInput ? (
//                 ""
//               ) : (
//                 <button
//                   className="join_input"
//                   onClick={() => setJoinInput(!joinInput)}
//                 >
//                   <img src={plusss} alt="" />
//                 </button>
//               )}

//               <div
//                 className="modal_close"
//                 // onClick={
//                 //   (() => setModalAccept2((prev) => !prev),
//                 //   () => setModal(false))
//                 // }
//                 onClick={sendData1}
//               >
//                 <button>Saqlash</button>
//               </div>
//             </div>
//           </Fade>
//         </Modal>
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           open={modal2}
//           onClose={() => setModal2(false)}
//           className="dflax"
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={modal2}>
//             <div className="modal_input modal_input4">
//               <h1>Buyurtma yaratish</h1>
//               <TextField
//                 type="text"
//                 label="Nomi"
//                 variant="outlined"
//                 onChange={(e) => handleChange2("title", e.target.value)}
//               />
//               <FormControl variant="outlined" className="form_select">
//                 <InputLabel id="demo-simple-select-outlined-label">
//                   Ombor
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-outlined-label"
//                   id="demo-simple-select-outlined"
//                   label="Kimga"
//                   onChange={(e) => handleChange2("ombor", e.target.value)}
//                 >
//                   {data4?.map((item, index) => (
//                     <MenuItem key={item.id} value={item.id}>
//                       {item.title}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <InputField
//                 text="Sana"
//                 width="90%"
//                 margin="20px 0 0 0"
//                 value={
//                   new Date().getFullYear() +
//                   ":" +
//                   new Date().getMonth() +
//                   "1" +
//                   ":" +
//                   new Date().getDate()
//                 }
//               />
//               <div className="modal_close" onClick={sendData2}>
//                 <button>Saqlash</button>
//               </div>
//             </div>
//           </Fade>
//         </Modal>
//         <WarningModal
//           open={modalAlert}
//           close={() => setModalAlert((prev) => !prev)}
//           text2={"Faktura muvaffaqiyatli yuborildi."}
//         />
//         <AcceptModal2
//           open={modalAccept2}
//           close={() => setModalAccept2((prev) => !prev)}
//         />
//         <DeleteModal
//           open={modalDelete}
//           close={() => setModalDelete((prev) => !prev)}
//           text2={"Faktura bekor qilindi."}
//         />
//       </div>
//       <div className="table">
//         <div className="select-header2">
//           <select
//             name=""
//             id=""
//             onChange={(e) => (setOptionValue(e.target.value), setGroup(""))}
//           >
//             <option value="barchasi">Barchasi</option>
//             <option value="ozqolgan">Ozqolgan</option>
//           </select>
//           <select
//             name=""
//             id=""
//             onChange={(e) => (setGroup(e.target.value), setOptionValue(""))}
//           >
//             <option hidden disabled selected>
//               Mahsulot guruhi
//             </option>
//             {productGroup.map((x) => (
//               <option value={x.id} key={x.id}>
//                 {x.title}
//               </option>
//             ))}
//           </select>
//         </div>
//         <table id="to_Excel">
//           <thead>
//             <tr>
//               <th>
//                 <p> № </p>
//               </th>
//               <th style={{ textAlign: "start" }}>
//                 <p>Nomi</p>
//               </th>
//               <th>
//                 <p> Mahsulot guruhi </p>
//               </th>
//               <th>
//                 <p>Modeli</p>
//               </th>
//               <th>
//                 <p>Miqdori</p>
//               </th>
//               <th>
//                 <p>Kelish narxi</p>
//               </th>
//               <th>
//                 <p>Kimdan</p>
//               </th>
//               <th>
//                 <p>Kodi</p>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && data?.results
//               ? data.results.map((item, index) => {
//                   return (
//                     <tr key={item.id}>
//                       <td>{index + 1}</td>
//                       <td style={{ textAlign: "start", width: "120px" }}>
//                         {item.title}
//                       </td>
//                       <td>{item.group}</td>
//                       <td>{item.model}</td>
//                       <td>{item.quantity}</td>
//                       <td>{item.selling_price}</td>
//                       <td>{item.supplier}</td>
//                       <td>{item.code}</td>
//                     </tr>
//                   );
//                 })
//               : ""}
//             {loading && (
//               <>
//                 <SkeletonLoader count={9} />
//                 <SkeletonLoader count={9} />
//                 <SkeletonLoader count={9} />
//               </>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState, useRef, useCallback } from "react";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "react-confirm-alert/src/react-confirm-alert.css";
import InfiniteScroll from "react-infinite-scroll-component";
//Import Image
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import { useHistory } from "react-router-dom";
import { api } from "../../../api/api";
const Tabs = {
  HOMASHYO: "Homashyo",
  YARIMTAYYOR: "Yarim tayyor",
};

function OmborQoldiq({ handlemenu, url, keyword }) {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(Tabs.HOMASHYO);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const timer = useRef(null);
  const [next, setNext] = useState("");
  const [productGroups, setProductGroups] = useState([]);
  const [filterByGroup, setFilterByGroup] = useState("");
  const [filterByFromWho, setFilterByFromWho] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (filterByFromWho) {
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
  const TAB_LIST = [
    { label: "Homashyo", name: Tabs.HOMASHYO },
    { label: "Yarim tayyor", name: Tabs.YARIMTAYYOR },
  ];
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
      mounted = false;
    };
  }, [activeTab, keyword]);
  useEffect(() => {
    let mounted = true;
    api.get("storage/product-groups/").then((res) => {
      if (mounted) {
        setProductGroups(res);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  const nextData = useCallback(() => {
    api.get(`${next}`).then(res => {
        setData(prev => [...prev, ...res.results]);
        setNext(res.next)
    })
}, [next]);
  return (
    <React.Fragment>
    <div className="buyurtma_btn">
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
    </div>
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
                    <p>№</p>
                  </th>
                  <th style={{ textAlign: "start" }}>
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
                      <th style={{ textAlign: "start", width: "120px" }}>
                        {x.title}
                      </th>
                      <th>{x.group}</th>
                      <th>{x.model}</th>
                      <th>{x.code}</th>
                      <th>
                        {x.quantity} {x.measurement_unit.title}
                      </th>
                      <th>
                        {x.arrival_price} {x.currency}
                      </th>
                      <th>
                        {x.selling_price} {x.currency}
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
}

export default OmborQoldiq;

