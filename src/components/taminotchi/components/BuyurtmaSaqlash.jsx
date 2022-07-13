// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Fade from "@material-ui/core/Fade";
// import Modal from "@material-ui/core/Modal";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Backdrop from "@material-ui/core/Backdrop";
// import { confirmAlert } from "react-confirm-alert";
// import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import { api } from "../../../api/api";
// // import Autocomplete from "@material-ui/lab/Autocomplete";

// //Import css
// import "react-confirm-alert/src/react-confirm-alert.css";

// //Import Image
// import tasdiq from "../../Icons/tasdiq.svg";
// import trash from "../../Icons/Vector.svg";
// import successIcon from "../../Icons/Success.svg";
// import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
// import WarningModal from "../../modal/WarningModal";
// import DeleteModal from "../../modal/DeleteModal";
// import InputField from "../../inputs/InputField";
// import { NavLink } from "react-router-dom";

// const Tabs = {
//   YAROQSIZ: "Maxsulotlar",
//   QAYTA_ISHLASH: "Buyurtma nomeri",
// };

// function BuyurtmaSaqlash({ handlemenu, url }) {
//   const [data, setData] = useState([]);
//   const [homashyo, setHomashyo] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [modalAlert, setModalAlert] = useState(false);
//   const [modalDelete, setModalDelete] = useState(false);
//   const [product, setProduct] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [average_price, setAverage_price] = useState("");
//   const [unit_of_measurement, setUnit_of_measurement] = useState("");
//   const [activeTab, setActiveTab] = useState(Tabs.YAROQSIZ);
//   useEffect(() => {
//     let mounted = true;
//     api.get("storage/product-orders/?supplier=1", {}).then((res) => {
//       if (mounted) {
//         setData(res.results);
//       }
//     });
//     return () => {
//       mounted = false;
//     };
//   }, []);
//   const handleOpen = () => {
//     setModal(true);
//   };
//   const handleClose = () => {
//     setModal(false);
//   };
//   const submit = () => {
//     confirmAlert({
//       childrenElement: () => (
//         <div className="alert_tasdiq">
//           <img src={tasdiq} alt="" />
//           <p>Maxsulot qo'shildi</p>
//         </div>
//       ),
//       overlayClassName: "overlay-custom-class-name",
//     });
//   };
//   const TAB_LIST = [
//     { label: "Mahsulotlar", name: Tabs.YAROQSIZ },
//     { label: "Buyurtma nomeri", name: Tabs.QAYTA_ISHLASH },
//   ];

//   const handleSend = () => {
//     const buyurtma = {
//       product: product,
//       quantity: quantity,
//       average_price: average_price,
//       unit_of_measurement: unit_of_measurement,
//     };
//     axios.post("/api/v1/warehouse/products/create/", buyurtma, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("accessToken"),
//       },
//     });
//     console.log(buyurtma);
//     handleClose();
//     submit();
//     refreshPage();
//   };
//   const refreshPage = () => {
//     window.location.reload();
//   };
//   return (
//     <React.Fragment>
//       <div className="buyurtma_btn">
//         <Modal
//           aria-labelledby="transition-modal-title"
//           aria-describedby="transition-modal-description"
//           open={modal}
//           onClose={handleClose}
//           className="dflax"
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={modal}>
//             <div className="modal_input">
//               <h1>Topildi</h1>
//               {/*<TextField*/}
//               {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
//               {/*    id="outlined-basic"*/}
//               {/*    label="Kelish narxi"*/}
//               {/*    variant="outlined"*/}
//               {/*/>*/}
//               <InputField text="Qayerdan" width="90%" margin="20px 0 0 0" />
//               <FormControl variant="outlined" className="form_select">
//                 <InputLabel id="demo-simple-select-outlined-label">
//                   Maxsulot guruhi
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-outlined-label"
//                   id="demo-simple-select-outlined"
//                   onChange={(e) => setProduct(e.target.value)}
//                   label="Kimga"
//                 >
//                   <MenuItem>Elektronik</MenuItem>
//                   <MenuItem>Elektronik</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl variant="outlined" className="form_select">
//                 <InputLabel id="demo-simple-select-outlined-label">
//                   Maxsulot nomi
//                 </InputLabel>
//                 <Select
//                   labelId="demo-simple-select-outlined-label"
//                   id="demo-simple-select-outlined"
//                   onChange={(e) => setProduct(e.target.value)}
//                   label="Kimga"
//                 >
//                   <MenuItem>PRODUCT 1</MenuItem>
//                   <MenuItem>PRODUCT 2</MenuItem>
//                 </Select>
//               </FormControl>
//               <div className="miqdori">
//                 <TextField
//                   className="miqdor_input"
//                   onChange={(e) => setQuantity(e.target.value)}
//                   id="outlined-basic"
//                   label="Miqdori"
//                   variant="outlined"
//                 />
//                 <FormControl variant="outlined" className="form_select">
//                   <InputLabel id="demo-simple-select-outlined-label">
//                     O'lchov b.
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-outlined-label"
//                     id="demo-simple-select-outlined"
//                     onChange={(e) => setUnit_of_measurement(e.target.value)}
//                     label=" O'lchov b."
//                   >
//                     <MenuItem value="Kg">kg</MenuItem>
//                     <MenuItem value="Tonna">kg</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//               <div className="miqdori">
//                 <TextField
//                   className="miqdor_input"
//                   onChange={(e) => setQuantity(e.target.value)}
//                   id="outlined-basic"
//                   label="Narxi"
//                   variant="outlined"
//                 />
//                 <FormControl variant="outlined" className="form_select">
//                   <InputLabel id="demo-simple-select-outlined-label">
//                     Valyuta
//                   </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-outlined-label"
//                     id="demo-simple-select-outlined"
//                     onChange={(e) => setUnit_of_measurement(e.target.value)}
//                     label="Valyuta"
//                   >
//                     <MenuItem value="Kg">So'm</MenuItem>
//                     <MenuItem value="Tonna">dollar</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//               <InputField text="Summa" width="90%" margin="20px 0 0 0" />
//               <NavLink
//                 activeClassName="navbar_active2 "
//                 exact
//                 to={`${url}/Buyurtmalar`}
//                 onClick={handlemenu}
//               >
//                 <div className="modal_close">
//                   <button onClick={handleSend}>Saqlash</button>
//                 </div>
//               </NavLink>
//             </div>
//           </Fade>
//         </Modal>
//         <WarningModal
//           open={modalAlert}
//           close={() => setModalAlert((prev) => !prev)}
//           text1={"“Product N”"}
//           text2={"mahsulotlar omboriga saqlandi."}
//         />
//         <DeleteModal
//           open={modalDelete}
//           close={() => setModalDelete((prev) => !prev)}
//           text1={"“Product N”"}
//           text2={"mahsulotlar omboridan o`chirildi."}
//         />
//       </div>
//       <TabSwitcher
//         onChangeTab={setActiveTab}
//         activeTab={activeTab}
//         tabList={TAB_LIST}
//       />

