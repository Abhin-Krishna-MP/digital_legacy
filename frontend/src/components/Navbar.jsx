import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
const { user, logout } = useContext(AuthContext);
const [isMenuOpen, setIsMenuOpen] = useState(false);

		return (
			<nav style={{ 
				position: "relative",
				background: "var(--bg-secondary)",
				borderBottom: "1px solid var(--border-color)",
				padding: "0 24px",
				height: "64px"
			}}>
				<div style={{ 
					display: "flex", 
					alignItems: "center", 
					width: "100%",
					height: "100%",
					maxWidth: "1200px",
					margin: "0 auto"
				}}>
					<div style={{ 
						flex: 1,
						display: "flex",
						alignItems: "center",
						gap: "32px"
					}}>
						<div style={{
							fontSize: "1.5rem",
							fontWeight: "700",
							color: "var(--text-inverted)",
							letterSpacing: "-0.5px"
						}}>
							Digital Legacy Manager
						</div>
						<div style={{
							display: "flex",
							alignItems: "center",
							gap: "24px",
							marginLeft: "24px"
						}}>
							<Link 
								to="/dashboard" 
								className="nav-link"
							>
								Dashboard
							</Link>
							<Link 
								to="/assets"
								className="nav-link"
							>
								Assets
							</Link>
							<Link 
								to="/trusted"
								className="nav-link"
							>
								Trusted Contacts
							</Link>
							<Link 
								to="/legacy"
								className="nav-link"
							>
								Legacy Settings
							</Link>
						</div>
					</div>
				<div style={{
					display: "flex",
					alignItems: "center",
					gap: "16px"
				}}>
					{user ? (
						<>
							<span style={{ 
								fontWeight: 500, 
								color: "#ffffff",
								fontSize: "0.9rem"
							}}>
								Welcome, {user.username}
							</span>
							<button 
								onClick={logout}
								className="btn-secondary"
								style={{
									padding: "8px 16px",
									fontSize: "0.9rem"
								}}
							>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login" className="nav-link">Login</Link>
							<Link to="/register" className="btn-primary" style={{
								padding: "8px 16px",
								fontSize: "0.9rem"
							}}>Register</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
