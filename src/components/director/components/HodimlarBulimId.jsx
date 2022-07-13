import React, { useState, useEffect, useRef } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import NumberFormat from "react-number-format";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SkeletonLoader from "../../loader/skeleton-loader";
// import image
import { NavLink } from "react-router-dom";
import { api } from "../../../api/api";
const HodimlarOyligi = ({ handleSend, url, keyword }) => {
  const [data2, setData2] = useState([]);
  const urlId = window.location.href.split("/");
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  // console.log(urlId);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get(`finance/payment/?employee=${urlId[5]}&type=1`).then((res) => {
      if (mounted) {
        setLoading(false);
        setData2(res);
        console.log(res, "product");
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
          .get(`finance/payment/?employee=${urlId[5]}&type=1`, {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData2(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get(`finance/payment/?employee=${urlId[5]}&type=1`).then((res) => {
        if (mounted) {
          setData2(res);
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
      <div className="manager_head2">
        <div className="faktura_name">
          <NavLink
            activeClassName="navbar_active2 "
            to={`${url}/HodimlarRuyxati`}
          >
            <div className="prev_icon">
              <i class="fa-regular fa-circle-left"></i>
            </div>
          </NavLink>
          <div className="nameFaktura2">
            <span>
              {urlId[6].replace(/%20/g, " ")} {urlId[7].replace(/%20/g, "  ")}{" "}
              {"-"} {urlId[8].replace(/%20/g, " ")}
            </span>
          </div>
        </div>
        <div className="faktura_yaratilishi">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="exel_btn"
            table="to_Excel"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excelga export"
          />
        </div>
      </div>
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Sana</p>
              </th>
              <th>
                <p>Oylik</p>
              </th>
              <th>
                <p>Ustama</p>
              </th>
              <th>
                <p>Jarima</p>
              </th>
              <th>
                <p>Ustama sababi</p>
              </th>
              <th>
                <p>Jarima sababi</p>
              </th>
              <th>
                <p>Olgan summasi</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data2?.results
              ? data2.results.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.created_at}</td>
                      <td>
                      <NumberFormat
                      value={urlId[9]}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                      </td>
                      <td>{item.bonus}</td>
                      <td>{item.fine}</td>
                      <td>{item.bonus_reason}</td>
                      <td>{item.fine_reason}</td>
                      <td>
                      <NumberFormat
                      value= {item.summa}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                        {item.currency}
                      </td>
                    </tr>
                  );
                })
              : ""}
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

export default HodimlarOyligi;
