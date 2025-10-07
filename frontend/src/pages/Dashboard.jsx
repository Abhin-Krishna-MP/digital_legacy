import React from "react";

export default function Dashboard(){
	return (
		<div style={{ 
			textAlign: 'center', 
			marginTop: 60
		}}>
			<div style={{
				marginBottom: 60
			}}>
				<h1 style={{ 
					fontSize: '3rem', 
					marginBottom: 20, 
					color: 'var(--text-primary)',
					fontWeight: 700,
					letterSpacing: '-0.02em'
				}}>
					Digital Legacy Manager
				</h1>
				<p style={{ 
					fontSize: '1.2rem', 
					color: 'var(--text-secondary)', 
					marginBottom: 40,
					maxWidth: 600,
					margin: '0 auto 40px',
					lineHeight: 1.6
				}}>
					Securely manage your digital assets, assign trusted contacts, and configure legacy settings for the future.
				</p>
				<div style={{
					display: "inline-flex",
					gap: 12
				}}>
					<div style={{
						padding: "8px 20px",
						background: "var(--bg-secondary)",
						color: "var(--text-inverted)",
						borderRadius: "6px",
						fontSize: "0.9rem",
						fontWeight: 500,
						border: "1px solid var(--border-color)"
					}}>
						Secure
					</div>
					<div style={{
						padding: "8px 20px",
						background: "var(--bg-secondary)",
						color: "var(--text-inverted)",
						borderRadius: "6px",
						fontSize: "0.9rem",
						fontWeight: 500,
						border: "1px solid var(--border-color)"
					}}>
						Reliable
					</div>
					<div style={{
						padding: "8px 20px",
						background: "var(--bg-secondary)",
						color: "var(--text-inverted)",
						borderRadius: "6px",
						fontSize: "0.9rem",
						fontWeight: 500,
						border: "1px solid var(--border-color)"
					}}>
						Professional
					</div>
				</div>
			</div>
			
			<div className="card-grid" style={{ 
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
				gap: 32,
				maxWidth: 800,
				margin: '0 auto'
			}}>
				<div 
					className="list-card" 
					style={{ 
						minWidth: 280,
						textAlign: 'left',
						position: "relative"
					}}
				>
					<div style={{
						width: "48px",
						height: "48px",
						background: "var(--bg-secondary)",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 16,
						fontSize: "1.5rem",
						color: "var(--text-inverted)"
					}}>📁</div>
					<h3 style={{ 
						color: 'var(--accent)',
						fontSize: '1.5rem',
						marginBottom: 12,
						fontWeight: 700
					}}>
						Digital Assets
					</h3>
					<p style={{ 
						color: 'var(--text-secondary)',
						lineHeight: 1.6,
						margin: 0
					}}>
						Upload files, passwords, and account information. Download and manage anytime with secure access.
					</p>
				</div>
				
				<div 
					className="list-card" 
					style={{ 
						minWidth: 280,
						textAlign: 'left',
						position: "relative"
					}}
				>
					<div style={{
						width: "48px",
						height: "48px",
						background: "var(--bg-secondary)",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 16,
						fontSize: "1.5rem",
						color: "var(--text-inverted)"
					}}>👥</div>
					<h3 style={{ 
						color: 'var(--accent)',
						fontSize: '1.5rem',
						marginBottom: 12,
						fontWeight: 700
					}}>
						Trusted Contacts
					</h3>
					<p style={{ 
						color: 'var(--text-secondary)',
						lineHeight: 1.6,
						margin: 0
					}}>
						Assign digital executors and manage their contact details with custom permissions and instructions.
					</p>
				</div>
				
				<div 
					className="list-card" 
					style={{ 
						minWidth: 280,
						textAlign: 'left',
						position: "relative"
					}}
				>
					<div style={{
						width: "48px",
						height: "48px",
						background: "var(--bg-secondary)",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 16,
						fontSize: "1.5rem",
						color: "var(--text-inverted)"
					}}>⚙️</div>
					<h3 style={{ 
						color: 'var(--accent)',
						fontSize: '1.5rem',
						marginBottom: 12,
						fontWeight: 700
					}}>
						Legacy Settings
					</h3>
					<p style={{ 
						color: 'var(--text-secondary)',
						lineHeight: 1.6,
						margin: 0
					}}>
						Configure inheritance workflow, set triggers, and manage digital estate distribution settings.
					</p>
				</div>
			</div>
			
			<div style={{
				marginTop: 80,
				padding: 40,
				background: "var(--bg-secondary)",
				borderRadius: 12,
				color: "var(--text-inverted)"
			}}>
				<h3 style={{
					fontSize: "1.5rem",
					marginBottom: 16,
					color: "var(--text-inverted)"
				}}>
					Get Started
				</h3>
				<p style={{
					color: "rgba(255,255,255,0.8)",
					marginBottom: 24
				}}>
					Begin by adding your first digital asset or setting up a trusted contact.
				</p>
				<div style={{
					display: "flex",
					gap: 16,
					justifyContent: "center",
					flexWrap: "wrap"
				}}>
					<button style={{
						background: "var(--bg-card)",
						color: "var(--text-primary)",
						border: "2px solid transparent"
					}}>
						Add Asset
					</button>
					<button style={{
						background: "transparent",
						color: "var(--text-inverted)",
						border: "2px solid var(--bg-card)"
					}}>
						Add Contact
					</button>
				</div>
			</div>
		</div>
	);
}
