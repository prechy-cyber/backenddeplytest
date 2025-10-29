const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.config()
const mongoose =require('mongoose')
const ejs = require('ejs')
app.set('view engine', 'ejs')
const URI = process.env.URI

mongoose.connect(URI)
.then(()=>{
console.log('connected to mongoose');

}).catch((err)=>{
    console.log('not connected', err);
    
})
// app.get("/", (req, res)=>{
// res.render("dashboard", {gender: "you are loved"})
// })

let allStudent = [{name: 'adeola', class:"web level 2", occupation: 'student', age : 32},
                  {name: 'adetunji ', class:"web level 3", occupation: 'farmer', age : 53},
                  {name: 'adeola', class:"web level 2", occupation: 'welder', age : 65},
                  {name: 'adetunji ', class:"web level 3", occupation: 'doctor', age : 93},
                  {name: 'adeola', class:"web level 2", occupation: 'teacher', age : 40},
                  {name: 'adetunji ', class:"web level 3", occupation: 'student', age : 13}
]

app.get('/', (req, res) =>{
    res.send('update this')
    
})
app.get('/emini', (req, res) =>{
    res.sendFile(__dirname + "/index.html")
})
app.get('/student', (req, res) =>{
    res.send(allStudent)
})




app.get('/signup', (req, res) =>{
    res.render('signup', {message: 'beeni odanpe won gba but lets see'})
})
app.get('/signin', (req, res) =>{
    res.render('signin')
})
app.get('/dashboard', (req, res) =>{
    res.render('dashboard', {gender: "male"})
})

 // app.listen (portnumber, callbackfunction)
// app.listen(3000, () =>{
//     console.log('App working at port 3000');
    
// })
app.listen(PORT, (err) =>{
    if (err) {
        console.log('error occurred while starting the server:', err);
        
    }else{
        console.log('app is running at port 3000');
        
    }
    
})