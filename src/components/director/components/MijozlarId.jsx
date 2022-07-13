import React, { useState, useEffect, useRef } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SkeletonLoader from "../../loader/skeleton-loader";
import NumberFormat from "react-number-format";
// import image
import { NavLink } from "react-router-dom";
import { api } from "../../../api/api";
const MijozlarId = ({ handleSend, url, keyword }) => {
  const [data2, setData2] = useState([]);
  const urlId = window.location.href.split("/");
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  console.log(urlId[5]);
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get(
            `storage/invoices/?type=Chiqish&status=Saved&client=${urlId[5]}`,
            {
              params: {
                search: keyword.length > 0 ? keyword : "",
              },
            }
          )
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData2(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api
        .get(`storage/invoices/?type=Chiqish&status=Saved&client=${urlId[5]}`)
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData2(res);
          }
        });
    }
    return () => {
      clearTimeout();
      mounted = false;
      setLoading(false);
    };
  }, [keyword]);
  return (
    <React.Fragment>
      <div className="manager_head2">
        <div className="faktura_name">
          <NavLink
            activeClassName="navbar_active2 "
            to={`${url}/klientroyhati`}
          >
            <div className="prev_icon">
              <i class="fa-regular fa-circle-left"></i>
            </div>
          </NavLink>
          <div className="nameFaktura5">
            <span>{urlId[6].replace(/%20/g, " ")}</span>
          </div>
          <div className="numberFormat">
            <NumberFormat
              value={urlId[7]}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
           <NumberFormat
              value={urlId[8]}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"so'm"}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
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
                <p>qarzi(so'm)</p>
              </th>
              <th>
                <p>qarzi(dollar)</p>
              </th>
              <th>
                <p>kimdan</p>
              </th>
              <th>
                <p>Izoh</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data2?.results
              ? data2.results.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.updated_at}</td>
                      <td>
                        {item.summa.map((x) => {
                          return x.currency === "so'm" && x.total_price;
                        })}
                      </td>
                      <td>
                        {item.summa.map((x) => {
                          return x.currency === "dollar" && x.total_price;
                        })}
                      </td>
                      <td>{item.storage}</td>
                      <td>{item.description}</td>
                    </tr>
                  );
                })
              : ""}
              {loading && (
              <>
                <SkeletonLoader count={7} />
                <SkeletonLoader count={7} />
                <SkeletonLoader count={7} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default MijozlarId;
