import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'
import swal from 'sweetalert'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt, faCalendarAlt, faMailBulk, faTrash, faUserCheck, faUserTimes, faBell, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Carousel from 'react-elastic-carousel'
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');


const Main = (props) => {

    const today = moment().format('LL');

    const [mcreateEventShow, setMcreateEventShow] = useState(false);
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [dataGuest, setDataGuest] = useState([]);
    const [iconMsn, setIconMsn] = useState(false);
    const [countMsn, setCountMsn] = useState(0);
    const [invite, setInvite] = useState('Todas');
    const [eventSearch, setEventSearch] = useState('');
    const [slider, setSlider] = useState(3);
    const [slider2, setSlider2] = useState(3);

    const username = props.user

    console.log(props);
    console.log(username);
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(moment().format('DD MMMM YYYY'));

    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repeatNewPass, setRepeatNewPass] = useState('');

    const event = {
        username,
        eventName,
        description,
        date
    };

    const removeEvent = {
        username,
    };

    const search = {
        username,
        eventSearch
    };

    const deleteAlert = (_id) => {
        swal({
            title: "Eliminar",
            text: "Estás seguro que deseas eliminar este evento?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteEvent(_id)
                    swal("El evento se ha borrado con éxito", {
                        icon: "success",
                        button: false,
                        timer: "1500"
                    });
                } else {
                    swal("El evento no ha sido eliminado", {
                        icon: "info",
                        button: false,
                        timer: "1500"
                    });
                }
            });
    };

    const decisionAlert = (_id, decision, guestName, state, nameEvent) => {
        swal({
            title: decision,
            text: `Estás seguro que deseas ${decision} este evento?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    decisionEvent(_id, decision)
                    sendMsn(guestName, state, nameEvent)
                    swal(`El evento ha sido ${decision}`, {
                        icon: "success",
                        button: false,
                        timer: "1500"
                    });
                } else {
                    swal(`La decision no ha sido modificada`, {
                        icon: "info",
                        button: false,
                        timer: "1500"
                    });
                }
            });
    };

    const modifyPassAlert = () => {
        swal({
            text: `Modificar contraseña?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    changePass()
                    setPass('');
                    setNewPass('');
                    setRepeatNewPass('');
                    swal("La contraseña ha sido modificada", {
                        icon: "success",
                        button: false,
                        timer: "1500"
                    });
                } else {
                    swal(`La contraseña no ha sido modificada`, {
                        icon: "info",
                        button: false,
                        timer: "1500"
                    });
                }
            });
    };

    const errorAlert = () => {
        swal({
            text: "Las contraseñas no coinciden ",
            icon: "warning",
            button: "Aceptar",
        });
    }

    const createEvent = () => {

        fetch("http://localhost:3000/events/newEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                if (datos === false) {
                    alert("Ese nombre del evento esta creado");
                } else {
                    setMcreateEventShow(false)
                    fetch(`http://localhost:3000/events/${username}`)
                        .then(function (res) {
                            return res.json();
                        })
                        .then(function (datos) {
                            console.log(datos)
                            setData(datos.reverse());
                            setDate(today);
                            //setFirst(first + 1)
                            setFirst(datos.length)
                        })
                }
            });
    };

    const deleteEvent = (_id) => {
        fetch(`http://localhost:3000/events/deleteEvent/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(removeEvent),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                if (datos.length === 0) {
                    setFirst(first - 1)
                }
                setData(datos.reverse());
                // setBoolean(!boolean)
            });
    };

    const decisionEvent = (_id, decision) => {
        const decisionGuest = {
            _id,
            username,
            decision
        };
        fetch(`http://localhost:3000/guests/decisionEvent`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(decisionGuest),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                setDataGuest(datos.reverse());
            });
    };

    const changePass = () => {
        const password = {
            username,
            newPass
        };
        fetch(`http://localhost:3000/users/changepass`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(password),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                setDataGuest(datos.reverse());
            });
    };


    // const searchEvent = () => {


    //     fetch(`http://localhost:3000/events/search/event/mas`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(search),
    //     })
    //         .then(function (res) {
    //             return res.json();
    //         })
    //         .then(function (data) {
    //             setData(data.reverse());
    //             console.log(data);
    //         });
    // };

    const convertDateFormat = (string) => {
        return string.split('-').reverse().join('-');
    }

    function viewPassword(id)
{
  let passwordInput = document.getElementById(id);
  let passStatus = document.getElementById(id);
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.icon= {faEyeSlash};
    
  }
  else{
    passwordInput.type='password';
    passStatus.icon={faEye};
  }
}

    useEffect(() => {
        fetch(`http://localhost:3000/events/search/event/mas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(search),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {

                setFirst(datos.length)
                setData(datos.reverse());
            })
        fetch(`http://localhost:3000/guests/${username}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                //console.log(datos);
                setDataGuest(datos.reverse());
            })
        fetch(`http://localhost:3000/msn/state/${username}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                if (datos.length > 0) {
                    setIconMsn(true);
                    setCountMsn(datos.length)
                }
            })
    }, [first, eventSearch]);

    const fristEvent =
        <div>
            <OverlayTrigger
                key='bottom'
                placement='bottom'
                overlay={
                    <Tooltip id={`tooltip-bottom`}>
                        Crear primer <strong>Evento</strong>.
                                        </Tooltip>
                }
            >
                <p variant="secondary"><FontAwesomeIcon icon={faPlus} size="7x" className="faPlus" onClick={() => setMcreateEventShow(true)} style={{ color: '#C0C0C0' }} /></p>
            </OverlayTrigger>
        </div>;

    const showEvents = data.map((event) => {
        return (
            <item>
                <div className="tarjeta" key={event.eventName}>
                    <Link to={`/Main/${event.eventName}`}>
                        <div className="cabecera">
                            <div className="foto">
                                <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="faPlus" />
                            </div>
                            <div className="nombre">
                                <h1>{event.eventName}</h1>
                            </div>
                        </div>
                        <div className="texto">
                            <p className="texto"><span className="upper"> {convertDateFormat(event.date)}</span></p>
                        </div>
                        <div className="texto">
                            <p className="texto">{event.description}</p>
                        </div></Link>
                    <div className="footer">
                        <div>
                            <OverlayTrigger
                                key='bottom'
                                placement='bottom'
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}>
                                        Eliminiar <strong>Evento</strong>.
                                        </Tooltip>
                                }
                            >
                                <p variant="secondary"><FontAwesomeIcon icon={faTrash} size="2x" className="faPlus" onClick={() => deleteAlert(event._id)} style={{ color: '#C0C0C0' }} /></p>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                <hr></hr>
            </item >
        );
    });

    const estados = {
        ACEPTAR: "Aceptar",
        RECHAZAR: "Rechazar",
        PENDIENTE: "Pendiente",
        TODAS: "Todas",
    };
    const showGuestEvents = dataGuest.map((eventGuest) => {
        if (invite === eventGuest.state || invite === estados.TODAS) {
            switch (eventGuest.state) {
                case estados.ACEPTAR:
                    return (
                        <item>
                            <div className="tarjeta" key={eventGuest.eventName}>
                                <Link to={`/Invitado/${eventGuest.eventName}`}>
                                    <div className="cabecera">
                                        <div className="foto">
                                            <FontAwesomeIcon icon={faMailBulk} size="3x" className="faPlus2" />
                                        </div>
                                        <div className="nombre">
                                            <h1>Anfitrión: {eventGuest.user}</h1>
                                        </div>
                                    </div>
                                    <div className="texto">
                                        <h3 className="texto">{eventGuest.eventName}</h3>
                                        <p className="texto">Estado: <span className="upper">{eventGuest.state}</span></p>
                                    </div></Link>
                            </div>
                            <hr></hr>
                        </item>
                    );
                case estados.RECHAZAR:
                    return (
                        <item>
                            <div className="tarjetamsn" key={eventGuest.eventName}>

                                <div className="cabecera">
                                    <div className="foto">
                                        <FontAwesomeIcon icon={faMailBulk} size="3x" className="faPlus2" />
                                    </div>
                                    <div className="nombre">
                                        <h1>Anfitrión: {eventGuest.user}</h1>
                                    </div>
                                </div>
                                <div className="texto">
                                    <h3 className="texto">{eventGuest.eventName}</h3>
                                    <p className="texto">Estado: <span className="upper">{eventGuest.state}</span></p>
                                </div>
                            </div>
                            <hr></hr>
                        </item>
                    );
                case estados.PENDIENTE:
                    return (
                        <item>
                            <div className="tarjetamsn" key={eventGuest.eventName}>
                                <div className="cabecera">
                                    <div className="foto">
                                        <FontAwesomeIcon icon={faMailBulk} size="3x" className="faPlus2" />
                                    </div>
                                    <div className="nombre">
                                        <h1>Anfitrión: {eventGuest.user}</h1>
                                    </div>
                                </div>
                                <div className="texto">
                                    <h3 className="texto">{eventGuest.eventName}</h3>
                                    <p className="texto">Estado: <span className="upper">{eventGuest.state}</span></p>
                                </div>
                                <div className="footer">
                                    <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                <strong>Aceptar</strong>.
                                                    </Tooltip>
                                        }
                                    >
                                        <p variant="secondary"><FontAwesomeIcon icon={faUserCheck} size="2x" className="faPlus" onClick={() => decisionAlert(eventGuest._id, "Aceptar", eventGuest.user, "aceptado", eventGuest.eventName)} style={{ color: '#C0C0C0' }} /></p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                <strong>Rechazar</strong>.
                                                    </Tooltip>
                                        }
                                    >
                                        <p variant="secondary"><FontAwesomeIcon icon={faUserTimes} size="2x" className="faPlus" onClick={() => decisionAlert(eventGuest._id, "Rechazar", eventGuest.user, "rechazado", eventGuest.eventName)} style={{ color: '#C0C0C0' }} /></p>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <hr></hr>
                        </item>
                    );
            }
        }
    });

    const sendMsn = (guestName, state, nameEvent) => {

        const newMsn = {
            username: guestName,
            guestName: username,
            userText: `Ha ${state} tu invitación para ${nameEvent}`,
            today
        };

        fetch(`http://localhost:3000/msn/newMsn/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMsn),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {

            });
    };

    const manageChangeEventName = (e) => {
        setEventName(e.target.value);
    };
    const manageChangeDescription = (e) => {
        setDescription(e.target.value);
    };
    const manageChangeDate = (e) => {
        setDate(e.target.value);
    };
    const manageChangePass = (e) => {
        setPass(e.target.value);
    };
    const manageChangeNewPass = (e) => {
        setNewPass(e.target.value);
    };
    const manageChangeRepeatNewPass = (e) => {
        setRepeatNewPass(e.target.value);
    };
    const manageChangeInvite = (e) => {
        setInvite(e.target.value);
    };
    const manageChangeSearch = (e) => {
        setEventSearch(e.target.value);
    };
    const manageChangeSlider = (e) => {
        setSlider(e.target.value);
    };
    const manageChangeSlider2 = (e) => {
        setSlider2(e.target.value);
    };


    return (
        <div>
            <div className="containerModal">
                <header>
                    <nav>
                        <ul>
                            <div className="imgNav">
                                <img src="./LogoPG.png" alt="Perfect Gift"></img>
                                {today}
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
                                                Crear <strong>Evento</strong>.
                                        </Tooltip>
                                        }
                                    >
                                        <p variant="secondary"><FontAwesomeIcon icon={faPlus} size="3x" className="faPlus" onClick={() => setMcreateEventShow(true)} style={{ color: '#C0C0C0' }} /></p>
                                    </OverlayTrigger>
                                </div>
                                <div>
                                    <OverlayTrigger
                                        key='bottom'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                <strong>Notificaciones</strong>.
                                        </Tooltip>
                                        }
                                    >
                                        {iconMsn
                                            ? <Link to="/msn"><p variant="secondary"><FontAwesomeIcon icon={faBell} size="3x" className="faPlus2" /><Badge variant="danger">{countMsn}</Badge></p></Link>
                                            : <Link to="/msn"><p variant="secondary"><FontAwesomeIcon icon={faBell} size="3x" className="faPlus" /></p></Link>
                                        }

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
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="justify-content-center">
                    <Tab eventKey="profile" title="Mis Eventos">
                        <div className="centrartab">
                            <hr></hr>
                            <h3 className="username">Mis Eventos</h3>
                            <hr></hr>
                            <div className="login-box2">
                                <div className="user-box">
                                    <input type="text" onChange={manageChangeSearch}></input>
                                    <label>Buscar</label>
                                    <div className="user-box2">
                                        <select className="user-box2 marginR" onChange={manageChangeSlider}>
                                            <option value="0"></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </select>
                                        <label className="mostrar">Mostrar</label>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            {first === 0
                                ? <Carousel itemsToShow={slider} itemPadding={[10, 50]}>
                                    {fristEvent}
                                </Carousel>
                                : <Carousel itemsToShow={slider} itemPadding={[10, 50]}>
                                    {showEvents}
                                </Carousel>
                            }
                            <hr></hr>
                        </div>
                    </Tab>
                    <Tab eventKey="home" title="Mis Invitaciones">
                        <div className="centrartab">
                            <hr></hr>
                            <h3 className="username">Mis Invitaciones</h3>
                            <hr></hr>
                            <div className="login-box2">
                                <div className="user-box">
                                    <select className="user-box" onChange={manageChangeInvite}>
                                        <option>Todas</option>
                                        <option>Pendiente</option>
                                        <option>Aceptar</option>
                                        <option>Rechazar</option>
                                    </select>
                                    <div className="user-box2">
                                        <select className="user-box2 marginR" onChange={manageChangeSlider2}>
                                            <option value="0"></option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                        </select>
                                        <label className="mostrar">Mostrar</label>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <Carousel itemsToShow={slider2} itemPadding={[10, 50]}>
                                {showGuestEvents}
                            </Carousel>
                            <hr></hr>
                        </div>
                    </Tab>
                    <Tab eventKey="contact" title="Cuenta">
                        <div className="centrartab">
                            <hr></hr>
                            <h3 className="username">Modificar contraseña</h3>
                            <hr></hr>
                            <div className="tarjeta2">
                                <div className="cabecera2">
                                    <label>Contraseña</label>
                                    <span variant="secondary"><FontAwesomeIcon icon={faEye} size="1x" className="faPlus" id="pass-status" onMouseDown={() => viewPassword("password-field")} onMouseUp={() => viewPassword("password-field")} style={{ color: '#C0C0C0' }} /></span>
                                    <input type="password" value={pass} id="password-field" onChange={manageChangePass}></input>
                                    <label>Nueva contraseña</label>
                                    <span variant="secondary"><FontAwesomeIcon icon={faEye} size="1x" className="faPlus" id="pass-status" onMouseDown={() => viewPassword("password-new")} onMouseUp={() => viewPassword("password-new")} style={{ color: '#C0C0C0' }} /></span>
                                    <input type="password" value={newPass} id="password-new" onChange={manageChangeNewPass}></input>
                                    <label>Repetir contraseña   </label>
                                    <span variant="secondary"><FontAwesomeIcon icon={faEye} size="1x" className="faPlus" id="pass-status" onMouseDown={() => viewPassword("password-newRepeat")} onMouseUp={() => viewPassword("password-newRepeat")} style={{ color: '#C0C0C0' }} /></span>
                                    <input type="password" value={repeatNewPass} id="password-newRepeat" onChange={manageChangeRepeatNewPass}></input>
                                </div>
                                <button type="button" className="btn btn-outline-danger btn-lg naranja" onClick={() => {
                                    if (newPass === repeatNewPass) {
                                        modifyPassAlert();
                                    } else {
                                        errorAlert();
                                    }
                                }}>Modificar</button>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div>
                <Modal
                    size="sm"
                    show={mcreateEventShow}
                    onHide={() => setMcreateEventShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <div>
                        <div className="login-box">
                            <h2>Crear Evento</h2>
                            <form>
                                <div className="user-box">
                                    <input type="text" id="eventName" onChange={manageChangeEventName} ></input>
                                    <label>Nombre</label>
                                </div>
                                <div className="user-box">
                                    <textarea type="text area" id="description" onChange={manageChangeDescription}></textarea>
                                    <label>Descripción</label>
                                </div>
                                <div className="user-box">
                                    <input type="date" id="date" value={date} onChange={manageChangeDate}></input>
                                    <label>Fecha</label>
                                </div>
                                <button type="button" className="btn btn-outline-primary btn-lg naranjaModal" data-toggle="modal" data-target="#modalLogin" onClick={() => createEvent()}>Crear</button>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
};

export default Main;