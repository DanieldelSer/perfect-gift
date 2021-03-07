import { BrowserRouter, Route } from "react-router-dom";
import { useState } from "react";
import './App.css';
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import Event from "./Event";
import GuestEvent from "./GuestEvent";
import Msn from "./Msn";
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


function App() {

  const [user, setUser] = useState([])
  const [logeado, setLogeado] = useState(false)

  ///////////////// Componente Login //////////////////////////////
  const login = (username, password) => {

    const userLogin = {
      username,
      password
    };
    console.log(userLogin);

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
        if (datos.length > 0) {
          setUser(datos[0].username)
          console.log(datos[0].username);
          setLogeado(true)
        } else {
          errorAlert()
        }
      });
  };

  const errorAlert = () => {
    swal({
      text: "Usuario o contraseña incorrecto",
      icon: "warning",
      button: "Aceptar",
    });
  }

  const createAcountAlert = () => {
    swal({
      text: "Ese nombre de usuario ya existe",
      icon: "warning",
      button: "Aceptar",
    });
  };

  const registerUser = (usernameCreate, passwordCreate, email) => {

    const userCreate = {
      usernameCreate,
      passwordCreate,
      email
    };

    fetch("http://localhost:3000/users/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreate),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
        if (datos === false) {
          createAcountAlert()
          //console.log(datos);
          //alert("Ese nombre de usuario ya existe");
        } else {
          setUser(datos.ops[0].username)
          console.log(datos.ops[0].username);
          setLogeado(true)
        }
      });
  };

  const back = (info) => {
    setLogeado(false);
  };

  ///////////////// Componente Google //////////////////////////////

  const responseGoogle = (response) => {
    console.log(response.profileObj);
    setUser(response.profileObj.givenName);
    console.log(user);
    console.log(logeado);
    setLogeado(true);
  }
  /////////////////////////////////////////////////////////////////////

  
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/">
            <Login
              login={login}
              registerUser={registerUser}
              logeado={logeado}
            />
            <GoogleLogin
              clientId="1076287726089-o5umq9rqp306r1re4kt1qief5439nac3.apps.googleusercontent.com"
              render={renderProps => (
                <button type="button" className="btn btn-outline-primary btn-lg naranja left" onClick={renderProps.onClick} disabled={renderProps.disabled}><FontAwesomeIcon icon={faGoogle} size="2x" className="faPlus" /></button>
              )}
              buttonText="Iniciar Sesion"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Route>
          <Route exact path="/Main">
            <Main
              back={back}
              user={user}
              logeado={logeado}
            />
            <Footer />
          </Route>
          <Route exact path="/Main/:event">
            <Event
              user={user}
              back={back}
            />
            <Footer />
          </Route>
          <Route exact path="/Invitado/:event/">
            <GuestEvent
              user={user}
              back={back}
            />
            <Footer />
          </Route>
          <Route exact path="/msn">
            <Msn
              user={user}
              back={back}
            />
            <Footer />
          </Route>
        </div>
      </BrowserRouter>
    );
  };


export default App;
