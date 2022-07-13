import React, { Component } from 'react';
import axios from "axios";
import dateFormat from "dateformat";
import DataPick from './data_pick';

class Takliflar extends Component {
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
                <div className="data_div">
                    <DataPick/>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <p> # </p>
                                </th>
                                <th>
                                    <p> Taklif beruvchi </p>
                                </th>
                                <th>
                                    <p> Taklif </p>
                                </th>
                                <th>
                                    <p> Sana </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dat, id) => {
                                if (this.props.search === false) {
                                    return (
                                        <tr>
                                            <th>{id + 1}</th>
                                            <th>{dat.name}</th>
                                            <th>{dat.comment}</th>
                                            <th>{dateFormat(dat.end_date, "dd/mm/yyyy")}</th>
                                        </tr>
                                    );
                                } else {
                                    if (dat.biscuit.name.toUpperCase().includes(this.props.keyword.toUpperCase())) {
                                        return (
                                            <tr>
                                                <th>{id + 1}</th>
                                                <th>{dat.name}</th>
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
 
export default Takliflar;