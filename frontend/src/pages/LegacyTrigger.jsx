import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function LegacyTrigger() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executed, setExecuted] = useState(null); // asset object

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assets");
      setAssets(res.data);
      toast.success(`Loaded ${res.data.length} assets! 📁`);
    } catch {
      toast.error("Failed to load assets");
    }
    setLoading(false);
  };

  const trigger = async (id) => {
    setLoading(true);
    try {
      const res = await api.post(`/assets/${id}/trigger-legacy`);
      setExecuted(res.data);
      toast.success("Legacy execution triggered! ⚡");
    } catch {
      toast.error("Failed to execute legacy event");
    }
    setLoading(false);
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
          ⚡ Legacy Execution Trigger
        </h1>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "1.1rem",
          margin: 0
        }}>
          Simulate and test your digital legacy execution workflow
        </p>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 32,
        animation: "slideInUp 0.5s ease-out",
        animationDelay: "0.1s",
        animationFillMode: "both"
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
            background: loading ? "var(--text-secondary)" : "var(--accent)"
          }}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Loading...
            </>
          ) : (
            <>
              📂 Load My Assets
            </>
          )}
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
                  onClick={() => trigger(a.id)} 
                  disabled={loading}
                  style={{ 
                    background: "var(--accent)",
                    color: "var(--text-inverted)",
                    padding: "10px 20px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    animation: "pulse 2s infinite"
                  }}
                >
                  ⚡ Trigger Legacy
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
    </div>
  );
}
