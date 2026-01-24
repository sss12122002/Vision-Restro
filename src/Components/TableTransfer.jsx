import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

/**
 * Props:
 * onClose()            -> popup close karne ke liye
 * onTableUpdated(name)-> dashboard ko batane ke liye kaunsa table active hua
 */
const TableTransfer = ({ onClose, onTableUpdated }) => {
  const [fromTable, setFromTable] = useState("");
  const [toTable, setToTable] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateTable = async () => {
    if (!fromTable || !toTable) {
      alert("Both From Table and To Table are required!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:8080/api/updatetable",
        null,
        {
          params: {
            fromTable,
            toTable,
          },
        }
      );

      // ✅ Success message
      alert(`Table transferred to ${response.data.tableName}`);

      // ✅ Dashboard ko update batao
      if (onTableUpdated) {
        onTableUpdated(response.data.tableName);
      }

      // ✅ Clear inputs
      setFromTable("");
      setToTable("");

      // ✅ Popup close
      onClose();
    } catch (error) {
      console.error("Table Transfer Error:", error);
      alert(
        error.response?.data?.message ||
          "Error updating table. Please check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "360px",
        background: "#fff",
        border: "1px solid #999",
        boxShadow: "0 0 12px rgba(0,0,0,0.4)",
        fontSize: "14px",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          background: "#0078D7",
          color: "#fff",
          padding: "6px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Table Transfer</span>
        <span
          style={{ cursor: "pointer", fontSize: "18px" }}
          onClick={onClose}
        >
          ×
        </span>
      </div>

      {/* ===== BODY ===== */}
      <div style={{ padding: "18px", background: "#f5f5f5" }}>
        {/* FROM TABLE */}
        <div className="d-flex align-items-center mb-3">
          <label style={{ width: "90px", color: "#333399" }}>
            From Table
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Type table"
            value={fromTable}
            onChange={(e) => setFromTable(e.target.value)}
            style={{
              height: "32px",
              background: "#dff0ff",
              fontSize: "14px",
            }}
            disabled={loading}
          />
        </div>

        {/* TO TABLE */}
        <div className="d-flex align-items-center">
          <label style={{ width: "90px", color: "#333399" }}>
            To Table
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Type table"
            value={toTable}
            onChange={(e) => setToTable(e.target.value)}
            style={{
              height: "32px",
              fontSize: "14px",
            }}
            disabled={loading}
          />
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div
        style={{
          padding: "12px",
          background: "#f0f0f0",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          borderTop: "1px solid #ccc",
        }}
      >
        <button
          className="btn btn-light"
          style={{ minWidth: "80px", border: "1px solid #999" }}
          onClick={handleUpdateTable}
          disabled={loading}
        >
          <span style={{ color: "green", fontWeight: "bold" }}>✔</span>{" "}
          {loading ? "Updating..." : "Ok"}
        </button>

        <button
          className="btn btn-light"
          style={{ minWidth: "80px", border: "1px solid #999" }}
          onClick={onClose}
          disabled={loading}
        >
          <span style={{ color: "red", fontWeight: "bold" }}>✖</span> Cancel
        </button>
      </div>
    </div>
  );
};

export default TableTransfer;
