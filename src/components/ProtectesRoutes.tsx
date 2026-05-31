import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { validateToken } from "@/api/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("authToken");
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const runValidation = async () => {
      if (!token) {
        setIsValid(false);
        setIsChecking(false);
        return;
      }

      const skipValidateOnce = localStorage.getItem("skipValidateOnce");
      if (skipValidateOnce === "true") {
        localStorage.removeItem("skipValidateOnce");
        setIsValid(true);
        setIsChecking(false);
        return;
      }

      try {
        const res = await validateToken();
        if (typeof res?.success === "boolean") {
          setIsValid(res.success);
        } else {
          setIsValid(true);
        }
      } catch {
        // Do not block login on transient validate endpoint failures.
        setIsValid(true);
      } finally {
        setIsChecking(false);
      }
    };

    runValidation();
  }, [token]);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (isChecking) {
    return null;
  }

  if (!isValid) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("name");
    return <Navigate to="/auth" replace />;
  }

  return children;
}
