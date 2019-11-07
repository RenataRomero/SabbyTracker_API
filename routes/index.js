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

module.exports = router;