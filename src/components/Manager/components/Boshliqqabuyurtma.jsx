import React, { useState } from "react";
import axios from "axios";
import DataPick from "./data_pick";
import dateFormat from "dateformat";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-confirm-alert/src/react-confirm-alert.css";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Boshliqqabuyurtma = ({ handleSend }) => {
  const [data, setData] = useState([]);
  const [biscuits, setBiscuits] = useState([]);
  const [biscuit, setBiscuit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [comment, setComment] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(false);
  };
  return (
    <React.Fragment>
      <div className="manager_head">
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
          <div className="modal_input">
            <h1>Sex boshlig`iga buyurtma</h1>
            <TextField
              // onChange={(event) => {
              //   this.setState({ quantity: event.target.value });
              // }}
              style={{ marginTop: "40px" }}
              id="outlined-basic"
              label="Maxsulot nomi"
              variant="outlined"
            />
            <div className="miqdori">
              <TextField
                className="miqdor_input"
                onChange={(e) => setQuantity(e.target.value)}
                id="outlined-basic"
                label="Miqdori"
                variant="outlined"
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  O'lchov b.
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  //     onChange={(event) => {
                  //       this.setState({ unit_of_measurement: event.target.value });
                  //     }}
                  label="O'lchov b."
                >
                  <MenuItem value="Kg">Kg</MenuItem>
                  <MenuItem value="Tonna">Tonna</MenuItem>
                  <MenuItem value="Litr">Litr</MenuItem>
                  <MenuItem value="Mil. Litr">Mil. Litr</MenuItem>
                  <MenuItem value="Dona">Dona</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              // onChange={(event) => {
              //   this.setState({ created_date: event.target.value });
              // }}
              id="outlined-basic"
              className="hodim_data"
              type="date"
              label="Muddati"
              variant="outlined"
            />
            <TextField
              // onChange={(event) => {
              //   this.setState({ comment: event.target.value });
              // }}
              id="outlined-basic"
              label="Izoh"
              variant="outlined"
            />
            <div className="modal_close">
              <button onClick={handleSend}>Buyurtma berish</button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Firma nomi</p>
              </th>
              <th>
                <p>Rahbar ismi</p>
              </th>
              <th>
                <p> Telefon</p>
              </th>
              <th>
                <p> Mas’ul shaxs</p>
              </th>
              <th>
                <p>Kompaniya manzili</p>
              </th>
              <th>
                <p>Izoh</p>
              </th>
              <th>
                <p>Bank rekvizitlari</p>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default Boshliqqabuyurtma;

//{this.state.data.map((dat, id) => {
//   if (this.props.search === false) {
//     return (
//       <tr>
//         <th>{id + 1}</th>
//         <th>{dat.company}</th>
//         <th>
//           {dat.first_name} {dat.last_name}
//         </th>
//         <th>{dat.phone_number}</th>
//         <th>{dat.address}</th>
//         <th>
//           <div className="koz">
//             <button>
//               <img src={eye} alt="" />
//               <div className="mfoinn">
//                 <p>x/r: {dat.x_p}</p>
//                 <p>mfo: {dat.m_f_o}</p>
//                 <p>inn: {dat.inn}</p>
//                 <p>
//                   Sana: {dateFormat(dat.created_date, "dd/mm/yyyy")}
//                 </p>
//               </div>
//             </button>
//           </div>
//         </th>
//       </tr>
//     );
//   } else {
//     if (
//       dat.first_name
//         .toUpperCase()
//         .includes(this.props.keyword.toUpperCase())
//     ) {
//       return (
//         <tr>
//           <th>{id + 1}</th>
//           <th>{dat.company}</th>
//           <th>
//             {dat.first_name} {dat.last_name}
//           </th>
//           <th>{dat.phone_number}</th>
//           <th>{dat.address}</th>
//           <th>
//             <div className="koz">
//               <button>
//                 <img src={eye} alt="" />
//                 <div className="mfoinn">
//                   <p>x/r: {dat.x_p}</p>
//                   <p>mfo: {dat.m_f_o}</p>
//                   <p>inn: {dat.inn}</p>
//                   <p>
//                     Sana:{" "}
//                     {dateFormat(dat.created_date, "dd/mm/yyyy")}
//                   </p>
//                 </div>
//               </button>
//             </div>
//           </th>
//         </tr>
//       );
//     }
//     if (
//       dat.last_name
//         .toUpperCase()
//         .includes(this.props.keyword.toUpperCase())
//     ) {
//       return (
//         <tr>
//           <th>{id + 1}</th>
//           <th>{dat.company}</th>
//           <th>
//             {dat.first_name} {dat.last_name}
//           </th>
//           <th>{dat.phone_number}</th>
//           <th>{dat.address}</th>
//           <th>
//             <div className="koz">
//               <button>
//                 <img src={eye} alt="" />
//                 <div className="mfoinn">
//                   <p>x/r: {dat.x_p}</p>
//                   <p>mfo: {dat.m_f_o}</p>
//                   <p>inn: {dat.inn}</p>
//                   <p>
//                     Sana:{" "}
//                     {dateFormat(dat.created_date, "dd/mm/yyyy")}
//                   </p>
//                 </div>
//               </button>
//             </div>
//           </th>
//         </tr>
//       );
//     }
//     if (
//       dat.company
//         .toUpperCase()
//         .includes(this.props.keyword.toUpperCase())
//     ) {
//       return (
//         <tr>
//           <th>{id + 1}</th>
//           <th>{dat.company}</th>
//           <th>
//             {dat.first_name} {dat.last_name}
//           </th>
//           <th>{dat.phone_number}</th>
//           <th>{dat.address}</th>
//           <th>
//             <div className="koz">
//               <button>
//                 <img src={eye} alt="" />
//                 <div className="mfoinn">
//                   <p>x/r: {dat.x_p}</p>
//                   <p>mfo: {dat.m_f_o}</p>
//                   <p>inn: {dat.inn}</p>
//                   <p>
//                     Sana:{" "}
//                     {dateFormat(dat.created_date, "dd/mm/yyyy")}
//                   </p>
//                 </div>
//               </button>
//             </div>
//           </th>
//         </tr>
//       );
//     }
//     if (
//       dat.address
//         .toUpperCase()
//         .includes(this.props.keyword.toUpperCase())
//     ) {
//       return (
//         <tr>
//           <th>{id + 1}</th>
//           <th>{dat.company}</th>
//           <th>
//             {dat.first_name} {dat.last_name}
//           </th>
//           <th>{dat.phone_number}</th>
//           <th>{dat.address}</th>
//           <th>
//             <div className="koz">
//               <button>
//                 <img src={eye} alt="" />
//                 <div className="mfoinn">
//                   <p>x/r: {dat.x_p}</p>
//                   <p>mfo: {dat.m_f_o}</p>
//                   <p>inn: {dat.inn}</p>
//                   <p>
//                     Sana:{" "}
//                     {dateFormat(dat.created_date, "dd/mm/yyyy")}
//                   </p>
//                 </div>
//               </button>
//             </div>
//           </th>
//         </tr>
//       );
//     }
//   }
// })}
