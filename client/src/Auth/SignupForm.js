import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from '../api/api';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignupForm() {

  const navigate = useNavigate();


  const [formErrors, setFormErrors] = React.useState({
    userName: false,
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      userName: data.get('userName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    // Validate form fields
    const errors = {
      userName: !formData.userName,
      email: !formData.email,
      password: !formData.password,
    };

    setFormErrors(errors);

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error)) {
      return; // Don't proceed with form submission if there are errors
    }

    setIsLoading(true);

    try {
      const response = await registerUser(formData.userName, formData.email, formData.password);
      console.log(response); // Handle the response from the API
      if (response.success) {

        navigate("/login", { replace: true });

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        })

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        error,
        showConfirmButton: false,
        timer: 1500
      })
      console.error(error);
      // Handle the error from the API
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Name"
                  autoFocus
                  error={formErrors.userName}
                  helperText={formErrors.userName ? 'Please enter your name' : ''}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={formErrors.email}
                  helperText={formErrors.email ? 'Please enter a valid email address' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formErrors.password}
                  helperText={formErrors.password ? 'Please enter a password' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
              loadingPosition="start"
              startIcon={isLoading && <CircularProgress size={20} />}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
