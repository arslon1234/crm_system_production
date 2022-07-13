import React, { useCallback, useState, useEffect } from "react";
import DataPick from "./data_pick";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SkeletonLoader from "../../loader/skeleton-loader";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import { api } from "../../../api/api";

const Baxolash = () => {
  const [data, setData] = useState([]);
  const [excel, setExcel] = useState(false)
  const [data1, setData1] = useState([]);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [productData, setProductData] = useState([]);
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const SendPatch = useCallback(() => {
    api.patch(`user/worker/:id/`).then((res) => {
      console.log(res);
    });
  });
  const handleOpen = () => {
    setModal((p) => !p);
  };
  const handleClose = () => {
    setModal(false);
  };
  useEffect(() => {
    let mounted = true;
    api.get("user/worker/").then((res) => {
      if (mounted) {
        setData(res);
        console.log(res.results);
      }
    });
    api.get("user/group/").then((res) => {
      if (mounted) {
        setData1(res);
        console.log(res.results);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  const filterByDateCLick = useCallback(() => {
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + "1";
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + "1";
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
          setData(res);
          console.log(res, "filter");
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
            filterByDateClick={filterByDateCLick}
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
             Baholash<span>+</span>
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
        {/* <button className="modal_open" type="button" onClick={handleOpen}>
          Baholash <span>+</span>
        </button> */}
        <Modal
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
              <h1>Qayta ishlashga qo`shish</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Guruh nomi
                </InputLabel>
                <Select label="Mas'ul shaxs"></Select>
              </FormControl>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Hodim ismi
                </InputLabel>
                <Select label="Mas'ul shaxs"></Select>
              </FormControl>
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  label="Hodim bali"
                  variant="outlined"
                />
                <TextField
                  className="miqdor_input"
                  label=""
                  variant="outlined"
                  value="Ball"
                />
              </div>
              <TextField label="Izoh" variant="outlined" />
              <div className="modal_close">
                <button>Qo`shish</button>
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
                <p>№</p>
              </th>
              <th>
                <p> Guruh nomi </p>
              </th>
              <th>
                <p> Hodim </p>
              </th>
              <th>
                <p> Ball </p>
              </th>
              <th>
                <p> Izoh </p>
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

export default Baxolash;
