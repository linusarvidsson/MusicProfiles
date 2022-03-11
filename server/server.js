//------------------------- SETUP -------------------------//
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())

//------------------------- Authentication -------------------------//

const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null)
    return res.sendStatus(
      res.json({ success: false, message: 'No token in header' })
    )

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, userInfo) => {
    if (error) return res.json({ success: false, message: 'Invalid token' })
    req.userInfo = userInfo
    next()
  })
}

//------------------------- ROUTES -------------------------//
const usersRouter = require('./routes/users')
app.use('/users', checkToken, usersRouter)

const postsRouter = require('./routes/posts')
app.use('/posts', checkToken, postsRouter)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const signupRouter = require('./routes/signup')
app.use('/signup', signupRouter)

const spotifyRouter = require('./routes/spotify')
app.use('/spotify', checkToken, spotifyRouter)

//------------------------- RUN SERVER -------------------------//
app.listen(port, () =>
  console.log(`Server started\nListening at http://localhost:${port}`)
)
