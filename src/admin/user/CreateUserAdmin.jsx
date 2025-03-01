import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import {
  Box,
  Container,
  Card,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Icon,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Link
} from '@mui/material';
import Grid from '@mui/material/Grid2';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#E1306C',
    },
  },
});

function CreateUserAdmin() {
  const [fullname, setFullName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [datejoin, setDateJoin] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [position, setPosition] = useState('');
  const [gender, setGender] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/phpm/CreateUserAdmin.php', { fullname, birthday, phonenumber, email, address, datejoin, username, password, status, position, gender });
      if (response.data.success) {
        setSuccess('Registration successful');
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: 'url(https://obi.vn/wp-content/uploads/2023/02/top-50-y-tuong-hinh-nen-trang-dep-tinh-khoi-cuc-ky-doc-dao_1.jpg)', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'rgba(227, 244, 251, 0.5)',
        }}></div>
        <Container maxWidth="lg" sx={{
          backgroundColor: 'rgba(31, 81, 93, 0.1)',
          padding: 5,
          borderRadius: 2,
          textAlign: 'center',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}>
          <Typography variant="h4" component="h1" gutterBottom color="#0c4646">Form Create New User</Typography>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          {success && <Typography variant="body2" color="primary">{success}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="stretch" justifyContent="center">
              <Grid item xs={12} sm={6} >
                <Grid marginBottom={1}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    margin="normal"
                    placeholder="Lee Jung Ze"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Grid>
                <Grid marginBottom={1}>
                  <TextField
                    fullWidth
                    label="Birthday"
                    margin="normal"
                    placeholder="Birthday User"
                    variant="outlined"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    margin="normal"
                    placeholder="Phone Number Of Staff"
                    variant="outlined"
                    type="number"
                    required
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
              </Grid>


              <Grid item xs={12} sm={6}>
                <Grid marginBottom={1}>
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    placeholder="LeeJungZe@example.com"
                    variant="outlined"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid marginBottom={1}>
                  <TextField
                    fullWidth
                    label="Address"
                    margin="normal"
                    variant="outlined"
                    required
                    placeholder="136 Quang Trung, Hai Ba Trung, Ha Noi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>

                <Grid>
                  <TextField
                    fullWidth
                    label="Date Join Company"
                    margin="normal"
                    placeholder="Date Join Company"
                    variant="outlined"
                    type="date"
                    value={datejoin}
                    onChange={(e) => setDateJoin(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>


              <Grid item xs={12} sm={6}>
                <Grid marginBottom={1}>
                  <TextField
                    fullWidth
                    label="Username"
                    placeholder="Administrator Login Name"
                    variant="outlined"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Grid>

                <Grid marginBottom={1}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Grid>

                <Grid>
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid >

                  <FormControl component="fieldset" margin="normal" required>
                    <FormLabel component="legend" sx={{ color: 'black' }}>Status</FormLabel>
                    <RadioGroup
                      row
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <FormControlLabel value="Active" control={<Radio />} label="Active" />
                      <FormControlLabel value="Suspended" control={<Radio />} label="Holiday" />
                      <FormControlLabel value="Canceled" control={<Radio />} label="Block" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid >
                  <FormControl component="fieldset" margin="normal" required>
                    <FormLabel component="legend" sx={{ color: 'black' }}>Company Position</FormLabel>
                    <RadioGroup
                      row
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    >
                      <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
                      <FormControlLabel value="IT" control={<Radio />} label="IT" />
                      <FormControlLabel value="Staff" control={<Radio />} label="Staff" />
                      <FormControlLabel value="Accountant" control={<Radio />} label="Accountant" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid>
                  <FormControl component="fieldset" margin="normal" required>
                    <FormLabel component="legend" sx={{ color: 'black' }}>Gender</FormLabel>
                    <RadioGroup
                      row
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel value="preferNotToSay" control={<Radio />} label="Prefer not to say" />
                    </RadioGroup>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>


            <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">


              <Button
                type="submit"
                // fullWidth
                variant="contained"
                color="primary"
                sx={{ paddingY: 1.5, fontSize: '16px', mt: 2 }}
              >
                Create User
              </Button>

            </Grid>


          </form>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default CreateUserAdmin;
