import { useEffect, useState } from "react";
import { Container, Button, Paper, Box } from '@mui/material'
import { getCandidatesByPosition, getVacantById } from "../../services";
import Table from '../globals/dataTable';
import useFilter from '../../hooks/useFilter';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Modal from "../globals/Modal"
import { addCandidate } from "../../services";

const AvailableCandidates = (props) => {
  const [candidates, setCandidates] = useState(null)
  const [filter, setFilter] = useState("");
  const { filteredData } = useFilter(
    filter,
    candidates,
    ({ name, lastname, position, place, createdAt }) => `${name} ${lastname} ${position} ${place} ${createdAt}`
  );

  useEffect(() => {
    async function getData() {
      const vacant = await getVacantById(props.vacantId)
      const result = await getCandidatesByPosition(vacant.positionId)
      setCandidates(result)
    }
    getData()
  }, []);

  const handleSubmit = async (id) => {
    const result = await addCandidate(id, props.vacantId)
    if (result) {
      props.handleRefreshData()
      props.handleCloseModal()
    }
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
      name: "Cargo a postular",
      selector: (row) => row.position,
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
      name: "Fecha ingreso",
      selector: (row) => row.createdAt.slice(0, 10),
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
            onClick={() => handleSubmit(id)}
          >
            +
          </Button>

        </div>
      ),
      style: {
        textAlign: "center"
      }
    }
  ];


  const modalBody = () => {
    return (
      <>
        <Container>
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

          </Box>
          <br />
          {candidates ? <Table columns={columns} data={filteredData} /> : <p>Cargando...</p>}
        </Container>
      </>
    );
  };

  const modalButtons = () => {
    return (
      <>
        <button onClick={props.handleCloseModal}>Cancelar</button>
      </>
    );
  };

  return (
    <>
      {props.isModalOpen && (
        <Modal
          handleCloseModal={props.handleCloseModal}
          open={props.isModalOpen}
          modalTitle={"Candidatos"}
          modalBody={modalBody}
          modalButtons={modalButtons}
          modalSize="xl"
          fullScreen={false}
        />
      )}
    </>
  )
}

export default AvailableCandidates