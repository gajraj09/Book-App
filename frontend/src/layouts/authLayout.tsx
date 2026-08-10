import { auth } from "@/api/api";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const validateToken = async () => {
      try {
        await auth(token);
      } catch (error) {
        localStorage.removeItem("accessToken");
        console.log("Token validation failed:", error);
        navigate("/auth/login");
      }
    };

    validateToken();
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
