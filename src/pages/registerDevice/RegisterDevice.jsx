import { useState } from "react";

const RegisterDevice = () => {
  const [deviceId, setDeviceId] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [dom, setDom] = useState("");
  const [warrantyDate, setWarrantyDate] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isFormValid = () =>
    deviceId && deviceType && dom && warrantyDate && userId;

  const clearForm = () => {
    setDeviceId("");
    setDeviceType("");
    setDom("");
    setWarrantyDate("");
    setUserId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting...");

    const deviceData = {
      deviceId,
      deviceType,
      dom,
      warrantyDate,
      userId,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/superadmin/addDevice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer your-token-here`, // replace with actual token
            role: "SUPERADMIN",
          },
          body: JSON.stringify(deviceData),
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setMessage("✅ Device registered successfully!");
        clearForm();
      } else {
        setMessage(`❌ Failed: ${data.message || "Something went wrong!"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: Could not connect to the server.");
    }

    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    fontSize: "0.875rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.475rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
  };

  const formGroupStyle = { marginBottom: "1.5rem" };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f1f5f9",
  };

  const cardStyle = {
    width: "200%",
    maxWidth: "500px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    padding: "2rem",
    margin: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    cursor: isFormValid() ? "pointer" : "not-allowed",
    opacity: isFormValid() ? 1 : 0.6,
  };

  const messageStyle = {
    padding: "0.75rem",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    backgroundColor: "#d1fae5",
    color: "#065f46",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Register Device
          </h2>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Device ID</label>
            <input
              style={inputStyle}
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="e.g. BOLK80W8"
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Device Type</label>
            <input
              style={inputStyle}
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              placeholder="e.g. pm-1"
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Date of Manufacturing</label>
            <input
              style={inputStyle}
              type="date"
              value={dom}
              onChange={(e) => setDom(e.target.value)}
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Warranty Date</label>
            <input
              style={inputStyle}
              type="date"
              value={warrantyDate}
              onChange={(e) => setWarrantyDate(e.target.value)}
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>User ID</label>
            <input
              style={inputStyle}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
              required
            />
          </div>

          {message && <div style={messageStyle}>{message}</div>}

          <button
            type="submit"
            disabled={!isFormValid() || loading}
            style={buttonStyle}
          >
            {loading ? "Submitting..." : "Register Device"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDevice;
