import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../utils/constants";

const plans = [
  {
    name: "silver",
    price: "₹199 / month",
    features: [
      "5 profile boosts per month",
      "Basic priority in search results",
      "Ad-free experience",
    ],
    color: "border-gray-400",
  },
  {
    name: "gold",
    price: "₹399 / month",
    features: [
      "Unlimited profile boosts",
      "High priority in search results",
      "See who viewed your profile",
      "Ad-free experience",
    ],
    color: "border-yellow-500",
  },
  {
    name: "diamond",
    price: "₹699 / month",
    features: [
      "Everything in Gold",
      "Top placement in matches",
      "Exclusive badge on profile",
      "Early access to new features",
    ],
    color: "border-blue-500",
  },
];

const HandleBuy = async (type) => {
  const { data: order } = await axios.post(
    API_BASE_URL + "/payment/create",
    { membershipType: type },
    { withCredentials: true }
  );
  // to open the razorpay payment page

  const options = {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    name: "DevTinder",
    order_id: order.orderId,
    prefill: {
      name: `${order.notes.firstName} ${order.notes.lastName}`,
      email: order.notes.email,
    },
    theme: {
      color: "#fbbf24",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const Premium = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center">Premium Plans</h1>
      <p className="text-center mt-2 text-gray-300">
        Upgrade to unlock exclusive features that enhance your DevTinder
        experience.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border-2 rounded-xl p-6 hover:shadow-xl transition ${plan.color}`}
          >
            <h2 className="text-xl font-bold text-center">{plan.name}</h2>
            <p className="text-center text-lg mt-1">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan?.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  ✅ <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full cursor-pointer mt-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
              onClick={() => HandleBuy(plan.name.toLowerCase())}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
