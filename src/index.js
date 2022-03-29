const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
router(app);
app.use(path.join(__dirname, '/public'), express.static('public'));
app.listen(process.env.NODE_LOCAL_PORT, () => {
    console.log(`app running on localhost:${process.env.NODE_LOCAL_PORT}`)
})

