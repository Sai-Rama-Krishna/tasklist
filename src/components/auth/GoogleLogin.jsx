import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, provider, db } from "../../../firebase";

const GoogleLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth, "auth");
  }, []);

  const handleGoogleLogin = async () => {
    setError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // ✅ Existing user, get role and redirect
        const userData = snapshot.val();
        const role = userData.userType || "client";
        alert(`Welcome back, ${user.displayName}!`);
        navigate(`/${role}-dashboard`);
      } else {
        // 🆕 New user — assign default role (e.g., client)
        const defaultRole = "client"; // or "employee", based on your logic

        await set(userRef, {
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          userType: defaultRole,
          createdAt: new Date().toISOString(),
        });

        alert("Account created successfully!");
        navigate(`/${defaultRole}-dashboard`);
      }
    } catch (err) {
      setError("Google Sign-In failed: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          background: "#4285F4",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default GoogleLogin;
