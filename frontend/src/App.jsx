import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Trusted from "./pages/Trusted";
import Navbar from "./components/Navbar";
import LegacyTrigger from "./pages/LegacyTrigger";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
	return (
		<>
			<Navbar />
			<div className="app-container">
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/assets" element={<Assets />} />
						<Route path="/trusted" element={<Trusted />} />
						<Route path="/legacy" element={<LegacyTrigger />} />
					</Route>
				</Routes>
			</div>
			<ToastContainer position="top-right" />
		</>
	);
}
