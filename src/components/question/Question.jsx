import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../globals/Navbar'
import { Container, Button, Paper, Box } from '@mui/material';
import { deactivateQuestion, getQuestions, getPositionById } from "../../services";
import { useParams } from 'react-router-dom';
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

const Question = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [questions, setQuestions] = useState(null)
  const [filter, setFilter] = useState("")
  const [position, setPosition] = useState()
  const [positionName, setPositionName] = useState('');

  // Custom hook que permite filtrar candidatos
  const { filteredData } = useFilter(
    filter,
    questions,
    ({ question, score }) => `${question} ${score}`
  );

  useEffect(() => {
    async function getData() {
      const questions = await getQuestions(id)
      setQuestions(questions);

      const position = await getPositionById(id)
      setPosition({
          id: position.id,
          name: position.name
        });

      setPositionName(position.name);
    }
    getData();
  }, [id]);

  const handleSubmit = async (id) => {
    Swal.fire({
      title: 'Eliminar pregunta',
      text: "¿Está seguro de que desea eliminarla?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16A085',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then(async (result) => {
      // Si el usuario acepta procedemos a eliminar
      if (result.isConfirmed) {
        // Realizamos la petición al servidor y esperamos (await)
        await deactivateQuestion(id)
        // Realizamos la petición al servidor y esperamos (await)
        const updated = questions.filter(item => item.id !== id)
        setQuestions(updated)
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

  //Datos que se mostrarán en las columnas de la tabla
  const columns = [
    {
      name: "N°",
      cell: (row, index) => index + 1,
      width: "60px"
    },
    {
      name: "Pregunta",
      selector: (row) => row.question,
      sortable: true,
      filterable: true,
    },
    {
      name: "Valor",
      selector: (row) => row.score,
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
            onClick={() => navigate("/crear-preguntaTT/" + id)}>
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
    { label: "Prueba técnica", url: "/pruebasTecnicas" },
    { label: "Preguntas", url: "#" }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        {
          questions
            ?
            <>
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
                    onClick={() => navigate("/crear-preguntaT/" + id)}
                    color="success">
                    Nuevo
                  </Button>
                </section>
              </Box>
              
              <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10'}}>Prueba Técnica {positionName}</h4>
              <br />
              {/* Si hay registros se genera el dataTable */}
              {questions ? <Table columns={columns} data={filteredData} /> : <p>Cargando...</p>}
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
      </Container>
    </>
  )
}

export default Question