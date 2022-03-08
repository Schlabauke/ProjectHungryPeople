const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
    logger: true
})

function sendEmail(options) {
    console.log('Email-Options:', options)
    const to = options.email
    const subject = 'Your reservation at HungryPeople-Yummy'
    const message = `Thank you for your reservation at HungryPeople. \n 
    This is your reservation: \n
    Date: ${options.date}, \n
    at: ${options.time}, \n
    for ${options.people} person(s).`

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