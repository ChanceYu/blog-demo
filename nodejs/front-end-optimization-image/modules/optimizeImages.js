const path = require('path')
const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

const srcImages = path.join(__dirname, '../public/images/*.{jpg,png}')
const optImages = path.join(__dirname, '../build/images/*.{jpg,png}')

// 优化之后文件输出目录
const outputPath = path.join(__dirname, '../build/images')

// 压缩优化图片
const optimizeImages = (_srcImages, _outputPath) => {
    return imagemin([_srcImages || srcImages], _outputPath || outputPath, {
        plugins: [
            imageminMozjpeg({
                quality: 70,
            }),
            imageminPngquant({
                quality: '65-80'
            })
        ]
    })
}

module.exports = optimizeImages