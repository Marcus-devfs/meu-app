require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()


//config JSON
app.use(express.json())

const User = require('./models/User')

//Public Route
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a nossa API!' })
})


//Private route
app.get("/user/:id", checkToken, async (req, res) => {

  const id = req.params.id
  //check user

  const user = await User.findById(id, `-password`)

  if (!user) {
    return res.status(404).json({ msg: 'Usuario não encontrado' })
  }
  return res.status(200).json({ user })
})

function checkToken(req, res, next){

const authHeader = req.headers['authorization']
const token = authHeader && authHeader.split(" ")[1]

if(!token){
  return res.status(401).json({msg: 'Acesso negado!'})
}

try {
  const secret = process.env.SECRET

  jwt.verify(token, secret)
  next()

} catch (error) {
  console.log(error)

  res.status(400).json({ msg: 'Token inválido!' })
}

}

//Register User

app.post('/auth/register', async (req, res) => {

  const { name, email, password, confirmpassword } = req.body

  //validation
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }
  if (!password) {
    return res.status(422).json({ msg: 'A password é obrigatória!' })
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas não conferem! Verifique e tente novamente' })
  }

  //check exists user

  const UserExists = await User.findOne({ email: email })

  if (UserExists) {
    return res.status(422).json({ msg: 'Por favor, ultilize outro e-mail' })
  }

  //create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  //create user
  const user = new User({
    name,
    email,
    password: passwordHash,
  })

  try {

    await user.save()

    res.status(201).json({ msg: 'Usuario criado com Sucesso!' })

  } catch (error) {
    console.log(error)

    res.status(500).json({ msg: 'ocorreu um erro' })
  }

})


//Login
app.post('/auth/login', async (req, res) => {

  //desconstruir do body da API
  const { email, password } = req.body

  //validation
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }
  if (!password) {
    return res.status(422).json({ msg: 'A password é obrigatória!' })
  }

  //check user exists

  const user = await User.findOne({ email: email })


  if (!user) {
    return res.status(404).json({ msg: 'Usuario não encontrado' })
  }

  //check password
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(404).json({ msg: 'Senha inválida!' })
  }

  try {

    const secret = process.env.SECRET
    const token = jwt.sign({
      id: user._id,
    },
      secret,
    )

    res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

  } catch (error) {
    console.log(error)

    res.status(500).json({ msg: 'ocorreu um erro' })
  }

})





const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

//conection BANCO
const DB_URL = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.yjikcrt.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_URL).
  then(() => {
    app.listen(3000)
    console.log('Conectado ao banco de DADOS')
  })
  .catch((err) => console.log(err))
