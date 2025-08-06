import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Request sent successfully:", res.data);
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-sm w-full">
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-200 hover:shadow-2xl transition transform hover:scale-105">
        {/* Profile Image */}
        <img
          src={user?.photoUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-500 shadow-md"
        />

        {/* User Info */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-500">
          {user?.age ? `${user.age} years old` : "Age not available"}
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          {user?.about || "No description available."}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={() => handleSendRequest("ignored", user?._id)}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition cursor-pointer"
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", user?._id)}
            className="px-5 py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition cursor-pointer"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
