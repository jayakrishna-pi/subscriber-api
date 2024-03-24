const express= require('express')
const mongoose = require('mongoose')
const Subscriber = require('./schema')
const cors = require('cors')
const Rigesterd = require('./schema')

const app = express()
app.use(express.json())
app.use(cors())

const connectDB = async() => {
    try {
        const url = 'mongodb+srv://jayap:jayap123@subscribers-cluster.xgczewr.mongodb.net/subsribers-database?retryWrites=true&w=majority&appName=subscribers-cluster'
        await mongoose.connect(url)
        console.log('database connected')  
    } catch (error) {
        console.log('error in connecting DB', error)
    }
}

app.post('/subscribe', async(req, res) => {
    console.log(req.body)
    const {email} = req.body
    console.log({email})
    try {
        const existedSubscriber = await Subscriber.findOne({email})
        if (existedSubscriber){
            res.status(400).send("You're already subscribed")
        }else {
            await Subscriber.create({
                email
            })
            res.status(200).send("You're Subscribed")
        }
    } catch (error) {
        console.log('internal server error', error)
        res.status(500).send('Internal server error')
    }
})
// signup
    app.post ('/signup', async(req, res) =>{
        const  {userName,email,password}=req.body
        console.log(req.body)
       try{
        const  existedRigestred=await Rigesterd .findOne({email})
        if (existedRigestred){

            res.status(400).send("your already rigesterd")
        }
        else{
            await Rigesterd.create({
                email,userName,password
            })
            res.status(200).send ("your registered sucessfully")  
        }
       }
       catch (error){
        onsole.log('internal server error', error)
        res.status(500).send('Internal server error')

       }


    })





connectDB()
app.listen(2000, () => {
    console.log('server is running')
})


