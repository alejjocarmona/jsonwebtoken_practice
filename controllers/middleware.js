const data = require('../data')

function searchEmail (req, res, next) {
    const user = data.usersList.find((a) => a.email == req.body.email)
    if (user) {
        return next()
    } else {
        res.status(404).send("El usuario no existe")
    }
}

module.exports = { searchEmail }