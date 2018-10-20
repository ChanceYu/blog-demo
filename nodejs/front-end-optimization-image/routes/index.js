const path = require('path')
const fse = require('fs-extra')
const router = require('koa-router')()
const asyncBusboy = require('async-busboy')
const utility = require('utility')
const lstGet = require('lst-get')

const optimizeImages = require('../modules/optimizeImages')

const uploadTemp = path.join(__dirname, '../public/upload-temp')
const uploadImages = path.join(__dirname, '../public/upload-images')

// 先清空文件夹
fse.emptyDirSync(uploadTemp)
fse.emptyDirSync(uploadImages)

// 页面
router.get('/', async (ctx, next) => {
    await ctx.render('index')
})

// 上传
router.post('/upload', async (ctx, next) => {
    const { files } = await asyncBusboy(ctx.req)
    const file = files[0]

    const extname = path.extname(file.filename).split('.')[1]
    const filename = utility.md5(file.filename) + '.' + extname
    
    const saveTo = uploadTemp + '/' + filename

    // 输出到 upload-temp
    await new Promise((resolve) => file.pipe(fse.createWriteStream(saveTo)).on('finish', resolve))

    // 压缩到 upload-images
    const optFiles = await optimizeImages(saveTo, uploadImages)

    // 获取压缩之后的文件大小
    const length = lstGet({ files: optFiles }, 'files[0].data.length', 0)

    ctx.body = {
        status: length ? 'success' : 'error',
        size: length,
        src: '/upload-images/' + filename
    }
})

module.exports = router