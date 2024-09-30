import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useLocation } from "react-router-dom";

const Account = () => {
  const [tab, setTab] = useState("");
  const tmp = useLocation().pathname.slice(1);
  const str = tmp.charAt(0).toUpperCase() + tmp.slice(1);
  useEffect(() => {
    if (str === "") {
      setTab("Home");
    } else if (str === "Datasensor") {
      setTab("Data Sensor");
    } else {
      setTab(str);
    }
  }, [str]);
  return (
    <div className="col-span-6  flex justify-between items-center gap-5">
      <div className="ml-10">
        <div className="text-[42px] text-040404">IoT Dashboar</div>
        <div className="font-light text-AEAEAE">
          Get summary of your weekly online transactions here.
        </div>
        <div className="mt-3">Dashboard/ {tab}</div>
      </div>
      <div className="flex items-center mr-11">
        <NotificationsIcon className="mr-6 text-AEAEAE" />
        <Link to="/profile">
          <img
            alt="avt"
            src="anh.jpg"
            className="w-10 h-10 rounded-full opacity-100 z-30 mr-3"
          ></img>
        </Link>
        <div>
          <div className="font-semibold text-040404 text-[14px]">Trường</div>
          <div className="font-regular text-AEAEAE text-[14px]">Admin</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
