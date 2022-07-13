import React, { useState } from "react";
import axios from "axios";
import DataPick from "./data_pick";
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
import trash from "../../Icons/Vector.svg";
import successIcon from "../../Icons/Success.svg";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import InputField from "../../inputs/InputField";

const Tabs = {
  YAROQSIZ: "YAROQSIZ",
  QAYTA_ISHLASH: "QAYTA ISHLASH",
};

function QaytaIshlash() {
  const [homashyo, setHomashyo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [average_price, setAverage_price] = useState("");
  const [unit_of_measurement, setUnit_of_measurement] = useState("");
  const [activeTab, setActiveTab] = useState(Tabs.YAROQSIZ);
  const handleOpen = () => {
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };
  const submit = () => {
    confirmAlert({
      childrenElement: () => (
        <div className="alert_tasdiq">
          <img src={tasdiq} alt="" />
          <p>Maxsulot qo'shildi</p>
        </div>
      ),
      overlayClassName: "overlay-custom-class-name",
    });
  };
  const TAB_LIST = [
    { label: "YAROQSIZ", name: Tabs.YAROQSIZ },
    { label: "QAYTA ISHLASH", name: Tabs.QAYTA_ISHLASH },
  ];

  const handleSend = () => {
    const buyurtma = {
      product: product,
      quantity: quantity,
      average_price: average_price,
      unit_of_measurement: unit_of_measurement,
    };
    axios.post("/api/v1/warehouse/products/create/", buyurtma, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    console.log(buyurtma);
    handleClose();
    submit();
    refreshPage();
  };
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <DataPick />
        {activeTab === Tabs.QAYTA_ISHLASH && (
          <div className="buyurtma_btns">
            <button
              className="modal_open create_btn"
              type="button"
              onClick={handleOpen}
            >
              <p>Qayta ishlashga yuborish</p>
              <span>
                <img src={plus} />
              </span>
            </button>
          </div>
        )}
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
            <div className="modal_input">
              <h1>Qayta ishlashga yuborish</h1>
              {/*<TextField*/}
              {/*    onChange={(e) => setAverage_price(e.target.value)}*/}
              {/*    id="outlined-basic"*/}
              {/*    label="Kelish narxi"*/}
              {/*    variant="outlined"*/}
              {/*/>*/}
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Brak mahsulot nomi
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setProduct(e.target.value)}
                  label="Brak_mahsulot_nomi"
                >
                  <MenuItem>Sakar</MenuItem>
                  <MenuItem>Sakar</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Kimga
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setProduct(e.target.value)}
                  label="Kimga"
                >
                  <MenuItem>Sardor</MenuItem>
                  <MenuItem>Sardor</MenuItem>
                </Select>
              </FormControl>
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
                    onChange={(e) => setUnit_of_measurement(e.target.value)}
                    label=" O'lchov b."
                  >
                    <MenuItem value="Kg">kg</MenuItem>
                    <MenuItem value="Tonna">kg</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <InputField text="Izoh" width="90%" margin="20px 0 0 0" />
              <div className="modal_close">
                <button onClick={handleSend}>Buyurtma berish</button>
              </div>
            </div>
          </Fade>
        </Modal>
        <WarningModal
          open={modalAlert}
          close={() => setModalAlert((prev) => !prev)}
          text1={"“Product N”"}
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

      {activeTab === Tabs.YAROQSIZ && (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Miqdori</p>
                </th>
                <th>
                  <p>Zarar</p>
                </th>
                <th>
                  <p>Sana </p>
                </th>
                <th>
                  <p>Javobgar shaxs</p>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
      {activeTab === Tabs.QAYTA_ISHLASH && (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th>
                  <p>Nomi</p>
                </th>
                <th>
                  <p>Miqdori</p>
                </th>
                <th>
                  <p>Zarar</p>
                </th>
                <th>
                  <p>Sana </p>
                </th>
                <th>
                  <p>Javobgar shaxs</p>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}

export default QaytaIshlash;
