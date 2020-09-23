const express = require('express')

const app = express()

//settings
app.set('port', process.env.PORT || 3000)

//starting server
app.listen(app.get('port'), () => {
    console.log('Server on PORT ', app.get('port'))
})