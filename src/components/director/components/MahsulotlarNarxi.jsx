import React, { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import NumberFormat from "react-number-format";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
export default function MahsulotlarNarxi({ keyword }) {
  const [data, setData] = useState([]);
  const [group, setGroup] = useState("");
  const [filterByGroup, setFilterByGroup] = useState("");
  const [productGroup, setProductGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const [next, setNext] = useState("");
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // api.get("storage/products/?type=Tayyor").then((res) => {
    //     if (mounted) {
    //         setLoading(false);
    //         setData(res);
    //     }
    // });
    api.get("storage/product-groups").then((res) => {
      setProductGroup(res);
    });
    return () => {
      setLoading(false);
      mounted = false;
    };
  }, [group]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (filterByGroup && filterByGroup !== "all") {
      api
        .get("storage/products/?type=Tayyor", {
          params: {
            group: filterByGroup,
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res);
          }
        });
    } else if (filterByGroup === "all") {
      api.get("storage/products/?type=Tayyor").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [filterByGroup]);
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/products/?type=Tayyor", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setLoading(false);
              setData(res.results);
              setNext(res.next);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/products/?type=Tayyor").then((res) => {
        if (mounted) {
          setLoading(false);
          setData(res.results);
          setNext(res.next);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const nextData = useCallback(() => {
    api.get(`${next}`).then((res) => {
      setData((prev) => [...prev, ...res.results]);
      setNext(res.next);
    });
  }, [next]);
  return (
    <div>
      <div className="manager_head director-head">
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="exel_btn"
          table="to_Excel"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Excelga export"
        />
      </div>
      <div className="table director-table">
        <div className="select-header">
          <select
            name=""
            id=""
            onChange={(e) => setFilterByGroup(e.target.value)}
          >
            <option hidden disabled selected>
              Mahsulot guruhi
            </option>
            {productGroup.map((x) => (
              <option value={x.id} key={x.id}>
                {x.title}
              </option>
            ))}
            <option value="all">Barchasi</option>
          </select>
        </div>
        <div className="table-main">
          <InfiniteScroll
            dataLength={data?.length}
            next={nextData}
            hasMore={true}
            //   loader={"loading..."}
          >
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
                    <p> Modeli </p>
                  </th>
                  <th>
                    <p>Kodi</p>
                  </th>
                  <th>
                    <p>Tan narxi</p>
                  </th>
                  <th>
                    <p>Sotish narxi</p>
                  </th>
                  <th>
                    <p>Summasi</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  data &&
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ width: "120px", textAlign: "start" }}>
                        {item.title}
                      </td>
                      <td>{item.group}</td>
                      <td>{item.model}</td>
                      <td>{item.code}</td>
                      <td>
                      <NumberFormat
                      value={item.arrival_price}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                      </td>
                      <td>
                      <NumberFormat
                      value={item.selling_price}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                      </td>
                      <td>
                      <NumberFormat
                      value= {item.costs}
                      className="foo"
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                     </td>
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
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
