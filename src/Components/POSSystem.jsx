import React, { useState, useEffect } from "react";   // ✅ useEffect added
import { useParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const POSSystem = () => {
  const { tableName } = useParams();

  // ===== STATES =====
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // ===== FETCH PRODUCTS =====
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product fetch error", err));
  }, []);

  // ===== ADD TO CART =====
  const addProduct = (product) => {
    const exist = cart.find((i) => i.id === product.id);

    if (exist) {
      setCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.productName,
          rate: product.price,
          qty: 1,
        },
      ]);
    }
  };

  // ===== CALCULATIONS =====
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const subTotal = cart.reduce(
    (sum, i) => sum + i.qty * i.rate,
    0
  );
  const vat = subTotal * 0.05;
  const total = subTotal + vat;

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
              value={tableName}
              readOnly
            />
          </div>

          <div className="col-auto d-flex align-items-center gap-1">
            <label>Waiter</label>
            <select className="form-select form-select-sm w-auto">
              <option></option>
            </select>
          </div>

          <div className="col-auto d-flex align-items-center gap-1">
            <label>Adult Pax</label>
            <input
              type="number"
              className="form-control form-control-sm w-auto"
              defaultValue="2"
              style={{ width: "50px" }}
            />
          </div>

          <div className="col text-end">
            <small>29/10/2025 - 12/07/2082</small>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="row flex-grow-1 m-1 overflow-hidden">

        {/* ===== LEFT PRODUCT LIST ===== */}
        <div className="col-3 h-100 bg-white border border-secondary p-0 d-flex flex-column">
          <div className="bg-light border-bottom p-1 text-center fw-bold small">
            Product
          </div>
          <div className="overflow-auto list-group list-group-flush">
            {products.map((p) => (
              <button
                key={p.id}
                className="list-group-item list-group-item-action py-1 px-2 border-bottom small text-uppercase"
                onClick={() => addProduct(p)}
              >
                {p.productName}
              </button>
            ))}
          </div>
        </div>

        {/* ===== BILLING TABLE ===== */}
        <div className="col-6 h-100 bg-white border border-secondary p-0 d-flex flex-column">
          <table className="table table-bordered table-sm table-hover mb-0" style={{ fontSize: "12px" }}>
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>UOM</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((i) => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.qty}</td>
                  <td>PCS</td>
                  <td></td>
                  <td>{i.rate}</td>
                  <td>{(i.qty * i.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-auto p-2 bg-light border-top">
            <div className="row g-2 align-items-center">
              <div className="col-4 d-flex align-items-center gap-1">
                <span className="small">Count={itemCount}</span>
                <input className="form-control form-control-sm" value={subTotal.toFixed(2)} readOnly />
              </div>
              <div className="col-4 d-flex align-items-center gap-1">
                <span className="small">VAT</span>
                <input className="form-control form-control-sm" value={vat.toFixed(2)} readOnly />
              </div>
              <div className="col-4 d-flex align-items-center gap-1">
                <span className="small">Total</span>
                <input className="form-control form-control-sm" value={total.toFixed(2)} readOnly />
              </div>
            </div>
          </div>
        </div>

        {/* ===== OUTSTANDING ===== */}
        <div className="col-3 h-100 bg-white border border-secondary p-0 d-flex flex-column">
          <div className="bg-light border-bottom p-1 text-center fw-bold small">
            Outstanding Order
          </div>

          <table className="table table-bordered table-sm mb-0" style={{ fontSize: "11px" }}>
            <thead className="table-light text-center">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* {cart.map((i) => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td className="text-center">{i.qty}</td>
                  <td className="text-end">{(i.qty * i.rate).toFixed(2)}</td>
                </tr>
              ))} */}
            </tbody>
          </table>

          <div className="mt-auto p-2 bg-light border-top shadow-sm" style={{ fontSize: "12px" }}>
            <div className="d-flex justify-content-between mb-1">
              <span>Count=
                {/* {itemCount} */}
                </span>
              <span>
                {/* {subTotal.toFixed(2)} */}
                </span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>VAT</span>
              <span>
                {/* {vat.toFixed(2)} */}
                </span>
            </div>
            <div className="d-flex justify-content-between fw-bold text-primary">
              <span>TOTAL</span>
              <span>
                {/* {total.toFixed(2)} */}
                </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-light border-top p-2">
        <div className="row align-items-center">
          <div className="col-auto">
            <label className="small fw-bold">Remarks</label>
          </div>
          <div className="col">
            <input className="form-control form-control-sm" />
          </div>
          <div className="col-auto d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary">✔ Ok</button>
            <button className="btn btn-sm btn-outline-secondary">✖ Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSSystem;
