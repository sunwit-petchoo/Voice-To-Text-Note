//Ref: https://www.npmjs.com/package/@vitalets/google-translate-api
const translate = require('@vitalets/google-translate-api');
var languages = require('../node_modules/@vitalets/google-translate-api/languages');
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {  
    var lang_key = []
    var lang_value = []
    
    for(var key in languages) {
        value = languages[key];
        
        lang_key.push(key)
        lang_value.push(value)
    }
    
    res.render('pages/translation', {
        layout: './layouts/full-width',
        lang_key: lang_key,
        lang_value: lang_value,
        output_translate: ''
    })
})

router.post('/', async (req, res) => {
    const { input_voice, selected_lang } = req.body
    var output = ""
    const returnObj = {
        output_translate: ""
      }

    await translate(input_voice, {from: 'en', to: selected_lang}).then(res => {
        output = res.text
        console.log(output)
    }).catch(err => {
        console.error(err);
    });
    returnObj['output_translate']  = output
    return res.send(JSON.stringify(returnObj));
    // translate('hello', {from: 'auto', to: 'th'}).then(res => {
    //     console.log(res.text);
    //     //=> Ik spreek Nederlands!
    //     console.log(res.from.text.autoCorrected);
    //     //=> true
    //     console.log(res.from.text.value);
    //     //=> I [speak] Dutch!
    //     console.log(res.from.text.didYouMean);
    //     //=> false
    // }).catch(err => {
    //     console.error(err);
    // });
})

module.exports = router