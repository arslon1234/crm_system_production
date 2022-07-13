import React, { useCallback, useEffect, useState, useRef } from "react";
import Fade from "@material-ui/core/Fade";
import { MenuItem } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import { api } from "../../../api/api";

const Qaytaishlash = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const timer = useRef(null);
  const handleChange = (name, value) => {
    setStatus({
      ...status,
      [name]: value,
    });
  };
  console.log(status, "status");
  const ChangeStatus = useCallback(() => {
    api
      .patch(`storage/send-valid/${id}/`, {
        status: status.statuslar,
      })
      .then((res) => {
        if (res) {
          setModal(false);
          api.get("storage/send-valid/?notsaved").then((res) => {
            setData(res);
            console.log(res, "resaaa");
          });
        }
      });
  },[id, status]);
  const handleClose = () => {
    setModal(false);
  };
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (mounted) {
      api.get("storage/send-valid/?notsaved").then((res) => {
        setLoading(false);
        setData(res);
        console.log(res, "resaaa");
      });
    }
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
          .get("storage/send-valid/?notsaved", {
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
      api.get("storage/send-valid/?notsaved").then((res) => {
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
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
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
          onClose={handleClose}
          className="dflax"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal}>
            <div className="modal_input modal_input3">
              <h1>Statusini o'zgartirish</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  label="Status"
                  onChange={(e) => handleChange("statuslar", e.target.value)}
                >
                  <MenuItem value="Kutilmoqda">Kutilmoqda</MenuItem>
                  <MenuItem value="Qabul qilindi">Qabul qilindi</MenuItem>
                  <MenuItem value="Tayyorlandi">Tayyorlandi</MenuItem>
                </Select>
              </FormControl>
              <div className="modal_close">
                <button className="btn" onClick={() => ChangeStatus()}>
                  O'zgartirish
                </button>
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
                <p> Nomi</p>
              </th>
              <th>
                <p> Miqdori</p>
              </th>
              <th>
                <p> O`lchov birligi </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Status </p>
              </th>

              <th>
                <p> Sana </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "start", width: "130px" }}>
                    {item.product.title}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.product.measurement_unit}</td>
                  <td style={{ width: "130px" }}>{item.description}</td>
                  <td
                    style={
                      item.status === "Kutilmoqda"
                        ? { color: "#FE2626" }
                        : item.status === "Tayyorlandi"
                        ? { color: "#98CC63" }
                        : { color: "#2597D6" }
                    }
                    onClick={() => setModal(!modal, setId(item.id))}
                  >
                    {item.status}
                  </td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            {loading && (
              <>
                <SkeletonLoader count={8} />
                <SkeletonLoader count={8} />
                <SkeletonLoader count={8} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Qaytaishlash;
