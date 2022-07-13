import React, { useState, useEffect, useCallback } from "react";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Images
import { api } from "../../../api/api";

const Buyurtma = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)
  const delateItem = useCallback((id) => {
    api.delete(`sales/production-orders/${id}/`).then((res) => {
      console.log(res);
      api.get("sales/production-orders/?status=active").then((res) => {
        setData(res);
      });
    });
  }, []);
  useEffect(() => {
    let mounted = true;
    setLoader(true)
    api.get("sales/production-orders/?status=active").then((res) => {
      if (mounted) {
        setLoader(false)
        setData(res);
        console.log(res, "results");
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
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Buyurtma nomi</p>
              </th>
              <th>
                <p> Mahsulot nomi</p>
              </th>
              <th>
                <p> Miqdori</p>
              </th>
              <th>
                <p>Muddati</p>
              </th>
              <th>
                <p> Kimdan </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
              <th>
                <p> Status </p>
              </th>
              <th>
                <p>O'chirish</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loader && data?.results
              ? data.results.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.product.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.deadline}</td>
                    <td>{item.created_by}</td>
                    <td>{item.description}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="delateTopildi"
                        onClick={() => delateItem(item.id)}
                      >
                        <i
                          style={{ fontSize: "15px", color: "white" }}
                          class="fa-regular fa-trash-can"
                        ></i>
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
              {loader && (
              <>
                <SkeletonLoader count={10} />
                <SkeletonLoader count={10} />
                <SkeletonLoader count={10} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
  // }
};

export default Buyurtma;
