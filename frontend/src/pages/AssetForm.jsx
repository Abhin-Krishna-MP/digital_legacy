import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileInput from "./FileInput";

export default function AssetForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    type: "file",
    category: "",
    instructions: "",
    encryptedData: "",
    trustedContactId: ""
  });
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/assets/trusted-contacts")
      .then(res => setTrustedContacts(res.data))
      .catch(err => {
        if (err.response && err.response.status === 403) {
          toast.error("Session expired. Please log in again.");
          navigate("/login");
        }
      });
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const asset = {
        ...form,
        trustedContact: form.trustedContactId ? { id: form.trustedContactId } : null
      };
      if (form.type === "file" && file) {
        const data = new FormData();
        data.append("asset", new Blob([JSON.stringify(asset)], { type: "application/json" }));
        data.append("file", file);
        await api.post("/assets", data, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post("/assets", asset);
      }
      toast.success("Asset created");
      setForm({ name: "", type: "file", category: "", instructions: "", encryptedData: "", trustedContactId: "" });
      setFile(null);
      if (onCreated) onCreated();
    } catch (e) {
      if (e.response && e.response.status === 403) {
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Failed to create asset");
      }
    }
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 24 }}>
      <div>
        <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      </div>
      <div>
        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
          <option value="file">File</option>
          <option value="password">Password</option>
          <option value="account">Account</option>
          <option value="social">Social Media</option>
          <option value="email">Email Account</option>
          <option value="subscription">Subscription</option>
        </select>
      </div>
      {form.type === "file" && (
        <div>
          <FileInput onFileChange={setFile} />
          {file && <span style={{ marginLeft: 8 }}>{file.name}</span>}
        </div>
      )}
      <div>
        <input placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
      </div>
      <div>
        <textarea placeholder="Instructions" value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} />
      </div>
      <div>
        <input placeholder="Sensitive Data (will be encrypted)" value={form.encryptedData} onChange={e => setForm(f => ({ ...f, encryptedData: e.target.value }))} />
      </div>
      <div>
        <select value={form.trustedContactId} onChange={e => setForm(f => ({ ...f, trustedContactId: e.target.value }))}>
          <option value="">Assign Trusted Contact</option>
          {trustedContacts.map(tc => (
            <option key={tc.id} value={tc.id}>{tc.name} ({tc.email})</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Asset</button>
    </form>
  );
}
