import React from 'react';
import { useEffect, useState } from 'react';
import { getPositions, updateCandidate, getCandidateById } from '../../services';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../globals/BreadCrumbs';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../globals/Navbar'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material'
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { RotatingLines } from 'react-loader-spinner';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Card, CardContent } from '@mui/material';

const baseURl = import.meta.env.VITE_URL_API;

const UpdateCandidate = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null)
  const [previousCV, setPreviousCV] = useState(null)
  const [positions, setPositions] = useState(null)

  useEffect(() => {
    async function getData() {
      const positions = await getPositions()
      setPositions(positions)
      const candidate = await getCandidateById(id)
      setPreviousCV(candidate.cv)
      setCandidate({
        id: candidate.id,
        academic_level: candidate.academic_level,
        birthdate: candidate.birthdate,
        cv: null,
        experience: candidate.experience,
        lastname: candidate.lastname,
        name: candidate.name,
        phone: candidate.phone,
        positionId: candidate.positionId
      })
    }
    getData()
  }, [id]);

  const breadcrumbs = [
    { label: "Inicio", url: "/" },
    {
      label: "Lista de candidatos",
      url: "/candidatos"
    },
    { label: "Actualizar candidato", url: "#" }
  ];

  //Esta función detecta los cambios en cada uno de los campos, pero como?
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (candidate.name === '' || candidate.lastname === '' || candidate.birthdate === '' || candidate.phone === '' ||
      candidate.academic_level === '' || candidate.experience === '' || candidate.cv === '' || candidate.positionId === '')
      return Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '¡Verifique que todas las casillas estén llenas!',
        showConfirmButton: false,
        timer: 1500
      })

    // Crear FormData para enviar datos y archivo
    const formData = new FormData();
    formData.append("name", candidate.name);
    formData.append("lastname", candidate.lastname);
    formData.append("birthdate", candidate.birthdate);
    formData.append("phone", candidate.phone);
    formData.append("academic_level", candidate.academic_level);
    formData.append("experience", candidate.experience);
    formData.append("positionId", candidate.positionId);
    formData.append("cv", candidate.cv);


    let response = await updateCandidate(candidate.id, formData)
    if (response)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Datos actualizados correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
    navigate("/candidatos")
  }

  //Función para manejar el cambio de archivo en el campo de CV
  const handleCvChange = (event) => {
    const cvFile = event.target.files[0];
    setCandidate({ ...candidate, cv: cvFile });
  };

  const handleDownload = () => {
    window.open(baseURl + "/" + previousCV, '_blank');
  };

  return (
    <>
      <Navbar />
      <Container>
        <BreadCrumbs breadcrumbs={breadcrumbs} />
        <Card sx={{ maxWidth: 1200, margin: 'auto', padding: '20px' }}>
          <CardContent>
            {candidate && positions
              ?
              <>
                <h4 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px', marginTop: '10px', marginBottom: '10' }}>Actualización</h4>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Nombre"
                      required
                      variant="outlined"
                      id="name"
                      name="name"
                      autoComplete='name'
                      value={candidate.name}
                      onChange={handleInputChange}
                      autoFocus
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      required
                      label="Apellido"
                      variant="outlined"
                      id="lastname"
                      name="lastname"
                      autoComplete='lastname'
                      value={candidate.lastname}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Fecha de nacimiento"
                      required
                      variant="outlined"
                      id="birthdate"
                      name="birthdate"
                      placeholder='año-mes-dia'
                      autoComplete='birthdate'
                      value={candidate.birthdate.slice(0, 10)}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Teléfono"
                      required
                      variant="outlined"
                      id="phone"
                      name="phone"
                      autoComplete='phone'
                      value={candidate.phone}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={candidate.cv ? 12 : 6} >
                        <Button variant="text" position="start">
                          <PictureAsPdfIcon />
                          Subir archivo
                          <input
                            hidden
                            required
                            id="cv"
                            name="cv"
                            type="file"
                            accept=".pdf,.docx,.doc"
                            onChange={handleCvChange}
                          />
                        </Button>
                      </Grid>

                      {!candidate.cv ?
                        <Grid item xs={4}>
                          <Button onClick={handleDownload}>
                            <PictureAsPdfIcon sx={{ mr: 1 }} />
                            Ver
                          </Button>
                        </Grid> : null}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                      <Select
                        label="Selecciona el puesto"
                        value={candidate.positionId}
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Formación académica"
                      required
                      variant="outlined"
                      id="academic_level"
                      name="academic_level"
                      autoComplete='academic_level'
                      value={candidate.academic_level}
                      onChange={handleInputChange}
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={8}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Experiencia"
                      required
                      variant="outlined"
                      id="experience"
                      name="experience"
                      autoComplete='experience'
                      value={candidate.experience}
                      onChange={handleInputChange}
                      multiline
                      minRows={4}
                      maxRows={8}
                      fullWidth
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
              </Grid>
            }
          </CardContent>
        </Card>
      </Container>
    </>
  )
};

export default UpdateCandidate;