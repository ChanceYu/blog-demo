const router = require('koa-router')()

const validator = require('../modules/validator')
const sender = require('../modules/sender')

router.post('/send', async (ctx, next) => {
    let params = Object.assign({}, ctx.request.body)
    
    if(validator(ctx, params)){
        const sendResult = await sender(params)
        ctx.body = sendResult
    }
})

module.exports = router
