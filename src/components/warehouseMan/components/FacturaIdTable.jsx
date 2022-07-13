import React, {useEffect, useState} from "react";
import receiveIcon from "../../Icons/Receive.svg";
import rejectIcon from "../../Icons/Reject.svg";
import {api} from "../../../api/api";
import SkeletonLoader from "../../loader/skeleton-loader";

export default function FacturaIdTable({send, data, setFilterFromWho, setFilterProduct, loading, id}) {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        let mounted = true;
        api.get("storage/product-groups").then(res => {
           if(mounted) {
               setProduct(res)
           }
        });
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div className="table">
            <div className="select-header">
               {send &&  <select name="" id="" onChange={(e) => setFilterProduct(e.target.value)}>
                    <option selected hidden disabled>Mahsulot guruhi</option>
                   {product && product.map(x => (
                       <option value={x.id} key={x.id}>{x.title}</option>
                   ))}
                   <option value="all">Barchasi</option>
                </select>}
            </div>
            <div className="table-main">
            <table id={id}>
                <thead>
                <tr>
                    <th>
                        <p> # </p>
                    </th>
                    <th style={{textAlign:"start"}}>
                        <p>Nomi</p>
                    </th>
                    <th>
                        <p>Mahsulot guruhi</p>
                    </th>
                    <th>
                        <p> Modeli</p>
                    </th>
                    <th>
                        <p> Kodi </p>
                    </th>
                    <th>
                        <p> Miqdori</p>
                    </th>
                   {send ?  <th>
                           <p> Sotish narxi</p>
                       </th> :
                       <th>
                        <p> Kelish narxi</p>
                    </th>}
                    <th>
                        <p> Summasi</p>
                    </th>
                    {send && <th>
                            <p>Sana</p>
                        </th> }
                  {!send &&  <th>
                        <p> Keltirilgan sana</p>
                    </th>}
                    <th>
                        <p>Yaroqlik muddati</p>
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
                        <th style={{textAlign:"start", width:"130px"}}>{x.product.title}</th>
                        <th>{x.product.group}</th>
                        <th>{x.product.model}</th>
                        <th>{x.product.code}</th>
                        <th>{x.found_quantity}</th>
                        {send ?  <th>
                               {x.price}
                            </th> :
                            <th>
                                {x.price}
                            </th>}
                        <th>{x.price * x.found_quantity}</th>
                        {send && <th>
                                Sana
                            </th>
                        }
                        {!send &&  <th>
                            <p>{x.created_at}</p>
                        </th>}
                        <th>{x.product.shelf_life}</th>
                        <th>{x?.description}</th>
                    </tr>
                ))
                }
                {loading &&
                <>
                    <SkeletonLoader count={12}/>
                    <SkeletonLoader count={12}/>
                    <SkeletonLoader count={12}/>
                </>
                }
                </tbody>
            </table>
            </div>
        </div>
    )
}