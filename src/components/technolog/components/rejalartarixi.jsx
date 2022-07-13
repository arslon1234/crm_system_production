import React, { useState, useEffect, useRef } from "react";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { api } from "../../../api/api";
const ReajalarTarixi = ({ keyword }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get("texnolog/plans/?saved=True").then((res) => {
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
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("texnolog/plans/?saved=True", {
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
      api.get("texnolog/plans/?saved=True").then((res) => {
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
                <p> №</p>
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
                <p> Status </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Tugatilgan sana </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((item, index) => (
                <tr key={index + 1}>
                  <td>{item.id}</td>
                  <td style={{ textAlign: "start", width: "130px" }}>
                    {item.product}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.measurement_unit}</td>
                  <td>{item.status}</td>
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

export default ReajalarTarixi;
