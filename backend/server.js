const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('../backend/config/db')

require('dotenv').config();

const authRoutes = require('../backend/routes/authRoutes')
const companyRoutes = require("../backend/routes/companyRoutes");
const jobRoutes = require('../backend/routes/jobRoutes')
const applicationRoutes = require("../backend/routes/applicationRoutes");
const profileRoutes = require("./routes/profileRoutes");


app.use(express.json());
app.use(cors());

app.use('/api/auth/', authRoutes)
app.use('/api/companies',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use("/api/applications",applicationRoutes)
app.use("/api/profiles", profileRoutes);


app.get('/', (req, res) =>{
    res.json({
        message: "CareerConnect is running on API"
    })
});

app.get('/test-db', async (req, res) =>{
    const result = await pool.query("SELECT NOW()")
    res.json({
        message: "Database connected",
        time: result.rows[0]

    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});