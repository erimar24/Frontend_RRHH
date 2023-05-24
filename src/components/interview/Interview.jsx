import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../globals/Navbar';
import { Container, Button, Paper, Box } from '@mui/material';
import { getInterviews, deactivateInterview } from '../../services';
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { Grid } from '@material-ui/core';
import PrintIcon from '@mui/icons-material/Print';
import GeneratePDF from '../globals/GeneratePDF';
import { RotatingLines } from 'react-loader-spinner';

const Interview = () => {
    const navigate = useNavigate()
    const [interviews, setInterviews] = useState(null);
    //Estado de filtro de busqueda 
    const [filter, setFilter] = useState("");
    //Custom hook que permite filtrar las entrevistas
    const { filteredData } = useFilter(
        filter,
        interviews,
        ({ question, score }) => `${question} ${score}`
    );

    useEffect(() => {
        async function getData() {
            const result = await getInterviews()
            setInterviews(result)
        }
        getData()
    }, []);

    const createPDF = async () => {
        const questions = await getInterviews();
        const questionTexts = questions.map((question) => question.question);
        GeneratePDF("Entrevista Introductoria", questionTexts);
    };

    const handlePrintClick = () => {
        createPDF();
    };

    const handleSubmit = async (id) => {
        Swal.fire({
            title: 'Eliminar pregunta',
            text: "¿Está seguro de que desea eliminarlo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16A085',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deactivateInterview(id)
                const updated = interviews.filter(item => item.id !== id)
                setInterviews(updated)
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


    //Datos que se mostraran en las columnas de la tabla
    const columns = [
        {
            name: "N°",
            cell: (row, index) => index + 1,
            with: "60px",
        },
        {
            name: "Título de la vacante",
            selector: (row) => row.question,
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
                        onClick={() => navigate("/crear-pregunta/" + id)}>
                        <EditIcon />
                    </Button>

                    <Button
                        style={{ color: "#5F6A6A" }}
                        type="submit"
                        onClick={() => handleSubmit(id)}
                    >
                        <DeleteIcon />
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
        { label: "Preguntas de entrevista", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Box sx={{
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
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 140, marginTop: '8px' }}
                            variant="contained"
                            onClick={() => navigate("/crear-preguntaI")}
                            color="success">
                            Nuevo
                        </Button>
                        <Button
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 140, marginTop: '8px' }}
                            variant="contained"
                            onClick={() => handlePrintClick()}
                            color="success">
                            <PrintIcon />
                              Imprimir
                        </Button>
                    </section>
                </Box>
                <br />
                {/* Si hay registros se genera el dataTable */}
                {interviews ? <Table columns={columns} data={filteredData} /> :
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

export default Interview