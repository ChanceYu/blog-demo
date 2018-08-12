const nodemailer = require('nodemailer')

const sender = (params) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            transport: 'SMTP',
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: 'aaa@163.com', // 替换成自己的发件人
                pass: 'aaa' // 替换成自己的授权码
            }
        });

        let mailOptions = {
            from: 'aaa@163.com', // 替换成自己的发件人
            to: 'bbb@qq.com', // 替换成自己的收件人
            subject: '测试邮件发送',
            html: `<strong>姓名：</strong>${params.name || ''}<br><br>
                   <strong>邮箱：</strong>${params.email || ''}<br><br>
                   <strong>手机：</strong>${params.phone || ''}<br><br>
                   <strong>QQ：</strong>${params.qq || ''}<br><br>
                   <strong>内容：</strong>${params.message || ''}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            try{
                transporter.close()
            }catch(e){
            }
            
            if (error) {
                resolve({
                    status: 'failure',
                    message: '邮件发送失败'
                })
                return console.log(error);
            }

            resolve({
                status: 'success',
                message: '邮件发送成功'
            })
        });
    })
}

module.exports = sender