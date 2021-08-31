const express = require('express' ) 
const data = require ('./data')
const app = express()
const port = process.env.PORT || 8000
const bcrypt = require('bcrypt');
const date = require(__dirname + "/date.js")

app.use(express.json())
app.use((express.urlencoded)({extended : false}))

//setting ejs engine
app.set('view engine','ejs')

app.use(express.static("public"))




//GET request to home 
app.get('/',(req , res) => {
    res.render("pages/index")
})
 app.get('/users',(req , res) => {
    
    res.render("pages/users", {users : data.users})
})
app.get('/schedules',(req , res) => {
    let day = date()
   
    res.render("pages/schedules",{schedules : data.schedules, day : day})
})

//route to particular id
app.get('/users/:id',(req , res) => {
    const { id } = req.params
    let users = data.users 
    const userFound = ' '
    res.render('pages/user_id',{id : id , users:users , userFound: userFound })
    
    //const user = [data.user.id];
    //res.send(data.users[req.params.id])
    //const use = (data.users[req.params.id])
    
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
    const { id } = req.params
    let schedules = data.schedules
    const userPost = " "
    let day = date()
    //data.schedules.filter(schedule => schedule.user_id === Number(req.params.id))
    //console.log(userPost)
    res.render("pages/schedules_id", { id:id ,schedules : schedules ,userPost : userPost , day : day })
})
    


app.listen(port ,() => {
    console.log(`example app listening at http://localhost:${port}`)
})
