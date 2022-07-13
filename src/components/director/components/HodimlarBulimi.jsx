import React, { useState, useEffect, useRef } from "react";
import SkeletonLoader from "../../loader/skeleton-loader";
import NumberFormat from "react-number-format";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useHistory } from "react-router-dom";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
const HodimlarRuyxati = ({ url, keyword }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)
  const history = useHistory();
  const timer = useRef(null);
  useEffect(() => {
    let mounted = true;
    setLoader(true)
    api.get("user/salary/").then((res) => {
      if (mounted) {
        setLoader(false)
        setData(res);
        console.log(res, "res");
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
          .get("user/salary/", {
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
      api.get("user/salary/").then((res) => {
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
    <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="exel_btn"
            table="to_Excel"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excelga export"
        />
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th style={{textAlign:"start"}}>
                <p> Ism familya</p>
              </th>
              <th>
                <p> Lavozim</p>
              </th>
              <th>
                <p> Oylik </p>
              </th>
              <th>
                <p>Yashash manzil </p>
              </th>
              <th>
                <p> Telefon raqam </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loader && data.map((item,index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td style={{textAlign:"start", width:"130px"}}>
                  <div
                    style={{textDecoration: "underline", cursor: "pointer" }}
                    className="a_lar"
                    onClick={() =>
                      history.replace(
                        `${url}/HodimlarOyligi/${item.id}/${item.first_name}/${item.last_name}/${item.role}/${item.salary}`
                      )
                    }
                  >
                    {item.first_name} {item.last_name}
                  </div>
                </td>
                <td>{item.role}</td>
                <td>
                <NumberFormat
                      value={item.salary}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                </td>
                <td>{item.adress}</td>
                <td>{item.phone_number}</td>
              </tr>
            ))}
            {loader && (
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
};

export default HodimlarRuyxati;
