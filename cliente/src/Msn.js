import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import swal from 'sweetalert'
import Tooltip from 'react-bootstrap/Tooltip'
import Carousel from 'react-elastic-carousel'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faChevronCircleRight, faBell, faTrash, faEnvelopeSquare, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const Msn = (props) => {

    const username = props.user

    const today = moment().format('LL');

    const [data, setData] = useState([]);

    const removeMsn = {
        username,
    }

    const deleteAlert = (_id) => {
        swal({
            title: "Eliminar",
            text: "¿Estás seguro que deseas eliminar este mensaje?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteMsn(_id)
                    swal("El mensaje se ha borrado con éxito", {
                        icon: "success",
                        button: false,
                        timer: "1500"
                    });
                } else {
                    swal("El mensaje no ha sido eliminado", {
                        icon: "info",
                        button: false,
                        timer: "1500"
                    });
                }
            });
    };

    const deleteMsn = (_id) => {
        fetch(`http://localhost:3000/msn/deleteMsn/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(removeMsn),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                setData(datos.reverse());
                // setBoolean(!boolean)
            });
    };

    const stateMsn = (_id, state) => {
        const msn = {
            _id,
            state,
            username
        };
        fetch(`http://localhost:3000/msn/stateMsn`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(msn),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                setData(datos.reverse());
            });
    };

    useEffect(() => {
        fetch(`http://localhost:3000/msn/${username}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                setData(datos.reverse());
            })
    }, [username]);

    const convertDateFormat = (string) => {
        return string.split('-').reverse().join('-');;
    }

    const showMsn = data.map((msn) => {
        return (
            <item>
                <div className="tarjetamsn" key={msn.from}>

                    <div className="cabecera">
                        <div className="foto">
                            <div className="foto">
                                <FontAwesomeIcon icon={faBell} size="3x" className="faPlus2" />
                            </div>

                        </div>
                        <div className="nombre">
                            <h1>{msn.to}</h1>
                        </div>
                    </div>
                    <div className="texto">
                        <p className="texto">{msn.text}</p>
                    </div>
                    <div className="texto">
                        <p className="texto"><span> {convertDateFormat(msn.date)}</span></p>
                    </div>
                    <div className="footer">
                        {msn.state === "read"
                            ?
                            <div className="foto">
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Leída</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p variant="secondary"><FontAwesomeIcon icon={faEnvelopeOpenText} size="2x" className="faPlus" onClick={() => stateMsn(msn._id, "unread")} style={{ color: '#C0C0C0' }} /></p>
                                </OverlayTrigger>
                            </div>
                            :
                            <div className="foto">
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            No <strong>Leída</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p variant="secondary"><FontAwesomeIcon icon={faEnvelopeSquare} size="2x" className="faPlus" onClick={() => stateMsn(msn._id, "read")} style={{ color: '#C0C0C0' }} /></p>
                                </OverlayTrigger>
                            </div>
                        }

                        <div>
                            <OverlayTrigger
                                key='bottom'
                                placement='bottom'
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}>
                                        Eliminiar <strong>Notificación</strong>.
                                        </Tooltip>
                                }
                            >
                                <p variant="secondary"><FontAwesomeIcon icon={faTrash} size="2x" className="faPlus" onClick={() => deleteAlert(msn._id)} style={{ color: '#C0C0C0' }} /></p>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </item >
        );
    });

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <div className="imgNav">
                            <Link to={`/Main`}><img src="./LogoPG.png" alt="Perfect Gift"></img>
                                {today}
                            </Link>
                        </div>
                        <div>
                            <h1 className="username">{username}</h1>
                        </div>
                        <div className="navIcons">
                            <div>
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Menú Principal</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <Link to={`/Main`}><p variant="secondary"><FontAwesomeIcon icon={faChevronCircleRight} size="3x" className="faPlus" style={{ color: '#C0C0C0' }} /></p></Link>
                                </OverlayTrigger>
                            </div>
                            <div>
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Salir</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <Link to={`/`}><p variant="secondary"><FontAwesomeIcon icon={faSignOutAlt} size="3x" className="faPlus" onClick={() => { props.back() }} style={{ color: '#C0C0C0' }} /></p></Link>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </ul>
                </nav>
            </header>
            <hr></hr>
            <hr></hr>
            <h3 className="usernamemsn">Notificaciones</h3>
            <hr></hr>
            <Carousel itemsToShow={3} itemPadding={[10, 50]}>
                {showMsn}
            </Carousel>
        </div>
    )
};

export default Msn;
