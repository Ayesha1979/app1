import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from './pages/home/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import SingleUser from "./pages/user/User";
import AddUser from "./pages/newUser/AddUser";
import DeviceList from "./pages/deviceList/DeviceList";
import AddDevice from "./pages/registerDevice/RegisterDevice";
import PermissionsPage from "./pages/permissionsPage/PermissionsPage";


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:id" element={<SingleUser />} />
          <Route path="/newUser" element={<AddUser />} />
          <Route path="/devices" element={<DeviceList />} /> 
          <Route path="/newDevice" element={<AddDevice />} /> 
          <Route path="/permissions" element={<PermissionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
