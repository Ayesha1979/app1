import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaSearch } from "react-icons/fa"; // Import pencil and search icons

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    roleName: "",
    description: "",
    permissions: [],
  });
  const [assignRole, setAssignRole] = useState({ userId: "", roleId: "" });
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [mode, setMode] = useState(""); // "add" or "assign" mode for modal
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  const fetchRoles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/v1/superadmin/role/getAllRoles"
      );
      setRoles(res.data.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/superadmin/role", newRole);
      setNewRole({ roleName: "", description: "", permissions: [] });
      setShowModal(false);
      fetchRoles();
    } catch (err) {
      console.error("Error adding role:", err);
    }
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/superadmin/role/assignRole",
        assignRole
      );
      setAssignRole({ userId: "", roleId: "" });
      setShowModal(false);
    } catch (err) {
      console.error("Error assigning role:", err);
    }
  };

  const openAddRoleModal = () => {
    setMode("add");
    setNewRole({ roleName: "", description: "", permissions: [] });
    setShowModal(true);
  };

  const openAssignRoleModal = () => {
    setMode("assign");
    setShowModal(true);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        background: "#f4f4f4",
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            textAlign: "center",
            color: "#1e3a8a",
          }}
        >
          Role Management
        </h2>

        {/* Search bar and Add Role button */}
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
              placeholder="Search Roles"
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

          {/* Add Role Button */}
          <button
            onClick={openAddRoleModal}
            style={{
              padding: "0.5rem 1rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              display: "inline-block",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>+</span> Add Role
          </button>

          {/* Assign Role Button */}
          <button
            onClick={openAssignRoleModal}
            style={{
              padding: "0.5rem 1rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              display: "inline-block",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>⚡</span> Assign Role
          </button>
        </div>

        {/* Roles Table */}
        <h3 style={{ color: "#1e3a8a", fontWeight: "bold" }}>All Roles</h3>
        {roles.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#E0F7FA" }}>
                <th
                  style={{
                    padding: "0.5rem",
                    borderBottom: "1px solid #ddd",
                    textAlign: "left",
                    color: "#00796b",
                  }}
                >
                  Role Name
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
              {roles
                .filter((role) =>
                  role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
                ) // Filter by search term
                .map((role) => (
                  <tr key={role.roleId}>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {role.roleName}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {role.description}
                    </td>
                    <td
                      style={{
                        padding: "0.5rem",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <FaPen
                        onClick={() => openAssignRoleModal(role.roleId)}
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
          <p>No roles found.</p>
        )}
      </div>

      {/* Modal for Add/Assign Role */}
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
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h3>{mode === "assign" ? "Assign Role to User" : "Add Role"}</h3>
            <form
              onSubmit={mode === "assign" ? handleAssignRole : handleAddRole}
            >
              {mode === "assign" ? (
                <>
                  <input
                    type="text"
                    placeholder="User ID"
                    value={assignRole.userId}
                    onChange={(e) =>
                      setAssignRole({ ...assignRole, userId: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role ID"
                    value={assignRole.roleId}
                    onChange={(e) =>
                      setAssignRole({ ...assignRole, roleId: e.target.value })
                    }
                    required
                  />
                </>
              ) : (
                <>
                  <input
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                    placeholder="Role Name"
                    value={newRole.roleName}
                    onChange={(e) =>
                      setNewRole({ ...newRole, roleName: e.target.value })
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
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    required
                  />
                </>
              )}
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
                {mode === "assign" ? "Assign Role" : "Add Role"}
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

export default RolesPage;
