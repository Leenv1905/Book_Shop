import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../protected/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const UserModal = () => {
  const { showLoginModal, setShowLoginModal, handleLoginSuccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    if (savedRememberMe) {
      setRememberMe(true);
      setCredentials({
        email: localStorage.getItem("email") || "",
        password: "", // Không lấy password từ localStorage
      });
    } else {
      setCredentials({ email: "", password: "" });
    }
  }, [showLoginModal]);

  const handleRedirect = (role) => {
    if (role === "ROLE_ADMIN") {
      navigate("/admin");
    } else if (role === "ROLE_USER") {
      navigate(location.pathname);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:6868/api/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      console.log("Login response:", response.data); // Debug

      const { token } = response.data;
      if (token) {
        handleLoginSuccess(token, handleRedirect);

        if (rememberMe) {
          localStorage.setItem("email", credentials.email);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("rememberMe");
        }
      } else {
        setError("Không nhận được token từ server!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <Dialog open={showLoginModal} onClose={() => setShowLoginModal(false)}>
      <DialogContent>
        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {tabIndex === 0 && (
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              sx={{ mb: 2 }}
            />
            {error && <Typography color="error" mt={1}>{error}</Typography>}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box sx={{ p: 2 }}>
            <TextField fullWidth label="Username" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;