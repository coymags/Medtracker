const pool = new require('../config/db')

const getAllProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM medicines ORDER BY medicine_id ASC");
        res.json(products.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const specificProduct = await pool.query('SELECT * FROM medicines WHERE medicine_id = $1', [id])
        res.json(specificProduct.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const searchProduct = async (req, res) => {
    console.log("Medicine", req.body.medicine)
    try {
        let med = `%${req.params.medicine}%`
        const namedProduct = await pool.query(
            'SELECT p.pharmacy_id, p.pharmacy_name, p.address, p.longitude, p.latitude, m.name, m.mg, m.price, m.description \
            FROM medicines AS m INNER JOIN pharmacies AS p ON m.pharmacy_id = p.pharmacy_id WHERE m.name ILIKE $1',
            [med]
        )
        res.json(namedProduct.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, mg, price, description, pharmacy_id} = req.body;
        const createProduct = await pool.query(
            "INSERT INTO medicines (name, mg, price, description, pharmacy_id) \
             VALUES($1, $2, $3, $4, $5) RETURNING *",
            [ name, mg, price, description , pharmacy_id ]
        )
        res.send(createProduct.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

// const deleteProduct = async (req, res) => {
//     try {
//         // Delete product logic
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }

module.exports = {
    getAllProducts,
    getProduct,
    searchProduct,
    createProduct
}