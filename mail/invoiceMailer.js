const nodemailer = require('nodemailer');
const config = require('config');

const transport = nodemailer.createTransport({
    host: config.get('mail.host'),
    port: config.get('mail.port'),
    auth: {
        username: config.get('mail.userName'),
        password: config.get('mail.password')
    }
})
module.exports = {
    emailInvoice: (message) => {
        // TODO: validate message
        transport.sendMail(message, (err, info) => {
            if (err) {
                console.error(`Error: Sending email to ${message.to} failed`);
            } else {
                console.log(`Email invoice is sent to ${message.to} ${info}`);
            }
        })
    }
}