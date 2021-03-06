const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.get('/login', (req, res) => {
    res.send('Login!!');
});

router.get('/register', (req, res) => {
    res.send('Register!!');
});

router.get('/', (req, res) => {
    res.send('USERS MAIN');
});

//Register Handler
router.post('/register', (req, res) => {
    const {email, password} = req.body;

    console.log('email: ', email);
    console.log('password: ', password);
    let errors = [];


    User.findOne({ email: email})
        .then(user => {

            if(user) {
                console.log('User already exists!!');
            }else{
                const newUser = new User({
                    email, 
                    password
                });

                console.log(newUser);

                //Hash Password

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.log(err);

                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                res.sendStatus(200);
                            })
                            .catch(err => console.log(err));

                    });
                });

            }
        });




});

router.post('/login', (req, res) => {
    const {name, email, password} = req.body;
    console.log(email);

    User.findOne({ email: email }).then(user => {
        console.log('email: ', user.email);
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) console.log(err);

                if(hash == user.password)
                    res.send('Auth!!!');
                else
                    res.send('Not auth!!');
                

            });
        });
    });
});

module.exports = router;