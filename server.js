require('dotenv').config();
const { initializeDatabase } = require('./config/db')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const helmet = require('helmet');
const { contactRouter } = require('./src/routes/contact.routes');

initializeDatabase();

const allowedOrigins = ['<http://localhost:3000>', '<https://example.com>'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}));

app.use(helmet());
app.use(express.json())


app.use('/api/contacts', contactRouter)
// app.get('/', (req, res) => {
//     res.send('Hello, World!')
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})