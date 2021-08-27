const express = require('express' ) 
const data = require ('./data')
const app = express()
const port = 3100

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
/*app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const userFound = users.find((user, index) => {
        if (index == id) {
            return user;
        };
    });
    if (userFound) {
        res.send(userFound);
    } else {
        res.send(`User ${id} does not exist in our database.`);
    }
})
*/
        
    


app.listen(port ,() => {
    console.log(`example app listening at http://localhost:${port}`)
})
