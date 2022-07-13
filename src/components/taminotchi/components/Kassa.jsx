import React, { useState } from "react";
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

export default function Kassa() {
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  return (
    <>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                <p> № </p>
              </th>
              <th>
                <p>Buyurtma raqami</p>
              </th>
              <th>
                <p>Berilgan summa</p>
              </th>
              <th>
                <p>Qoldiq summa</p>
              </th>
              <th>
                <p>Sana</p>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
}
