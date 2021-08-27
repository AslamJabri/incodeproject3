const express = require('express' ) 
const data = require ('./data')
const app = express()
const port = 5001
const bcrypt = require('bcrypt');


app.use(express.json())
app.use((express.urlencoded)({extended : false}))

//console.log(message)
//req-request  , res- response
//GET request
app.get('/',(req , res) => {
    res.send("Welcome To our schedule website.")
})
 app.get('/users',(req , res) => {
         res.send(data.users)
})
app.get('/users/:id',(req , res) => {
    //const user = [data.user.id];
    res.send(data.users[req.params.id])
})
app.post('/users',(req , res)=>{
    //let {firstname , lastname , email , password} = req.body
    let {firstname , lastname , email , password} = req.body
    
    let use = req.body
    

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const newUser = {firstname,
    lastname,
    email,
    password : hash }
    
    data.users.push(newUser)
    res.json(data.users)
})    




app.get('/users/:id/schedules', (req,res) => {
    const userPost =     data.schedules.filter(schedule => schedule.user_id === Number(req.params.id))

    //console.log(userPost)
    res.json(userPost)
})
    


app.listen(port ,() => {
    console.log(`example app listening at http://localhost:${port}`)
})
