import "./deviceList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DeviceList() {
  const [data, setData] = useState([]);
  const API_URL = "http://localhost:3000/api/v1/device/allDevices"; // New API URL for devices

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Role: "SUPERADMIN",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch devices");
        return res.json();
      })
      .then((resData) => {
        const formattedData = resData.data.map((device, index) => ({
          id: device.deviceId || index, // Assuming 'deviceId' is the unique identifier
          deviceName: device.name,
          deviceType: device.type, // Adjust as per the actual response
          ipAddress: device.ipAddress || "N/A", // Example of a device property
          status: device.status || "active",
          lastChecked: device.lastChecked || "N/A", // Example of last checked time or status
        }));
        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching devices:", err));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    // Optional: Call delete API here
  };

  const columns = [
    {
      field: "deviceName",
      headerName: "Device Name",
      width: 200,
      renderCell: (params) => (
        <div className="deviceListDevice">
          {/* Displaying device name */}
          {params.row.deviceName}
        </div>
      ),
    },
    {
      field: "deviceType",
      headerName: "Device Type",
      width: 180,
      renderCell: (params) => (
        <div className="deviceListType">
          {/* Displaying device type */}
          {params.row.deviceType}
        </div>
      ),
    },
    {
      field: "ipAddress",
      headerName: "IP Address",
      width: 180,
      renderCell: (params) => (
        <div className="deviceListIp">
          {/* Displaying IP address */}
          {params.row.ipAddress}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div
          className={`badge ${
            params.row.status === "active" ? "active" : "inactive"
          }`}
        >
          {params.row.status === "active" ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      field: "lastChecked",
      headerName: "Last Checked",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={"/device/" + params.row.id}>
            <button className="deviceListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="deviceListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    // <div className="deviceList">
    //   <DataGrid
    //     rows={data}
    //     columns={columns}
    //     pageSize={10}
    //     checkboxSelection
    //     disableSelectionOnClick
    //     getRowId={(row) => row.id}
    //   />
    //   <Link to="/newDevice">
    //     <button className="deviceAddButton">Add Device</button>
    //   </Link>
    // </div>
    <div className="deviceList">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
      <div className="addDeviceContainer">
        <Link to="/newDevice">
          <button className="deviceAddButton">Add Device</button>
        </Link>
      </div>
    </div>
  );
}
