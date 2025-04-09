// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaPen } from "react-icons/fa"; // Import the pencil icon

// const PermissionsPage = () => {
//   const [permissions, setPermissions] = useState([]);
//   const [newPermission, setNewPermission] = useState({
//     permissionName: "",
//     description: "",
//   });
//   const [updatePermission, setUpdatePermission] = useState({
//     id: "",
//     permissionName: "",
//     description: "",
//   });
//   const [showModal, setShowModal] = useState(false); // To control modal visibility
//   const [mode, setMode] = useState(""); // "add" or "update" mode for modal

//   const fetchPermissions = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:3001/api/v1/superadmin/permission"
//       );
//       setPermissions(res.data.data);
//     } catch (err) {
//       console.error("Error fetching permissions:", err);
//     }
//   };

//   const handleAddPermission = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:3001/api/v1/superadmin/permission",
//         newPermission
//       );
//       setNewPermission({ permissionName: "", description: "" });
//       setShowModal(false);
//       fetchPermissions();
//     } catch (err) {
//       console.error("Error adding permission:", err);
//     }
//   };

//   const handleUpdatePermission = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:3001/api/v1/superadmin/permission/${updatePermission.id}`,
//         {
//           permissionName: updatePermission.permissionName,
//           description: updatePermission.description,
//         }
//       );
//       setUpdatePermission({ id: "", permissionName: "", description: "" });
//       setShowModal(false);
//       fetchPermissions();
//     } catch (err) {
//       console.error("Error updating permission:", err);
//     }
//   };

//   const openAddPermissionModal = () => {
//     setMode("add");
//     setNewPermission({ permissionName: "", description: "" });
//     setShowModal(true);
//   };

//   const openUpdatePermissionModal = (permissionId) => {
//     setMode("update");
//     const permission = permissions.find(
//       (perm) => perm.permissionId === permissionId
//     );
//     if (permission) {
//       setUpdatePermission({
//         id: permission.permissionId,
//         permissionName: permission.permissionName,
//         description: permission.description,
//       });
//       setShowModal(true);
//     }
//   };

//   useEffect(() => {
//     fetchPermissions();
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh", // Ensures it takes up the full height of the viewport
//         background: "#f4f4f4", // Optional background color for the entire screen
//         padding: "1rem", // Add some padding to ensure no content sticks to edges
//         boxSizing: "border-box", // Ensures padding is included in the element's total width and height
//         width: "100%", // Full width of the screen
//         overflowX: "hidden", // Prevent horizontal scrolling
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "1000px", // Maximum width of content (adjust as needed)
//           backgroundColor: "#fff", // White background for the content container
//           padding: "2rem",
//           borderRadius: "8px", // Rounded corners for a cleaner look
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Optional box shadow for aesthetic appeal
//           margin: "0 auto", // Center the content container
//         }}
//       >
//         <h2
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "bold",
//             marginBottom: "1rem",
//             textAlign: "center",
//           }}
//         >
//           Permissions
//         </h2>

//         {/* Add Permission Button */}
//         <button
//           onClick={openAddPermissionModal}
//           style={{
//             marginBottom: "2rem",
//             padding: "0.5rem 1rem",
//             background: "#4f46e5",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             display: "block",
//             marginLeft: "auto",
//             marginRight: "auto",
//           }}
//         >
//           <span style={{ marginRight: "0.5rem" }}>+</span> Add Permission
//         </button>

