import Account from "./components/Account";
import Menu from "./components/Menu";
import Main from "./components/Main";
import DataSensor from "./components/DataSensor";
import Devices from "./components/Devices";
import Profile from "./components/Profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen relative font-be font-bold overflow-hidden">
      <div className="w-full h-full grid grid-cols-7 grid-rows-7">
        <Menu />
        <Account />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/datasensor" element={<DataSensor />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
