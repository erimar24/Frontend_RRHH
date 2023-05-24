import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createUser } from '../../services';
import Navbar from '../globals/Navbar'
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Card, CardContent } from '@mui/material';

const CreateUser = () => {
    const navigate = useNavigate()

    //Almacenamos los valores de cada campo
    const [user, setUser] = useState({
        username: '',
        password: '',
        role: '',
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //Esta función detecta los cambios en cada uno de los campos
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.username === '' || user.password === '' || user.role === '')
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })

        await createUser(user)

        // Muestra un mensaje de confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Usuario creado exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/usuarios")
    }

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Lista de usuarios",
            url: "/usuarios"
        },
        { label: "Crear usuario", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 900, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Crear usuario</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                    <Select
                                        label="Selecciona el rol"
                                        value={user.role}
                                        name="role"
                                        variant="outlined"
                                        onChange={handleInputChange}
                                        fullWidth
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Select role' }}>
                                        <MenuItem value={10}>admin</MenuItem>
                                        <MenuItem value={20}>empleado</MenuItem>

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Nombre de usuario"
                                    required
                                    variant="outlined"
                                    id="username"
                                    name="username"
                                    autoComplete='username'
                                    value={user.username}
                                    onChange={handleInputChange}
                                    autoFocus
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Contraseña"
                                        required
                                        fullWidth
                                        value={user.password}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid container spacing={2} alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                                <Grid item xs={12} sm={3} md={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="success"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={3} md={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="error">
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            </Container >
        </>
    )
}

export default CreateUser