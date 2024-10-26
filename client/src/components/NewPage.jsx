import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Circle } from "rc-progress";
import IndexDisplay from "./IndexDisplay";
import DivideController from "./DivideController";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import { LineChart } from "@mui/x-charts/LineChart";
// import { memo } from "react";
import AirIcon from "@mui/icons-material/Air";

const NewPage = () => {
  const [data, setData] = useState([]);
  const [light, setLight] = useState();
  //   const [fan, setFan] = useState();
  //   const [refri, setRefri] = useState();

  // Using useCallback to memoize handlers
  const handleSetLight = useCallback(() => setLight((prev) => !prev), []);
  //   const handleSetFan = useCallback(() => setFan((prev) => !prev), []);
  //   const handleSetRefri = useCallback(() => setRefri((prev) => !prev), []);

  useEffect(() => {
    fetch("http://localhost:8080/api/control/now")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((device) => {
          switch (device.device) {
            // case "Fan":
            //   if (device.action === "On") {
            //     setFan(true);
            //   } else {
            //     setFan(false);
            //   }
            //   break;
            // case "Refrigerator":
            //   if (device.action === "On") {
            //     setRefri(true);
            //   } else {
            //     setRefri(false);
            //   }
            //   break;
            // case "Air Conditioner":
            //   if (device.action === "On") {
            //     setAir(true);
            //   } else {
            //     setAir(false);
            //   }
            //   break;
            case "Light":
              if (device.action === "On") {
                setLight(true);
              } else {
                setLight(false);
              }
              break;
            default:
              break;
          }
        });
      });
    const fetchData = () => {
      fetch("http://localhost:8080/api/data-sensor")
        .then((res) => res.json())
        .then((data) => {
          setData(data);

          if (data[0].dust > 80) {
            toast.error("Dust level is too high!", {
              className: "fixed top-[-120px] right-0",
              position: "top-right",
              autoClose: 1000,
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
    }, 1000);
    return () => clearInterval(intervalData);
  }, []);

  return data && data.length > 0 ? (
    <div className="col-span-6 row-span-6 rounded-lg drop-shadow-xl shadow-xl flex justify-center items-center">
      <ToastContainer />
      {data && data.length > 0 ? (
        <div className="w-[95%] h-[95%] grid grid-cols-12 grid-rows-8 gap-4">
          <IndexDisplay
            className="col-span-12"
            icon={AirIcon}
            circle={Circle}
            index={data[0].dust}
            title="Dust"
            color="#666666"
            unit="µg/m³"
          />
          <div className="col-span-10 row-span-7 bg-white bg-opacity-50 rounded-lg flex justify-center items-center">
            <LineChart
              className="shadow-full rounded-lg"
              xAxis={[
                { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
              ]}
              series={[
                {
                  data: data.map((record) => record.dust).reverse(),
                  label: "Dust",
                  color: "#b91c1c",
                },
              ]}
            />
          </div>
          <div className="col-span-2 row-span-7 grid grid-rows-3 gap-4">
            <DivideController
              index={light}
              set={handleSetLight}
              on="light-on.png"
              off="light-off.png"
              title="Light"
            />
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  ) : (
    <></>
  );
};

export default NewPage;
