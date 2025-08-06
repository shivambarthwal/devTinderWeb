import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection); // ✅ This has the data
  console.log("Connections:", connections);
  const dispatch = useDispatch();

  const fetchConnectionData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      // ✅ Correctly dispatch the array
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnectionData();
  }, []);

  // ✅ Check connections, NOT the function
  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold">No Connections found</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Connections</h1>
      <div className="flex  items-center justify-center flex-wrap gap-4 p-4 ">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="card w-96 bg-base-100 shadow-xl my-4 border border-green-100"
          >
            <div className="card-body flex flex-col items-center">
              <img
                src={connection?.photoUrl}
                alt={connection?.firstName}
                className="rounded-full w-48 h-48 object-cover"
              />
              <h2 className="card-title">
                {connection?.firstName} {connection?.lastName}
              </h2>
              <p>Age : {connection?.age}</p>
              <p>Profile : {connection?.about}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Connection;
