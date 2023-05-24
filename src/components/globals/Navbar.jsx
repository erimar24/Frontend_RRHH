import React from 'react';
import styles from './styles/Navbar.module.scss';
import { Container } from '@mui/system'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, isLoggedIn$ } = useAuth()
  const navigate = useNavigate()

  async function LogOut() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Está seguro de salir del sistema?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16A085',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear(),
        isLoggedIn$.next(false),
        navigate("/iniciar-sesion")
      }
    })
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={styles.navbar}>
      <Container >
        <div className={styles.navbar__items}>
          <div className={styles.navbar__logo} onClick={() => navigate("/")}>
            <img src="https://www.cohorsil.hn/wp-content/uploads/2019/12/inicio.png" alt="Logo" />
          </div>
          <div className={styles.navbar__user}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize='80px' />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{user.username}</MenuItem>
              <MenuItem onClick={LogOut}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

