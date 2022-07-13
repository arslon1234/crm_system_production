import React, { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../../api/api";
import DataPick from "./data_pick";
import { useHistory } from "react-router-dom";
import moment from "moment";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import InfiniteScroll from "react-infinite-scroll-component";
function BuyurtmaTarixi({url, keyword}) {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const history = useHistory();
  const timer = useRef(null);
  const [loading , setLoading] = useState(false);
  const [filterByPeriod, setFilterByPeriod] = useState("");
  const [next, setNext] = useState("");
   useEffect(() => {
    let mounted = true;
       setLoading(true);
    if (keyword.length > 0) {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            api.get("storage/invoices/?type=Chiqish", {
                params: {
                    search: keyword.length > 0 ? keyword : ""
                }
            }).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                    setNext(res.next)
                }
            })
        }, 500);
        return () => {
            clearTimeout(timer.current)
        }
    } else if (keyword.length < 1) {
        api.get("storage/invoices/?type=Chiqish").then(res => {
            if (mounted) {
                setLoading(false);
                setData(res.results)
                setNext(res.next)
            }
        })
    }
    return () => {
        clearTimeout();
        mounted = false
    }
}, [keyword]);
const nextData = useCallback(() => {
  api.get(`${next}`).then(res => {
      setData(prev => [...prev, ...res.results]);
      setNext(res.next)
  })
}, [next]);
  const filterByDateCLick = useCallback(() => {
      setLoading(true);
    const dayStart = startDate.getDate();
    const monthStart = startDate.getMonth() + 1;
    const yearStart = startDate.getFullYear();
    const dayEnd = endDate.getDate();
    const monthEnd = endDate.getMonth() + 1;
    const yearEnd = endDate.getFullYear();
    if (startDate && endDate) {
      api
        .get("storage/invoices/", {
          params: {
            type: "Chiqish",
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => {
            setLoading(false);
            setData(res.results)
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const monthDate = new Date();
    let oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
    let oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
    let oneYearsAgo = new Date().setFullYear(new Date().getFullYear() - 1);
    if (filterByPeriod === "month") {
      api.get("storage/invoices/", {
        params: {
          type: "Chiqish",
          from: moment(oneMonthAgo).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if(mounted) {
            setLoading(false);
          setData(res.results)
        }
      });
    }
    if (filterByPeriod === "week") {
      api.get("storage/invoices/", {
        params: {
          type: "Chiqish",
          from: moment(oneWeekAgo).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if(mounted) {
            setLoading(false);
          setData(res.results)
        }
      });
    }
    if (filterByPeriod === "day") {
      api.get("storage/invoices/", {
        params: {
          type: "Chiqish",
          from: moment(monthDate).format("YYYY-MM-DD"),
          to: moment(monthDate).format("YYYY-MM-DD"),
        },
      }).then((res) => {
        if(mounted) {
            setLoading(false);
          setData(res.results)
        }
      });
    }
    if (filterByPeriod === "year") {
      api
        .get(`storage/invoices/`, {
          params: {
            type: "Chiqish",
            from: moment(oneYearsAgo).format("YYYY-MM-DD"),
            to: moment(monthDate).format("YYYY-MM-DD"),
          },
        })
        .then((res) => {
          if (mounted) {
            setLoading(false);
            setData(res.results)
            setNext(res.next);
          }
        });
    }
    return () => {
      mounted = true;
    };
  }, [filterByPeriod]);

  return (
    <React.Fragment>
      <div className="buyurtma_btn">
        <DataPick
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
          filterByDateClick={filterByDateCLick}
          setClickByPeriod={setFilterByPeriod}
          clickByPeriod={filterByPeriod}
        />
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
      <InfiniteScroll
            dataLength={data?.length}
            next={nextData}
            hasMore={true}
            //   loader={"loading..."}
          >
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p>№</p>
              </th>
              <th>
                <p> Mijoz</p>
              </th>
              <th>
                <p> Faktura nomi</p>
              </th>
              <th>
                <p> Umumiy summa </p>
              </th>
              <th>
                <p> Sana </p>
              </th>
              <th>
                <p> Izoh </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data &&
              data.map((item,index) => (
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td style={{width: "120px", textAlign:"start"}}>
                    <div
                          onClick={() =>
                            history.replace(
                              `${url}/buyurtmalar/${item.id}/${item.to_who}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                         {item.client}
                        </div>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.summa.map(x=> {
                      return (<>
                        <p>{x.rubl}</p>
                        <p>{x.dollar}</p>
                        <p>{x["so'm"]}</p>
                        </>
                      )
                    })}</td>
                    <td>{item.updated_at}</td>
                    <td>{item.description}</td>
                  </tr>
                ))
              }
            {loading &&
            <>
                <SkeletonLoader count={7}/>
                <SkeletonLoader count={7}/>
                <SkeletonLoader count={7}/>
            </>
            }
          </tbody>
        </table>
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
  // }
}

export default BuyurtmaTarixi;
