import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@mui/material";

export default function UserList() {
  const [data, setData] = useState([]);
  const API_URL = "http://localhost:3001/api/v1/superadmin/users/getAllUsers";

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Role: "SUPERADMIN",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((resData) => {
        const formattedData = resData.data.map((user, index) => ({
          id: user.userId || index, // Use userId for the unique identifier
          username: user.name, // Name is being used as username
          email: user.email,
          phone: user.phoneNumber || "N/A", // Phone is phoneNumber in the response
          avatar: user.profileImage || "https://via.placeholder.com/40", // Optional, not used now
          status: user.status || "active",
          transaction: "$120.00", // Dummy data for now
        }));
        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    // Optional: Call delete API here
  };

  const columns = [
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div className="userListUser">
          {/* Displaying username */}
          {params.row.username}
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 180,
      renderCell: (params) => (
        <div className="userListPhone">
          {/* Displaying phone number */}
          {params.row.phone}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
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
        // <Badge
        //   color={params.row.status === "active" ? "success" : "error"}
        //   badgeContent={params.row.status === "active" ? "Active" : "Inactive"}
        //   sx={{
        //     fontSize: "14px",
        //     height: "20px",
        //     width: "80px",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // />
      ),
    },
    { field: "transaction", headerName: "Transaction Volume", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="userListDelete"
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
      <Link to="/newUser">
        <button className="userAddButton">Create</button>
      </Link>
    </div>
  );
}
