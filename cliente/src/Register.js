import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <input type="text" id="email" placeholder="Email" onChange></input>
            <input type="text" id="username" placeholder="Nick" onChange></input>
            <input type="text" id="password" placeholder="Password" onChange></input>
            <Link to="/Main"><button onClick>Registrarse</button></Link>
        </div>
    )
};

export default Login;