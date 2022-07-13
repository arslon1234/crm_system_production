import React, { useEffect, useState } from "react";
import receiveIcon from "../../Icons/Receive.svg";
import rejectIcon from "../../Icons/Reject.svg";
import { useHistory } from "react-router-dom";
import { api } from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FacturaTable({
  url,
  btn,
  receive,
  data,
  openSaveModal,
  setId,
  setSuppliersClick,
  historyPage,
  setAcceptFactura,
  loading,
  next,
  id,
  childRef,
  // setLoading,
  parentRef,
}) {
  const history = useHistory();
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    let mounted = true;
    // setLoading(true);
    api.get("supplier/suppliers/").then((res) => {
      if (mounted) {
        // setLoading(false);
        setSuppliers(res);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="table factura-table">
      <div className="select-header faktura">
        <select
          name=""
          id=""
          onChange={(e) => setSuppliersClick(e.target.value)}
        >
          <option hidden disabled selected>
            Kimdan
          </option>
          {suppliers.map((x) => (
            <option value={x.title} key={x.id}>
              {x.title}
            </option>
          ))}
          <option value="Texnolog">Texnolog</option>
          <option value="Ta'minotchi">Ta'minotchi</option>
          <option value="all">Barchasi</option>
        </select>
      </div>
      <div className="table-main" ref={parentRef} id="scroll">
        <InfiniteScroll
          dataLength={data?.length}
          next={next}
          hasMore={true}
        //   loader={"loading..."}
        >
          <table id={id}>
            <thead>
              <tr>
                <th>
                  <p> № </p>
                </th>
                <th style={{textAlign:"start", width: "130px"}}>
                  <p>Nomi</p>
                </th>
                <th>
                  <p> Kimga</p>
                </th>
                <th>
                  <p>Kimdan</p>
                </th>
                <th>
                  <p> Umumiy qiymati </p>
                </th>
                {receive && (
                  <th>
                    <p> Tashqi harajatlar</p>
                  </th>
                )}
                <th>
                  <p> Sana</p>
                </th>
                {btn && (
                  <th>
                    <p> Qabul</p>
                  </th>
                )}
                {btn && (
                  <th>
                    <p> Bekor</p>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              { data &&
                data?.map((x, index) => (
                  <tr key={x.id}>
                    <td>{index + 1}</td>
                    <td
                      onClick={() =>
                        !historyPage &&
                        (receive
                          ? history.replace(
                              `${url}/qabul/faktura/${x.id}/${x.title}`
                            )
                          : history.replace(
                              `${url}/chiqarish/faktura/${x.id}/${x.title}`
                            ))
                      }
                      style={{
                        cursor: "pointer",
                        textDecoration: `${!historyPage && "underline"}`, textAlign:"start", width: "130px",
                      }}
                    >
                      {x.title}
                    </td>
                    <td>
                      <div className="to-who-table">
                        {x.to_who}
                        <span>{x.responsible}</span>
                      </div>
                    </td>
                    <td>{x.storage}</td>
                    <td>
                      {x.summa?.map((x) => (
                        <p style={{ paddingTop: "5px" }}>
                          {x.summa}
                        </p>
                      ))}
                    </td>
                    {receive && <td>{x.costs}</td>}
                    <td>{x.updated_at}</td>
                    {btn && (
                      <td className="receive-icon">
                        <img
                          src={receiveIcon}
                          alt=""
                          onClick={() => {
                            setId(x.id);
                            openSaveModal(true);
                            setAcceptFactura(true);
                          }}
                        />
                      </td>
                    )}
                    {btn && (
                      <td className="reject-icon">
                        <img
                          src={rejectIcon}
                          alt=""
                          onClick={() => {
                            setId(x.id);
                            openSaveModal(true);
                            setAcceptFactura(false);
                          }}
                        />
                      </td>
                    )}
                  </tr>
                ))}
                {/* {
                  btn ? 
                  loading && (
              <>
                <SkeletonLoader count={10} />
                <SkeletonLoader count={10} />
                <SkeletonLoader count={10} />
              </>
            ) :
            loading && (
              <>
                <SkeletonLoader count={8} />
                <SkeletonLoader count={8} />
                <SkeletonLoader count={8} />
              </>
            ) 
                
                } */}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
}
