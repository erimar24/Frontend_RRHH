import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../globals/Navbar'
import { Container, Button, Paper, Box, Grid } from '@mui/material'
import { getCandidates, deactivateCandidate, getCandidateById } from '../../services/index';
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BreadCrumbs from '../globals/BreadCrumbs';
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const baseURl = import.meta.env.VITE_URL_API;

const Candidate = () => {
  const navigate = useNavigate()
  const [candidates, setCandidates] = useState(null)
  const [candidate, setCandidate] = useState(null)
  // Estado de filtro de busqueda
  const [filter, setFilter] = useState("");
  // Custom hook que permite filtrar candidatos
  const { filteredData } = useFilter(
    filter,
    candidates,
    ({ name, lastname, place, position, createdAt, birthdate, cv }) => `${name} ${lastname} ${position} ${createdAt} ${place} ${birthdate}`
  );

  useEffect(() => {
    async function getData() {
      const result = await getCandidates()
      setCandidates(result)
    }
    getData()
  }, []);

  const handleCV = async (id) => {
    const candidate = await getCandidateById(id);
    setCandidate({
      id: candidate.id,
      cv: null,
    })

    window.open(baseURl + "/" + candidate.cv, '_blank');
    console.log(candidate.cv)
  }

  const handleSubmit = async (id) => {
    Swal.fire({
      title: 'Eliminar candidato',
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
        await deactivateCandidate(id)
        // Actualizamos el estado filtrando el id eliminado
        const updated = candidates.filter(item => item.id !== id)
        setCandidates(updated)
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

  // Datos que se mostrarán en las columnas del dataTable
  const columns = [
    {
      name: "N°",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Nombre",
      selector: (row) => `${row.name} ${row.lastname}`,
      sortable: true,
      filterable: true,
    },
    {
      name: "Edad",
      selector: (row) => {
        // Calcular la edad
        const ageInMillis = Date.now() - new Date(row.birthdate).getTime();
        const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25));
        // Devolver la edad en años como una cadena de texto
        return ageInYears.toString();
      },
      sortable: true,
      filterable: true,
    },
    {
      name: "Dirección",
      selector: (row) => row.place,
      sortable: true,
      filterable: true,
    },
    {
      name: "Cargo a postular",
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
            style={{ color: "#5F6A6A" }}
            type="submit"
            onClick={() => handleCV(id)}>
            <RemoveRedEyeIcon />
          </Button>

          <Button
            style={{ color: "#1F618D" }}
            onClick={() => navigate("/candidato/" + id)}>
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
        textAlign: "center",
        minWidth: "230px"
      },
      headerStyle: {
        textAlign: "center",
        minWidth: "230px" 
      }
    }
  ];


  const breadcrumbs = [
    { label: "Inicio", url: "/" },
    { label: "Lista de candidatos", url: "#" }
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
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 100, marginTop: '8px' }}
              variant="contained"
              onClick={() => navigate("/crear-candidato")}
              color="success">
              Nuevo
            </Button>
          </section>
        </Box>
        <br />
        {/* Si hay registros se genera el dataTable */}
        {candidates ? <Table columns={columns} data={filteredData} /> : <Grid container style={{
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

export default Candidate