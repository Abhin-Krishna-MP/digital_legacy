import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function AssetPermissions({ assetId, onClose }) {
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [permissions, setPermissions] = useState([]); // [{contactId, permissions, instructions}]

  useEffect(() => {
    api.get("/assets/trusted-contacts").then(res => setTrustedContacts(res.data));
    api.get(`/assets/${assetId}`).then(res => {
      if (res.data.assetPermissions) {
        try {
          setPermissions(JSON.parse(res.data.assetPermissions));
        } catch {
          setPermissions([]);
        }
      }
    });
  }, [assetId]);

  const handleChange = (idx, field, value) => {
    setPermissions(perms => perms.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const addContact = () => {
    setPermissions(perms => [...perms, { contactId: "", permissions: "", instructions: "" }]);
  };

  const save = async () => {
    try {
      await api.put(`/assets/${assetId}/permissions`, JSON.stringify(permissions));
      toast.success("Permissions updated");
      if (onClose) onClose();
    } catch {
      toast.error("Failed to update permissions");
    }
  };

  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px #0001", maxWidth: 500 }}>
      <h3>Trusted Contact Permissions</h3>
      {permissions.map((p, idx) => (
        <div key={idx} style={{ marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
          <select value={p.contactId} onChange={e => handleChange(idx, "contactId", e.target.value)}>
            <option value="">Select Contact</option>
            {trustedContacts.map(tc => (
              <option key={tc.id} value={tc.id}>{tc.name} ({tc.email})</option>
            ))}
          </select>
          <input placeholder="Permissions (e.g. view, download)" value={p.permissions} onChange={e => handleChange(idx, "permissions", e.target.value)} style={{ marginLeft: 8 }} />
          <input placeholder="Instructions" value={p.instructions} onChange={e => handleChange(idx, "instructions", e.target.value)} style={{ marginLeft: 8 }} />
        </div>
      ))}
      <button onClick={addContact} style={{ marginRight: 12 }}>Add Contact</button>
      <button onClick={save}>Save</button>
      <button onClick={onClose} style={{ marginLeft: 12, background: "#eee", color: "#333" }}>Close</button>
    </div>
  );
}
