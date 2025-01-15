import React from "react";
import {
  Modal,
  Box,
  Tab,
  Tabs,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserModal = () => {
  const [open, setOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTabChange = (event, newValue) => setTabIndex(newValue);

  return (
    <>
      <AccountCircleIcon style={{ cursor: "pointer" }} onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Tabs for Sign In and Register */}
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
          >
            <Tab label="Sign In" />
            <Tab label="Register" />
          </Tabs>

          {/* Tab Content */}
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h6" mb={2}>
                Sign In
              </Typography>
              <TextField
                label="Username or email"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                sx={{ mt: 1 }}
              />
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Login
              </Button>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <Typography variant="h6" mb={2}>
                Register
              </Typography>
              <TextField
                label="Email address"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="I agree to the Privacy Policy"
                sx={{ mt: 1 }}
              />
              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UserModal;
