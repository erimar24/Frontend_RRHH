import { useEffect, useState } from "react";
import {
    getEvaluations,
    deactivateCandidateEvaluation,
    getReport
} from "../../services";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../globals/Navbar';
import { Container, Button, Paper, Box } from '@mui/material'
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BreadCrumbs from '../globals/BreadCrumbs';
import AvailableCandidates from "./AvailableCandidates";
import Swal from 'sweetalert2';
import Report from './Report'

const Evaluation = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isModalOpen, setIsOpenModal] = useState(false);
    const [refreshData, setRefreshData] = useState(false)
    const [evaluations, setEvaluations] = useState(null);
    const [filter, setFilter] = useState("");
    const { filteredData } = useFilter(
        filter,
        evaluations,
        ({ Candidato, vacancy_title }) => `${Candidato} ${vacancy_title} `
    );

    useEffect(() => {
        // Obteniendo los registros disponibles de esta vacante (buscando en la tabla de evaluaciones en realidad)
        async function getData() {
            const evaluations = await getEvaluations(id)
            setEvaluations(evaluations)
        }
        getData()
    }, [id, refreshData])


    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const handleRefreshData = () => {
        setRefreshData(!refreshData)
    }

    const handleSubmit = async (id) => {
        Swal.fire({
            title: 'Eliminar candidato',
            text: "¿Está seguro de que desea eliminar a este candidato?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16A085',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then(async (result) => {
            // Si el usuario acepta procedemos a eliminar
            if (result.isConfirmed) {
                // Realizamos la petición al servidor y esperamos (await)
                await deactivateCandidateEvaluation(id)
                // Realizamos la petición al servidor y esperamos (await)
                const updated = evaluations.filter(item => item.id !== id)
                setEvaluations(updated)
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

    const createReport = async (id) => {
        const reports = await getReport(id);
        const vacant = reports[0].vacancy_title;
        Report("Reporte de evaluación", sortingEvaluations(reports), vacant);
    };

    const sortingEvaluations = (array) => {
        let aux;
        
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                if (array[i].Qualification > array[j].Qualification) {
                    aux = array[i]
                    array[i] = array[j]
                    array[j] = aux;
                }
            }
        }
        return array
    }

    const handlePrintClick = (id) => {
        createReport(id);
    };

    const columns = [
        {
            name: "N°",
            cell: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Candidato",
            selector: (row) => row.Candidato,
            sostable: true,
            filterable: true
        },
        {
            name: "Acciones",
            sortable: false,
            filterable: false,
            selector: ({ id }) => (
                <div style={{ textAlign: "center" }}>

                    <Button
                        style={{ color: "#1F618D" }}
                        onClick={() => navigate("/evaluacion/" + id)}>
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

    const breadcrumbs = [
        { label: "Inicio", url: "/" },
        { label: "Vacantes", url: "/vacantes" },
        { label: "Evaluaciones", url: "#" }
    ];

    return (
        <>
            <Navbar />
            <Container>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                {
                    evaluations
                        ?
                        <>
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
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, marginTop: '8px' }}
                                        variant="contained"
                                        onClick={handleOpenModal}
                                        color="success">
                                        Agregar Candidato
                                    </Button>
                                    <Button
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, marginTop: '8px' }}
                                        variant="contained"
                                        onClick={() => handlePrintClick(id)}
                                        color="success">
                                        Generar Reporte
                                    </Button>
                                </section>
                            </Box>
                            <br />
                            {/* Si hay registros se genera el dataTable */}
                            {evaluations ? <Table columns={columns} data={filteredData} /> : <p>Cargando...</p>}
                        </>
                        :
                        <p>
                            Cargando...
                        </p>}
            </Container>

            <AvailableCandidates
                isModalOpen={isModalOpen} 
                handleCloseModal={handleCloseModal} 
                vacantId={id}
                handleRefreshData={handleRefreshData} />
        </>
    )
}

export default Evaluation