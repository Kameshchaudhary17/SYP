const express = require('express')
const cors = require('cors')

const signupRoute = require('./src/controllers/signup')
const loginRoute = require('./src/controllers/login')

const app = express()

app.use(express.json());
app.use(cors())

app.post("/signup", signupRoute)
app.post("/signup", loginRoute)


app.listen(8030, () =>{
    console.log("Listening in port 8030")
})
