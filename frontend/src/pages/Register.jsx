import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Register() {
const { register } = useContext(AuthContext);
const [form, setForm] = useState({ username: "", password: "", fullName: "", email: "" });
const [isLoading, setIsLoading] = useState(false);

const submit = async (e) => {
e.preventDefault();
setIsLoading(true);
try {
await register(form);
toast.success("Account created successfully! Welcome! 🎉");
} catch (err) {
console.error(err);
toast.error("Registration failed: " + (err?.response?.data?.message || err.message));
} finally {
setIsLoading(false);
}
};

return (
<div style={{ 
  padding: 40,
  maxWidth: 500,
  margin: "60px auto",
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
      Create Account
    </h1>
    <p style={{
      color: "var(--text-secondary)",
      fontSize: "1.1rem",
      margin: 0
    }}>
      Start managing your digital legacy today
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
        placeholder="Choose a username" 
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
        placeholder="Create a strong password" 
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
    
    <div className="form-group" style={{
      animation: "slideInUp 0.5s ease-out",
      animationDelay: "0.3s",
      animationFillMode: "both"
    }}>
      <label>Full Name</label>
      <input 
        placeholder="Enter your full name" 
        value={form.fullName} 
        onChange={e => setForm({...form, fullName: e.target.value})}
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
      animationDelay: "0.4s",
      animationFillMode: "both"
    }}>
      <label>Email</label>
      <input 
        type="email" 
        placeholder="Enter your email address" 
        value={form.email} 
        onChange={e => setForm({...form, email: e.target.value})}
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
        animationDelay: "0.5s",
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
          Creating Account...
        </>
      ) : (
        "Create Account"
      )}
    </button> 
  </form>

  <div style={{
    textAlign: "center",
    marginTop: 32,
    animation: "fadeIn 0.5s ease-out",
    animationDelay: "0.6s",
    animationFillMode: "both"
  }}>
    <p style={{ color: "var(--text-secondary)" }}>
      Already have an account? <a href="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>Sign in</a>
    </p>
  </div>
</div>
);
}
