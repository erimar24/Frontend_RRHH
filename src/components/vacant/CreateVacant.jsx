import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card, CardContent } from '@mui/material'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { createVacant, getPositions } from '../../services';
import Navbar from '../globals/Navbar'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const CreateVacant = () => {
    const [positions, setPositions] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const positions = await getPositions()
            setPositions(positions)
        }
        getData()
    }, [])

    const [vacant, setVacant] = useState({
        vacancy_title: "",
        description: "",
        positionId: 1
    });

    //Esta función detecta los cambios en cada uno de los campos
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVacant({ ...vacant, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (vacant.vacancy_title === '' || vacant.description === '' || vacant.positionId === '')
            return Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '¡Verifique que todas las casillas estén llenas!',
                showConfirmButton: false,
                timer: 1500
            })
        await createVacant(vacant)

        // Muestra un mensaje de confirmación
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Vacante creada exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/vacantes")
    }

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Lista de vacantes",
            url: "/vacantes"
        },
        { label: "Crear vacante", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        {
                            positions
                                ?
                                <>
                                    <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10'}}>Crear vacante</h4>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                                                <Select
                                                    label="Selecciona el puesto"
                                                    value={vacant.positionId}
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
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField
                                                label="Vacante"
                                                required
                                                variant="outlined"
                                                id="vacancy_title"
                                                name="vacancy_title"
                                                autoComplete='vacancy_title'
                                                autoFocus
                                                value={vacant.vacancy_title}
                                                onChange={handleInputChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={12}>
                                            <TextField
                                                label="Descripción"
                                                required
                                                variant="outlined"
                                                id="description"
                                                name="description"
                                                autoComplete='description'
                                                autoFocus
                                                value={vacant.description}
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
            </Container>
        </>
    )

}

export default CreateVacant;