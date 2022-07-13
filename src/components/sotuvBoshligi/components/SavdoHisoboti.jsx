import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {api} from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import NumberFormat from "react-number-format";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const SavdoHisoboti = ({url, keyword}) => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [loading , setLoading] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if(keyword.length > 0) {
      if(timer.current) {
        clearTimeout(timer.current)
      }
      timer.current = setTimeout(() => {
        api.get("sales/managers/", {
          params: {
            search: keyword.length > 0 ? keyword : ""
          }
        }).then(res => {
          if(mounted) {
            setLoading(false);
            setData(res)
          }
        })
      }, 500);
      return () => {
        clearTimeout(timer.current)
      }
    } else if (keyword.length < 1) {
      api.get("sales/managers/").then(res => {
        if (mounted) {
          setLoading(false);
          setData(res)
        }
      });
    }
    return () => {
      mounted = false;
      clearTimeout()
    }
  }, [keyword]);

  return (
    <React.Fragment>
      <div className="manager_head">
        <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="exel_btn"
            table="to_Excel"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Excelga export"
        />
      </div>
      <div className="table table-main">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> # </p>
              </th>
              <th>
                <p> Menejer ismi</p>
              </th>
              <th>
                <p>Buyurtmalar soni</p>
              </th>
              <th>
                <p>Buyurtmalar summasi</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data && data.map((x, index ) => (
                <tr key={x.id}>
                  <th>{index + 1}</th>
                  <th onClick={() => history.replace(`${url}/menedjer/${x.first_name}/${x.id}`)} style={{cursor: "pointer"}}>{x.first_name}</th>
                  <th>{x.invoice_count}</th>
                  <th>{x.invoice_sum.map(x => <p
                      style={{paddingTop: "5px"}}>
                       {Object.values(x) + " " + Object.keys(x)}</p>)}</th>
                </tr>

            ))
            }
            {loading &&
            <>
              <SkeletonLoader count={4}/>
              <SkeletonLoader count={4}/>
              <SkeletonLoader count={4}/>
            </>
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default SavdoHisoboti;
