import { useEffect, useState } from "react";
import { Container, Button, Card, CardContent } from '@mui/material';
import Navbar from '../globals/Navbar'
import {
    getEvaluationCById, getEvaluationById,
    createEvaluation, getInterviews, getQuestions
} from '../../services';
import { TextField } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2';
import BreadCrumbs from '../globals/BreadCrumbs';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GeneratePDF from '../globals/GeneratePDF'
import { RotatingLines } from 'react-loader-spinner';

const baseURl = import.meta.env.VITE_URL_API;

const EvaluationCandidate = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [candidate, setCandidate] = useState(null);
    const [previousCV, setPreviousCV] = useState(null);
    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        async function getData() {
            const evaluation = await getEvaluationById(id);
            setEvaluation({
                id: evaluation.id,
                fa_level: evaluation.fa_level,
                fa_ability: evaluation.fa_ability,
                exp_general: evaluation.exp_general,
                exp_spicify: evaluation.exp_spicify,
                interview: evaluation.interview,
                tecnhinal_test: evaluation.tecnhinal_test,
                vacantId: evaluation.vacantId,
                candidateId: evaluation.candidateId,
            })

            const candidate = await getEvaluationCById(evaluation.candidateId);
            setPreviousCV(candidate.cv)
            setCandidate({
                id: candidate.id,
                name: candidate.name,
                lastname: candidate.lastname,
                cv: null,
                experience: candidate.experience,
                positionId: candidate.positionId
            })
        }
        getData()
    }, [id]);

    const createPDF = async () => {
        const questions = await getInterviews();
        const questionTexts = questions.map((question) => question.question);
        GeneratePDF("Entrevista Introductoria", questionTexts);
    };

    const createPDFTT = async () => {
        const questions = await getQuestions(candidate.positionId);
        const questionTexts = questions.map((question) => question.question);
        GeneratePDF("Prueba Técnica", questionTexts);
    };

    const handlePrintClickTT = () => {
        createPDFTT();
    };

    const handlePrintClick = () => {
        createPDF();
    };


    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Vacantes",
            url: "/contratacion"
        },
        { label: "Evaluaciones", url: `/evaluaciones/${evaluation ? evaluation.vacantId : null}` },
        { label: "Evaluación de candidato", url: "#" }
    ];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCandidate({ ...candidate, [name]: value })
        setEvaluation({ ...evaluation, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (evaluation.fa_level === '' || evaluation.fa_ability === '' || evaluation.exp_general === '' ||
            exp_spicify === '' || evaluation.interview === '' || tecnhinal_test === '')
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })

        let response = await createEvaluation(evaluation)
        if (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Datos actualizados correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/evaluaciones/" + evaluation.vacantId)
        }
    }

    const handleDownload = () => {
        window.open(baseURl + "/" + previousCV, '_blank');
    };

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        {
                            candidate && evaluation
                                ?
                                <>
                                    <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Evaluación al Candidato</h4>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                disabled
                                                label="Candidato"
                                                variant="outlined"
                                                id="outlined-disabled"
                                                name="candidate"
                                                autoFocus
                                                defaultValue={candidate.name + ' ' + candidate.lastname}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                disabled
                                                label="Experiencia"
                                                variant="outlined"
                                                id="outlined-disabled"
                                                name="experience"
                                                defaultValue={candidate.experience}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            {!candidate.cv ?
                                                <Button variant="text" size={"large"} onClick={handleDownload}>
                                                    <PictureAsPdfIcon sx={{ mr: 3 }} /> Ver Curriculum</Button>
                                                : null}
                                        </Grid>
                                        <br />
                                        <Grid item xs={12}>
                                            <h2>Evaluación</h2>
                                        </Grid>
                                        <br />

                                        <Grid container>
                                            <Grid container item xs={12} sm={6} style={{ padding: "1rem" }}>
                                                <Grid item xs={12} style={{ marginBottom: "1rem" }}>
                                                    <label htmlFor="">Formación académica</label>
                                                </Grid>
                                                <Grid container item xs={12} spacing={2}>

                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Nivel /20"
                                                            required
                                                            variant="outlined"
                                                            id="fa_level"
                                                            name="fa_level"
                                                            autoComplete='fa_level'
                                                            placeholder='20'
                                                            value={evaluation.fa_level}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Habilidad /20"
                                                            required
                                                            variant="outlined"
                                                            id="fa_ability"
                                                            name="fa_ability"
                                                            autoComplete='fa_ability'
                                                            placeholder='20'
                                                            value={evaluation.fa_ability}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid container item xs={12} sm={6} style={{ padding: "1rem" }}>
                                                <Grid item xs={12} style={{ marginBottom: "1rem" }}>
                                                    <label htmlFor="">Experiencia</label>
                                                </Grid>
                                                <Grid container item xs={12} spacing={2}>

                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="General /15"
                                                            required
                                                            variant="outlined"
                                                            id="exp_general"
                                                            name="exp_general"
                                                            autoComplete='exp_general'
                                                            placeholder='15'
                                                            value={evaluation.exp_general}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <TextField
                                                            label="Específica /25"
                                                            required
                                                            variant="outlined"
                                                            id="exp_spicify"
                                                            name="exp_spicify"
                                                            autoComplete='exp_spicify'
                                                            placeholder='25'
                                                            value={evaluation.exp_spicify}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <br />
                                        <Grid item xs={12} sm={12} md={12}>
                                            <h2>Entrevista</h2>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="Entrevista /15"
                                                required
                                                variant="outlined"
                                                id="interview"
                                                name="interview"
                                                autoComplete='interview'
                                                placeholder='15'
                                                value={evaluation.interview}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <TextField
                                                label="Prueba ténica /5"
                                                required
                                                variant="outlined"
                                                id="tecnhinal_test"
                                                name="tecnhinal_test"
                                                autoComplete='tecnhinal_test'
                                                placeholder='5'
                                                value={evaluation.tecnhinal_test}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Button variant="outlined"
                                                disableElevation
                                                fullWidth
                                                style={{ height: '55px' }}
                                                onClick={() => handlePrintClick()}>
                                                Entrevista introductoria
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                style={{ height: '55px' }}
                                                onClick={() => handlePrintClickTT()}
                                                color="secondary">
                                                Prueba técnica
                                            </Button>
                                        </Grid>
                                        <br />
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


export default EvaluationCandidate