import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function LegacyTrigger() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executed, setExecuted] = useState(null); // asset object
  const [autoTriggerSettings, setAutoTriggerSettings] = useState({
    enabled: false,
    timeLimit: "2", // months
    lastActivity: null
  });
  const [showAutoTriggerModal, setShowAutoTriggerModal] = useState(false);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assets");
      setAssets(res.data);
      toast.success(`Loaded ${res.data.length} assets!`);
    } catch {
      toast.error("Failed to load assets");
    }
    setLoading(false);
  };

  const suddenTrigger = async (id) => {
    setLoading(true);
    try {
      const res = await api.post(`/assets/${id}/trigger-legacy`);
      setExecuted(res.data);
      toast.success("Sudden Legacy execution triggered!");
    } catch {
      toast.error("Failed to execute sudden legacy event");
    }
    setLoading(false);
  };

  const setupAutoTrigger = async () => {
    try {
      const res = await api.post("/user/auto-trigger-settings", autoTriggerSettings);
      toast.success(`Auto-trigger set for ${autoTriggerSettings.timeLimit} months of inactivity!`);
      setShowAutoTriggerModal(false);
    } catch {
      toast.error("Failed to setup auto-trigger");
    }
  };

  return (
    <div style={{ 
      animation: "slideInUp 0.6s ease-out"
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: 40,
        animation: "slideInDown 0.5s ease-out"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #000, #666)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 12
        }}>
          Legacy Execution Control
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          margin: 0
        }}>
          Manage your digital legacy with sudden triggers or automated scheduling
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        marginBottom: 32,
        animation: "slideInUp 0.5s ease-out",
        animationDelay: "0.1s",
        animationFillMode: "both",
        flexWrap: "wrap"
      }}>
        <button 
          onClick={loadAssets} 
          disabled={loading}
          style={{ 
            fontSize: "1.1rem",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: loading ? "var(--text-secondary)" : "var(--accent)",
            minWidth: "200px"
          }}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Loading...
            </>
          ) : (
            "Load My Assets"
          )}
        </button>

        <button 
          onClick={() => setShowAutoTriggerModal(true)}
          style={{ 
            fontSize: "1.1rem",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--bg-secondary)",
            color: "var(--text-inverted)",
            border: "2px solid var(--border-color)",
            minWidth: "200px"
          }}
        >
          Setup Auto-Trigger
        </button>
      </div>

      {assets.length > 0 && (
        <div style={{
          marginBottom: 40,
          animation: "slideInUp 0.5s ease-out",
          animationDelay: "0.2s",
          animationFillMode: "both"
        }}>
          <h3 style={{ 
            marginBottom: 20,
            textAlign: "center",
            color: "var(--text-primary)"
          }}>
            Available Assets ({assets.length})
          </h3>
          <div className="card-grid">
            {assets.map((a, index) => (
              <div 
                key={a.id} 
                className="list-card"
                style={{ 
                  animation: "scaleIn 0.5s ease-out",
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8
                  }}>
                    <b style={{ 
                      fontSize: "1.2rem",
                      color: "var(--text-primary)"
                    }}>
                      {a.name}
                    </b>
                    <span style={{ 
                      padding: "4px 8px",
                      background: "var(--accent)",
                      color: "var(--text-inverted)",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textTransform: "uppercase"
                    }}>
                      {a.type}
                    </span>
                  </div>
                  <div style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem"
                  }}>
                    Category: {a.category || "No category"}
                  </div>
                </div>
                <button 
                  onClick={() => suddenTrigger(a.id)} 
                  disabled={loading}
                  style={{ 
                    background: "#dc3545",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#c82333";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#dc3545";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Sudden Trigger
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {executed && (
        <div style={{ 
          background: "var(--bg-secondary)",
          color: "var(--text-inverted)",
          borderRadius: 20,
          padding: 32,
          animation: "scaleIn 0.6s ease-out",
          border: "2px solid var(--border-color)"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: 24
          }}>
            <h3 style={{
              fontSize: "1.5rem",
              marginBottom: 8,
              color: "var(--text-inverted)"
            }}>
              🎉 Legacy Execution Complete
            </h3>
            <div style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              display: "inline-block",
              fontSize: "0.9rem",
              fontWeight: 600
            }}>
              Asset: {executed.name}
            </div>
          </div>

          <div style={{
            display: "grid",
            gap: 16,
            marginBottom: 24
          }}>
            <div style={{
              padding: 16,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <strong>Asset Type:</strong> 
              <span style={{ marginLeft: 8, color: "rgba(255,255,255,0.8)" }}>
                {executed.type}
              </span>
            </div>
            
            <div style={{
              padding: 16,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <strong>Instructions:</strong> 
              <span style={{ marginLeft: 8, color: "rgba(255,255,255,0.8)" }}>
                {executed.instructions || <span style={{ fontStyle: "italic" }}>None specified</span>}
              </span>
            </div>
            
            <div style={{
              padding: 16,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <strong>Permissions:</strong> 
              <span style={{ marginLeft: 8, color: "rgba(255,255,255,0.8)" }}>
                {executed.assetPermissions || <span style={{ fontStyle: "italic" }}>None specified</span>}
              </span>
            </div>
          </div>

          {executed.type === "file" && executed.fileName && (
            <div style={{ textAlign: "center" }}>
              <a 
                href={`${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/assets/download/${executed.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  borderRadius: 12,
                  fontWeight: 600,
                  transition: "all var(--animation-speed) ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                📁 Download File
              </a>
            </div>
          )}
        </div>
      )}

      {/* Auto-Trigger Setup Modal */}
      {showAutoTriggerModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-out"
        }}>
          <div style={{
            background: "var(--bg-card)",
            borderRadius: 20,
            padding: 40,
            maxWidth: 500,
            width: "90%",
            animation: "scaleIn 0.3s ease-out"
          }}>
            <h3 style={{
              textAlign: "center",
              marginBottom: 24,
              fontSize: "1.5rem",
              color: "var(--text-primary)"
            }}>
              Setup Automatic Legacy Trigger
            </h3>
            
            <p style={{
              color: "var(--text-secondary)",
              textAlign: "center",
              marginBottom: 32,
              lineHeight: 1.5
            }}>
              Your digital legacy will be automatically triggered if you don't log in for the specified time period.
            </p>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block",
                marginBottom: 8,
                color: "var(--text-primary)",
                fontWeight: 600
              }}>
                Inactivity Period:
              </label>
              <select
                value={autoTriggerSettings.timeLimit}
                onChange={(e) => setAutoTriggerSettings({
                  ...autoTriggerSettings,
                  timeLimit: e.target.value
                })}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid var(--border-color)",
                  borderRadius: "8px",
                  background: "var(--bg-primary)",
                  color: "#ffffff",
                  fontSize: "1rem"
                }}
              >
                <option value="1" style={{ color: "#ffffff", background: "var(--bg-primary)" }}>1 Month</option>
                <option value="2" style={{ color: "#ffffff", background: "var(--bg-primary)" }}>2 Months</option>
                <option value="3" style={{ color: "#ffffff", background: "var(--bg-primary)" }}>3 Months</option>
                <option value="6" style={{ color: "#ffffff", background: "var(--bg-primary)" }}>6 Months</option>
                <option value="12" style={{ color: "#ffffff", background: "var(--bg-primary)" }}>1 Year</option>
              </select>
            </div>

            <div style={{
              padding: 16,
              background: "rgba(255,165,0,0.1)",
              border: "1px solid rgba(255,165,0,0.3)",
              borderRadius: 8,
              marginBottom: 24
            }}>
              <p style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "0.9rem"
              }}>
                <strong>Warning:</strong> Once activated, your legacy will be triggered automatically if you don't log in within the specified time. Make sure your trusted contacts and asset instructions are properly configured.
              </p>
            </div>

            <div style={{
              display: "flex",
              gap: 12,
              justifyContent: "center"
            }}>
              <button
                onClick={() => setShowAutoTriggerModal(false)}
                style={{
                  padding: "12px 24px",
                  background: "var(--text-secondary)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                Cancel
              </button>
              <button
                onClick={setupAutoTrigger}
                style={{
                  padding: "12px 24px",
                  background: "var(--accent)",
                  color: "var(--text-inverted)",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: 600
                }}
              >
                Activate Auto-Trigger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
