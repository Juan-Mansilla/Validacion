import express from 'express';
import ejs from 'ejs';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

//const axios = require('axios');
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log('__dirname')

app.set('view engine', 'ejs')
app.set('views',)

app.use(express.static(join(__dirname, 'public')))
app.get('/', (req, res) => res.render('index.ejs'))

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

console.log('hola')

//Extracion de la API

/*app.get('/webhook', (req, res) => {
  let mode = req.query['hub.mode'];
  let challenge = req.query['hub.challenge'];
  let token = req.query['hub.verify_token'];

  const mytoken = 'test';

    if (mode && token){

      if (mode === 'suscribe' && token === mytoken){
        res.status(200).send(challenge);
      } else{
          res.status(403);
        }

    }
});

app.post('/webhook', (req, res) => {

    let body_param = req.body;
    
    console.log(JSON.stringify(body_param, null, 2));
    
    if(body_param.objet){
        if(body_param.entry && body_param.entry[0].changes && 
          body_param.entry[0].changes.value.menssage &&
          body_param.entry[0].changes.value.menssage[0]
          ){
              let phon_no_id = req.param[0].challenge[0].value.metadata.phone_number_id;
              let from = req.param[0].challenge[0].value.menssage[0].from;
              let mens_body = req.param[0].challenge[0].value.menssage[0].text.body;

              axios({
                

              })
          }
    }

});*/
