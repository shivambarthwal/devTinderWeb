import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) {
      return; // If user data is already present, no need to fetch again
    }
    try {
      // This function can be used to fetch user data if needed
      const res = await axios.get(`${API_BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data));
    } catch (error) {
      if (error.status && error.response.status === 401) {
        // If the user is not authenticated, redirect to login
        return navigate("/login");
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    // Fetch user data when the component mounts
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* The Outlet component will render the child routes , any children of the Body component */}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
