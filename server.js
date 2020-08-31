const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { usersList } = require('./data')

const app = express()
const { userController, middlewareController } = require('./controllers')

app.use(cors())
app.use(bodyParser())

//Routes

//Edita usuario con email
app.put('/users', middlewareController.searchEmail, userController.updateUser)

//Editar rol de usuario para admin
app.patch('/users', middlewareController.searchEmail, userController.adminStatus)

//Añade nuevos usuarios a la lista
app.post('/register', userController.createUser)

//Login, creación de JsonWebToken y autenticación
const signature = "my_secret_key"
app.post('/login', middlewareController.searchEmail, (req, res) => {
    const { email, password } = req.body
    const index = usersList.findIndex((a) => a.email == email)
    if (email === usersList[index].email && password === usersList[index].password) {
        const token = jwt.sign(email, signature)
        res.json({token})
    } else {
        res.status(400).send("Datos inválidos")
    }
})

function authentication (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const verifyToken = jwt.verify(token, signature)
        if (verifyToken) {
            console.log(verifyToken)
            req.email = verifyToken
            return next()
        }
    }
    catch(err) {
        res.status(401).send({'error': 'not authorized'})
    }
}

app.post('/secure', authentication, (req, res) => {
    res.json(req.email)
})

//Trae la lista de usuarios ingresados solo si es admin
app.get('/users', middlewareController.searchEmail, userController.getUsers)

app.listen(3000, () => {
    console.log('Server is on')
})