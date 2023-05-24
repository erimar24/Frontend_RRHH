import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../globals/Navbar'
import { Container, Button, Paper, Box } from '@mui/material';
import { getPositions, getQuestions, getPositionById } from "../../services";
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from "@mui/material/IconButton";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import BreadCrumbs from '../globals/BreadCrumbs';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrintIcon from '@mui/icons-material/Print';
import GeneratePDF from '../globals/GeneratePDF';
import { RotatingLines } from 'react-loader-spinner';
import { Grid } from "@material-ui/core";

const TechnicalTest = () => {
    const id = useParams()
    const navigate = useNavigate()
    const [positions, setPositions] = useState(null)
    //Estado que manipula la búsqueda 
    const [filter, setFilter] = useState("")
    const [position, setPosition] = useState()
    const [positionName, setPositionName] = useState('');
    // Custom hook que permite filtrar candidatos
    const { filteredData } = useFilter(
        filter,
        positions,
        ({ name, career }) => `${name} ${career}`
    );

    useEffect(() => {
        async function getData() {
            const result = await getPositions()
            setPositions(result)

            const position = await getPositionById(id)
            setPosition({
                id: position.id,
                name: position.name
            });

            setPositionName(position.name);
        }
        getData()
    }, [id]);

    
    const createPDF = async (id) => {
        const questions = await getQuestions(id);
        const questionTexts = questions.map((question) => question.question);
        GeneratePDF("Prueba Técnica", questionTexts);
    };

    const handlePrintClick = (id) => {
        createPDF(id);
    };

    //Datos que se mostrarán en las columnas de dataTable
    const columns = [
        {
            name: "N°",
            cell: (row, index) => index + 1,
            width: "60px"
        },
        {
            name: "Puesto",
            selector: (row) => row.name,
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
                        onClick={() => navigate("/preguntas/" + id)}>
                        <AssignmentIcon />
                    </Button>

                    <Button
                        style={{ color: "#1F618D" }}
                        onClick={() => handlePrintClick(id)}>
                        <PrintIcon />
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
        { label: "Prueba técnica", url: "#" }
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
                </Box>
                <br />
                {/* Si hay registros se genera el dataTable */}
                {positions ? <Table columns={columns} data={filteredData} /> : 
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

export default TechnicalTest