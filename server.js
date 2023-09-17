require('dotenv').config();
const { initializeDatabase } = require('./config/db')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const helmet = require('helmet');
const { contactRouter } = require('./src/routes/contact.routes');


// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

app.use(cors());

app.use(helmet());
app.use(express.json())


app.use('/api/contacts', contactRouter)
initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
