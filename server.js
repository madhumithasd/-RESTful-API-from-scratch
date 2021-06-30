const express = require('express');
const shortid = require('shortid');

const server=express();
var bodyParser = require('body-parser')

const port = process.env.PORT;

server.use(bodyParser.json());

const users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Mobile phone", // String, required
        price: 20000,  // String, required
    },
    {
        id: 2, // hint: use the shortid npm package to generate it
        name: "Laptop", // String, required
        bio: "50000",  // String, required
    }
]

server.get('/', (req, res) =>{
    res.status(200).json({message:"it works"})
})

server.get('/api/users/', (req, res) =>{
    const all = users;
    if (all === undefined){
        return res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    res.status(200).json(all)
})

server.get('/api/users/:id', (req, res) =>{
    const all = users;
    if (all === undefined){
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
    user = users.filter(color => `${color.id}` === req.params.id);
    if(user !== undefined){
        res.status(200).send(user)
    }
    else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.delete('/api/users/:id', (req, res) =>{
    if (!req.params.id)
        res.status(400).send("Your request is missing the color id");
    user = users.filter(color => `${color.id}` !== req.params.id);
    res.status(202).send(req.params.id);
})

server.post('/api/users', (req, res)=>{
    if(req.body.name !==undefined && req.body.bio !== undefined){
        const newUser = req.body;
        newUser.id = shortid.generate();
        if(newUser === undefined){
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
        users.push(newUser);
        res.status(201).json(users);
    } else{
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

server.put('/api/users/:id', (req, res) =>{
    if (!req.body.name || !req.body.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    let foundUser = users.filter(user => `${user.id}` === req.params.id);
    if(foundUser === undefined){
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    foundUser = req.body;
    res.status(200).json(foundUser)
})

server.listen(port, () => console.log("Server is running"))
