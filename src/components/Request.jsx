import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  console.log("Requests:", requests);
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = React.useState(false);

  const RequestData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/requests/recevied`, {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    RequestData();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-center">No Request found</h1>
      </div>
    );
  }

  const handleRequest = async (status, requestId) => {
    try {
      const res =  axios.post(
        `${API_BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-2">Requests</h1>
      <div className="flex items-center justify-center flex-wrap gap-4 p-4">
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, about } =
            request?.fromUserId || {};
          return (
            <div
              key={index}
              className="card w-96 bg-base-100 shadow-xl my-4 border border-amber-400"
            >
              <div className="card-body flex flex-col items-center">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="rounded-full w-48 h-48 object-cover"
                />
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>
                <p>Profile : {about}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRequest("accepted", request?._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRequest("rejected", request?._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Request;
