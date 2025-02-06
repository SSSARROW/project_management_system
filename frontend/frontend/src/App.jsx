import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Employee from "./pages/Employee"
import Inventory from "./pages/Inventory"
import Expenses from "./pages/Expenses"
import Invoice from "./pages/Invoice"
import SiteManagement from "./pages/Site"


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 mt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/Sites" element={<SiteManagement/>}/>
            </Routes>
          </main>
        </div>

        {/* Overlay for mobile menu */}
        {sidebarOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={toggleSidebar}></div>}
      </div>
    </Router>
  )
}

export default App

