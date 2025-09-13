import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin-login";
import AdminPanel from "@/components/admin-panel";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<{ id: string; username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Simple token validation - in production, you'd want to verify with server
      try {
        setIsAuthenticated(true);
        // You could decode JWT to get admin info, for now we'll use a default
        setAdmin({ id: "1", username: "admin" });
      } catch (error) {
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
      }
    }
  }, []);

  const handleLogin = (token: string, adminData: { id: string; username: string }) => {
    setIsAuthenticated(true);
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminPanel admin={admin!} onLogout={handleLogout} />;
}