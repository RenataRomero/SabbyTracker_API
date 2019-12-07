const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome!!');
});

router.post('/', (req, res) => {
    res.status(200);
    console.log(req.body);
    res.send('Printed');
});

router.post('/index', (req, res) => {
    res.status(200);
    console.log(req.body);
    res.send('Printed');
});


router.post('/print', (req, res) => {
    res.status(200);
    console.log(req.body);
    res.send({
        "email":req.body.email,
        "pass":req.body.password,
    });
});

module.exports = router;