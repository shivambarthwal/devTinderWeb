import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const feedData = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    feedData();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-500 text-lg">No users available in the feed.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
