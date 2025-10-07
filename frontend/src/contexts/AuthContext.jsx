import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
const navigate = useNavigate();
const [user, setUser] = useState(() => {
const t = localStorage.getItem("dlm_token");
if (t) {
	try {
		const decoded = jwtDecode(t);
		return { username: decoded.sub || decoded.username || decoded?.user || decoded?.preferred_username };
	} catch {
		return null;
	}
}
return null;
});

const login = async (username, password) => {
const res = await api.post("/auth/login", { username, password });
// handle either { token: "..." } or raw string
const token = res?.data?.token || (typeof res.data === "string" ? res.data : (res.data || {}).token);
if (!token) throw new Error("No token received");
localStorage.setItem("dlm_token", token);
setUser({ username });
navigate("/dashboard");
return token;
};

const logout = () => {
localStorage.removeItem("dlm_token");
setUser(null);
navigate("/login");
};

const register = async (payload) => {
await api.post("/auth/register", payload);
// optionally auto-login after register
await login(payload.username, payload.password);
};

useEffect(() => {
const token = localStorage.getItem("dlm_token");
if (!token) {
setUser(null);
}
}, []);

return (
<AuthContext.Provider value={{ user, login, logout, register }}>
{children}
</AuthContext.Provider>
);
}
