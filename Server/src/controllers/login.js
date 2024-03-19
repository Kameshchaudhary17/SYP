const db = require('../config/dbConfig')
const bcrypt = require('bcrypt')


const login = (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.send({ error: "Filelds cannot be empty" })
    }

    const checkEmail = "SELECT * FROM users WHERE email = ?"

    db.query(checkEmail, [email], (error, result) => {
        if (error) return res.send({ error: "Error from server" })


        if (result.length > 0) {
            return res.send({ error: "User with this email does not  exists!" })
        }
    })

    const user = result[0];
    

    try {
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // Password is correct, login successful
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ error: "Error comparing passwords" });
    }

}

module.exports = login