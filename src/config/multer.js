const multer = require('multer')
const path = require('path')

const mul = {}

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/fotos'),
    filename : (req,file,cb) =>{
        cb(null,Date.now()+'.'+path.extname(file.originalname))
    }
})

mul.uploadImage = multer({
    storage: storage,
    limits : {fileSize : 1000000}
}).single('photo')

module.exports = mul