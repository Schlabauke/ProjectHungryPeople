const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env._User,
        pass: process.env._Pass,
    },
    logger: true
})

function sendEmail(options) {
    console.log('Email-Options:', options)
    const to = options.to
    const subject = options.subject
    const message = options.message

    const messageHtml = message.replaceAll("\n", "<br/>")

    return transporter.sendMail({
        from: '"Hungry People" <hungrypeople3141@gmail.com>',
        to,
        subject,
        text: message,
        html: messageHtml,
    }).then((sentMessageInfo) => {
        const wasSentSuccesssFully = sentMessageInfo.accepted.includes(to)
        if (wasSentSuccesssFully) {
            console.log("E-Mail was sent to", to)
            return true
        } else {
            console.log("E-Mail was rejected by", to)
            return false
        }
    }).catch((err) => {
        console.log("Error sending Email", err)
        return err
    })
}

module.exports = sendEmail