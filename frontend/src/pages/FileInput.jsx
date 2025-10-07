import React from "react";

export default function FileInput({ onFileChange }) {
  return (
    <input
      type="file"
      accept="application/pdf"
      onChange={e => onFileChange(e.target.files[0])}
    />
  );
}
