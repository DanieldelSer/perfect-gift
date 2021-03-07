const express = require("express");
const router = express.Router();
ObjectID = require('mongodb').ObjectID

router.post("/newEvent", function (req, res) {
    let db = req.app.locals.db;
    const username = req.body.username;
    const eventName = req.body.eventName;
    const description = req.body.description;
    const date = req.body.date;
    let evento = {
        username,
        eventName,
        description,
        date
    };
    db.collection("events").insertOne(evento, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("events").find( {username:username}).toArray(function (err, data) {
                if (err !== null) {
                    res.send(err);
                } else {
                    res.send(data);
                }
            });
        }
    });
});

router.get("/:user", function (req, res) {
    const user = req.params.user;
    //console.log(username)
    let db = req.app.locals.db;
    db.collection("events").find({ username: user }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});
router.get("/invitado/:event", function (req, res) {
    const event = req.params.event;
    //console.log(username)
    let db = req.app.locals.db;
    db.collection("events").find({ eventName: event }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.get("/:user/:event", function (req, res) {
    const user = req.params.user;
    const event = req.params.event;
    let db = req.app.locals.db;
    db.collection("events").find({ $and: [{ username: user }, { eventName: event }] }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

router.post("/search/event/mas", function (req, res) {
    const user = req.body.username;
    const eventName = req.body.eventSearch;
    let db = req.app.locals.db;
    db.collection("events").find({ username: user, eventName: {$regex: `.*${eventName}.*`} }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(datos);
        }
    });
});

// router.get("guestEvent/:guestName/:event", function (req, res) {
//     const guestName = req.params.guestName;
//     const event = req.params.event;
//     let db = req.app.locals.db;
//     db.collection("events").find({ $and: [{ username: guestName }, { eventName: event }] }).toArray(function (err, datos) {
//         if (err !== null) {
//             res.send(err);
//         } else {
//             res.send(datos);
//         }
//     });
// });

router.delete("/deleteEvent/:_id", function (req, res) {
    let db = req.app.locals.db;
    const _id = req.params._id;
    const user = req.body.username;
    db.collection("events").deleteOne({ _id: ObjectID(_id) }, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("events").find({ username: user }).toArray(function (err, data) {
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