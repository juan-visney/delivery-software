const twi = {}
//Both should be environment vars 
const ACCOUNT_SID = 'AC9e96717a37556d755274ba11a25f1639';
const AUTH_TOKEN = 'd139e1994f283a8667c6df8a45fdbada';

const MY_PHONE_NUMBER = 'whatsapp:+14155238886';

twi.init = async(numero, mensaje)=>{
    const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)
    client.messages.create({
        to: 'whatsapp:+591'+numero,
        from: 'whatsapp:+14155238886',
        body: mensaje
    })
    .then(message => console.log(message.sid))
}
module.exports = twi