const express = require('express' ) 
const data = require ('./data')
const app = express()
const port = process.env.PORT || 8000
const bcrypt = require('bcrypt');
const date = require(__dirname + "/date.js")
const pgp = require('pg-promise')

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
    let day = date()
    res.render("pages/users", {users : data.users , day})
})
app.get('/schedules',(req , res) => {
    let day = date()
    res.render("pages/schedules",{schedules : data.schedules, day})
})

//route to particular id
app.get('/users/:id',(req , res) => {
    const { id } = req.params
    
    res.render('pages/user_id',{id, users:data.users , userFound: ' ' })
    
    //const user = [data.user.id];
    //res.send(data.users[req.params.id])
    //const use = (data.users[req.params.id])
    
})
app.get('/usersnew', (req , res) => {
    res.render("pages/usersnew")
})
app.post('/users' , (req , res)=>{
    let {firstname , lastname , email , password} = req.body
   
        // let {firstname , lastname , email , password} = req.body
        console.log(req.body)
       const salt =  bcrypt.genSaltSync(10);
       const hash =   bcrypt.hashSync(password, salt);
       //console.log(hash)
       const newUsers = { firstname, lastname, email, password : hash } 
       
         data.users.push(newUsers)
       //res.json(data.users)
        res.redirect ("/users")
                
});
   
app.get('/schedulesnew', (req , res) => {
    res.render("pages/schedulesnew")
})

app.post('/schedules',(req , res)=>{
    
     let {user_id , day , start_at , end_at} = req.body
     const newschedule = {user_id , day , start_at , end_at}
     data.schedules.push(newschedule)
     
     res.render("pages/schedules" ,{schedules : data.schedules, day })
        
})    




app.get('/users/:id/schedules', (req,res) => {
    day = date()
    
    const userPost = data.schedules.filter(schedule => schedule.user_id === Number(req.params.id))
    //console.log(userPost)
    if (userPost) {
        res.render("pages/schedules_id", {
            schedules: data.schedules.filter(
                (schedule) => schedule.user_id === Number(req.params.id),day
            ),
        });
    } else {
        res.status(400).json({ msg: `No number with the id ${req.params.id}` });
    }
});
    
    


app.listen(port ,() => {
    console.log(`example app listening at http://localhost:${port}`)
})
