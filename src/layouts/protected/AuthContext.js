// Context được sử dụng để quản lý trạng thái xác thực (authentication state)
import React, { createContext, useState, useEffect, useContext } from "react";
import { getRolesFromToken, getEmailFromToken, isTokenExpired } from "./jwtUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return token && !isTokenExpired(token);
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return token ? getRolesFromToken(token) : null;
  });
  const [userEmail, setUserEmail] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return token ? getEmailFromToken(token) : null;
  });
  // Trạng thái cho Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // Có thể là "error", "warning", "info", "success"
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, []);

  const handleLoginSuccess = (token, onRedirect) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    setShowLoginModal(false);

    const role = getRolesFromToken(token);
    const email = getEmailFromToken(token);
    setUserRole(role);
    setUserEmail(email);

    if (onRedirect) {
      onRedirect(role);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginModal(false);
    setUserRole(null);
    setUserEmail(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("rememberMe");
  };

  // Hàm để hiển thị thông báo lỗi
  const showError = (message) => {
    setSnackbar({ open: true, message, severity: "error" });
  };

  // Hàm để đóng Snackbar
  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        showLoginModal,
        setShowLoginModal,
        userRole,
        userEmail,
        handleLoginSuccess,
        handleLogout,
        showError,
        snackbar,
        closeSnackbar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);