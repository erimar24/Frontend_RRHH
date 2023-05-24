import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createCandidate, getPositions } from '../../services';
import Navbar from '../globals/Navbar'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Card, CardContent } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const CreateCandidate = () => {
    const navigate = useNavigate()
    const [positions, setPositions] = useState(null)

    useEffect(() => {
        async function getData() {
            const positions = await getPositions()
            setPositions(positions)
        }
        getData()
    }, [])

    //Almacenamos los valores de cada campo
    const [candidate, setCandidate] = useState({
        name: '',
        lastname: '',
        birthdate: '',
        phone: '',
        academic_level: '',
        experience: '',
        // cv: null,
        job_application: null,
        place: '',
        positionId: 1
    });

    //Esta función detecta los cambios en cada uno de los campos
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCandidate({ ...candidate, [name]: value });
    };

    const handleInputChangeFile = (event) => {
        const { name, value, files } = event.target;
        const file = files ? files[0] : null;
      
        setCandidate((prevState) => ({
          ...prevState,
          [name]: file || value,
        }));
      };
      

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (candidate.name === '' || candidate.lastname === '' || candidate.birthdate === '' || candidate.phone === '' ||
            candidate.academic_level === '' || candidate.experience === '' || candidate.cv === undefined ||
            candidate.positionId === '' || candidate.place === '' || candidate.job_application === undefined)
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })
        // Crear FormData para enviar datos y archivo
        const formData = new FormData();
        formData.append("name", candidate.name);
        formData.append("lastname", candidate.lastname);
        formData.append("birthdate", candidate.birthdate);
        formData.append("phone", candidate.phone);
        formData.append("academic_level", candidate.academic_level);
        formData.append("experience", candidate.experience);
        formData.append("positionId", candidate.positionId);
        formData.append("cv", candidate.cv);
        formData.append("job_application", candidate.job_application);
        formData.append("place", candidate.place);

        await createCandidate(formData)

        // Muestra un mensaje de confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Candidato creado exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/candidatos")
    }

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Lista de candidatos",
            url: "/candidatos"
        },
        { label: "Crear candidato", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
                    <CardContent>

                        {positions
                            ?
                            <>
                                <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Agregar Candidato</h4>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Nombre"
                                            required
                                            variant="outlined"
                                            id="name"
                                            name="name"
                                            autoComplete='name'
                                            value={candidate.name}
                                            onChange={handleInputChange}
                                            autoFocus
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            required
                                            label="Apellido"
                                            variant="outlined"
                                            id="lastname"
                                            name="lastname"
                                            autoComplete='lastname'
                                            value={candidate.lastname}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Fecha de nacimiento"
                                            required
                                            variant="outlined"
                                            id="birthdate"
                                            name="birthdate"
                                            placeholder='año-mes-dia'
                                            autoComplete='birthdate'
                                            value={candidate.birthdate}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Teléfono"
                                            required
                                            variant="outlined"
                                            id="phone"
                                            name="phone"
                                            autoComplete='phone'
                                            autoFocus
                                            value={candidate.phone}
                                            onChange={handleInputChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                                            <Select
                                                label="Selecciona el puesto"
                                                value={candidate.positionId}
                                                name="positionId"
                                                variant="outlined"
                                                onChange={handleInputChange}
                                                fullWidth
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Select position' }}>
                                                <MenuItem value="Seleccione el puesto" disabled selected>Seleccione el puesto</MenuItem>
                                                {positions.map((position) => (
                                                    <MenuItem key={position.id} value={position.id}>
                                                        {position.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="CV"
                                            required
                                            variant="outlined"
                                            id="cv"
                                            name="cv"
                                            type="file"
                                            fullWidth
                                            inputProps={{ accept: ".pdf,.docx,.doc" }}
                                            onChange={handleInputChangeFile}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            label="Dirección"
                                            required
                                            variant="outlined"
                                            id="place"
                                            name="place"
                                            autoComplete='place'
                                            value={candidate.place}
                                            onChange={handleInputChange}
                                            multiline
                                            minRows={4}
                                            maxRows={8}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <TextField
                                            label="Solicitud de trabajo"
                                            required
                                            variant="outlined"
                                            id="job_application"
                                            name="job_application"
                                            type="file"
                                            fullWidth
                                            inputProps={{ accept: ".pdf,.docx,.doc" }}
                                            onChange={handleInputChangeFile}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Formación académica"
                                            required
                                            variant="outlined"
                                            id="academic_level"
                                            name="academic_level"
                                            autoComplete='academic_level'
                                            autoFocus
                                            value={candidate.academic_level}
                                            onChange={handleInputChange}
                                            fullWidth
                                            multiline
                                            minRows={4}
                                            maxRows={8}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Experiencia"
                                            required
                                            variant="outlined"
                                            id="experience"
                                            name="experience"
                                            autoComplete='experience'
                                            value={candidate.experience}
                                            onChange={handleInputChange}
                                            multiline
                                            minRows={4}
                                            maxRows={8}
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
                            </Grid>}
                    </CardContent>
                </Card>
            </Container >

        </>
    )
}

export default CreateCandidate;