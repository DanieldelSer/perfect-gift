const express = require("express");
const router = express.Router();

router.post("/", function (req, res) {
    let db = req.app.locals.db;
    const username = req.body.username;
    const password = req.body.password;
    db.collection("users").find({ username, password }).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            if (datos.length > 0) {
                res.send(datos);
            } else {
                res.send(datos);
            }
        }
    });
});

router.post("/newUser", function (req, res) {
    let db = req.app.locals.db;
    const username = req.body.usernameCreate;
    const password = req.body.passwordCreate;
    const email = req.body.email;
    let usuario = {
        username,
        password,
        email
    };
    db.collection("users").find({ username }).toArray(function (err, arrayUsuario) {
        if (err !== null) {
            res.send(err);
        } else {
            if (arrayUsuario.length === 0) {
                db.collection("users").insertOne(usuario, function (er, datos) {
                    if (er !== null) {
                        res.send(er);
                    } else {
                        res.send(datos);
                    }
                });
            } else {
                res.send(false)
            }
        }
    })
});

router.put("/changepass", function (req, res) {
    let db = req.app.locals.db;
    const username = req.body.username;
    const password = req.body.newPass;
    db.collection("users").updateOne({ username }, { $set: { password } }, function (err, datos) {
        if (err !== null) {
            res.send(err);
        } else {
            db.collection("users").find({ username }).toArray(function (err, datos) {
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


module.exports = router;