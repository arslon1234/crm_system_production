import React, { useEffect, useState, useRef } from "react";
import { LeftIcon } from "../../iconComponents/LeftIcon";
import { useHistory } from "react-router-dom";
import { api } from "../../../api/api";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SkeletonLoader from "../../loader/skeleton-loader";
export default function TopilganlarId({ url, keyword }) {
  const [data3, setData3] = useState([]);
  const [loading, setLoading] = useState(false)
  const history = useHistory();
  const urlId2 = window.location.href.split("/");
  const timer = useRef(null)
  console.log(urlId2[2]);
  
  const function2 = () => {
    let mounted = true;
    setLoading(true)
    api
      .get("storage/product-orders/?invoice=5&status=NotEmpty", {
        
      })
      .then((res) => {
        if (mounted) {
          setLoading(false)
          setData3(res);
          console.log(res.results);
        }
      });
    return () => {
      mounted = false;
    };
  };
  useEffect(() => {
    function2();
  }, []);
   useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            api.get("storage/product-orders/?invoice=5&status=NotEmpty", {
                params: {
                    search: keyword.length > 0 ? keyword : ""
                }
            }).then(res => {
                if (mounted) {
                    setData3(res)
                }
            })
        }, 500);
        return () => {
            clearTimeout(timer.current)
        }
    } else if (keyword.length < 1) {
        api.get("storage/product-orders/?invoice=5&status=NotEmpty").then(res => {
            if (mounted) {
                setData3(res)
            }
        })
    }
    return () => {
        clearTimeout();
        mounted = false
    }
}, [keyword]);
  const sums1 = data3?.results?.reduce(
    (sum1, item) =>
      sum1 + item.found.dillerdan.quantity * item.found.dillerdan.price,
    0
  );
  const sums2 = data3?.results?.reduce(
    (sums2, item) =>
      sums2 + item.found.kochadan.quantity * item.found.kochadan.price,
    0
  );
  const sums3 = data3?.results?.reduce(
    (sums2, item) => sums2 + item.found.dillerdan.quantity,
    0
  );
  const sums4 = data3?.results?.reduce(
    (sums2, item) => sums2 + item.found.kochadan.quantity,
    0
  );
  return (
    <div className="taminotchi-id">
    <div className="buyurtma_btn">
      <div className="back-block">
        <div onClick={() => history.replace(`${url}/Topilganlar`)}>
          <LeftIcon />
        </div>
        <span>{urlId2[6].replace(/%20/g, " ")}</span>
      </div>
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
        <table id="to_Excel">
          <thead className="first-head-thead">
            <tr>
              <th>
                <p className="none-th"> </p>
              </th>
              <th>
                <p className="none-th"></p>
              </th>
              <th>
                <p className="none-th"></p>
              </th>
              <th>
                <p className="none-th"></p>
              </th>
              <th colSpan="2">
                <p>Dilerdan</p>
              </th>
              <th colSpan="2">
                <p>Kochadan</p>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th style={{textAlign:"start"}}>
                <p>Mahsulot nomi</p>
              </th>
              <th>
                <p>Mahsulot guruhi</p>
              </th>
              <th>
                <p>Narxi</p>
              </th>
              <th>
                <p>Miqdori</p>
              </th>
              <th>
                <p>Summa</p>
              </th>
              <th>
                <p>Miqdori</p>
              </th>
              <th>
                <p>Summa</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data3?.results
              ? data3.results.map((item,index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td style={{textAlign:"start", width:"130px"}}>{item.product.title}</td>
                      <td>{item.product.group}</td>
                      <td>{item.price}</td>
                      <td>
                        <span>{item.found.dillerdan.quantity}</span>;
                      </td>
                      <td>
                        {item.found.dillerdan.summa}
                      </td>
                      <td>{item.found.kochadan.quantity}</td>
                      <td>
                        {item.found.kochadan.summa}
                      </td>
                    </tr>
                  );
                })
              : ""}
                {
                  loading && 
                  <>
                    <SkeletonLoader count={9}/>
                    <SkeletonLoader count={9}/>
                    <SkeletonLoader count={9}/>
                  </>
                }
            <tr>
              <td></td>
              <td>Jami:</td>
              <td></td>
              <td></td>
              <td>{sums3}</td>
              <td className="color-danger">{sums1}</td>
              <td>{sums4}</td>
              <td className="color-danger">{sums2}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
