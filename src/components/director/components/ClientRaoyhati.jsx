import React from "react";
import DataPick from "./data_pick";
import cashIcon from "../../Icons/cash.png";
import trashIcon from "../../Icons/trash.svg";
import EditIcon from "../../iconComponents/EditIcon";


export default function ClientRoyhati() {
    return (
        <div>
            <DataPick/>
            <div className="table director-table">
                <table>
                    <thead>
                    <tr>
                        <th>
                            <p> № </p>
                        </th>
                        <th >
                            <p>Firma nomi</p>
                        </th>
                        <th>
                            <p>Rahbar ismi familyasi</p>
                        </th>
                        <th>
                            <p>Telefon</p>
                        </th>
                        <th>
                            <p>Mas’ul shaxs</p>
                        </th>
                        <th>
                            <p>Kompaniya manzili
                            </p>
                        </th>
                        <th>
                            <p>Izoh
                            </p>
                        </th>
                        <th>
                            <p>Izoh
                            </p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>1</th>
                        <th onClick={() => history.replace(`${url}/hodimlar-bo'limi-id/${id}`)}>Product a</th>
                        <th className="cash-icon"><img src={cashIcon} alt=""/>MX 1035</th>
                        <th>50 dona</th>
                        <th>100 256 so`m</th>
                        <th className="control-directer-img">
                            <div><img src={trashIcon} alt=""/></div>
                            <div><EditIcon/></div>
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}