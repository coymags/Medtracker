const pool = new require('../config/db')
const bcrypt = require('bcryptjs')
const { generateAccessToken } = require('../middleware/authMiddleware')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createUser = async (req, res) => {
    try {
        const {first_name, last_name, email, password, user_type} = req.body;
        const salt = bcrypt.genSaltSync(8)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const createUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password, user_type) \
            VALUES( $1, $2, $3, $4, $5) RETURNING *",
            [ first_name, last_name, email, hashedPassword, user_type ]
        )
        res.json(createUser.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, user_type } = req.body;
        const updateUser = await pool.query(
            "UPDATE users SET first_name = $1, last_name = $2, \
            email = $3, password = $4, user_type = $5  WHERE user_id = $6 RETURNING *",
            [ first_name, last_name, email, password, user_type, id ]
        )
        res.json(updateUser.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
        res.json(`Successfully Deleted User ID: ${id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const userDetails = await pool.query("SELECT * FROM users WHERE email =$1", [email])
        console.log("UserDetails: ", userDetails.rowCount)
        if(userDetails.rowCount !== 0) {
            const matched = await bcrypt.compare(
                password,
                userDetails.rows[0].password
            )
            const generatedToken = generateAccessToken({
                email: email
            })
            userDetails.rows[0].token = generatedToken

            if (matched) {
                res.json(userDetails.rows[0])
            } else {
                throw new Error("Password mismatched!")
            } 
        } else {
            res.json(`User does not exist`)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
}