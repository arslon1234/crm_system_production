import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-confirm-alert/src/react-confirm-alert.css";
// import image
import left from "../../Icons/Vector (7).png";
import { NavLink } from "react-router-dom";
import { api } from "../../../api/api";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
const SingleRetsept = ({ handleSend, url }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [modal, setModal] = useState(false);
  const [measurement, setMeasurement] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [addProduct, setAddProduct] = useState([]);
  const urlId = window.location.href.split("/");
  console.log(urlId, "URL");
  const handleChange = (name, value) => {
    setAddProduct({
      ...addProduct,
      [name]: value,
    });
  };
  const sendProduct = useCallback(() => {
    api
      .post("texnolog/materials/", {
        recipe: urlId[5],
        title: addProduct.title,
        unit_sum: addProduct.unit_sum,
        currency: addProduct.currency,
        quantity: addProduct.quantity,
        measurement_unit: addProduct.measurement_unit,
        description: addProduct.description,
      })
      .then((res) => {
        console.log(res);
        if (res.id) {
          setModal(false);
          api.get(`texnolog/materials/?recipe=${urlId[5]}`).then((res) => {
            setData2(res);
          });
        }
      });
  }, [addProduct]);
  console.log(addProduct);
  const function1 = () => {
    let mounted = true;
    api.get("texnolog/recipes/").then((res) => {
      if (mounted) {
        setData1(res);
        // console.log(res.results, "name");
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function2 = () => {
    let mounted = true;
    api.get(`texnolog/materials/?recipe=${urlId[5]}`).then((res) => {
      if (mounted) {
        setData2(res);
        console.log(res.results, "product");
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function3 = () => {
    let mounted = true;
    api.get("storage/measurements/").then((res) => {
      if (mounted) {
        setMeasurement(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const function4 = () => {
    let mounted = true;
    api.get("storage/currency/").then((res) => {
      if (mounted) {
        setCurrency(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    function1();
    function2();
    function3();
    function4();
  }, []);

  const handleOpen = () => {
    setModal(!modal);
  };

  const handleClose = () => {
    setModal(false);
  };
  return (
    <React.Fragment>
      <div className="manager_head2">
        <div className="faktura_name">
          <NavLink activeClassName="navbar_active2 " to={`${url}/retsept`}>
            <div className="prev_icon">
              <i class="fa-regular fa-circle-left"></i>
            </div>
          </NavLink>
          <div className="nameFaktura">
            <span>{urlId[6].replace(/%20/g, " ")}</span>
          </div>
        </div>
        {urlId[7] === "Saved" ? (
          ""
        ) : (
          <div className="faktura_yaratilishi">
            <div className="maxsulot_qushish" onClick={handleOpen}>
              <span>Homashyo qo`shish</span>
              <div className="icon">
                <i class="fas fa-plus"></i>
              </div>
            </div>
            <div className="homashyo_yakunlash">
              <span>Yakunlash</span>
            </div>
          </div>
        )}
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
          <div className="modal_input modal_input2">
            <h1>Homashyo qo`shish</h1>
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Maxsulot turi
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
            <FormControl variant="outlined" className="form_select">
              <InputLabel id="demo-simple-select-outlined-label">
                Maxsulot nomi
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
            <div className="miqdori">
              <TextField
                className="miqdor_input"
                label="Miqdori"
                variant="outlined"
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
              <FormControl variant="outlined" className="form_select">
                <InputLabel>O'lchov b.</InputLabel>
                <Select
                  label="O'lchov b."
                  onChange={(e) =>
                    handleChange("measurement_unit", e.target.value)
                  }
                >
                  {measurement.map((x) => (
                    <MenuItem value={x.id} key={x.id}>
                      {x.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              id="outlined-basic"
              className="hodim_data"
              type="text"
              label="Izoh"
              variant="outlined"
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className="modal_close">
              <button onClick={sendProduct} type="submit">
                Qo`shish
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p> Homashyo nomi</p>
              </th>
              <th>
                <p>Miqdori</p>
              </th>
              <th>
                <p>o`lchov birligi</p>
              </th>
              <th>
                <p>Narxi</p>
              </th>
              <th>
                <p> Izox</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data2.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.measurement_unit}</td>
                  <td>
                    {item.unit_sum} {item.currency}
                  </td>
                  <td>{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default SingleRetsept;
