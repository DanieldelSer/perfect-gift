const estados = {
    ACEPTAR: "Aceptar",
    RECHAZAR: "Rechazar",
    PENDIENTE: "Pendiente",
    TODAS: "Todas",
}
const showGuestEvents = dataGuest.map((eventGuest) => {
    if (invite === eventGuest.state || invite == estados.TODAS) {
        switch (eventGuest.state) {
            case estados.ACEPTAR:
                return (
                    <item>
                        <div className="tarjeta" key={eventGuest.eventName}>
                            <Link to={`/Invitado/${eventGuest.eventName}`}>
                                {/* /${eventGuest.user} */}
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
                                    <p className="texto">Invitación: {eventGuest.state}</p>
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
                                <p className="texto">Invitación: {eventGuest.state}</p>
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
                                <p className="texto">Invitación: {eventGuest.state}</p>
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