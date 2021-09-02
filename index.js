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
app.post('/usersnew', urlencodedParser , (req , res)=>{
    //let {firstname , lastname , email , password} = req.body
   
    // let {firstname , lastname , email , password} = req.body
    
    
    

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    // //const newUser = {firstname,
    //     lastname,
    //    // email,
    //     password : hash }
    console.log(req.body)
    
    // data.users.push(newUser)
    // res.json(data.users)

    res.render('pages/usersnew',{salt ,hash , newUser , user : data.users})
})    
//app.post('/usersnew',(req , res)=>{
    //let {firstname , lastname , email , password} = req.body
    
//     let {firstname , lastname , email , password} = req.body
    
//     let use = req.body
    

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
    
//     const newUser = {firstname,
//     lastname,
//     email,
//     password : hash }
    
//     data.users.push(newUser)
//     //res.json(data.users)

//     res.render('pages/user_add' , {use : use ,
//         users: data.users , 
//          })
// })    




app.get('/users/:id/schedules', (req,res) => {
    const  id  = req.params;
    
    //const userPost = data.schedules.filter(schedule => schedule.user_id === Number(req.params.id))
    //console.log(userPost)
    res.render("pages/schedules_id", { id  , schedules : data.schedules , schedule : ' ', day : date() })
})
    


app.listen(port ,() => {
    console.log(`example app listening at http://localhost:${port}`)
})
