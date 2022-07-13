import React, {useEffect, useRef, useState} from "react";
import {LeftIcon} from "../../iconComponents/LeftIcon";
import {api} from "../../../api/api";
import {useHistory} from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import SkeletonLoader from "../../loader/skeleton-loader";


export default function MenedjerId({url, keyword}) {
    const [data, setData] = useState([]);
    const urlId = window.location.href.split('/');
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
                api.get("storage/invoices", {
                    params: {
                        created_by: urlId[6],
                        search: keyword.length > 0 ? keyword : ""
                    }
                }).then(res => {
                    if(mounted) {
                        setLoading(false);
                        setData(res.results)
                        console.log(res.results, "ddd")
                    }
                })
            }, 500);
            return () => {
                clearTimeout(timer.current)
            }
        } else if (keyword.length < 1) {
            api.get(`storage/invoices/?created_by=${urlId[6]}`).then(res => {
                if (mounted) {
                    setLoading(false);
                    setData(res.results)
                    console.log(res.results, "ddd")
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
                    <div onClick={() => history.replace(`${url}/SavdoHisoboti`)}>
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
                            <p> № </p>
                        </th>
                        <th>
                            <p>Factura nomi</p>
                        </th>
                        <th>
                            <p>Mijoz</p>
                        </th>
                        <th>
                            <p>Umumiy summa(so'mda)</p>
                        </th>
                        <th>
                            <p>Umumiy summa(dollarda)</p>
                        </th>
                        <th>
                            <p>Umumiy summa(rublda)</p>
                        </th>
                        <th>
                            <p>Izoh</p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!loading && data && data?.map((x, index) => (
                        <tr key={x.id}>
                            <th>{index + 1}</th>
                            <th>{x.title}</th>
                            <th>{x.client} </th>
                            <th>{x.summa.map(x =>  <p style={{paddingTop: "5px"}}> {Object.values(x) + " " + Object.keys(x)}</p>)}</th>
                            <th>{x.description}</th>
                            <th>{x.description}</th>
                            <th>{x.description}</th>
                        </tr>
                    ))}
                    {loading &&
                    <>
                        <SkeletonLoader count={8}/>
                        <SkeletonLoader count={8}/>
                        <SkeletonLoader count={8}/>
                    </>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}