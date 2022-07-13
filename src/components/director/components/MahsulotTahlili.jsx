import React, { useCallback, useEffect, useState, useRef } from "react";
import receiveIcon from "../../Icons/Receive.svg";
import rejectIcon from "../../Icons/Reject.svg";
import redIcon from "../../Icons/RedIcon.svg";
import greenIcon from "../../Icons/GreenIcon.svg";
import DataPick from "./data_pick";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Fade from "@material-ui/core/Fade/Fade";
import InputField from "../../inputs/InputField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField/TextField";
import WarningModal from "../../modal/WarningModal";
import DeleteModal from "../../modal/DeleteModal";
import "react-confirm-alert/src/react-confirm-alert.css";
import { api } from "../../../api/api";
import TabSwitcher from "../../warehouseMan/components/TabSwitcher";
const Tabs = {
  TAYYOR: "Tayyor",
  YARIMTAYYOR: "Yarim tayyor",
  HOMASHYO: "Homashyo",
  BRAK: "BRAK",
};
export default function MahsulotlarTahlili({ keyword }) {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState(Tabs.Tayyor);
  const timer = useRef(null);
  const TAB_LIST = [
    { label: "TAYYOR", name: Tabs.TAYYOR, id: 1 },
    { label: "YARIMTAYYOR", name: Tabs.YARIMTAYYOR, id: 2 },
    { label: "HOMASHYO", name: Tabs.HOMASHYO, id: 3 },
    { label: "BRAK", name: Tabs.BRAK, id: 4 },
  ];
  useEffect(() => {
    let mounted = true;
    api.get("storage/invoices/?type=Kirish&group=Order", {}).then((res) => {
      if (mounted) {
        setData(res);
        console.log(res.results, "history");
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    if (keyword.length > 0) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        api
          .get("storage/invoices/?type=Kirish&group=Order", {
            params: {
              search: keyword.length > 0 ? keyword : "",
            },
          })
          .then((res) => {
            if (mounted) {
              setData(res);
            }
          });
      }, 500);
      return () => {
        clearTimeout(timer.current);
      };
    } else if (keyword.length < 1) {
      api.get("storage/invoices/?type=Kirish&group=Order").then((res) => {
        if (mounted) {
          setData(res);
        }
      });
    }
    return () => {
      clearTimeout();
      mounted = false;
    };
  }, [keyword]);
  const filterByDateCLick = useCallback(() => {
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
            type: "Kirish",
            group: "Order",
            from: `${yearStart}-${monthStart}-${dayStart}`,
            to: `${yearEnd}-${monthEnd}-${dayEnd}`,
          },
        })
        .then((res) => setData(res));
    }
  }, [startDate, endDate]);
  return (
    <>
      <DataPick
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        filterByDateClick={filterByDateCLick}
      />
      <TabSwitcher
        onChangeTab={setActiveTab}
        activeTab={activeTab}
        tabList={TAB_LIST}
      />
      <div className="table">
        <div className="select-header2">
          <select name="" id="">
            <option hidden disabled selected>
              Mahsulot guruhi
            </option>
            <option value="">option1</option>
            <option value="">option1</option>
            <option value="">option1</option>
          </select>
          <select name="" id="">
            <option value="barchasi">ABC daromad tahlili</option>
            <option value="ozqolgan">A</option>
            <option value="ozqolgan">B</option>
            <option value="ozqolgan">C</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Nomi</p>
              </th>
              <th>
                <p>Real qoldiq</p>
              </th>
              <th>
                <p>Sotilgan(miqdori)</p>
              </th>
              <th>
                <p>Sotilgan (so'mda)</p>
              </th>
              <th>
                <p>Sotilgan ($)</p>
              </th>
              <th>
                <p>Daromad($)</p>
              </th>
              <th>
                <p>Daromad ulushi (%)</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mijoz1</td>
              <td>150666so'm</td>
              <td>15034 dollar</td>
              <td>23000 so'm</td>
              <td>95222 dollar</td>
              <td>5600 $</td>
              <td>55%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
