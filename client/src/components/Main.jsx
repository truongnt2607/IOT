import React, { useEffect, useState, useCallback } from "react";
import { Circle } from "rc-progress";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LightModeIcon from "@mui/icons-material/LightMode";
import AirIcon from "@mui/icons-material/Air";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { memo } from "react";
import IndexDisplay from "./IndexDisplay";
import DivideController from "./DivideController";

const Main = () => {
  const [data, setData] = useState([]);
  const [air, setAir] = useState(false);
  const [fan, setFan] = useState(false);
  const [refri, setRefri] = useState(false);

  // Using useCallback to memoize handlers
  const handleSetAir = useCallback(() => setAir((prev) => !prev), []);
  const handleSetFan = useCallback(() => setFan((prev) => !prev), []);
  const handleSetRefri = useCallback(() => setRefri((prev) => !prev), []);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8080/api/data-sensor")
        .then((res) => res.json())
        .then((data) => {
          setData(data);

          if (data[0].dust > 800) {
            toast.error("Dust level is too high!", {
              className: "fixed top-[-120px] right-0",
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    };
    fetchData();
    const intervalData = setInterval(() => {
      fetchData();
    }, 8000);
    return () => clearInterval(intervalData);
  }, []);

  return data && data.length > 0 ? (
    <div className="col-span-6 row-span-6 rounded-lg drop-shadow-xl shadow-xl flex justify-center items-center">
      <ToastContainer />

      <div className="w-[95%] h-[95%] grid grid-cols-12 grid-rows-8 gap-4">
        <IndexDisplay
          icon={DeviceThermostatIcon}
          circle={Circle}
          index={data[0].temperature}
          title="Temperature"
          color="#b91c1c"
          unit="°C"
        />
        <IndexDisplay
          icon={WaterDropIcon}
          circle={Circle}
          index={data[0].humidity}
          title="Humidity"
          color="#1d4ed8"
          unit="%"
        />
        <IndexDisplay
          icon={LightModeIcon}
          // circle={Circle}
          index={data[0].light}
          title="Light"
          color="#facc15"
          unit="Lx"
        />
        <IndexDisplay
          icon={AirIcon}
          // circle={Circle}
          index={data[0].dust}
          title="Dust"
          color="#666666"
          unit="µg/m³"
        />
        <div className="col-span-5 row-span-7 bg-white bg-opacity-50 rounded-lg flex justify-center items-center">
          <LineChart
            className="shadow-full rounded-lg"
            xAxis={[
              { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
            ]}
            series={[
              {
                data: data.map((record) => record.temperature).reverse(),
                label: "Temperature",
                color: "#b91c1c",
              },
              {
                data: data.map((record) => record.humidity).reverse(),
                label: "Humidity",
                color: "#1d4ed8",
              },
              {
                data: data.map((record) => record.light).reverse(),
                label: "Light",
                color: "#facc15",
              },
            ]}
          />
        </div>
        <div className="col-span-5 row-span-7 bg-white bg-opacity-50 rounded-lg flex justify-center items-center">
          <LineChart
            className="shadow-full rounded-lg"
            xAxis={[
              { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
            ]}
            series={[
              {
                data: data.map((record) => record.dust).reverse(),
                label: "Dust",
                color: "#666666",
              },
            ]}
          />
        </div>
        <div className="col-span-2 row-span-7 grid grid-rows-3 gap-4">
          <DivideController
            index={air}
            set={handleSetAir}
            on="air-conditioner-on.png"
            off="air-conditioner-off.png"
            title="Air Conditioner"
          />
          <DivideController
            index={fan}
            set={handleSetFan}
            on="fan.png"
            title="Fan"
          />
          <DivideController
            index={refri}
            set={handleSetRefri}
            on="refrigerator-on.png"
            off="refrigerator-off.png"
            title="Refrigerator"
          />
          {/* <DivideController
            index={lig}
            set={handleSetLig}
            on="light-on.png"
            off="light-off.png"
            title="Light"
          /> */}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default memo(Main);
