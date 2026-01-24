import React from "react";
import { useParams } from "react-router-dom"; // ✅ IMPORTANT
import "bootstrap/dist/css/bootstrap.min.css";

const BillingInterface = () => {
  const { tableName } = useParams(); // ✅ URL se table name

  const items = [
    { id: 1, orderNo: "SO-021926", product: "CHICKEN 65", qty: "5.00", uom: "PLT", rate: "438.10", amount: "2,190.50" },
    { id: 2, orderNo: "SO-021926", product: "EGG CURRY", qty: "1.00", uom: "PLT", rate: "305.30", amount: "305.30" },
    { id: 3, orderNo: "SO-021926", product: "GRILLED CHICKEN", qty: "1.00", uom: "PLT", rate: "548.67", amount: "548.67" },
    { id: 4, orderNo: "SO-021926", product: "HONEY CHILLY POTATO", qty: "1.00", uom: "PLT", rate: "305.30", amount: "305.30" },
  ];

  return (
    <div className="container-fluid vh-100 d-flex flex-column bg-light p-0 overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="bg-primary text-white p-2 border-bottom shadow-sm">
        <div className="row g-2 align-items-center" style={{ fontSize: "13px" }}>
          <div className="col-auto d-flex align-items-center gap-1">
            <label>Outlet</label>
            <input className="form-control form-control-sm w-auto" value="BLUE BIRDS" readOnly />
          </div>

          <div className="col-auto d-flex align-items-center gap-1">
            <label>Counter</label>
            <input className="form-control form-control-sm w-auto" value="MAGIC" readOnly />
          </div>

          <div className="col-auto d-flex align-items-center gap-1">
            <label>Table</label>
            <input
              className="form-control form-control-sm w-auto bg-info text-white border-0"
              value={tableName}   // ✅ NOW WORKING
              readOnly
            />
          </div>

          <div className="col-auto d-flex align-items-center gap-1">
            <label>Waiter</label>
            <select className="form-select form-select-sm w-auto">
              <option>Select</option>
            </select>
          </div>

          <div className="col-auto d-flex align-items-center gap-1">
            <label>Adult Pax</label>
            <input
              type="number"
              className="form-control form-control-sm"
              defaultValue="2"
              style={{ width: "60px" }}
            />
          </div>

          <div className="col text-end">
            <small>29/10/2025 - 12/07/2082</small>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-responsive bg-white border" style={{ height: "350px" }}>
        <table className="table table-sm table-bordered table-hover mb-0">
          <thead className="table-secondary sticky-top">
            <tr>
              <th>#</th>
              <th>Order No</th>
              <th>Product</th>
              <th className="text-end">Qty</th>
              <th>UOM</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="text-primary">{item.orderNo}</td>
                <td className="fw-bold">{item.product}</td>
                <td className="text-end">{item.qty}</td>
                <td>{item.uom}</td>
                <td className="text-end">{item.rate}</td>
                <td className="text-end">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Row */} <div className="row g-0 bg-white border border-top-0 p-1 fw-bold text-primary"> <div className="col-4 px-2">Count = 4</div> <div className="col-4 text-center">8.00</div> <div className="col-4 text-end px-2">3,349.77</div> </div> {/* Bottom Section */} <div className="row m-2 g-3 p-2 border bg-light shadow-sm"> {/* Customer Form */} <div className="col-md-8"> <div className="row g-2 mb-2"> <div className="col-md-6 d-flex align-items-center"> <label className="me-2" style={{ width: '100px' }}>Customer</label> <input type="text" className="form-control form-control-sm" defaultValue="CASH A/C" /> </div> <div className="col-md-6 d-flex align-items-center"> <label className="me-2" style={{ width: '100px' }}>Billing Name</label> <input type="text" className="form-control form-control-sm" defaultValue="CASH A/C" /> </div> </div> <div className="row g-2 mb-2"> <div className="col-md-6 d-flex align-items-center"> <label className="me-2" style={{ width: '100px' }}>Address</label> <input type="text" className="form-control form-control-sm" /> </div> <div className="col-md-6 d-flex align-items-center"> <label className="me-2" style={{ width: '100px' }}>VAT/PAN</label> <input type="text" className="form-control form-control-sm" /> </div> </div> </div> {/* Calculations */} <div className="col-md-4 bg-white border p-3 rounded"> <div className="d-flex justify-content-between mb-1 border-bottom"> <span>VAT (13%)</span> <span className="fw-bold text-success">+ 333.73</span> </div> <div className="d-flex justify-content-between mb-2"> <span className="h5 fw-bold text-navy">Net Amount</span> <span className="h4 fw-bold text-primary">2,901.00</span> </div> <div className="d-flex justify-content-between text-danger"> <span>Return Amt.</span> <span className="h3 fw-bold">-2,901.00</span> </div> </div> </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="d-flex justify-content-end gap-2 p-3">
        <button className="btn btn-success btn-sm px-4">✔ OK</button>
        <button className="btn btn-danger btn-sm px-4">✖ Cancel</button>
      </div>
    </div>
  );
};

export default BillingInterface;
