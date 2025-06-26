import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase"; // adjust the path
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) return null;

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
      <h1 className="text-lg font-bold">Task System</h1>
      <div className="flex items-center space-x-4">
        <span>{user.displayName || user.email}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
