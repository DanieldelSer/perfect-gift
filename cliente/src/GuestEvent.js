import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import PaymentForm from "./PaymentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faChevronCircleRight, faGift, faUserFriends, faCheckCircle, faTimesCircle, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Carousel from 'react-elastic-carousel';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ReactStars from "react-rating-stars-component";
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const GuestEvent = (props) => {

    const today = moment().format('LL');

    const { event } = useParams();
    const username = props.user

    
    const [data, setData] = useState([]);
    const [mpayShow, setMpayShow] = useState(false);

    const [guests, setGuests] = useState([]);
    const [gifts, setGifts] = useState([]);
    //const [choose, setChoose] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:3000/events/invitado/${event}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                setData(res)
            });
        fetch(`http://localhost:3000/guests/invited/mas/${event}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                console.log(event);
                console.log(res);
                setGuests(res)
            });
        fetch(`http://localhost:3000/gifts/invited/mas/${event}`)
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                setGifts(res)
                console.log(gifts);
            });
    }, []);

    const chooseGift = (_id) => {
        const gift = {
            _id,
            username,
            event
        };
        fetch(`http://localhost:3000/gifts/chooseGift`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gift),
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                setGifts(datos.reverse());
                console.log(gifts);
                //setChoose(choose + 1)
            });
    };

    const sendMsn = (to, description) => {

        const newMsn = {
            username: to,
            guestName: username,
            userText: `${username} ha elgido el regalo ${description} en el evento ${event}`,
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

    const convertDateFormat = (string) => {
        return string.split('-').reverse().join('-');
    }

    const showEvent = data.map((eventPrint) => {
        return (
            <div className="usernameevent" key={eventPrint.eventName}>
                <h3>{eventPrint.eventName}</h3>
                <p><span>{eventPrint.description}</span></p>
                <p><span>{convertDateFormat(eventPrint.date)}</span></p>
            </div>
        );
    });

    const showGuests = guests.map((guest) => {
        return (
            <item>
                <div className="tarjetamsn" key={guest.guestName}>
                    <div className="cabecera">
                        <div className="foto">
                            <FontAwesomeIcon icon={faUserFriends} size="3x" className="faPlus2" />
                        </div>
                        <div className="nombre">
                            <h3>{guest.guestName}</h3>
                        </div>
                    </div>
                    <div className="texto">
                        <p className="texto">Estado: <span className="upper">{guest.state}</span></p>
                    </div>
                </div>
            </item>
        );
    });

    const printStar = (star) =>{
        const firstStar = {
            size: 30,
            value: star,
            color: "#C0C0C0",
            activeColor: "#E18A07",
            
            edit: false
          };
        return(
            <ReactStars {...firstStar} />
        )
      };

    const showGifts = gifts.map((gift) => {
        if (gift.state === "libre") {
            return (
                <item>
                    <div className="tarjeta" key={gift.description}>
                        <div className="cabecera">
                            <div className="foto">
                                <FontAwesomeIcon icon={faGift} size="3x" className="faPlus2" />
                            </div>
                            <div className="nombre">
                                <h3>{gift.description}</h3>
                            </div>
                        </div>
                        <div className="texto">
                            <h5>Asignado: <span className="upper">{gift.state}</span></h5>
                            {printStar(gift.rank)}
                            <p className="texto">Precio: <span>{gift.price}€</span></p>
                        </div>
                        <div className="footer">
                            <div>
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Elegir</strong>.
                                        </Tooltip>
                                    } >
                                    <p variant="secondary"><FontAwesomeIcon icon={faCheckCircle} size="2x" className="faPlus" onClick={() => { chooseGift(gift._id); sendMsn(gift.user, gift.description) }} style={{ color: '#C0C0C0' }} /></p>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </item>
            );
        } else if (gift.state === username){
            return (
                <item>
                    <div className="tarjetamsn" key={gift.description}>
                        <div className="cabecera">
                            <div className="foto">
                                <FontAwesomeIcon icon={faGift} size="3x" className="faPlus2" />
                            </div>
                            <div className="nombre">
                                <h3>{gift.description}</h3>
                            </div>
                        </div>
                        <div className="texto">
                            <h5>Asignado: <span className="upper">{gift.state}</span></h5>
                            <p>{gift.price}€</p>
                            {printStar(gift.rank)}
                        </div>
                        <div className="footer">
                            <div className="foto">
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Elegido</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p variant="secondary"><FontAwesomeIcon icon={faTimesCircle} size="2x" className="faPlus2 choose" style={{ color: '#C0C0C0' }} /></p>
                                </OverlayTrigger>
                            </div>
                            <div className="foto">
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Pagar</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p variant="secondary"><FontAwesomeIcon icon={faCreditCard} size="2x" className="faPlus" onClick={() => setMpayShow(true)} style={{ color: '#C0C0C0' }} /></p>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </item>
            );
        }else {
            return (
                <item>
                    <div className="tarjetamsn" key={gift.description}>
                        <div className="cabecera">
                            <div className="foto">
                                <FontAwesomeIcon icon={faGift} size="3x" className="faPlus2" />
                            </div>
                            <div className="nombre">
                                <h3>{gift.description}</h3>
                            </div>
                        </div>
                        <div className="texto">
                            <h5>Asignado: <span className="upper">{gift.state}</span></h5>
                            <p>{gift.price}€</p>
                            {printStar(gift.rank)}
                        </div>
                        <div className="footer">
                            <div className="foto">
                                <OverlayTrigger
                                    key='bottom'
                                    placement='bottom'
                                    overlay={
                                        <Tooltip id={`tooltip-bottom`}>
                                            <strong>Elegido</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <p variant="secondary"><FontAwesomeIcon icon={faTimesCircle} size="2x" className="faPlus2 choose" style={{ color: '#C0C0C0' }} /></p>
                                </OverlayTrigger>
                            </div>
                            
                        </div>
                    </div>
                    <hr></hr>
                </item>
            ); 
        }
    });


    return (
            <div className="containerModal">
            <header>
                <nav>
                    <ul>
                        <Link to={`/Main`}><div className="imgNav">
                            <img src="../../LogoPG.png" alt="Perfect Gift"></img>
                            {today}
                        </div></Link>
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
            <div className="justify-content-center">
                {showEvent}
            </div>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="justify-content-center margen">
                <Tab eventKey="profile" title="Invitados">
                    <div className="centrartab">
                        <hr></hr>
                        <h3 className="username">Invitados</h3>
                        <hr></hr>
                        <Carousel itemsToShow={3} itemPadding={[10, 50]}>
                            {showGuests}
                        </Carousel>
                        <hr></hr>
                    </div>
                </Tab>
                <Tab eventKey="home" title="Regalos">
                    <div className="centrartab">
                        <hr></hr>
                        <h3 className="username">Regalos</h3>
                        <hr></hr>
                        <Carousel itemsToShow={3} itemPadding={[10, 50]}>
                            {showGifts}
                        </Carousel>
                        <hr></hr>
                    </div>
                </Tab>
            </Tabs>
            <div>
                <Modal
                    size="sm"
                    show={mpayShow}
                    onHide={() => setMpayShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <div>
                        <div className="login-box">
                            <h2>Pagar Regalo</h2>
                            <form>
                                <div className="user-box">
                                <PaymentForm/>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
        
    )
};

export default GuestEvent;