const { upload } = require('../helpers/multerConfig')
const router = require('express').Router()

router.post('/upload',upload.single('image'),async(req,res)=>{
    try {
        if(req.file){
            return res.status(200).json({
                success:true,
                message:"Image uploaded Successfully",
                data:{
                    filename:req.file.filename,
                    path:req.file.path,
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Image Upload Error'
        })
    }
})

module.exports = router 