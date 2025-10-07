import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function Trusted(){
const [list, setList] = useState([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [isLoading, setIsLoading] = useState(true);
const [isAdding, setIsAdding] = useState(false);

const load = async () => {
try {
setIsLoading(true);
const res = await api.get("/trusted");
setList(res.data);
} catch (e) {
toast.error("Failed to load trusted contacts");
console.error(e);
} finally {
setIsLoading(false);
}
}

useEffect(()=>{ load(); }, []);

const create = async () => {
if (!name.trim()) {
toast.error("Name is required");
return;
}
try {
	setIsAdding(true);
	const res = await api.post("/trusted", { name, email, phone, address });
	setList(prev => [...prev, res.data]);
	setName("");
	setEmail("");
	setPhone("");
	setAddress("");
	toast.success("Trusted contact added! 👤");
} catch (e) {
	toast.error("Failed to add contact");
} finally {
	setIsAdding(false);
}
}

	return (
		<div style={{
			animation: "slideInUp 0.6s ease-out"
		}}>
			<div style={{
				display: "flex",
				alignItems: "center",
				gap: 16,
				marginBottom: 32,
				animation: "slideInDown 0.5s ease-out"
			}}>
				<h2 style={{ 
					margin: 0,
					fontSize: "2.5rem",
					fontWeight: 800,
					background: "linear-gradient(135deg, #000, #666)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent"
				}}>
					👥 Trusted Contacts
				</h2>
				<div style={{
					padding: "8px 16px",
					background: "var(--accent)",
					color: "var(--text-inverted)",
					borderRadius: "20px",
					fontSize: "0.9rem",
					fontWeight: 600,
					animation: "pulse 2s infinite"
				}}>
					{list.length} contacts
				</div>
			</div>

			<div 
				className="list-card" 
				style={{ 
					marginBottom: 40,
					animation: "slideInUp 0.5s ease-out",
					animationDelay: "0.1s",
					animationFillMode: "both"
				}}
			>
				<h3 style={{
					marginBottom: 20,
					color: "var(--text-primary)",
					fontSize: "1.3rem"
				}}>
					➕ Add New Contact
				</h3>
				<div style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
					gap: 16,
					marginBottom: 20
				}}>
					<div className="form-group">
						<label>Full Name *</label>
						<input 
							placeholder="Enter full name" 
							value={name} 
							onChange={e=>setName(e.target.value)}
							style={{ width: "100%" }}
							required
						/>
					</div>
					<div className="form-group">
						<label>Email Address</label>
						<input 
							type="email"
							placeholder="Enter email address" 
							value={email} 
							onChange={e=>setEmail(e.target.value)}
							style={{ width: "100%" }}
						/>
					</div>
					<div className="form-group">
						<label>Phone Number</label>
						<input 
							type="tel"
							placeholder="Enter phone number" 
							value={phone} 
							onChange={e=>setPhone(e.target.value)}
							style={{ width: "100%" }}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input 
							placeholder="Enter address" 
							value={address} 
							onChange={e=>setAddress(e.target.value)}
							style={{ width: "100%" }}
						/>
					</div>
				</div>
				<button 
					onClick={create}
					disabled={isAdding || !name.trim()}
					style={{
						width: "100%",
						fontSize: "1.1rem",
						padding: "14px 20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 8,
						background: (!name.trim() || isAdding) ? "var(--text-secondary)" : "var(--accent)"
					}}
				>
					{isAdding ? (
						<>
							<span className="loading-spinner"></span>
							Adding Contact...
						</>
					) : (
						"➕ Add Trusted Contact"
					)}
				</button>
			</div>

			<div>
				{isLoading ? (
					<div style={{
						textAlign: "center",
						padding: 60,
						color: "var(--text-secondary)"
					}}>
						<div className="loading-spinner" style={{
							width: 40,
							height: 40,
							margin: "0 auto 20px"
						}}></div>
						Loading trusted contacts...
					</div>
				) : list.length === 0 ? (
					<div style={{ 
						textAlign: "center",
						padding: 60,
						color: 'var(--text-secondary)',
						animation: "fadeIn 0.5s ease-out"
					}}>
						<div style={{ fontSize: "4rem", marginBottom: 20 }}>👥</div>
						<h3 style={{ marginBottom: 12, color: "var(--text-primary)" }}>No trusted contacts yet</h3>
						<p>Add your first trusted contact using the form above!</p>
					</div>
				) : (
					<div className="card-grid">
						{list.map((t, index) => (
							<div 
								className="list-card" 
								key={t.id}
								style={{
									animation: "scaleIn 0.5s ease-out",
									animationDelay: `${index * 0.1}s`,
									animationFillMode: "both",
									textAlign: "left"
								}}
							>
								<div style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
									marginBottom: 16
								}}>
									<div style={{
										width: 50,
										height: 50,
										borderRadius: "50%",
										background: "var(--accent)",
										color: "var(--text-inverted)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontSize: "1.5rem",
										fontWeight: 700
									}}>
										{t.name.charAt(0).toUpperCase()}
									</div>
									<div>
										<div style={{ 
											fontWeight: 700, 
											fontSize: "1.3rem",
											color: "var(--text-primary)",
											marginBottom: 4
										}}>
											{t.name}
										</div>
										<div style={{
											color: "var(--text-secondary)",
											fontSize: "0.9rem"
										}}>
											Trusted Contact
										</div>
									</div>
								</div>

								<div style={{
									display: "grid",
									gap: 12
								}}>
									{t.email && (
										<div style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											padding: 8,
											background: "rgba(0,0,0,0.02)",
											borderRadius: 8
										}}>
											<span style={{ fontSize: "1.2rem" }}>📧</span>
											<span style={{ 
												color: "var(--accent)",
												fontWeight: 500
											}}>
												{t.email}
											</span>
										</div>
									)}
									
									{t.phone && (
										<div style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											padding: 8,
											background: "rgba(0,0,0,0.02)",
											borderRadius: 8
										}}>
											<span style={{ fontSize: "1.2rem" }}>📱</span>
											<span style={{ color: "var(--text-secondary)" }}>
												{t.phone}
											</span>
										</div>
									)}
									
									{t.address && (
										<div style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											padding: 8,
											background: "rgba(0,0,0,0.02)",
											borderRadius: 8
										}}>
											<span style={{ fontSize: "1.2rem" }}>📍</span>
											<span style={{ color: "var(--text-secondary)" }}>
												{t.address}
											</span>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
