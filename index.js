const express = require('express')
const sequelize = require('./database')
const User = require('./User')

//sequelize.sync({ force: true }).then(() => console.log('db is ready'))
sequelize.sync().then(() => console.log('db is ready'))

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
    //console.log(req.body)
    await User.create(req.body)
    res.send('user is inserted')
})

app.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
    const requestId = req.params.id
    const user = await User.findOne({ where: {id: requestId} })
    res.send(user)
})

app.put('/users/:id', async (req, res) => {
    const requestId = req.params.id
    const user = await User.findOne({ where: {id: requestId} })
    user.username = req.body.username
    await user.save()
    res.send('user is updated')
    //res.json({"message": "user is updated"});
    //res.send(JSON.stringify({message:"user is updated"}));
})

app.delete('/users/:id', async (req, res) => {
    const requestId = req.params.id
    const user = await User.findOne({ where: {id: requestId} })
    await user.destroy()
    res.send('user is deleted')
})

app.get('/ping', (req, res) => {
    res.status(200).send('Pong')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})