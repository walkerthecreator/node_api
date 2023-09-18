const express = require("express")
const app = express()
const mongoose = require("mongoose")
const db = require("./config/mongoose.js")
const Product = require("./model/product")

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

// GET request for api homepage
app.get('/' ,  (req , res)=>{
    return res.send("welcome to node api")
})

// GET request for product 
app.get('/products' , async (req , res )=>{    
    const product = await Product.find()
    return res.status(200).send(product)    
})

// GET request for specific product 
app.get('/products/:id' , async (req , res) => {
    const { id } = req.params
    try{
        const product = await Product.find({_id : id})

        if(!product) return res.status(404).send("Item not exsist")

        return res.status(200).send( product )
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})




// DELETE
app.delete('/products/:id' , async (req , res) => {
    try{
        const { id } = req.params
        const product = await Product.deleteOne({ _id : id })
        return res.status(200).send("successfully deleted")
    }
    catch(err){
        return res.status(500).send(err.message)
    }

})


// POST request for posting data
app.post('/products', async (req , res) => {
    try{
        const { name , description , category } = req.body
        console.log(name , description, category)
        const product = await Product.create({ name, description , category})
        console.log(product)
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})


// PUT request for updation
app.put('/products/:id', async (req , res) => {
    try{
        const { id } = req.params
        const {name , description , category } = req.body
        const product = await Product.updateOne({ _id : id} , {name , category , description})
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(500).send(err.message)
    }
})



app.listen( 4000 ,()=>{
    console.log("started running on port 4000")
})