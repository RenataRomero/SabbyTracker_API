const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, { userNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));