import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import DataPick from "../data_pick";
import dateFormat from "dateformat";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { api } from "../../../../api/api";
import { useHistory, NavLink } from "react-router-dom";
const Daromad = ({ url,keyword }) => {
  const [data, setData] = useState([]);
  const urlId = window.location.href.split("/");
  const history = useHistory();
  const timer = useRef(null)
  console.log(urlId);
  useEffect(() => {
    let mounted = true;
    api.get(`sales/orders?invoice=${urlId[5]}`).then((res) => {
      if (mounted) {
        setData(res);
        console.log(res, "resultss");
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
            api.get(`sales/orders?invoice=${urlId[5]}`, {
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
        api.get(`sales/orders?invoice=${urlId[5]}`).then(res => {
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
      <div className="manager_head2">
        <div className="faktura_name">
          <NavLink
            activeClassName="navbar_active2 "
            to={`${url}/buyurtmalarTarixi`}
          >
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
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p> Mahsulot nomi</p>
              </th>
              <th>
                <p> Mahsulot miqdori</p>
              </th>
              <th>
                <p> O`lchov birligi</p>
              </th>
              <th>
                <p>Narxi</p>
              </th>
              <th>
                <p> Valyuta</p>
              </th>
              <th>
                <p> Summa</p>
              </th>
              <th>
                <p> Yaroqlilik muddati</p>
              </th>
              <th>
                <p>Izoh</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item,index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td style={{width: "120px", textAlign:"start"}}>{item.product.title}</td>
                <td>{item.quantity}</td>
                <td>{item.product.measurement_unit}</td>
                <td>{item.price}</td>
                <td>{item.currency}</td>
                <td>{item.price * item.quantity}</td>
                <td>{item.product.shelf_life}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginations"></div>
    </React.Fragment>
  );
  // }
};

export default Daromad;
