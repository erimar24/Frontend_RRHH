import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import style from "./styles/Home.module.scss"
import { Container } from '@mui/material';
import candidatosImg from "../assets/images/candidatos.png"
import puestosImg from "../assets/images/puestos.png"
import pruebaTecnicaImg from "../assets/images/prueba_tecnica.png"
import entrevistaImg from "../assets/images/entrevista.png"
import vacanteImg from "../assets/images/vacante.png"
import usuariosImg from "../assets/images/usuarios.png"
import solicitudImg from "../assets/images/solicitud.png"
import solicitudT from "../assets/solicitudT.pdf"

const handleDownload = () => {
    window.open(solicitudT, '_blank');
};

const Menu = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const menuOptions = [
        {
            label: "Vacante",
            image: vacanteImg,
            path: "/vacantes"
        },
        {
            label: "Puestos",
            image: puestosImg,
            path: "/puestos"
        },
        {
            label: "Entrevista",
            image: entrevistaImg,
            path: "/entrevistas"
        },
        {
            label: "Prueba Técnica",
            image: pruebaTecnicaImg,
            path: "/pruebasTecnicas"
        },
        {
            label: "Usuarios",
            image: usuariosImg,
            path: "/usuarios"
        },
    ];

    return (
        <Container>
            <section className={style.home}>
                <article className={`${style.home__item} ${style.card}`} onClick={() => navigate("/candidatos")}>
                    <div className={`${style.home__item__icon} ${style.card__icon}`}>
                        <img src={candidatosImg} />
                    </div>
                    <div className={`${style.home__item__section} ${style.card__section}`}>
                        <label className={style.card__label}>Candidatos</label>
                    </div>
                </article>

                <article className={`${style.home__item} ${style.card}`} onClick={() => {
                    handleDownload(); // Llamada a la función handleDownload
                }}>
                    <div className={`${style.home__item__icon} ${style.card__icon}`}>
                        <img src={solicitudImg} />
                    </div>
                    <div className={`${style.home__item__section} ${style.card__section}`}>
                        <label className={style.card__label}>Solicitud de trabajo</label>
                    </div>
                </article>


                {user.role === "admin" ?
                    <>
                        {menuOptions.map((option, index) => (
                            <article key={index} className={style.home__item} onClick={() => navigate(option.path)}>
                                <div className={style.home__item__icon}>
                                    <img src={option.image} alt={`imagen que representa ${option.label}`} />
                                </div>
                                <div className={style.home__item__section}>
                                    <p>{option.label}</p>
                                </div>
                            </article>
                        ))}
                    </>
                    : null}

            </section>
        </Container>
    )
}

export default Menu