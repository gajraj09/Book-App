import { auth } from "@/api/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
 

  const mutation = useMutation({
    mutationFn: auth,
    onSuccess: (response) => {
      setUser(response.data);
    },
    onError: (error) => {
      localStorage.removeItem("accessToken");
      navigate("/auth/login");
      console.log("Token validation failed:", error);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    mutation.mutate(token);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      navigate("/auth/login");
      return;
    }
  }, [user]);

  if (mutation.isPending) {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle size={20} className="animate-spin"/>
      </div>
    )
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Outlet context={{ user }} />
    </div>
  );
};

export default DashboardLayout;