//       {activeTab === Tabs.YAROQSIZ && (
//         <div className="table">
//           <div className="select-header2">
//             <select name="" id="">
//               <option value="">Mahsulot guruhi</option>
//               <option value="">Mahsulot guruhi</option>
//               <option value="">Mahsulot guruhi</option>
//             </select>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   <p> № </p>
//                 </th>
//                 <th>
//                   <p>Buyurtmalar nomi</p>
//                 </th>
//                 <th>
//                   <p>Nomi</p>
//                 </th>
//                 <th>
//                   <p>Narxi</p>
//                 </th>
//                 <th>
//                   <p>Miqdori</p>
//                 </th>
//                 <th>
//                   <p>Summa</p>
//                 </th>
//                 <th>
//                   <p>Topildi</p>
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length
//                 ? data.map((item, index) => {
//                     return (
//                       <tr key={item.id}>
//                         <td>{item.id}</td>
//                         <td>
//                           <NavLink
//                             // activeClassName="navbar_active2 "
//                             exact
//                             to={`${url}/BuyurtmaNomeri/${item.invoice.id}`}
//                             onClick={() => {
//                               return handlemenu;
//                             }}
//                             id={item.invoice.title}
//                           >
//                             {item.invoice.title}
//                           </NavLink>
//                         </td>
//                         <td>{item.product.title}</td>
//                         <td>
//                           {item.product.arrival_price} {item.product.currency}
//                         </td>
//                         <td>{item.asked_quantity}</td>
//                         <td>
//                           {item.asked_quantity * item.product.arrival_price}
//                         </td>
//                         <td>
//                           <button
//                             style={
//                               item.status === "Full"
//                                 ? { backgroundColor: "#99CF63" }
//                                 : { backgroundColor: "#BCBCBC" }
//                             }
//                             className="topilish"
//                           ></button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 : ""}
//             </tbody>
//           </table>
//         </div>
//       )}
//       {activeTab === Tabs.QAYTA_ISHLASH && (
//         <div className="table">
//           <table>
//             <thead>
//               <tr>
//                 <th>
//                   <p> № </p>
//                 </th>
//                 <th>
//                   <p>Nomi</p>
//                 </th>
//                 <th>
//                   <p>Miqdori</p>
//                 </th>
//                 <th>
//                   <p>Zarar</p>
//                 </th>
//                 <th>
//                   <p>Sana </p>
//                 </th>
//                 <th>
//                   <p>Javobgar shaxs</p>
//                 </th>
//               </tr>
//             </thead>
//             <tbody></tbody>
//           </table>
//         </div>
//       )}
//     </React.Fragment>
//   );
// }

// export default BuyurtmaSaqlash;
