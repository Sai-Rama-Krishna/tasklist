import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../../../firebase"; // adjust path

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userType = snapshot.val().userType;

          // Redirect based on role
          if (userType === "admin") {
            navigate("/AdminDashboard");
          } else if (userType === "employee") {
            navigate("/employee-dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          console.warn("User record not found in DB.");
        }
      }
    });

    return () => unsubscribe(); // cleanup
  }, [navigate]);

  return null; // no UI needed
};

export default AuthRedirect;
