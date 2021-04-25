const express = require('express')

const session = require('express-session')

const RedisStore = require('connect-redis')(session)

const Redis = require('ioredis')

const app = express()

const client = new Redis({
  password: 'secret'
})

const store = new RedisStore({ client })

app.use(
  session({

    store,

    name: 'sid',

    saveUninitialized: false,

    resave: false,
    secret: `quiet, pal! it's a secret!`,

    cookie: {

      maxAge: 1000 * 60 * 60 * 2,

      sameSite: true,

      secure: process.env.NODE_ENV === 'production'
    }
  })
)

app.get('/', (req, res) => {
  console.log(req.session)

  console.log(req.session.cookie)

  console.log(req.session.cookie.expires) 
  console.log(req.session.cookie.maxAge) 

  console.log(req.session.id)

  console.log(req.sessionID)

  res.send(`<a href='/login'>Login</a>`)
})

app.get('/login', (req, res) => {
  req.session.userId = 1

  res.send(`
    <form method='post' action='/logout'>
      <button>Logout</button>
    </form>
  `)
})

app.post('/logout', (req, res) => {
  console.log(req.session)

  console.log(req.session.id) 

  console.log(req.get('cookie'))

  req.session.destroy(err => {
    res.clearCookie('sid')

    res.redirect('/')
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))