//         {/* Permissions Table */}
//         <div>
//           <h3>All Permissions</h3>
//           {permissions.length > 0 ? (
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 marginTop: "1rem",
//                 tableLayout: "fixed", // Prevents the table from becoming too wide
//               }}
//             >
//               <thead>
//                 <tr>
//                   <th
//                     style={{
//                       padding: "0.5rem",
//                       borderBottom: "1px solid #ddd",
//                     }}
//                   >
//                     Permission Name
//                   </th>
//                   <th
//                     style={{
//                       padding: "0.5rem",
//                       borderBottom: "1px solid #ddd",
//                     }}
//                   >
//                     Description
//                   </th>
//                   <th
//                     style={{
//                       padding: "0.5rem",
//                       borderBottom: "1px solid #ddd",
//                     }}
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {permissions.map((perm) => (
//                   <tr key={perm.permissionId}>
//                     <td
//                       style={{
//                         padding: "0.5rem",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       {perm.permissionName}
//                     </td>
//                     <td
//                       style={{
//                         padding: "0.5rem",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       {perm.description}
//                     </td>
//                     <td
//                       style={{
//                         padding: "0.5rem",
//                         borderBottom: "1px solid #ddd",
//                       }}
//                     >
//                       <FaPen
//                         onClick={() =>
//                           openUpdatePermissionModal(perm.permissionId)
//                         }
//                         style={{
//                           cursor: "pointer",
//                           color: "#f59e0b",
//                           marginRight: "0.5rem",
//                         }}
//                       />
//                       <span>Edit</span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No permissions found.</p>
//           )}
//         </div>
//       </div>

//       {/* Modal for Add/Update Permission */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             right: "0",
//             bottom: "0",
//             background: "rgba(0, 0, 0, 0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "2rem",
//               borderRadius: "8px",
//               minWidth: "400px",
//               width: "90%", // Make modal responsive to screen size
//               maxWidth: "600px", // Limit the width of the modal
//             }}
//           >
//             <h3>
//               {mode === "update" ? "Update Permission" : "Add Permission"}
//             </h3>
//             <form
//               onSubmit={
//                 mode === "update" ? handleUpdatePermission : handleAddPermission
//               }
//             >
//               <input
//                 style={{
//                   width: "100%",
//                   padding: "0.5rem",
//                   marginBottom: "0.5rem",
//                 }}
//                 placeholder="Permission Name"
//                 value={
//                   mode === "update"
//                     ? updatePermission.permissionName
//                     : newPermission.permissionName
//                 }
//                 onChange={(e) =>
//                   mode === "update"
//                     ? setUpdatePermission({
//                         ...updatePermission,
//                         permissionName: e.target.value,
//                       })
//                     : setNewPermission({
//                         ...newPermission,
//                         permissionName: e.target.value,
//                       })
//                 }
//                 required
//               />
//               <textarea
//                 style={{
//                   width: "100%",
//                   padding: "0.5rem",
//                   marginBottom: "0.5rem",
//                 }}
//                 placeholder="Description"
//                 value={
//                   mode === "update"
//                     ? updatePermission.description
//                     : newPermission.description
//                 }
//                 onChange={(e) =>
//                   mode === "update"
//                     ? setUpdatePermission({
//                         ...updatePermission,
//                         description: e.target.value,
//                       })
//                     : setNewPermission({
//                         ...newPermission,
//                         description: e.target.value,
//                       })
//                 }
//                 required
//               />
//               <button
//                 type="submit"
//                 style={{
//                   padding: "0.5rem 1rem",
//                   background: "#4f46e5",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   marginTop: "1rem",
//                 }}
//               >
//                 {mode === "update" ? "Update Permission" : "Add Permission"}
//               </button>
//             </form>
//             <button
//               onClick={() => setShowModal(false)}
//               style={{
//                 padding: "0.5rem 1rem",
//                 background: "#f59e0b",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 marginTop: "1rem",
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PermissionsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaSearch } from "react-icons/fa"; // Import pencil and search icons

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState({
    permissionName: "",
    description: "",
  });
  const [updatePermission, setUpdatePermission] = useState({
    id: "",
    permissionName: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [mode, setMode] = useState(""); // "add" or "update" mode for modal
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/v1/superadmin/permission"
      );
      setPermissions(res.data.data);
    } catch (err) {
      console.error("Error fetching permissions:", err);
    }
  };

  const handleAddPermission = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/v1/superadmin/permission",
        newPermission
      );
      setNewPermission({ permissionName: "", description: "" });
      setShowModal(false);
      fetchPermissions();
    } catch (err) {
      console.error("Error adding permission:", err);
    }
  };

  const handleUpdatePermission = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/api/v1/superadmin/permission/${updatePermission.id}`,
        {
          permissionName: updatePermission.permissionName,
          description: updatePermission.description,
        }
      );
      setUpdatePermission({ id: "", permissionName: "", description: "" });
      setShowModal(false);
      fetchPermissions();
    } catch (err) {
      console.error("Error updating permission:", err);
    }
  };

  const openAddPermissionModal = () => {
    setMode("add");
    setNewPermission({ permissionName: "", description: "" });
    setShowModal(true);
  };

  const openUpdatePermissionModal = (permissionId) => {
    setMode("update");
    const permission = permissions.find(
      (perm) => perm.permissionId === permissionId
    );
    if (permission) {
      setUpdatePermission({
        id: permission.permissionId,
        permissionName: permission.permissionName,
        description: permission.description,
      });
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full viewport height
        width: "100%", // Full screen width
        background: "#f4f4f4", // Light background
        padding: "0", // No padding on the body container
        margin: "0", // No margin to fill the screen
        boxSizing: "border-box", // Ensures padding is included in element's width and height
        overflow: "hidden", // Prevents any overflow outside the main container
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1200px", // Optional: You can adjust this value as needed
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
        }}
      >
        {/* Permission Management Heading */}
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
            color: "#1e3a8a",
          }}
        >
          Permission Management
        </h2>

        {/* Search bar and Add Permission button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          {/* Search bar with search icon */}
          <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
            <FaSearch style={{ marginRight: "0.5rem", color: "#3b82f6" }} />
            <input
              type="text"
              placeholder="Search Permissions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Add Permission Button */}
          <button
            onClick={openAddPermissionModal}
            style={{
              padding: "0.5rem 1rem",
              background: "#3b82f6", // Blue color
              color: "white",
              border: "none",
              borderRadius: "4px",
              display: "inline-block",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>+</span> Add Permission
          </button>
        </div>

        {/* Permissions Table */}
        <h3 style={{ color: "#1e3a8a", fontWeight: "bold" }}>
          All Permissions
        </h3>
        {permissions.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
              tableLayout: "fixed", // Ensures the table does not stretch too much
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#E0F7FA" }}>
                {" "}
                {/* Light blue background for header */}
                <th
                  style={{
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    color: "#00796b",
                  }}
                >
                  Permission Name
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    color: "#00796b",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    color: "#00796b",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions
                .filter((perm) =>
                  perm.permissionName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) // Filter by search term
                .map((perm) => (
                  <tr key={perm.permissionId}>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {perm.permissionName}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {perm.description}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <FaPen
                        onClick={() =>
                          openUpdatePermissionModal(perm.permissionId)
                        }
                        style={{
                          cursor: "pointer",
                          color: "#f59e0b",
                          marginRight: "0.5rem",
                        }}
                      />
                      <span>Edit</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No permissions found.</p>
        )}
      </div>

      {/* Modal for Add/Update Permission */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              width: "90%", // Responsive modal width
              maxWidth: "800px", // Max width for modal
              margin: "0 auto",
            }}
          >
            <h3>
              {mode === "update" ? "Update Permission" : "Add Permission"}
            </h3>
            <form
              onSubmit={
                mode === "update" ? handleUpdatePermission : handleAddPermission
              }
            >
              <input
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                }}
                placeholder="Permission Name"
                value={
                  mode === "update"
                    ? updatePermission.permissionName
                    : newPermission.permissionName
                }
                onChange={(e) =>
                  mode === "update"
                    ? setUpdatePermission({
                        ...updatePermission,
                        permissionName: e.target.value,
                      })
                    : setNewPermission({
                        ...newPermission,
                        permissionName: e.target.value,
                      })
                }
                required
              />
              <textarea
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                }}
                placeholder="Description"
                value={
                  mode === "update"
                    ? updatePermission.description
                    : newPermission.description
                }
                onChange={(e) =>
                  mode === "update"
                    ? setUpdatePermission({
                        ...updatePermission,
                        description: e.target.value,
                      })
                    : setNewPermission({
                        ...newPermission,
                        description: e.target.value,
                      })
                }
                required
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  marginTop: "1rem",
                }}
              >
                {mode === "update" ? "Update Permission" : "Add Permission"}
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: "0.5rem 1rem",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginTop: "1rem",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsPage;
