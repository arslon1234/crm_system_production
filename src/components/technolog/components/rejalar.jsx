import React, { useState, useEffect, useCallback, useRef } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputField from "../../inputs/InputField";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
const Rejalar = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [modal, setModal] = useState(false);
  const [addPlan, setAddPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const handleChange = (name, value) => {
    setAddPlan({
      ...addPlan,
      [name]: value,
    });
  };
  const sendPlan = useCallback(() => {
    api
      .post("texnolog/plans/", {
        product: addPlan.product.id,
        quantity: addPlan.quantity,
        measurement_unit: addPlan.product.measurement_unit.id,
        deadline: addPlan.deadline,
        description: addPlan.description,
      })
      .then((res) => {
        console.log(res, "res");
        if (res.product) {
          setModal(false);
          api.get("texnolog/plans/?saved=False").then((res) => {
            setData(res);
          });
        }
      });
  }, [addPlan]);
  console.log(addPlan, "plan");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("texnolog/plans/?saved=False").then((res) => {
      if (mounted) {
        setLoading(false);
        setData(res);
        console.log(res.results);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    api.get("storage/products/?type=Tayyor").then((res) => {
      if(mounted){
        setData2(res);
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
          .get("texnolog/plans/?saved=False", {
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
      api.get("texnolog/plans/?saved=False").then((res) => {
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
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
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
        <button className="modal_open" onClick={handleOpen}>
          Yangi reja <span>+</span>
        </button>
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
              <h1>Yangi reja</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel> Nomi </InputLabel>
                <Select
                  onChange={(e) => handleChange("product", e.target.value)}
                  label="Nomi"
                >
                  {data2.results &&
                    data2?.results.map((item) => (
                      <MenuItem value={item} key={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <div className="miqdori">
                <TextField
                  className="miqdor_input"
                  label="Miqdori"
                  variant="outlined"
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <InputField
                  text="O'lchov b."
                  width="80%"
                  margin="20px 0  0  0"
                  value={addPlan?.product?.measurement_unit?.title}
                />
              </div>
              <TextField
                className="hodim_data"
                type="date"
                id="outlined-basic"
                label="Muddat"
                variant="outlined"
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
                onChange={(e) => handleChange("description", e.target.value)}
              />

              <div className="modal_close">
                <button type="submit" onClick={sendPlan}>
                  Qo`shish
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
                <p>Kimdan </p>
              </th>
              <th>
                <p> Status </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Muddati </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "start", width: "130px" }}>
                    {item.product}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.measurement_unit}</td>
                  <td style={{ textAlign: "center", width: "130px" }}>
                    {item.from_who}
                  </td>
                  <td
                    style={
                      item.status === "Jarayonda"
                        ? { color: "#98CC63" }
                        : " #FE2626"
                    }
                  >
                    {item.status}
                  </td>
                  <td style={{ textAlign: "center", width: "130px" }}>
                    {item.description}
                  </td>
                  <td>{item.deadline}</td>
                </tr>
              ))}
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

export default Rejalar;
