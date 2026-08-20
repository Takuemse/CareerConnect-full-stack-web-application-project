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
const userRoutes = require('./routes/userRoutes')
const notFound = require("./middleware/notFoundMiddleware");

const errorHandler = require("./middleware/errorMiddleware");


app.use(express.json());
app.use(cors());

app.use('/api/auth/', authRoutes)
app.use('/api/companies',companyRoutes)
app.use('/api/users',userRoutes)
app.use('/api/jobs',jobRoutes)
app.use("/api/applications",applicationRoutes)
app.use("/api/profiles", profileRoutes);

app.use(notFound);
app.use(errorHandler);


app.get('/', (req, res) =>{
    res.json({
        message: "CareerConnect is running on API"
    })
});



const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});