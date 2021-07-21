const express = require('express')
const router = express.Router()
const db = require("../database");
const pgp = require('pg-promise')({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
  });
router.get('/', (req, res) => {    
    res.render('pages/checklist_update', {
        layout: './layouts/full-width'
    })
})

router.get('/:id', (req, res) => {
     if(req.query.view){
       console.log("AA")
     }
     const query = "SELECT check_name, check_content, check_item_id from check_list l inner join check_item i on l.check_id = i.check_id where l.check_id  = $1 and status = 0 order by check_item_id asc"
     db.any(query, req.params.id)
     .then((check) =>{
            res.render('pages/checklist_update',{
                title: check[0].check_name,
                contents: check,
                msgStatus: req.query.view? "": "alert-success",
                msg: req.query.view? "" : "Success!! your checklist has been created.",
                layout: './layouts/full-width' 
            })
     })
     .catch((err) => {
        res.redirect('/error')
    }) 
    })

router.post('/updateStatus/', async (req, res) => {
    const idList = req.body.idList;
    const returnObj = {
        message: "",
        msgStatus: ""
      }
    try{
        const result = await updateCheckItemStatus(idList);
        returnObj['message'] = "Successfully updated."
        returnObj['msgStatus'] = "alert-success"
        return res.send(JSON.stringify(returnObj));
       
      }catch(err){
        res.redirect('/error')
      }
})

function updateCheckItemStatus(idList) {
    return new Promise( async resolve => {
      // data input values:
      //const cs = new pgp.helpers.ColumnSet(['?check_item_id', 'status'], {table: 'check_item'});
      let  dataMulti = [] 
      idList.forEach(element => {
        dataMulti.push({check_item_id: Number(element), status: 1 })
      });
            const query = pgp.helpers.update(dataMulti, ['?check_item_id', 'status'], 'check_item') + ' WHERE v.check_item_id = t.check_item_id';
            const res = await db.none(query);
            resolve(res)
         
        });

  }

module.exports = router