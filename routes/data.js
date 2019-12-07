const express = require('express');
const router = express.Router();
const Pulse = require('../models/User');
const Temp = require('../models/User');
const Sound = require('../models/User');
const Position = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/temp', (req, res) => {
    const {variable, date, time} = req.body;

    console.log('variable: ', variable);
    console.log('date: ', date);
    console.log('time: ', time);


    User.findOne({ email: email})
        .then(user => {

            if(user) {
                console.log('User already exists!!');
            }else{
                const newTemp = new Tenp({
                    variablre, 
                    date, 
                    time
                });

                console.log(newTemp);

                //Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.log(err);

                        newUser.password = hash;

                        newUser.save()
                            .then(user => {
                                res.send('user saved!!');
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