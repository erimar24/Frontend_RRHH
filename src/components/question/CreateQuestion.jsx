import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createQuestion, getPositionById } from '../../services';
import Navbar from '../globals/Navbar'
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import { Card, CardContent } from '@mui/material';


const CreateQuestion = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [position, setPosition] = useState()
    const [positionName, setPositionName] = useState('');

    useEffect(() => {
        async function getData() {
            const position = await getPositionById(id)
            setPosition({
                id: position.id,
                name: position.name
            });

            setPositionName(position.name);
            
        }
        getData()
    }, [id])

    const [question, setQuestion] = useState({
        question: '',
        score: '',
    })

    //Esta función detecta los cambios en cada uno de los campos
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (question.question === '' || question.score === '')
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })
        await createQuestion(id, question)

        // Muestra un mensaje de confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Pregunta creada exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/preguntas/" + position.id)

    }

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Pruebas técnicas",
            url: "/pruebasTecnicas"
        },
        {
            label: "Preguntas",
            url: `/preguntas/${position ? position.id : null}`
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
                        <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Pregunta para {positionName} </h4>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={8}>
                                <TextField
                                    label="Pregunta"
                                    required
                                    variant="outlined"
                                    id="question"
                                    name="question"
                                    autoComplete='question'
                                    value={question.question}
                                    onChange={handleInputChange}
                                    autoFocus
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    label="Valor"
                                    required
                                    variant="outlined"
                                    id="score"
                                    name="score"
                                    autoComplete='score'
                                    value={question.score}
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

export default CreateQuestion