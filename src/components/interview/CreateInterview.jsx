import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createInterview } from '../../services';
import Navbar from '../globals/Navbar'
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { Card, CardContent } from '@mui/material';

const CreateInterview = () => {
    const navigate = useNavigate()

    //Capturamos y almacenmos los valores de cada campo
    const [interview, setInterview] = useState({
        question: "",
        score: ""
    });

    //Esta función detecta los cambios en cada uno de los campos
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInterview({ ...interview, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (interview.question === '' || interview.score === '')
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })
        await createInterview(interview)

        //Limpiar las casillas
        setInterview({
            question: '',
            score: ''
        });

        //Muestra un mensaje de confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Pregunta creada exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/entrevistas")
    }

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Lista de preguntas",
            url: "/entrevistas"
        },
        { label: "Crear pregunta", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Crear pregunta</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={8}>
                                <TextField
                                    label="Pregunta"
                                    required
                                    variant="outlined"
                                    id="question"
                                    name="question"
                                    autoComplete='question'
                                    value={interview.question}
                                    onChange={handleInputChange}
                                    autoFocus
                                    multiline
                                    minRows={4}
                                    maxRows={8}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Valor/Puntaje"
                                    required
                                    variant="outlined"
                                    id="score"
                                    name="score"
                                    autoComplete='score'
                                    value={interview.score}
                                    onChange={handleInputChange}
                                    autoFocus
                                    fullWidth
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

export default CreateInterview