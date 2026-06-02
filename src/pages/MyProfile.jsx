import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function MyProfile() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();
  const users = JSON.parse(localStorage.getItem("sh_users") || "[]");
  const full = users.find((u) => u.id === user.id) || {};

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: full.name || "",
    email: full.email || "",
    mobile: full.mobile || "",
  });
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [errors, setErrors] = useState({});

  const orders = JSON.parse(localStorage.getItem("sh_orders") || "[]").filter(
    (o) => o.userId === user.id,
  );
  const wishlist = JSON.parse(
    localStorage.getItem(`sh_wishlist_${user.id}`) || "[]",
  );

  function saveProfile(e) {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 3)
      errs.name = "Name must be at least 3 characters";
    if (!/^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(form.email))
      errs.email = "Valid email required";
    if (!/^[0-9]{10,11}$/.test(form.mobile))
      errs.mobile = "Valid mobile required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    updateProfile(form);
    toast("Profile updated successfully!");
    setEditing(false);
    setErrors({});
  }

  function changePassword(e) {
    e.preventDefault();
    const errs = {};
    if (full.password !== pwForm.current)
      errs.current = "Current password is incorrect";
    if (pwForm.newPw.length < 6)
      errs.newPw = "Password must be at least 6 characters";
    if (pwForm.newPw !== pwForm.confirm)
      errs.confirm = "Passwords do not match";
    if (Object.keys(errs).length) {
      setPwErrors(errs);
      return;
    }
    updateProfile({ password: pwForm.newPw });
    toast("Password changed successfully!");
    setPwForm({ current: "", newPw: "", confirm: "" });
    setPwErrors({});
  }

  const stats = [
    { label: "Total Orders", value: orders.length, icon: "📦" },
    { label: "Wishlist Items", value: wishlist.length, icon: "❤️" },
    {
      label: "Total Spent",
      value: `Rs. ${orders.reduce((s, o) => s + o.total, 0)}`,
      icon: "💰",
    },
  ];

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px 60px", minHeight: "70vh" }}>
        <h2
          style={{
            fontFamily: "Playfair Display,serif",
            color: "#6b3a2a",
            marginBottom: 32,
          }}
        >
          My Profile
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {stats.map(({ label, value, icon }) => (
            <div
              key={label}
              style={{
                background: "#f0dfc0",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
              <p style={{ color: "#8b4513", fontWeight: 700, fontSize: 22 }}>
                {value}
              </p>
              <p style={{ color: "#6b3a2a", fontSize: 13 }}>{label}</p>
            </div>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e0c9a6",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h4
                style={{
                  fontFamily: "Playfair Display,serif",
                  color: "#6b3a2a",
                  margin: 0,
                }}
              >
                Personal Info
              </h4>
              <button
                onClick={() => setEditing((e) => !e)}
                style={{
                  background: "none",
                  border: "2px solid #8b4513",
                  color: "#8b4513",
                  borderRadius: 8,
                  padding: "6px 16px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            {editing ? (
              <form onSubmit={saveProfile}>
                {[
                  ["name", "Full Name", "text"],
                  ["email", "Email", "text"],
                  ["mobile", "Mobile", "tel"],
                ].map(([key, label, type]) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      className={`form-input${errors[key] ? " error-border" : ""}`}
                    />
                    {errors[key] && <p className="error-msg">{errors[key]}</p>}
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", marginTop: 8 }}
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div>
                {[
                  ["👤 Name", full.name],
                  ["📧 Email", full.email],
                  ["📱 Mobile", full.mobile],
                  ["🎭 Role", full.role],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #f0dfc0",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: "#888" }}>{label}</span>
                    <span style={{ color: "#6b3a2a", fontWeight: 500 }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #e0c9a6",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <h4
              style={{
                fontFamily: "Playfair Display,serif",
                color: "#6b3a2a",
                marginBottom: 20,
              }}
            >
              Change Password
            </h4>
            <form onSubmit={changePassword}>
              {[
                ["current", "Current Password"],
                ["newPw", "New Password"],
                ["confirm", "Confirm New Password"],
              ].map(([key, label]) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input
                    type="password"
                    value={pwForm[key]}
                    onChange={(e) =>
                      setPwForm({ ...pwForm, [key]: e.target.value })
                    }
                    className={`form-input${pwErrors[key] ? " error-border" : ""}`}
                  />
                  {pwErrors[key] && (
                    <p className="error-msg">{pwErrors[key]}</p>
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", marginTop: 8 }}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
