import { Redirect } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
//import './Login.css';

const Login = (props) => {

    const today = moment().format('LL');

    const [mloginShow, setMloginShow] = useState(false);
    const [mpassShow, setMpassShow] = useState(false);


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameCreate, setUsernameCreate] = useState('');
    const [passwordCreate, setPasswordCreate] = useState('');
    const [email, setEmail] = useState('');

    const sendMsn = () => {

        const newMsn = {
            username: usernameCreate,
            guestName: "Perfect Gift",
            userText: `Bienvenido a Perfect Gift, crea tu primer evento y empieza a disfrutar`,
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


    const manageChangeLogin = (e) => {
        setUsername(e.target.value);
    };
    const manageChangePass = (e) => {
        setPassword(e.target.value);
    };
    const manageChangeLoginCreate = (e) => {
        setUsernameCreate(e.target.value);
    };
    const manageChangePassCreate = (e) => {
        setPasswordCreate(e.target.value);
    };
    const manageChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    if (props.logeado) {
        console.log(props.logeado);
        return <Redirect to="/Main" />
    } else {
        return (
            <>
                <div>
                    <div className="containerModal">
                        <div class="encabezado">
                            <div class="gris"><div className="text"><em>¿Quieres organizar tu fiesta de cumpleaños y a la vez facilitar a tus invitados la tarea de encontrar el regalo perfecto?<br></br> En Perfect Gift te ayudamos a conseguirlo en sólo 4 pasos:<br></br>
                        - Crea un evento: cumpleaños, fiesta de despedida, inauguración de tu nueva casa...<br></br>
                        - Crea una lista con los regalos que más te apetece recibir<br></br>
                        - Invita a tus amigos al evento<br></br>
                        - ¡Recibe los regalos perfectos!
                        <br></br>
                        ¡Acertar con los regalos nunca fue tan fácil!
                        <br></br>
                                <br></br>
                                <strong>El regalo perfecto para eventos especiales</strong>
                            </em></div></div>
                            <div class="orange"></div>
                        </div>
                        <div className="centrar">
                            <img src="./LogoPG.png" alt="Girl in a jacket" width="250" height="250"></img>
                            <div class="title">
                                <div class="title-word">Perfect</div>
                                <div class="title-word">Gift</div>
                            </div>
                            <div className=" ">
                                <button type="button" className="btn btn-outline-primary btn-lg naranja" data-toggle="modal" data-target="#modalLogin" onClick={() => setMloginShow(true)}>Iniciar Sesión</button>
                                <button type="button" className="btn btn-outline-primary btn-lg naranja" data-toggle="modal" data-target="#modalRegister" onClick={() => setMpassShow(true)}>Crear Cuenta</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        size="sm"
                        show={mloginShow}
                        onHide={() => setMloginShow(false)}
                        centered
                        bsPrefix="modal"

                    >
                        {/* <input type="text" id="username" className="inputModal" onChange={manageChangeLogin} placeholder="Nombre de Usuario"></input>
                            <input type="password" id="password" className="inputModal" onChange={manageChangePass} placeholder="Contraseña"></input>
                            <button type="button" className="btn btn-outline-primary btn-lg naranjaModal" data-toggle="modal" data-target="#modalLogin" onClick={() => { props.login(username, password) }}>Iniciar Sesión</button> */}
                        <div>
                            <div className="login-box">
                                <h2>Iniciar Sesión</h2>
                                <form>
                                    <div className="user-box">
                                        <input type="text" id="username" onChange={manageChangeLogin}></input>
                                        <label>Nombre de Usuario</label>
                                    </div>
                                    <div className="user-box">
                                        <input type="password" id="password" onChange={manageChangePass}></input>
                                        <label>Contraseña</label>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-lg naranjaModal" data-toggle="modal" data-target="#modalLogin" onClick={() => { props.login(username, password) }}>Iniciar Sesión</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div>
                    <Modal
                        size="sm"
                        show={mpassShow}
                        onHide={() => setMpassShow(false)}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        {/* <input type="text" id="usernameCreate" placeholder="Nombre" onChange={manageChangeLoginCreate}></input>
                        <input type="text" id="email" placeholder="Email" onChange={manageChangeEmail}></input>
                        <input type="password" id="passwordCreate" placeholder="Contraseña" onChange={manageChangePassCreate}></input>
                        <button type="button" className="btn btn-outline-primary btn-lg naranjaModal" data-toggle="modal" onClick={() => { props.registerUser(usernameCreate, passwordCreate, email) }}>Crear Cuenta</button> */}
                        <div>
                            <div className="login-box">
                                <h2>Crear Cuenta</h2>
                                <form>
                                    <div className="user-box">
                                        <input type="text" id="usernameCreate" onChange={manageChangeLoginCreate}></input>
                                        <label>Nombre</label>
                                    </div>
                                    <div className="user-box">
                                        <input type="password" id="passwordCreate" onChange={manageChangePassCreate}></input>
                                        <label>Contraseña</label>
                                    </div>
                                    <div className="user-box">
                                        <input type="text" id="email" onChange={manageChangeEmail}></input>
                                        <label>Email</label>
                                    </div>
                                    <button type="button" className="btn btn-outline-primary btn-lg naranjaModal" data-toggle="modal" onClick={() => { props.registerUser(usernameCreate, passwordCreate, email); sendMsn() }}>Crear Cuenta</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </>
        )
    }
};

export default Login;