// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Box,
//   Chip,
// } from "@mui/material";
// import "./user.css"; // Import the CSS file

// const SingleUser = () => {
//   const { id } = useParams(); // this is the userId from route
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/v1/superadmin/users/getAllUsers",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Role: "SUPERADMIN",
//             },
//           }
//         );

//         const allUsers = res.data?.data;
//         const selectedUser = allUsers.find((u) => u.userId === id);

//         if (selectedUser) {
//           setUser(selectedUser);
//         } else {
//           setError("User not found");
//         }
//       } catch (err) {
//         setError("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [id]);

//   if (loading) {
//     return (
//       <Box className="loading-spinner">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box className="loading-spinner">
//         <Typography className="error-message">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box display="flex" justifyContent="center" mt={5}>
//       <Card className="card">
//         <CardContent>
//           <Typography className="card-title">{user.name}</Typography>
//           <Typography className="card-text">
//             <strong>Email:</strong> {user.email}
//           </Typography>
//           <Typography className="card-text">
//             <strong>Phone:</strong> {user.phoneNumber}
//           </Typography>
//           <Typography className="card-text">
//             <strong>Referral Code:</strong> {user.referralCode}
//           </Typography>
//           <Typography className="card-text">
//             <strong>Created At:</strong>{" "}
//             {new Date(user.createdAt).toLocaleString()}
//           </Typography>
//           <Box mt={2}>
//             <Chip
//               label={user.status === "active" ? "Active" : "Inactive"}
//               color={user.status === "active" ? "success" : "error"}
//               variant="filled"
//               className="card-chip"
//             />
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default SingleUser;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import "./user.css"; // Import the CSS file

const SingleUser = () => {
  const { id } = useParams(); // this is the userId from route
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/v1/superadmin/users/getAllUsers",
          {
            headers: {
              "Content-Type": "application/json",
              Role: "SUPERADMIN",
            },
          }
        );

        const allUsers = res.data?.data;
        const selectedUser = allUsers.find((u) => u.userId === id);

        if (selectedUser) {
          setUser(selectedUser);
          setEditableUser({ ...selectedUser }); // Initialize editable state
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/v1/superadmin/users/updateUser/${id}`,
        editableUser,
        {
          headers: {
            "Content-Type": "application/json",
            Role: "SUPERADMIN",
          },
        }
      );
      if (res.status === 200) {
        setUser(editableUser); // Update the displayed user data after saving
        setError(""); // Clear any previous error message
      }
    } catch (err) {
      setError("Failed to save user data");
    }
  };

  if (loading) {
    return (
      <Box className="loading-spinner">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="loading-spinner">
        <Typography className="error-message">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card className="card">
        <CardContent>
          <Typography className="card-title">Edit {user.name}</Typography>

          <TextField
            label="Name"
            name="name"
            value={editableUser.name || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editableUser.email || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Phone"
            name="phoneNumber"
            value={editableUser.phoneNumber || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Referral Code"
            name="referralCode"
            value={editableUser.referralCode || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Typography className="card-text">
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </Typography>
          <Box mt={2}>
            <Chip
              label={user.status === "active" ? "Active" : "Inactive"}
              color={user.status === "active" ? "success" : "error"}
              variant="filled"
              className="card-chip"
            />
          </Box>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleUser;
