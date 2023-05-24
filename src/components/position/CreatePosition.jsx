import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createPosition } from '../../services';
import Navbar from '../globals/Navbar'
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { Card, CardContent } from '@mui/material';


const CreatePosition = () => {
    const navigate = useNavigate()

    //Almacenamos los valores de cada campo
    const [position, setPosition] = useState({
        name: '',
        career: '',
        academic_level: '',
        experience: '',
        description: ''
    });

    //Esta función detecta los cambios en cada uno de los campos
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPosition({ ...position, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (position.name === '' || position.career === '' ||
            position.academic_level === '' || position.experience === '' || position.description === '')
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })

        await createPosition(position)

        // Muestra un mensaje de confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Puesto creado exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/puestos")
    }

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Lista de puestos",
            url: "/puestos"
        },
        { label: "Crear puesto", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 1000, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Creación de puesto</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Puesto"
                                    required
                                    variant="outlined"
                                    id="name"
                                    name="name"
                                    autoComplete='name'
                                    value={position.name}
                                    onChange={handleInputChange}
                                    autoFocus
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Carrera"
                                    required
                                    variant="outlined"
                                    id="career"
                                    name="career"
                                    autoComplete='career'
                                    value={position.career}
                                    onChange={handleInputChange}
                                    autoFocus
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Experiencia"
                                    required
                                    variant="outlined"
                                    id="experience"
                                    name="experience"
                                    autoComplete='experience'
                                    value={position.experience}
                                    onChange={handleInputChange}
                                    autoFocus
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    label="Formación académica"
                                    required
                                    variant="outlined"
                                    id="academic_level"
                                    name="academic_level"
                                    autoComplete='academic_level'
                                    autoFocus
                                    value={position.academic_level}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    maxRows={8}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    label="Descripción"
                                    required
                                    variant="outlined"
                                    id="description"
                                    name="description"
                                    autoComplete='description'
                                    autoFocus
                                    value={position.description}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    maxRows={8}
                                />
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
            </Container>
        </>
    )
}

export default CreatePosition