const bcrypt = require('bcryptjs')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const pool = require('../config/db')

const bodyParser = require('body-parser')
//const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

// Read|GET || All users
app.get('/users', async(req, res) => {
  try{
    const userList = await pool.query("SELECT * FROM users");
    res.send(userList.rows);
  } catch(error){
    console.error(error.message);
  }
});
// Read|Get || All pharmacies
app.get('/pharmacies', async(req, res) => {
  try{
    const pharmacyList = await pool.query("SELECT * FROM pharmacies");
    res.send(pharmacyList.rows);
  } catch(error){
    console.error(error.message);
  }
});

// Update Users
app.put("/users/:id", async(req, res) => {
  try {
      const { id } = req.params;
      const { email, pharmacy_name, address, password } = req.body;
      const updateUser = await pool.query(
          "UPDATE medtracker_user SET email = $1, pharmacy_name = $2, address = $3, password = $4 WHERE id = $5 RETURNING *",
          [email, pharmacy_name, address, password, id]);
      res.json(updateUser.rows);
  } catch (error) {
      console.error(error.message)
  }
});

// Create/Post | Insert user
app.post("/users", async(req, res) =>{
  try{
      const {email, pharmacy_name, location, password} = req.body;
      const salt = bcrypt.genSaltSync(8)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const createUser = await pool.query(
        "INSERT INTO medtracker_user (email, pharmacy_name, password, latitude, longitude) VALUES( $1, $2, $3, $4, $5) RETURNING *",
        [email, pharmacy_name, hashedPassword, location.lat, location.lng]
      );
      res.send(createUser.rows);
      console.log(req.body)
    } catch (error) {
    console.error(error.message);
  }
});

// Read/GET | Get All Products
app.get("/products", async(req, res) => {
  try {
      const products = await pool.query("SELECT * FROM medicine ORDER BY medicine_id ASC");
      res.send(products.rows);
  
  } catch (error) {
      console.error(error.message);
      
  }
});

// Read/GET | Get specific product
app.get('/products/:id', async(req, res) =>{
  try{
      const { id } = req.params
      const specificProduct = await pool.query('SELECT * FROM medicine WHERE user_id = $1', [id])
      res.send(specificProduct.rows)
  } catch(error){
    console.error(error.message)
  }
})

//Read/GET | Getting product by specific name
app.get('/products/search/:medicine', async(req, res) =>{
  try {
    const { medicine } = req.params
    console.log(medicine)
    let med = `%${medicine}%`
    console.log(med)
    const namedProduct = await pool.query('SELECT mu.pharmacy_name, mu.address, mu.latitude, mu.longitude, m.name, m.mg, m.price, m.description FROM medtracker_user AS mu INNER JOIN medicine AS m ON mu.id = m.user_id WHERE m.name ILIKE $1', [med])
    res.send(namedProduct.rows)
  } catch (error) {
    console.error(error.message)
  }
})

// Create/Post | Insert products
app.post("/products", async(req, res) => {
  try {
      const { name, mg, price, description, user_id} = req.body;
      const createProduct = await pool.query(
          "INSERT INTO medicine (name, mg, price, description, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
          [name, mg, price, description , user_id]
      );
      res.send(createProduct.rows);
  } catch (error) {
      console.error(error.message);
  }
})

// Delete User
app.delete("/users/:id", async(req, res) => {
  try {
      const { id } = req.params;
      const deleteUser = await pool.query("DELETE FROM medtracker_user WHERE id = $1", [id]);
      res.json(`Successfully Deleted User ID: ${id}`)
  } catch (error) {
      console.error(error.message);
      
  }
})

// Login 
app.post('/login', async(req, res) =>{
  try{
    const {email, password} = req.body;
    const userDetails = await pool.query("SELECT * FROM medtracker_user WHERE email =$1", [email])
    if(userDetails.rowCount !== 0){
      const passwordMatch = await bcrypt.compare(
        password,
        userDetails.rows[0].password
        )
        res.json(userDetails.rows)
      //res.send(`Successfully login ${userExist}`)
    } else{
      res.send(`User does not exist`)
    }
  } catch(error){
    console.log(error)
  }
})

//User Type Login
app.post("/usertype", async(req, res) =>{
  try{
      const { firstname, lastname, email, password, user_type } = req.body;
      // const salt = bcrypt.genSaltSync(8)
      // const hashedPassword = bcrypt.hashSync(password, salt)
      const createUser = await pool.query(
        "INSERT INTO user_table ( firstname, lastname, email, password, user_type) VALUES( $1, $2, $3, $4, $5) RETURNING *",
        [ firstname, lastname, email, password, user_type ]
      );
      res.send(createUser.rows);
      //console.log(req.body)
    } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

