import React, { useCallback, useEffect, useState, useRef } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { api } from "../../../api/api";
import DeleteModal from "../../modal/DeleteModal";
import AcceptModal3 from "../../modal/AccecptModal3";
import SkeletonLoader from "../../loader/skeleton-loader";
export default function Passive( {keyword}) {
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [foundItem, setFoundItem] = useState("");
  const [productData, setProductData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [modalAccept, setModalAccept] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false)
  const timer = useRef(null)
  const handleChange = (name, value) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  console.log(foundItem, "Data");
  const click = useCallback(() => {
    if (productData.where === "Ko'chadan") {
      api
        .post("storage/found/", {
          where: productData.where,
          order: foundItem.id,
          price: productData.price,
          currency: 1,
          quantity: productData.quantity,
        })
        .then((res) => {
          console.log(res);
        });
    } else if (productData.where === "Dillerdan") {
      api
        .post("storage/found/", {
          where: productData.where,
          order: foundItem.id,
          price: foundItem.product.arrival_price,
          quantity: productData.quantity,
          currency: 1,
        })
        .then((res) => {
          console.log(res);
        });
    }
  }, [productData, foundItem]);
  const function1 = () => {
    let mounted = true;
    setLoading(true)
    api
      .get("storage/product-orders/?status=NotFull&group=Order&saved=False")
      .then((res) => {
        if (mounted) {
          setLoading(false)
          setData(res.results);
          console.log(res.results);
        }
      });
    return () => {
      mounted = false;
    };
  };
  const function4 = () => {
    let mounted = true;
    api.get("storage/products/?type=Homashyo", {}).then((res) => {
      if (mounted) {
        setData3(res);
        console.log(res.results);
      }
    });
    return () => {
      mounted = false;
    };
  };

  const function3 = () => {
    let mounted = true;
    api.get("storage/currency/").then((res) => {
      if (mounted) {
        setCurrency(res);
      }
    });
    return () => {
      mounted = false;
    };
  };
  const handleOpen = () => {
    setModalAccept((prev) => !prev);
  };
   useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            api.get("storage/product-orders/?status=NotFull&group=Order&saved=False", {
                params: {
                    search: keyword.length > 0 ? keyword : ""
                }
            }).then(res => {
                if (mounted) {
                    setData(res.results)
                }
            })
        }, 500);
        return () => {
            clearTimeout(timer.current)
        }
    } else if (keyword.length < 1) {
        api.get("storage/product-orders/?status=NotFull&group=Order&saved=False").then(res => {
            if (mounted) {
                setData(res.results)
            }
        })
    }
    return () => {
        clearTimeout();
        mounted = false
    }
}, [keyword]);
  useEffect(() => {
    function1();
    function3();
    function4();
  }, []);
  const delateItem = useCallback(() => {
    api.delete(`storage/product-orders/${id}/`).then((res) => {
      setModalAccept(false);
      if (res) {
        api
          .get("storage/product-orders/?status=NotFull&group=Order&saved=False")
          .then((res) => setData(res.results));
      }
    });
  }, [id]);
 
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
      <DeleteModal
        open={modalDelete}
        close={() => setModalDelete((prev) => !prev)}
        text2={"Buyurtmani bekor qilish"}
        // delate={delateItem}
      />
      <AcceptModal3
        open={modalAccept}
        close={() => setModalAccept((prev) => !prev)}
        delate={delateItem}
      />
      <div className="table">
        <table id="to_Excel">
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Buyurtma nomeri</p>
              </th>
              <th>
                <p>Nomi</p>
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
              <th>
                <p>
                  <i
                    style={{ fontSize: "15px" }}
                    class="fa-regular fa-trash-can"
                  ></i>
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data.length
              ? data.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index+1}</td>
                      <td>{item.invoice.title}</td>
                      <td>{item.product.title}</td>
                      <td>
                        {item.price} {item.currency}
                      </td>
                      <td>{item.asked_quantity}</td>
                      <td>{item.price * item.asked_quantity}</td>
                      <td>
                        <button
                          onClick={() => {
                            setModal(true);
                            setFoundItem(item);
                          }}
                          className="topildi"
                        >
                          Topildi
                        </button>
                      </td>
                      <td>
                        <button
                          className="delateTopildi"
                          onClick={() => (setId(item.id), handleOpen())}
                        >
                          <i
                            style={{ fontSize: "15px", color: "white" }}
                            class="fa-regular fa-trash-can"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              : ""}
              {
                loading && 
                <>
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
                <SkeletonLoader count={9} />
                </>
              }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
