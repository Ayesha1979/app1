import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordErrorMessage = () => (
  <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>
    Password should have at least 8 characters
  </p>
);

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("PK"); // Default country
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to get example phone format for the selected country
  const getPhoneExample = (country) => {
    try {
      return `Enter phone number for ${country}`; // You can customize this as per your needs
    } catch (error) {
      return "Enter phone number";
    }
  };

  const getIsFormValid = () => {
    return name && email && phone && password.value.length >= 8;
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword({ value: "", isTouched: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting...");

    const userData = {
      name,
      email,
      phone,
      password: password.value,
    };

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/superadmin/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer your-token-here`, // Replace with actual token
            role: "SUPERADMIN",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ User added successfully!");
        clearForm();
      } else if (data.message && data.message.includes("already")) {
        setMessage("❌ Email already registered.");
      } else {
        setMessage(`❌ Failed: ${data.message || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Error: Could not connect to the server.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f1f5f9",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          padding: "2rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Add User
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Create a new user account
          </p>

          {/* Name Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Name <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.875rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.475rem",
                outline: "none",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Email <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.875rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.475rem",
                outline: "none",
              }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Phone <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <PhoneInput
              defaultCountry={country}
              value={phone}
              onChange={(value, metadata) => {
                setPhone(value);
                setCountry(metadata?.country || "PK");
              }}
              international={false}
              placeholder={getPhoneExample(country)}
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "0.875rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.475rem",
                outline: "none",
              }}
              required
            />
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.5rem",
              }}
            >
              Format: +{country} {getPhoneExample(country)}
            </p>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Password <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.475rem",
                  outline: "none",
                }}
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
                onBlur={() => setPassword({ ...password, isTouched: true })}
                placeholder="Enter password"
                required
              />
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            {password.isTouched && password.value.length < 8 && (
              <PasswordErrorMessage />
            )}
          </div>

          <button
            type="submit"
            disabled={!getIsFormValid() || loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: getIsFormValid() ? "#4f46e5" : "#94a3b8",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
