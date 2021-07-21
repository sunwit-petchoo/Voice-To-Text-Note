
const express = require("express");
const db = require("../database");
const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});
const router = express.Router();

router.get('/', (req, res) => {    
  res.render('pages/voicenote', {
      layout: './layouts/full-width'
  })
})

router.post('/', async (req, res) =>{
  const title = req.body.title
  const content = req.body.wordsContainer
  const result = await insertMemoList(title);
  const redirectId = result.memo_id
  db.none('insert into memo_item (memo_id, memo_content) values($1, $2)' , [result.memo_id, content])
    .then(() => {
      res.redirect(`/voicenote_view/${redirectId}`)
    })
    .catch((err) => {
        //res.redirect('/error')
        console.log(err)
    })           
})

function insertMemoList(title) {
  return new Promise( async resolve => {
    const cs = new pgp.helpers.ColumnSet(['user_id', 'memo_name', 'type'], {table: 'memo_list'});
    // data input values:
    const values = [{user_id: 1, memo_name: title, type: 'Voice note'}];
        
    const query = pgp.helpers.insert(values, cs) + ' RETURNING memo_id';
        
    const res = await db.one(query);
          resolve(res)
      });
}

module.exports = router;