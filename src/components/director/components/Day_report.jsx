import React, { useEffect, useState } from "react";
import { api } from "../../../api/api";
import NumberFormat from "react-number-format";
const Day_report = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);
  const [data11, setData11] = useState([]);
  const [data12, setData12] = useState([]);
  const [data13, setData13] = useState([]);
  const [data14, setData14] = useState([]);
  const [data15, setData15] = useState([]);
  const [data16, setData16] = useState([]);
  const [data17, setData17] = useState([]);
  const [data18, setData18] = useState([]);
  useEffect(() => {
    let mounted = true;
    api.get("finance/income/report/?so'm=True").then((res) => {
      if (mounted) {
        setData1(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/income/report/?dollar=True").then((res) => {
      if (mounted) {
        setData2(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/income/report/?dollar=True").then((res) => {
      if (mounted) {
        setData3(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/income/report/?plastik=True").then((res) => {
      if (mounted) {
        setData4(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/payment/report/?so'm=True").then((res) => {
      if (mounted) {
        setData5(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/payment/report/?dollar=True").then((res) => {
      if (mounted) {
        setData6(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/payment/report/?bank=True").then((res) => {
      if (mounted) {
        setData7(res);
        console.log(res, "resultss");
      }
    });
    api.get("finance/payment/report/?plastik=True").then((res) => {
      if (mounted) {
        setData8(res);
        console.log(res, "resultss");
      }
    });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Homashyo&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=so'm"
      )
      .then((res) => {
        if (mounted) {
          setData9(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Homashyo&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=dollar"
      )
      .then((res) => {
        if (mounted) {
          setData10(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?output-saved=True&invoice-from=2022-01-01&invoice-to=2022-02-09&currency=dollar"
      )
      .then((res) => {
        if (mounted) {
          setData11(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?output-saved=True&invoice-from=2022-01-01&invoice-to=2022-02-09&currency=so'm"
      )
      .then((res) => {
        if (mounted) {
          setData12(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Yarim tayyor&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=so'm"
      )
      .then((res) => {
        if (mounted) {
          setData13(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Yarim tayyor&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=dollar"
      )
      .then((res) => {
        if (mounted) {
          setData14(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Inventar&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=so'm"
      )
      .then((res) => {
        if (mounted) {
          setData15(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Inventar&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=dollar"
      )
      .then((res) => {
        if (mounted) {
          setData16(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Tayyor&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=so'm"
      )
      .then((res) => {
        if (mounted) {
          setData17(res);
          console.log(res, "resultss");
        }
      });
    api
      .get(
        "storage/product-orders/report/?receive-saved=True&product-type=Tayyor&invoice-from=2022-01-01&invoice-to=2022-02-04&currency=dollar"
      )
      .then((res) => {
        if (mounted) {
          setData18(res);
          console.log(res, "resultss");
        }
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className="day_report">
      <div className="day_report1">
        <div className="day_report_2">
          <p className="day_report_kassa">Kassa</p>
          <p className="day_report_currency">So'm</p>
          <p className="day_report_currency">Dollar</p>
          <p className="day_report_currency">Bank</p>
          <p className="day_report_currency">Click</p>
        </div>
        <div className="day_report_2">
          <p className="day_report_currency">Kirim</p>
          <p className="day_report_currency">
            <NumberFormat
              value={data1.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            <NumberFormat
              value={data2.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            <NumberFormat
              value={data3.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            <NumberFormat
              value={data4.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
        </div>
        <div className="day_report_2">
          <p className="day_report_currency">Chiqim</p>
          <p className="day_report_currency">
            <NumberFormat
              value={data5.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            <NumberFormat
              value={data6.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            <NumberFormat
              value={data7.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            <NumberFormat
              value={data8.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
        </div>
      </div>
      <div className="day_report1">
        <div className="day_report_2">
          <p className="day_report_currency">Homashyo</p>
          <p className="day_report_currency">Yarim tayyor</p>
          <p className="day_report_currency">Inventor</p>
          <p className="day_report_currency">Tayyor</p>
          <p className="day_report_currency">Brak</p>
          <p className="day_report_currency">Qaytgan</p>
          <p className="day_report_currency">Sotuv</p>
        </div>
        <div className="day_report_2">
          <p className="day_report_currency">
            <NumberFormat
              value={data9.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"so'm"}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
          <p className="day_report_currency">
            {data13.total === null ? (
              0
            ) : (
              <NumberFormat
                value={data13.total}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"so'm"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            )}{" "}
          </p>
          <p className="day_report_currency">
            {data15.total === null ? (
              0
            ) : (
              <NumberFormat
                value={data15.total}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"so'm"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            )}
          </p>
          <p className="day_report_currency">
            {data17.total === null ? 0 :
              <NumberFormat
              value={data17.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"so'm"}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
             }
          </p>
          <p className="day_report_currency">0 so'm</p>
          <p className="day_report_currency">0 so'm</p>
          <p className="day_report_currency">
            <NumberFormat
              value={data12.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"so'm"}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
        </div>
        <div className="day_report_2">
          <p className="day_report_currency">
            {data10.total === null ? (
              0
            ) : (
              <NumberFormat
                value={data10.total}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            )}
          </p>
          <p className="day_report_currency">
            {data14.total === null ? (
              0
            ) : (
              <NumberFormat
                value={data14.total}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            )}
          </p>
          <p className="day_report_currency">
            {data16.total === null ? (
              0
            ) : (
              <NumberFormat
                value={data16.total}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            )}
          </p>
          <p className="day_report_currency">
            {data18.total === null ? (
              0
            ) : (
              <NumberFormat
                value={data18.total}
                className="foo"
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            )}
          </p>
          <p className="day_report_currency">0 $</p>
          <p className="day_report_currency">0 $</p>
          <p className="day_report_currency">
            <NumberFormat
              value={data11.total}
              className="foo"
              displayType={"text"}
              thousandSeparator={true}
              suffix={"$"}
              renderText={(value, props) => <div {...props}>{value}</div>}
            />
          </p>
        </div>
      </div>
      {/* <div className="day_check">
                           <input type="checkbox" />
                           <p>Maxsulotlar bilan kurinsin ( <span>Barcha malumotlarni yuklash uchun biroz vaqt ketadi</span> )</p>
                    </div> */}
    </div>
  );
};

export default Day_report;
