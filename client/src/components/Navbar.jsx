import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // console.log("logging out user...", user)
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* app logo/title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            📋 Task Manager
          </h1>
          <p className="text-xs text-slate-500">
            Manage your tasks efficiently
          </p>
        </div>

        {/* profile display and logout btn */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-700">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="text-right">
              <p className="font-medium text-slate-700">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-slate-500">
                {user?.email || ""}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;