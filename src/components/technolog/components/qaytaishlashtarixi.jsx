import React, { useState, useEffect, useRef } from "react";
import { api } from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const QaytaishlashTarixi = ({keyword}) => {
  const [data, setData] = useState([]);
  const timer = useRef(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let mounted = true;
    setLoading(true)
    api.get("storage/send-valid/?status=Tayyorlandi").then((res) => {
      if (mounted) {
        setLoading(false)
        setData(res);
        console.log(res);
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
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            api.get("storage/send-valid/?status=Tayyorlandi", {
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
        api.get("storage/send-valid/?status=Tayyorlandi").then(res => {
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
                <p>Sana </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data.map((item,index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td style={{textAlign:"start", width:"130px"}} >{item.product.title}</td>
                <td>{item.quantity}</td>
                <td>{item.product.measurement_unit}</td>
                <td style={{ width:"130px"}}>{item.description}</td>
                <td>{item.created_at}</td>
              </tr>
            ))}
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
};

export default QaytaishlashTarixi;
