import React, { useEffect, useState, useCallback } from "react";
import { Circle } from "rc-progress";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LightModeIcon from "@mui/icons-material/LightMode";
import { LineChart } from "@mui/x-charts/LineChart";
import { memo } from "react";
import IndexDisplay from "./IndexDisplay";
import DivideController from "./DivideController";

const Main = () => {
  const [data, setData] = useState({
    humidity: [69, 42, 69, 53, 44],
    temperature: [29, 33, 31, 24, 27],
    light: [52, 42, 71, 93, 35],
  });
  const [air, setAir] = useState(false);
  const [fan, setFan] = useState(false);
  const [refri, setRefri] = useState(false);
  const [lig, setLig] = useState(false);

  // Using useCallback to memoize handlers
  const handleSetAir = useCallback(() => setAir((prev) => !prev), []);
  const handleSetFan = useCallback(() => setFan((prev) => !prev), []);
  const handleSetRefri = useCallback(() => setRefri((prev) => !prev), []);
  const handleSetLig = useCallback(() => setLig((prev) => !prev), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setData((prevData) => {
        const newData = {
          humidity: [
            ...prevData.humidity.slice(1),
            Math.floor(Math.random() * 100) + 1,
          ],
          temperature: [
            ...prevData.temperature.slice(1),
            Math.floor(Math.random() * 100) + 1,
          ],
          light: [
            ...prevData.light.slice(1),
            Math.floor(Math.random() * 100) + 1,
          ],
        };
        return newData;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="col-span-6 row-span-6 rounded-lg drop-shadow-xl shadow-xl flex justify-center items-center">
      <div className="w-[95%] h-[95%] grid grid-cols-9 grid-rows-9 gap-4">
        <IndexDisplay
          icon={DeviceThermostatIcon}
          circle={Circle}
          index={data.temperature}
          title="Temperature"
          color="#b91c1c"
        />
        <IndexDisplay
          icon={WaterDropIcon}
          circle={Circle}
          index={data.humidity}
          title="Humidity"
          color="#1d4ed8"
        />
        <IndexDisplay
          icon={LightModeIcon}
          circle={Circle}
          index={data.light}
          title="Light"
          color="#facc15"
        />
        <div className="col-span-3 row-span-9 grid grid-rows-4 gap-4">
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
          <DivideController
            index={lig}
            set={handleSetLig}
            on="light-on.png"
            off="light-off.png"
            title="Light"
            onClick={() =>
              fetch("http://localhost:8080/api/control", {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                  device: "Fan",
                  action: fan,
                }),
              })
            }
          />
        </div>
        <div className="col-span-6 row-span-7 bg-white bg-opacity-50 rounded-lg flex justify-center items-center">
          <LineChart
            className="shadow-full rounded-lg"
            xAxis={[{ data: [1, 2, 3, 4, 5] }]}
            series={[
              {
                data: data.temperature,
                label: "Temperature",
                color: "#b91c1c",
              },
              {
                data: data.humidity,
                label: "Humidity",
                color: "#1d4ed8",
              },
              {
                data: data.light,
                label: "Light",
                color: "#facc15",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Main);
