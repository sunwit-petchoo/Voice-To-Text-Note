const express = require('express')
const router = express.Router()
const db = require("../database")

router.get('/:id', (req, res) => {
     const query = "SELECT memo_name, memo_content from memo_list l inner join memo_item i on l.memo_id = i.memo_id where l.memo_id  = $1 "
     db.one(query, req.params.id)
     .then((memo) =>{
            res.render('pages/voicenote_view',{
                title: memo.memo_name,
                content: memo.memo_content,
                msgStatus: req.query.view? "": "alert-success",
                msg: req.query.view? "": "Success!! your Note has been created.",
                layout: './layouts/full-width' 
            })
     })
     .catch((err) => {
        res.redirect('/error')
        
    }) 
    })

router.post('/', async (req, res) => {
    
})

module.exports = router