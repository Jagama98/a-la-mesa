const express = require('express');
const router = express.Router();

router.get('/mapa', (req, res) => {
    res.render('mapa');
});

module.exports = router;