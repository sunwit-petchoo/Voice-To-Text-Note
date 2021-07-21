const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {    
    res.render('pages/translation', {
        layout: './layouts/full-width'
    })
})

router.post('/', async (req, res) => {
    
})

module.exports = router