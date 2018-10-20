const path = require('path')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

const optImages = path.join(__dirname, '../build/images/*.{jpg,png}')

// 优化之后文件输出目录
const outputPath = path.join(__dirname, '../build/images')

// 将图片转换为 webp 格式
const convertToWebp = (_optImages, _outputPath) => {
    return imagemin([_optImages || optImages], _outputPath || outputPath, {
        use: [
            imageminWebp({
                quality: 85,
            }),
        ]
    })
}

module.exports = convertToWebp