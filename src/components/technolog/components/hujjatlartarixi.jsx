import React, { Component } from 'react';
import axios from "axios";
import dateFormat from "dateformat";
import DataPick from './data_pick';

class HujjatlarTarixi extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
         }
    }
    componentDidMount() {
        axios.get("")
    }
    render() { 
        return ( 
            <React.Fragment>
                <DataPick/>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <p> # </p>
                                </th>
                                <th>
                                    <p> Nomi</p>
                                </th>
                                <th>
                                    <p> Miqdori</p>
                                </th>
                                <th>
                                    <p> O`lchov birligi </p>
                                </th>
                                <th>
                                    <p> Status </p>
                                </th>
                                <th>
                                    <p> Izoh </p>
                                </th>
                                <th>
                                    <p> Tugatilgan sana </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dat, id) => {
                                if (this.props.search === false) {
                                    return (
                                        <tr>
                                            <th>{id + 1}</th>
                                            <th>{dat.biscuit.name}</th>
                                            <th>{dat.quantity.split(".")[0]}{" "}</th>
                                            <th>{dat.biscuit.unit_of_measurement}</th>
                                            <th>
                                                {dat.status === "Tasdiqlangan" ? "Tasdiqlangan" : null}
                                                {dat.status === "Bekor qilingan" ? "Bekor qilingan" : null}
                                                {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
                                            </th>
                                            <th>{dat.comment}</th>
                                            <th>{dateFormat(dat.end_date, "dd/mm/yyyy")}</th>
                                        </tr>
                                    );
                                } else {
                                    if (dat.biscuit.name.toUpperCase().includes(this.props.keyword.toUpperCase())) {
                                        return (
                                            <tr>
                                                <th>{id + 1}</th>
                                                <th>{dat.biscuit.name}</th>
                                                <th>{dat.quantity.split(".")[0]}{" "}</th>
                                                <th>{dat.biscuit.unit_of_measurement}</th>
                                                <th>
                                                    {dat.status === "Tasdiqlangan" ? "Tasdiqlangan" : null}
                                                    {dat.status === "Bekor qilingan" ? "Bekor qilingan" : null}
                                                    {dat.status === "Kutilmoqda" ? "Kutilmoqda" : null}
                                                </th>
                                                <th>{dat.comment}</th>
                                                <th>{dateFormat(dat.end_date, "dd/mm/yyyy")}</th>
                                            </tr>
                                        );
                                    }
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
         );
    }
}
 
export default HujjatlarTarixi;