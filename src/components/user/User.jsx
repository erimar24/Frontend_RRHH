import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../globals/Navbar'
import { Container, Button, Paper, Box } from '@mui/material';
import { getUsers, deactivateUser } from "../../services";
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import BreadCrumbs from '../globals/BreadCrumbs';
import { RotatingLines } from 'react-loader-spinner';
import { Grid } from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const User = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState(null)
    //Estado que manipula la búsqueda 
    const [filter, setFilter] = useState("")
    // Custom hook que permite filtrar candidatos
    const { filteredData } = useFilter(
        filter,
        users,
        ({ username, role }) => `${username} ${role}`
    );

    useEffect(() => {
        async function getData() {
            const result = await getUsers()
            setUsers(result)
        }
        getData()
    }, []);

    const handleSubmit = async (id) => {
        Swal.fire({
            title: 'Eliminar usuario',
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
                await deactivateUser(id)
                // Realizamos la petición al servidor y esperamos (await)
                const updated = users.filter(item => item.id !== id)
                setUsers(updated)
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
            name: "N°",
            cell: (row, index) => index + 1,
            width: "60px"
        },
        {
            name: "Usuario",
            selector: (row) => row.username,
            sortable: true,
            filterable: true,
        },
        {
            name: "",
            sortable: false,
            filterable: false,
            selector: ({ id }) => (
                <div style={{ textAlign: "center" }}>
                    <Button
                        style={{ color: "#1F618D" }}
                        onClick={() => navigate("/crear-usuario/" + id)}>
                        <EditIcon />
                    </Button>

                    <Button
                        style={{ color: "#5F6A6A" }}
                        type="submit"
                        onClick={() => handleSubmit(id)}>
                        <DeleteIcon />
                    </Button>
                </div>
            ),
            style: {
                textAlign: "center"
            }
        }
    ];

    //Nos ayuda a saber en qué lugar del sistema estamos
    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        { label: "Usuarios", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Box sx={{
                    display: "flex",
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
                            onClick={() => navigate("/crear-usuario")}
                            color="success">
                            Agregar usuario
                        </Button>
                    </section>
                </Box>
                <br />
                {/* Si hay registros se genera el dataTable */}
                {users ? <Table columns={columns} data={filteredData} /> :
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

export default User