const db = require("../config/dbConfig.js")
const bcrypt = require('bcrypt')



const signup = (req, res) => {

    const { userName, email, password, contactNumber } = req.body

    if (!userName || !email || !password || !contactNumber) {
        res.send({ error: "please fill all the fields" })
    }

    const checkEmail = "SELECT * FROM users WHERE email = ?"

    db.query(checkEmail, [email], (error, result) => {
        if (error) return res.send({ error: "Error from server" })


        if (result.length > 0) {
            return res.send({ error: "User with this email already exists!" })
        }
    })

    const hashedPassword = bcrypt.hashSync(password,10)

    const newUser = {
        userName : userName,
        email: email,
        password: hashedPassword,
        contactNumber: contactNumber
    }

    const createUserQuery = "INSERT INTO users SET ?"

    db.query(createUserQuery, newUser , (error,result)=>{
        if(error){
            return res.send({error: "Error Creating user"})
        } 

        res.send({message: "user created successfully!"})
        
    } )

}

module.exports = signup