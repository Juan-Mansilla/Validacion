import express from 'express';
import ejs from 'ejs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import sdk from 'api';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('__dirname');

app.set('view engine', 'ejs');
app.set('views',);

app.use(express.static(join(__dirname, 'public')));
app.get('/', (req, res) => res.render('index.ejs'));

// Configuración para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);





// Punto final para manejar la solicitud POST para validar un número de teléfono
app.post('/validar-numero', async (req, res) => {
  try {

    const numeroCompleto = `${req.body.numero}`;
    sdk('@whapi/v1.7.5#27slv2oltdcs6xr').auth('spSGMF1exmVXWbIFwxMq44pgUVqoKn8B');

    //sdk('@whapi/v1.7.5#27slv2oltdcs6xr').checkPhones({ force_check: false, contacts: [numeroCompleto] })
    //.then(({ data }) => console.log(data))
    //.catch(err => console.error(err));

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer spSGMF1exmVXWbIFwxMq44pgUVqoKn8B'
    }
    
    const data = {
      "blocking": "wait",
      "contacts": [
        `{{${numeroCompleto}}}`
      ]
    }
    
    axios.post('https://gate.whapi.cloud/contacts', data, {
        headers: headers
      })
      .then((response) => {
        console.log('Respuesta de la API de validación:', response);
      })

  } catch (error) {
    console.error('Error al llamar a la API:', error.message);
    res.status(500).send('Ocurrió un error al procesar la solicitud.');
  }
});

