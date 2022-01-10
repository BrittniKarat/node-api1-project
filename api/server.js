// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/hello_world', (req, res) => {
    res.status(200).json('This worked')
})

server.post('/api/users', async (req, res) => {
    try{
        const newUser = await User.insert(req.body)
        console.log(newUser)
        res.status(201).json(newUser)
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})

server.get('/api/users', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})

server.get('/api/users/:id', async (req, res) => {
    console.log(req.method)
    console.log(req.headers)
    console.log(req.body)
    console.log(req.params)
    try{
        const user = await User.findById(req.params.id)
        if(!user) {
            res.status(404).json("Please enter the correct user id.")
        } else {
            res.status(200).json(user)
        }  
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})


module.exports = server; 
