import React from "react";
import { LogOutUser } from "./api/api";

const LogOut = () => {
  const handleLogout = async () => {
    try {
      await LogOutUser();
      alert("LogOut successful");
    } catch (error) {
      console.error("LogOut Error:", error);
      alert("LogOut failed. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogOut;
