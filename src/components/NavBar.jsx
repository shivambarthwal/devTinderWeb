import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:opacity-90 transition"
          >
            DevTinder
          </Link>

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/connections"
                className="text-white hover:text-yellow-300 transition"
              >
                Connections
              </Link>
              <Link
                to="/requests"
                className="text-white hover:text-yellow-300 transition"
              >
                Requests
              </Link>

              {/* Avatar Dropdown */}
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-white font-medium">
                    {user?.firstName}
                  </span>
                  <img
                    src={user?.photoUrl || "https://via.placeholder.com/150"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>

                <ul className="absolute text-black right-0 mt-3 w-48 bg-white shadow-lg rounded-lg p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition duration-200">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/connections"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/requests"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Requests
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && user && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="p-4 flex flex-col gap-3">
            <Link
              to="/connections"
              className="hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Connections
            </Link>
            <Link
              to="/requests"
              className="hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Requests
            </Link>
            <Link
              to="/profile"
              className="hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-left hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
