import { FaHome, FaUsers, FaBuilding, FaBoxes, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed lg:relative w-60 h-screen bg-gradient-to-b from-white text-blue-900 transform ${
        isOpen ? "translate-x-0" : "-translate-x-72"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      {/* Navigation Menu */}
      <nav className="mt-24">
        <ul className="space-y-4">
          {[
            { path: "/", icon: <FaHome />, label: "Home" },
            { path: "/employee", icon: <FaUsers />, label: "Employees" },
            { path: "/sites", icon: <FaBuilding />, label: "Sites" },
            { path: "/inventory", icon: <FaBoxes />, label: "Inventory" },
            { path: "/expenses", icon: <FaMoneyBillWave />, label: "Expenses" },
            { path: "/invoice", icon: <FaFileInvoice />, label: "Invoice" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "border-l-4 border-blue-700 bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-blue-400 hover:text-white"
                }`}
              >
                <span className="text-lg mr-4">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
