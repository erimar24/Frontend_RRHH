import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../globals/Navbar'
import { Container, Button, Paper, Box } from '@mui/material';
import { getVacants, deactivateVacant } from "../../services";
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import { Grid } from '@material-ui/core';
import GroupsIcon from '@mui/icons-material/Groups';

const Vacant = () => {
    const navigate = useNavigate()
    const [vacants, setVacants] = useState(null)
    //Estado que manipula la búsqueda 
    const [filter, setFilter] = useState("")
    // Custom hook que permite filtrar las vacantes
    const { filteredData } = useFilter(
        filter,
        vacants,
        ({ vacancy_title, position }) => `${vacancy_title} ${position}`
    );

    useEffect(() => {
        async function getData() {
            const result = await getVacants()
            setVacants(result)
        }
        getData()
    }, []);

    const handleSubmit = async (id) => {
        Swal.fire({
            title: 'Eliminar vacante',
            text: "¿Está seguro de que desea eliminarlo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16A085',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then(async (result) => {
            // Si el usuario acepta procedemos a eliminar
            if (result.isConfirmed) {
                // Realizamos la petición al servidor y esperamos (await)
                await deactivateVacant(id)
                // Actualizamos el estado filtrando el id eliminado
                const updated = vacants.filter(item => item.id !== id)
                setVacants(updated)
                // Mostramos el mensaje de que todo salió bien
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Se ha eliminado correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    //Datos que se mostrarán en las columnas de dataTable
    const columns = [
        {
            name: "No°",
            cell: (row, index) => index + 1,
            width: "60px"
        },
        {
            name: "Vacante",
            selector: (row) => row.vacancy_title,
            sortable: true,
            filterable: true,
        },
        {
            name: "Puesto",
            selector: (row) => row.position,
            sortable: true,
            filterable: true,
        },
        {
            name: "Acciones",
            sortable: false,
            filterable: false,
            selector: ({ id }) => (
                <div style={{ textAlign: "center" }}>
                    <Button
                        style={{ color: "#1F618D" }}
                        onClick={() => navigate("/crear-vacante/" + id)}>
                        <EditIcon />
                    </Button>

                    <Button
                        style={{ color: "#5F6A6A" }}
                        type="submit"
                        onClick={() => handleSubmit(id)}>
                        <DeleteIcon />
                    </Button>

                    <Button
                        style={{ color: "#5F6A6A" }}
                        type="submit"
                        onClick={() => navigate("/evaluaciones/" + id)}>
                        <GroupsIcon />
                    </Button>
                </div>
            ),
            style: {
                textAlign: "center"
            }
        }
    ];

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        { label: "Lista de vacantes", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: ['column', 'row'],
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <section>
                        {/* Input de busqueda */}
                        <Paper
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}>
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                type="text"
                                placeholder="Buscar"
                                name="filteredText"
                                value={filter}
                                onChange={(e) => setFilter(e.currentTarget.value)}
                            />
                        </Paper>
                    </section>

                    <section>
                        <Button
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 100, marginTop: '8px' }}
                            variant="contained"
                            onClick={() => navigate("/crear-vacante")}
                            color="success">
                            Nuevo
                        </Button>
                    </section>
                </Box>
                <br />
                {/* Si hay registros se genera el dataTable */}
                {vacants ? <Table columns={columns} data={filteredData} /> :
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
            </Container>
        </>
    )

}

export default Vacant