import React, { useCallback, useEffect, useState, useRef } from "react";
import DataPick from "../data_pick";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import NumberFormat from "react-number-format";
import { api } from "../../../../api/api";
import { useHistory } from "react-router-dom";
import eye from "../../../Icons/eye.svg";
import moment from "moment";
import SkeletonLoader from "../../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const HomashyoOmbori = ({ keyword, url }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [mfo, setMfo] = useState("");
  const [INN, setINN] = useState("");
  const [account1, setAccount1] = useState("");
  const [loading, setLoading] = useState(false);
  const [account2, setAccount2] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();
  const timer = useRef(null);
  const [filterByPeriod, setFilterByPeriod] = useState("");

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("sales/clients", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res);
              console.log(res, res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("sales/clients").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res);
          console.log(res, res);
        }
      });
    }
    return () => {
      mounted = false;
      clearTimeout();
    };
  }, [keyword]);
  const filterByDateCLick = useCallback(() => {
    setLoading(true);
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + 1;
    const yearEnd = endDate.getFullYear();
    if (startDate && endDate) {
      api
        .get("sales/clients/", {
          params: {
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res);
        });
    }
  }, [startDate, endDate]);
  const finals1 = data.filter((item) => item.client_debt["so'm"] != undefined);
  const final4 = finals1.reduce((a, b) => a + b.client_debt["so'm"], 0);
  const finals2 = data.filter((item) => item.client_debt.dollar != undefined);
  const final5 = finals2.reduce((a, b) => a + b.client_debt.dollar, 0);
  const handleClose = () => {
    setModal(false);
  };
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    if (filterByPeriod === "month") {
      api
        .get("sales/clients/", {
          params: {
            from: moment(oneMonthAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "week") {
      api
        .get("sales/clients/", {
          params: {
            from: moment(oneWeekAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    if (filterByPeriod === "day") {
      api
        .get("sales/clients/", {
          params: {
            from: moment(monthDate).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    }
    return () => {
      mounted = true;
    };
  }, [filterByPeriod]);
  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <DataPick
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          filterByDateClick={filterByDateCLick}
          clickByPeriod={filterByPeriod}
          setClickByPeriod={setFilterByPeriod}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={() => setModal(false)}
        className="dflax"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <div className="modal_input7">
            <h1>Bank malumotlari</h1>
            <div className="bank_rek">
              MFO: <span>{mfo}</span>
            </div>
            <div className="bank_rek">
              INN: <span>{INN}</span>
            </div>
            <div className="bank_rek">
              Account_1: <span>{account1}</span>
            </div>
            <div className="bank_rek">
              Account_2: <span>{account2}</span>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p> Firma nomi</p>
              </th>
              <th>
                <p>Rahbar ismi familyasi</p>
              </th>
              <th>
                <p>Telefon</p>
              </th>
              <th>
                <p> Mas’ul shaxs</p>
              </th>
              <th>
                <p>Kompaniya manzili</p>
              </th>
              <th>
                <p>qarzi(so'm)</p>
              </th>
              <th>
                <p>qarzi(dollar)</p>
              </th>
              <th>
                <p>Bank rekvizitlari</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td
                    className="a_lar"
                    onClick={() =>
                      history.replace(
                        `${url}/MijozlarId/${item.id}/${item.title}/${item.client_debt.dollar}/${item.client_debt["so'm"]}`
                      )
                    }
                    style={{
                      width: "120px",
                      textAlign: "start",
                      cursor: "pointer",
                    }}
                  >
                    {item.title}
                  </td>
                  <td>{item.fullname}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.responsible}</td>
                  <td>{item.address}</td>
                  <td>
                    <NumberFormat
                      value={item.client_debt["so'm"]}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                  <td>
                    <NumberFormat
                      value={item.client_debt.dollar}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                  <td>
                    <img
                      src={eye}
                      alt=""
                      onClick={() => (
                        setModal(true),
                        setMfo(item.bank_details.MFO),
                        setINN(item.bank_details.INN),
                        setAccount1(item.bank_details.BANK_ACCOUNT_1),
                        setAccount2(item.bank_details.BANK_ACCOUNT_2)
                      )}
                    />
                  </td>
                </tr>
              ))}
            {loading && (
              <>
                <SkeletonLoader count={10} />
                <SkeletonLoader count={10} />
                <SkeletonLoader count={10} />
              </>
            )}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>Jami</td>
              <td></td>
              <td></td>
              <td>
                <NumberFormat
                  value={final4}
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </td>
              <td>
                <NumberFormat
                  value={final5}
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default HomashyoOmbori;
