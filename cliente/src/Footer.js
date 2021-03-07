import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <div className="footerWeb">
            <div className="footerWebIN">
                <a href="mailto:danieldelsermartin@gmail.com"><FontAwesomeIcon icon={faAt} size="3x" className="faPlus" /></a> <p>danieldelsermartin@gmail.com</p>
            </div>
            <div className="footerWebIN">
                <a href="https://www.linkedin.com/in/daniel-del-ser-mart%C3%ADn/" target="_blank"><FontAwesomeIcon icon={faLinkedin} size="3x" className="faPlus" /></a> <p>linkedin.com/in/daniel-del-ser-martín</p>
            </div>
        </div>
    )
};

export default Footer;