import { FaBars, FaBell, FaCog, FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 text-white p-2 flex items-center justify-between z-50">
     
      <div className="flex items-center space-x-4">
        
        <button className="lg:hidden" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="text-2xl font-bold">ss group Dashboard</h1>
      </div>

      
      <div className="flex items-center space-x-6">


       
        <Link to="/profile" className="flex items-center space-x-6">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="hidden sm:block space-x-6">David Grey</span>
        </Link>
        
      </div>
    </header>
  );
};

export default Navbar;
