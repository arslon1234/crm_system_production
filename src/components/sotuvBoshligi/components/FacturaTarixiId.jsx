import React, {useEffect, useRef, useState} from "react";
import {LeftIcon} from "../../iconComponents/LeftIcon";
import {useHistory} from "react-router-dom"
import {api} from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function FacturaTarixId({url, keyword}) {
    const [data, setData] = useState([]);
    const urlId = window.location.href.split('/');
    const [loading ,setLoading] = useState(false);
    const history = useHistory();
    const timer = useRef();

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        if(keyword.length > 0) {
            if(timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                api.get("sales/orders", {
                    params: {
                        invoice: urlId[6],
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
        }else if (keyword.length < 1 ){
            api.get(`sales/orders?invoice=${urlId[6]}`).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res)
                }
            });
        }
        return () => {
            mounted = false
        }
    }, [keyword]);
    return (
        <div>
            <div className="buyurtma_btn id-factura">
                <div className="back-block">
                    <div onClick={() => history.replace(`${url}/FakturalarTarixi`)}>
                        <LeftIcon/>
                    </div>
                    <span>{urlId[5].replace(/%20/g, " ")}</span>
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
            <div className="table-main">
                <table id="to_Excel">
                    <thead>
                    <tr>
                        <th>
                            <p> # </p>
                        </th>
                        <th>
                            <p>Mahsulot nomi</p>
                        </th>
                        <th>
                            <p>Mahsulot miqdor</p>
                        </th>
                        <th>
                            <p>O'lchov birligi</p>
                        </th>
                        <th>
                            <p>Narxi (1 birl.)</p>
                        </th>
                        <th>
                            <p>Valyuta</p>
                        </th>
                        <th>
                            <p>Summa</p>
                        </th>
                        <th>
                            <p>Yaroqlilik muddati</p>
                        </th>
                        <th>
                            <p>Izoh</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && data && data.map((x, index) => (
                        <tr key={x.id}>
                            <th>{index + 1}</th>
                            <th>{x.product.title}</th>
                            <th>{x.quantity} </th>
                            <th>{x.product.measurement_unit}</th>
                            <th>{x.price}</th>
                            <th>{x.currency}</th>
                            <th>{x.quantity * x.price}</th>
                            <th>{x.shelf_life}</th>
                            <th>{x.description}</th>
                        </tr>
                    ))}
                    {loading &&
                    <>
                        <SkeletonLoader count={10}/>
                        <SkeletonLoader count={10}/>
                        <SkeletonLoader count={10}/>
                    </>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}