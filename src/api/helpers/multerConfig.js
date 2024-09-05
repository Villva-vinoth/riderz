const multer = require('multer')
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const upload = 'public/uploads'
        if(!fs.existsSync(upload)){
            fs.mkdirSync(upload,{recursive:true})
        }

        cb(null, upload)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

module.exports = {
    upload
}