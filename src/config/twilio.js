const twi = {}
//Both should be environment vars 
const ACCOUNT_SID = 'ACdb6b4c3fc6ac08facce4f564f6a69e6d';
const AUTH_TOKEN = 'de9eeff217c7087c9e161b4237d4d92e';

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