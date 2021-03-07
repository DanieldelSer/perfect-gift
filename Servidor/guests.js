const express = require("express");
const router = express.Router();
ObjectID = require('mongodb').ObjectID

router.get("/:user/:event", function (req, res) {
    const user = req.params.user;
    const event = req.params.event;
    let db = req.app.locals.db;
    db.collection("guests").find({ $and: [{ user: user }, { eventName: event }] }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.get("/invited/mas/:event", function (req, res) {
    const event = req.params.event;
    let db = req.app.locals.db;
    db.collection("guests").find({ eventName: event }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.get("/:user", function (req, res) {
    const user = req.params.user;
    let db = req.app.locals.db;
    db.collection("guests").find({ guestName: user }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.put("/decisionEvent", function (req, res) {
    let db = req.app.locals.db;
    const _id = req.body._id;
    const state = req.body.decision;
    const user = req.body.username;
    db.collection("guests").updateOne({_id: ObjectID(_id) }, { $set: { state } }, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("guests").find({ guestName: user }).toArray(function (err, datos) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.send(datos);
                }
            });
        }
    }
    );
});

router.post("/newGuest", function (req, res) {
    let db = req.app.locals.db;
    const user = req.body.username;
    const eventName = req.body.eventName;
    const guestName = req.body.guestName;
    const guestEmail = req.body.guestEmail;
    const state = "Pendiente";
    let guest = {
        user,
        eventName,
        guestName,
        guestEmail,
        state
    };
    db.collection("guests").insertOne(guest, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("guests").find({ eventName: eventName }).toArray(function (err, data) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
});

router.delete("/deleteGuest/:_id", function (req, res) {
    let db = req.app.locals.db;
    const _id = req.params._id;
    const user = req.body.username;
    const eventName = req.body.eventName;
    db.collection("guests").deleteOne({ _id: ObjectID(_id) }, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("guests").find({ $and: [{ user: user }, { eventName: eventName }] }).toArray(function (err, data) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
});

module.exports = router;