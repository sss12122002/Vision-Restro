import "./Dashboard.css";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const outlets = [
  "Bhoj-1", "Bhoj-5", "MKN 4", "MKN 8", "SM1", "LB-3", "LB-7", "FDS-3", "TA-1",
  "Bhoj-2", "MKN 1", "MKN 5", "SM2", "LB-4", "LB-8", "FDS-4", "TA-2",
  "Bhoj-3", "MKN 2", "MKN 6", "LB-1", "LB-5", "FDS-1", "FDS-5", "TA-3",
  "Bhoj-4", "MKN 3", "MKN 7", "LB-2", "LB-6", "FDS-2", "PRIVATE", "TA-4"
];

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Cancellation</h3>
        <ul>
          <li>Order Cancellation (F8)</li>
          <li>Bill Cancellation</li>
        </ul>

        <h3>Reprint</h3>
        <ul>
          <li>Order Print (F9)</li>
          <li>Cancel Order Print (CTRL + C)</li>
          <li>Transfer Order Print (CTRL + L)</li>
          <li>Delivery Order Print (CTRL + H)</li>
          <li>Bill Print (F6)</li>
        </ul>

        <h3>Other</h3>
        <ul>
          <li>Bill Reprint (F4)</li>
          <li>Unbilled Order (F12)</li>
          <li>Table Transfer (F7)</li>
          <li>Item Transfer (F2)</li>
        </ul>

        <h3>Reports</h3>
        <ul>
          <li>Bar Statement (CTRL + Q)</li>
          <li>Sales Statement (CTRL + W)</li>
          <li>Closing Report (CTRL + S)</li>
        </ul>

        <h3>Entry</h3>
        <ul>
          <li>Home Delivery Order (CTRL + O)</li>
          <li>Sales Invoice (CTRL + B)</li>
        </ul>
      </aside>

      {/* Main Area */}
      <main className="main">
        <header className="header">
          <span>Outlet</span>
          <h2>BLUE BIRDS</h2>
          <label>
            <input type="checkbox" /> Display Reserve Table On
          </label>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </header>

        <div className="grid">
          {outlets.map((item, index) => (
            <div
              key={index}
              className="card"
              onClick={() => navigate(`/pos/${item}`)} // ✅ Navigate to POSSystem
              style={{ cursor: "pointer" }}
            >
              {item}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
