import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import {
  Button, TextField, CssBaseline,
  Link, Paper, Box, Grid, Typography,
  createTheme, ThemeProvider
} from "@mui/material";
import Swal from 'sweetalert2';
import CardMedia from '@mui/material/CardMedia';
import fondo from '../assets/images/fondo.jpg'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Derechos reservados © COHORSIL '}
      <Link color="inherit" href="https://www.cohorsil.hn/">
        Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { handleSignIn, isLoggedIn$ } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const subscription = isLoggedIn$.subscribe((isAuth) => {
      if (isAuth) navigate("/")
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn$])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || password === '')
      return Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '¡Verifique que todas las casillas estén llenas!',
        showConfirmButton: false,
        timer: 1500
      })

    const result = await handleSignIn(username, password);
    if (result && result.hasOwnProperty("success") && !result.success)
      return setError(result.message);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${fondo})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                <img src="https://www.cohorsil.hn/wp-content/uploads/elementor/thumbs/logo-letras-negras-pjzia89dqu98tdpd5oyljntquvnhv96216pugsas4c.png" alt="" />
              </Typography>

              {error ? <p>{error}!</p> : null}

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  sx={{ width: 370 }}
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <div style={{ textAlign: "center" }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    sx={{ width: 370 }}
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    fullWidth
                    color="success"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: 200 }}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default SignIn