import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { updatePosition, getPositionById } from '../../services';
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


const UpdatePosition = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [position, setPosition] = useState(null);

    useEffect(() => {
        async function getData() {
            const position = await getPositionById(id);
            setPosition({
                id: position.id,
                name: position.name,
                career: position.career,
                academic_level: position.academic_level,
                experience: position.experience,
                description: position.description
            })
        }
        getData()
    }, [id]);

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        {
            label: "Lista de puestos",
            url: "/puestos"
        },
        { label: "Actualizar puesto", url: "#" }
    ];

    //Esta función detecta los cambios en cada uno de los campos, pero como? la variable name es la que captura
    //el nombre del campo del objeto y la variable value captura el valor que tiene ese campo
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPosition({ ...position, [name]: value })
    };

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

        let response = await updatePosition(position)
        if (response)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Datos actualizados correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
        navigate("/puestos")
    }

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Card sx={{ maxWidth: 1000, margin: 'auto', padding: '20px' }}>
                    <CardContent>
                        {position
                            ?
                            <>
                            <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10'}}>Actualización</h4>
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
                                            multiline
                                            minRows={4}
                                            maxRows={8}
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
                                            multiline
                                            fullWidth
                                            minRows={4}
                                            maxRows={8}
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
                                            multiline
                                            fullWidth
                                            minRows={4}
                                            maxRows={8}
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
                                                Actualizar
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

export default UpdatePosition