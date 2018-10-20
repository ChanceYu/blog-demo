const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const views = require('koa-views')

const index = require('./routes/index')

app.use(bodyparser())
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// routes
app.use(index.routes(), index.allowedMethods())

app.use(async (ctx) => {
    ctx.body = `error: ${ctx.status}`
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(8989)

console.log('app is listening port 8989');

module.exports = app
