const pool = new require('../config/db')

const getAllPharmacies = async (req, res) => {
    try {
        const pharmacies = await pool.query("SELECT * FROM pharmacies")
        res.json(pharmacies.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createPharmacy = async (req, res) => {
    try {
        const { pharmacy_name, address, longitude, latitude } = req.body;
        const createdPharmacy = await pool.query(
            "INSERT INTO pharmacies (pharmacy_name, address, longitude, latitude) \
            VALUES( $1, $2, $3, $4) RETURNING *",
            [ pharmacy_name, address, longitude, latitude ]
        )
        res.json(createdPharmacy.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updatePharmacy = async (req, res) => {
    try {
        const { id } = req.params;
        const { pharmacy_name, address, longitude, latitude } = req.body;
        const updatedPharmacy = await pool.query(
            "UPDATE pharmacies SET pharmacy_name = $1, address = $2, \
            longitude = $3, latitude = $4 WHERE pharmacy_id = $5 RETURNING *",
            [ pharmacy_name, address, longitude, latitude, id ]
        )
        res.json(updatedPharmacy.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deletePharmacy = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM pharmacies WHERE pharmacy_id = $1", [id]);
        res.json(`Successfully Deleted Pharmacy ID: ${id}`)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getAllPharmacies,
    createPharmacy,
    updatePharmacy,
    deletePharmacy
}