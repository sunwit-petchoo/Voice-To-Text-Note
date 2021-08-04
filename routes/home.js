const express = require('express')
const db = require("../database");
const router = express.Router()

/* router.get('/', (req, res) => {    
    res.render('pages/home', {
        layout: './layouts/full-width'
    })
}) */
router.get('/', (req, res) => {
    const query = "select memo_name as title , memo_id as id, type, to_char(create_at,\' DD/MM/YYYY fmHH12:MI AM\') as create_at " + 
    "from memo_list union all select check_name, check_id, type, to_char(create_at,\' DD/MM/YYYY fmHH12:MI AM\') as create_at from check_list order by create_at desc "
    
     db.any(query)
     .then((lists) =>{
        console.log(lists.length)
            res.render('pages/home',{
                lists: lists.length >0 ? lists : [],
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