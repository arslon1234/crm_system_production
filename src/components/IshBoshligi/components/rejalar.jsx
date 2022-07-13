import React, { useState, useEffect, useCallback } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";
//Import Images
import { api } from "../../../api/api";
import InputField from "../../inputs/InputField";
const Rejalar = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [modal, setModal] = useState(false);
  const [addPlan, setAddPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleChange = (name, value) => {
    setAddPlan({
      ...addPlan,
      [name]: value,
    });
  };

  const joinPlan = useCallback(() => {
    api
      .post("texnolog/plans/", {
        product: addPlan.product.id,
        quantity: addPlan.quantity,
        measurement_unit: addPlan.product.measurement_unit.id,
        deadline: addPlan.deadline,
        description: addPlan.description,
      })
      .then((res) => {
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
    setLoading(true)
    api.get("texnolog/plans/?saved=False").then((res) => {
      if (mounted) {
        setLoading(false)
        setData(res);
        console.log(res, "data");
      }
    });
    api.get("storage/products/?type=Tayyor").then((res) => {
      if (mounted) {
        setData2(res);
        console.log(res, "data2");
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
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
        <button className="modal_open" type="button" onClick={handleOpen}>
          Yangi reja biriktirish <span>+</span>
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
            <div className="modal_input modal_input2">
              <h1>Yangi reja</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel> Nomi </InputLabel>
                <Select
                  label="Nomi"
                  onChange={(e) => handleChange("product", e.target.value)}
                >
                  {data2?.results
                    ? data2.results.map((item) => (
                        <MenuItem value={item} key={item.id}>
                          {item.title}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
              </FormControl>
              <div className="miqdori">
                <TextField
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
                label="Muddati"
                variant="outlined"
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <div className="modal_close" onClick={joinPlan}>
                <button>Buyurtma berish</button>
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
              <th style={{textAlign:"start"}}>
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
                <p> Masul shaxs </p>
              </th>
              <th>
                <p> Sana </p>
              </th>
              <th>
                <p> Status </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{textAlign:"start", width:"130px"}}>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.measurement_unit}</td>
                <td style={{width:"130px"}}>{item.description}</td>
                <td>{item.to_who}</td>
                <td>{item.deadline}</td>
                <td>{item.status}</td>
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
  // }
};

export default Rejalar;
