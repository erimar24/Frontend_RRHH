import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { updateQuestion, getQuestionById } from '../../services';
import BreadCrumbs from '../globals/BreadCrumbs';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../globals/Navbar'
import { Button } from '@mui/material'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import { Card, CardContent } from '@mui/material';

const UpdateQuestion = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [navPI, setNavPI] = useState(null);

    useEffect(() => {
        async function getData() {
            const question = await getQuestionById(id)
            setQuestion({
                id: question.id,
                question: question.question,
                score: question.score,
            })

            const navPI = await getQuestionById(id)
            setNavPI({
                positionId: navPI.positionId
            })
        }
        getData()
    }, [id]);

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Pruebas técnicas",
            url: "/pruebasTecnicas"
        },
        {
            label: "Preguntas",
            url: `/preguntas/${id}`
        },
        { label: "Actualizar pregunta", url: "#" }
    ];

    //Esta función detecta los cambios
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuestion({ ...question, [name]: value })
    };

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

        let response = await updateQuestion(question)
        if (response)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Datos actualizados correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
        navigate(`/preguntas/${navPI.positionId}`)
    }

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        {
                            question
                                ?
                                <>
                                <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10'}}>Actualización</h4>
                                <Grid container spacing={2}>
                                        <h2>{ }</h2>
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
                                                    Actualizar
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={2}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => navigate(`/preguntas/${navPI.positionId}`)}
                                                    color="error">
                                                    Cancelar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                                : <Grid container style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: `35vh`
                                }}>
                                    <RotatingLines
                                        strokeColor="#007b31"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                    />
                                </Grid>
                        }
                    </CardContent>
                </Card>
            </Container>
        </>
    )

}

export default UpdateQuestion;