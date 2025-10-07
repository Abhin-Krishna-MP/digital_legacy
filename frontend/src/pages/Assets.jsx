import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import AssetForm from "./AssetForm";
import AssetPermissions from "./AssetPermissions";

export default function Assets() {
	const [showPerms, setShowPerms] = useState(null); // assetId or null
	const [assets, setAssets] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Download file with JWT
	const handleDownload = async (asset) => {
		try {
			const token = localStorage.getItem("dlm_token");
			toast.info("Starting download...");
			const res = await fetch(
				`${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/assets/download/${asset.id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (!res.ok) throw new Error("Download failed");
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = asset.fileName || "download";
			document.body.appendChild(a);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(url);
			toast.success("Download completed! 📁");
		} catch (e) {
			toast.error("Download failed");
		}
	};

	const load = async () => {
		try {
			setIsLoading(true);
			const res = await api.get("/assets");
			setAssets(res.data);
		} catch (e) {
			toast.error("Failed to load assets");
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => { load(); }, []);

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
				📁 Your Digital Assets
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
				{assets.length} assets
			</div>
		</div>
		
	    <div style={{
			marginBottom: 40,
			animation: "slideInUp 0.5s ease-out",
			animationDelay: "0.1s",
			animationFillMode: "both"
		}}>
			<AssetForm onCreated={load} />
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
					Loading your assets...
				</div>
			) : assets.length === 0 ? (
				<div style={{ 
					textAlign: "center",
					padding: 60,
					color: 'var(--text-secondary)',
					animation: "fadeIn 0.5s ease-out"
				}}>
					<div style={{ fontSize: "4rem", marginBottom: 20 }}>📂</div>
					<h3 style={{ marginBottom: 12, color: "var(--text-primary)" }}>No assets yet</h3>
					<p>Add your first digital asset using the form above!</p>
				</div>
			) : (
				<div className="card-grid">
					{assets.map((a, index) => (
						<div 
							className="list-card" 
							key={a.id}
							style={{
								animation: "scaleIn 0.5s ease-out",
								animationDelay: `${index * 0.1}s`,
								animationFillMode: "both",
								"--index": index
							}}
						>
							<div style={{ 
								display: 'flex', 
								justifyContent: 'space-between', 
								alignItems: 'flex-start',
								marginBottom: 16
							}}>
								<div style={{ flex: 1 }}>
									<div style={{
										display: "flex",
										alignItems: "center",
										gap: 12,
										marginBottom: 8
									}}>
										<b style={{ 
											fontSize: '1.3rem',
											color: "var(--text-primary)"
										}}>
											{a.name}
										</b>
										<span style={{ 
											padding: "4px 12px",
											background: "var(--accent)",
											color: "var(--text-inverted)",
											borderRadius: "12px",
											fontSize: "0.8rem",
											fontWeight: 600,
											textTransform: "uppercase"
										}}>
											{a.type}
										</span>
									</div>
									<div style={{
										color: "var(--text-secondary)",
										fontSize: "0.9rem",
										marginBottom: 4
									}}>
										Category: {a.category || "No category"}
									</div>
								</div>
								<div style={{ 
									display: 'flex', 
									gap: 8,
									flexDirection: "column"
								}}>
									{a.type === "file" && a.fileName && (
										<button 
											onClick={() => handleDownload(a)} 
											style={{ 
												fontSize: 14, 
												fontWeight: 600,
												background: "var(--accent)",
												color: "var(--text-inverted)",
												padding: "8px 16px",
												animation: "slideInUp 0.3s ease-out"
											}}
										>
											⬇️ Download
										</button>
									)}
									<button 
										onClick={() => setShowPerms(a.id)} 
										className="btn-secondary"
										style={{ 
											fontSize: 14, 
											fontWeight: 600,
											padding: "8px 16px",
											animation: "slideInUp 0.3s ease-out",
											animationDelay: "0.1s",
											animationFillMode: "both"
										}}
									>
										⚙️ Permissions
									</button>
								</div>
							</div>
							
							<div style={{ 
								padding: 16,
								background: "rgba(0,0,0,0.02)",
								borderRadius: 12,
								border: "1px solid var(--border-color)"
							}}>
								<div style={{ marginBottom: 8 }}>
									<strong>Instructions:</strong> 
									<span style={{ marginLeft: 8 }}>
										{a.instructions || <span style={{ color: 'var(--text-secondary)', fontStyle: "italic" }}>None specified</span>}
									</span>
								</div>
								<div>
									<strong>Trusted Contact:</strong> 
									<span style={{ marginLeft: 8 }}>
										{a.trustedContact ? (
											<span style={{ 
												color: "var(--accent)",
												fontWeight: 600
											}}>
												👤 {a.trustedContact.name} ({a.trustedContact.email})
											</span>
										) : (
											<span style={{ color: 'var(--text-secondary)', fontStyle: "italic" }}>None assigned</span>
										)}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			
			{showPerms && (
				<div className="modal-overlay">
					<AssetPermissions assetId={showPerms} onClose={() => setShowPerms(null)} />
				</div>
			)}
	    </div>
	  </div>
	);
}
