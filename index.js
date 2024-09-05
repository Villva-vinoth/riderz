const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path =require('path')

const sequelize = require('./src/db/config/sequelizeConnect.js')
const initiateRouter = require('./src/api/helpers/baseRouter.js')
dotenv.config()

const initialize = async () => {
    try {
         await sequelize.authenticate()
         await sequelize.sync({alter:true}) 
        console.log('sequelize established successfully ! pg connected');
        return { sequelize }
    } catch (error) {
        console.log("Error connecting with sequelize",error)
    }
}

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT

initialize()

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
});

app.get('/',(req,res)=>{
    res.send({
        message:"Riders Active"
    })
})


app.use('/api',initiateRouter);

app.use('/public/uploads',express.static(path.join(__dirname,'public/uploads',)))
console.log(path.join(__dirname,'public/*'))
app.listen(port,()=>{
    console.log(`listening to the port `,port)
})