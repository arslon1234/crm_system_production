import React, { useCallback, useState, useEffect, useRef } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Select from "@material-ui/core/Select";
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
import { MenuItem } from "@material-ui/core";

const RejaniYakunlash = ({keyword}) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [overPlan, setOverPlan] = useState([]);
  const [toWho, setTowho] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null)
  const handleChange = (name, value) => {
    setOverPlan({
      ...overPlan,
      [name]: value,
    });
  };
  const OverPlan = useCallback(
    (id) => {
      api
        .patch(`texnolog/plans/${id}/`, {
          quantity: +overPlan.quantity,
          description: overPlan.description,
          to_who: overPlan.to_who,
          saved: "True",
        })
        .then((res) => {
          setModal(false);
          let mounted = true;
          api.get("texnolog/plans/?saved=False").then((res) => {
            if (mounted) {
              setData(res);
              console.log(res);
            }
          });
          return () => {
            mounted = false;
          };
        });
    },
    [overPlan]
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true)
    api.get("texnolog/plans/?saved=False").then((res) => {
      if (mounted) {
        setLoading(false)
        setData(res);
        console.log(res);
      }
    });
    api.get("storage/storages").then((res) => {
      setTowho(res);
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            api.get("texnolog/plans/?saved=False", {
                params: {
                    search: keyword.length > 0 ? keyword : ""
                }
            }).then(res => {
                if (mounted) {
                    setData(res)
                }
            })
        }, 500);
        return () => {
            clearTimeout(timer.current)
        }
    } else if (keyword.length < 1) {
        api.get("texnolog/plans/?saved=False").then(res => {
            if (mounted) {
                setData(res)
            }
        })
    }
    return () => {
        clearTimeout();
        mounted = false
    }
}, [keyword]);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  console.log(overPlan, "overPlan");
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
          Rejani Yakunlash <span>+</span>
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
              <h1>Rejani Yakunlash</h1>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Nomi
                </InputLabel>
                <Select
                  label="Nomi"
                  onChange={(e) => handleChange("title", e.target.value)}
                >
                  {data.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {item.product}
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
                  margin="20px 0 0 0"
                  value={overPlan?.title?.measurement_unit}
                />
              </div>
              <FormControl variant="outlined" className="form_select">
                <InputLabel id="demo-simple-select-outlined-label">
                  Kimga
                </InputLabel>
                <Select
                  label="Kimga"
                  onChange={(e) => handleChange("to_who", e.target.value)}
                >
                  {toWho.map((item) => (
                    <MenuItem key={item.id} value={item.title}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Izoh"
                variant="outlined"
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <div className="modal_close">
                <button onClick={() => OverPlan(overPlan?.title.id)}>
                  Yakunlash
                </button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p>  № </p>
              </th>
              <th style={{textAlign:"start", width:"130px"}}>
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
            {!loading && data.map((item,index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td style={{textAlign:"start", width:"130px"}}>{item.product}</td>
                <td>{item.quantity}</td>
                <td>{item.measurement_unit}</td>
                <td style={{textAlign:"center", width:"130px"}}>{item.from_who}</td>
                <td
                  style={
                    item.status === "Jarayonda"
                      ? { color: "#98CC63" }
                      : " #FE2626"
                  }
                >
                  {item.status}
                </td>
                <td style={{textAlign:"center", width:"130px"}}>{item.description}</td>
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

export default RejaniYakunlash;
