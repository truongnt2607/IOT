import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HistoryIcon from "@mui/icons-material/History";
import DevicesIcon from "@mui/icons-material/Devices";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="col-span-1 row-span-9 border-r-2 flex flex-col gap-[30px] ml-11">
      <img src="logo.png" alt="" className="w-[150px]" />
      <Link
        to="/"
        className={`text-center ${
          isActive("/") ? "bg-F0F7FF text-xanh" : "text-C7C7C7"
        } ease-in-out hover:text-xanh hover:bg-F0F7FF flex flex-row gap-4 cursor-pointer items-center p-2 rounded-lg w-[180px] pl-4`}
      >
        <HomeRoundedIcon sx={{ fontSize: 30 }} className="" />
        <div>Home</div>
      </Link>
      <Link
        to="/datasensor"
        className={`text-center ${
          isActive("/datasensor") ? "bg-F0F7FF text-xanh" : "text-C7C7C7"
        } ease-in-out hover:text-xanh hover:bg-F0F7FF flex flex-row gap-4 cursor-pointer items-center p-2 rounded-lg w-[180px] pl-4`}
      >
        <HistoryIcon sx={{ fontSize: 30 }} className="" />
        <div>Data Sensor</div>
      </Link>
      <Link
        to="/devices"
        className={`text-center ${
          isActive("/devices") ? "bg-F0F7FF text-xanh" : "text-C7C7C7"
        } ease-in-out hover:text-xanh hover:bg-F0F7FF flex flex-row gap-4 cursor-pointer items-center p-2 rounded-lg w-[180px] pl-4`}
      >
        <DevicesIcon sx={{ fontSize: 30 }} className="" />
        <div>Devices</div>
      </Link>
      <Link
        to="/profile"
        className={`text-center ${
          isActive("/profile") ? "bg-F0F7FF text-xanh" : "text-C7C7C7"
        } ease-in-out hover:text-xanh hover:bg-F0F7FF flex flex-row gap-4 cursor-pointer items-center p-2 rounded-lg w-[180px] pl-4`}
      >
        <PermIdentityIcon sx={{ fontSize: 30 }} className="" />
        <div>Profile</div>
      </Link>
    </div>
  );
};

export default Menu;
