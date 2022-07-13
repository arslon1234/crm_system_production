import React from "react";
import "./assets/select.css"

export default function SelectField() {
    return (
        <div className="select-field">
            <select name="select" id="select" placeholder="12j3u1ytf3yi1fvk">
                <option value=""></option>
                <option value="">Test</option>
                <option value="">Test</option>
                <option value="">Test</option>
                <option value="">Test</option>
            </select>
            <label htmlFor="select">ombor</label>
        </div>
    )
}