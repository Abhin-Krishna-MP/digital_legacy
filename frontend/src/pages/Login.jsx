import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
const { login } = useContext(AuthContext);
const [form, setForm] = useState({ username: "", password: "" });
const [isLoading, setIsLoading] = useState(false);

const submit = async (e) => {
e.preventDefault();
setIsLoading(true);
try {
await login(form.username, form.password);
toast.success("Logged in successfully! 🎉");
} catch (err) {
console.error(err);
toast.error("Login failed: " + (err?.response?.data?.message || err.message));
} finally {
setIsLoading(false);
}
};

return (
<div style={{ 
  padding: 40,
  maxWidth: 450,
  margin: "80px auto",
  animation: "slideInUp 0.6s ease-out"
}}> 
  <div style={{
    textAlign: "center",
    marginBottom: 40,
    animation: "slideInDown 0.5s ease-out"
  }}>
    <h1 style={{
      fontSize: "2.5rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #000, #666)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: 8
    }}>
      Welcome Back
    </h1>
    <p style={{
      color: "var(--text-secondary)",
      fontSize: "1.1rem",
      margin: 0
    }}>
      Sign in to manage your digital legacy
    </p>
  </div>

  <form onSubmit={submit} style={{
    display: "flex",
    flexDirection: "column",
    gap: 20
  }}> 
    <div className="form-group" style={{
      animation: "slideInUp 0.5s ease-out",
      animationDelay: "0.1s",
      animationFillMode: "both"
    }}>
      <label>Username</label>
      <input 
        placeholder="Enter your username" 
        value={form.username} 
        onChange={e => setForm({...form, username: e.target.value})}
        style={{
          width: "100%",
          fontSize: "1.1rem",
          padding: "16px 20px"
        }}
        required
      /> 
    </div> 
    
    <div className="form-group" style={{
      animation: "slideInUp 0.5s ease-out",
      animationDelay: "0.2s",
      animationFillMode: "both"
    }}>
      <label>Password</label>
      <input 
        type="password" 
        placeholder="Enter your password" 
        value={form.password} 
        onChange={e => setForm({...form, password: e.target.value})}
        style={{
          width: "100%",
          fontSize: "1.1rem",
          padding: "16px 20px"
        }}
        required
      /> 
    </div> 
    
    <button 
      type="submit" 
      disabled={isLoading}
      style={{
        width: "100%",
        fontSize: "1.1rem",
        padding: "16px 20px",
        marginTop: 20,
        animation: "slideInUp 0.5s ease-out",
        animationDelay: "0.3s",
        animationFillMode: "both",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
      }}
    >
      {isLoading ? (
        <>
          <span className="loading-spinner"></span>
          Logging in...
        </>
      ) : (
        "Login"
      )}
    </button> 
  </form>

  <div style={{
    textAlign: "center",
    marginTop: 32,
    animation: "fadeIn 0.5s ease-out",
    animationDelay: "0.4s",
    animationFillMode: "both"
  }}>
    <p style={{ color: "var(--text-secondary)" }}>
      Don't have an account? <a href="/register" style={{ color: "var(--accent)", fontWeight: 600 }}>Sign up</a>
    </p>
  </div>
</div>
);
}
