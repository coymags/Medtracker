const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')

const loginRoutes = require('./routes/loginRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const pharmacyRoutes = require('./routes/pharmacyRoutes')

const { authenticateToken } = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Use user routes (with authentication middleware for protected routes)
// app.use('/api/v1', authenticateToken, userRoutes);
app.use('/api/v1', loginRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', pharmacyRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})