const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')

const email = require('./routes/email')

// error handler
onerror(app)

app.use(bodyparser())
app.use(json())

app.use(cors({
    origin: 'http://www.page.com',
    maxAge: 5,
    credentials: true,
    allowMethods: ['POST'],
    allowHeaders: ['Content-Type', 'X-Requested-With', 'Accept'],
}))

// routes
app.use(email.routes(), email.allowedMethods())

app.use(async (ctx) => {
    ctx.body = `error: ${ctx.status}`
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(8989)

console.log(`app: email, port: 8989`)

module.exports = app
