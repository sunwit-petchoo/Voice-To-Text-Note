const express = require("express");
const db = require("../database");
const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});
const router = express.Router();

router.get('/', (req, res) =>{
  res.render('pages/checklist', {
    layout: './layouts/full-width',
})
})

router.post('/', async (req, res) =>{
  const title = req.body.inputTitle
  const content = req.body.checklist
  if(content){
  try{
    const result = await insertCheckList(title);
    const resultItem = await insertCheckItem(result.check_id, content);
    const returnCheckId = result.check_id
    res.redirect(`/checklist_update/${returnCheckId}`)
  }catch(err){
    res.redirect('/error')
  }
}else{
  res.redirect('/error')
}
})

function insertCheckList(title) {
  return new Promise( async resolve => {
    const cs = new pgp.helpers.ColumnSet(['user_id', 'check_name','type'], {table: 'check_list'});
    // data input values:
    const values = [{user_id: 1, check_name: title, type:'Checklist'}];
        
    const query = pgp.helpers.insert(values, cs) + ' RETURNING check_id';
        
    const res = await db.one(query);
          resolve(res)
      });
}

function insertCheckItem(checkId, content) {
  return new Promise( async resolve => {
    const cs = new pgp.helpers.ColumnSet(['check_id', 'check_content','status'], {table: 'check_item'});
    // data input values:
    let  values = [] 
    content.forEach(element => {
      values.push({check_id: checkId, check_content: element, status: 0 })
    });
   
    const query = pgp.helpers.insert(values, cs);
        
    const res = await db.none(query);
          resolve(res)
      });
}

module.exports = router;