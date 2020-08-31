const { usersList } = require('../data')


function createUser (req, res) {
    usersList.push(req.body)
    res.json(usersList)
}

function updateUser (req, res) {
    const userMail = req.body.email;
    const index = usersList.findIndex((a) => a.email == userMail)
    res.status(200);
    usersList[index] = req.body;
    return res.json(usersList[index]);
}

function adminStatus (req, res) {
    const userMail = req.body.email;
    const index = usersList.findIndex((a) => a.email == userMail)
    if (usersList[index].es_admin) {
        usersList[index].es_admin = req.body.es_admin
        return res.json("Permisos añadidos")
    } else {
        usersList[index].es_admin = req.body.admin
        return res.json("Valor agregado")
    }
}

function getUsers (req, res) {
    const userMail = req.body.email;
    const index = usersList.findIndex((a) => a.email == userMail)
    if (usersList[index].es_admin === true) {
        return res.status(202).json(usersList)
    } else {
        res.status(403).send("No tiene permisos de administrador")
    }
}

module.exports = { getUsers, createUser, updateUser, adminStatus }