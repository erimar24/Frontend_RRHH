import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateInterview, getInterviewById } from '../../services';
import BreadCrumbs from '../globals/BreadCrumbs';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../globals/Navbar';
import { Button } from '@mui/material';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import swal from 'sweetalert';
import { RotatingLines } from 'react-loader-spinner';
import { Card, CardContent } from '@mui/material';


const UpdateInterview = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [interview, setInterview] = useState(null);

    useEffect(() => {
        async function getData() {
            const interview = await getInterviewById(id);
            setInterview({
                id: interview.id,
                question: interview.question,
                score: interview.score
            })
        }
        getData()
    }, [id]);

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Preguntas de entrevista",
            url: "/entrevistas"
        },
        { label: "Actualizar pregunta", url: "#" }
    ];

    //Esta función detecta los cambios
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInterview({ ...interview, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (interview.question === '' || interview.score === '')
            return swal("Verifique las casillas estén llenas", "", "warning")

        await updateInterview(interview)

        swal("La pregunta ha sido actualizada corretamente", "", "success");
        navigate("/entrevistas")
    }

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
                    <CardContent>

                        {interview
                            ?
                            <>
                            <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10'}}>Actualización</h4>
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
                            </>
                            :
                            <Grid container style={{
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

export default UpdateInterview
