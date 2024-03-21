const express= require('express')
const mongoose = require('mongoose')
const Subscriber = require('./schema')

const app = express()
app.use(express.json())

const connectDB = async() => {
    try {
        const url = 'connect with LIT mongoDB connection url'
        await mongoose.connect(url)
        console.log('database connected')  
    } catch (error) {
        console.log('error in connecting DB', error)
    }
}

app.post('/subscribe', async(req, res) => {
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


connectDB()
app.listen(2000, () => {
    console.log('server is running')
})


