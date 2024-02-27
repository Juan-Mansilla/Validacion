import express from 'express';
import ejs from 'ejs';
import {dirname, join} from 'path'
import { fileURLToPath } from 'url';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log('__dirname')

app.set('view engine', 'ejs')
app.set('views',)

app.use(express.static(join(__dirname, 'public')))
app.get('/', (req, res) => res.render('index.ejs') )


app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

console.log('hola')