import React, { useEffect, useState } from "react";
import axios from "axios";
// import Autocomplete from "@material-ui/lab/Autocomplete";

//Import css
import "react-confirm-alert/src/react-confirm-alert.css";

//Import Image
import { NavLink, useLocation, useParams } from "react-router-dom";
import { api } from "../../../api/api";
function BuyurtmaNomeri({ url, id, keyword }) {
  const [data1, setData1] = useState([]);
  const [data, setData] = useState([]);
  const { buyurtma } = useParams();
  const [data2, setData2] = useState([]);
  const urlId = window.location.href.split("/");
  console.log(urlId, "rul");
  useEffect(() => {
    let mounted = true;
    api.get(`storage/product-orders/?supplier=${urlId[5]}`).then((res) => {
      if (mounted) {
        setData2(res);
        console.log(res.results, "name");
      }
    });
    api.get("storage/product-orders/?supplier=1", {}).then((res) => {
      if (mounted) {
        setData(res);
        console.log(res.results);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if(keyword){
      api.get(`storage/product-orders/?supplier=${urlId[5]}&search=${keyword}`).then(res=>{
       setData(res)
      })
    }else if(keyword.length < 1){
     api
       .get(`storage/product-orders/?supplier=${urlId[5]}`)
       .then((res) => setData(res));
    }
   }, [keyword])
  return (
    <React.Fragment>
      <div className="manager_head2">
        <div className="faktura_name">
          <NavLink activeClassName="navbar_active2 " to={`${url}/Buyurtmalar`}>
            <div className="prev_icon">
              <i class="fa-regular fa-circle-left"></i>
            </div>
          </NavLink>

          <div className="nameFaktura">
            <span>{urlId[6].replace(/%20/g, " ")}</span>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="select-header2">
          <select name="" id="">
            <option value="">Mahsulot guruhi</option>
            <option value="">Mahsulot guruhi</option>
            <option value="">Mahsulot guruhi</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Nomi</p>
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
                <p>Topildi</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.results?.length
              ? data.results.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td>{item.invoice.title}</td>
                      <td>{item.product.title}</td>
                      <td>
                        {item.product.arrival_price} {item.product.currency}
                      </td>
                      <td>{item.asked_quantity}</td>
                      <td>
                        {item.asked_quantity * item.product.arrival_price}
                      </td>
                      <td>
                        <button className="topildi">Topildi</button>
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default BuyurtmaNomeri;
