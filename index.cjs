const express = require('express');
const bodyParser = require('body-parser');
const sdk = require('api')('@whapi/v1.7.5#27slv2oltdcs6xr');

// Reemplazar token con el nuevo
sdk.auth('uEzmJh9j7fFOI7FIVvc349qpQyj3zRMc');
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.post('/validar-numero', (req, res) => {
  const numero = req.body.numero;
  const numeroAValidar = numero.replace(/[^0-9]/g, '') || '';

  const checkNum = async num => {
    try {
      const { data } = await sdk.checkPhones({
        blocking: 'no_wait',
        force_check: false,
        contacts: [num],
      });
      return data;
    } catch (error) {
      console.error(error);
      res.render('index', {
        error: error.message,
        resultadoValidacion: 'no hay data',
      });
    }

    return null;
  };

  checkNum(numeroAValidar).then(data => {
    if (data.contacts.length === 0) {
      checkNum(numeroAValidar).then(data2 => {
        console.log('la verdadera', data2);
        if (data2.contacts[0].status) {
          res.render('index', {
            resultadoValidacion: data2.contacts[0].status === 'valid' ? "¡Este número posee Whatsapp!" : "¡Este número no posee Whatsapp!",
            resultadoValido: data2.contacts[0].status === 'valid',
          });
        }
      });

      return;
    }

    res.render('index', {
      resultadoValidacion: data.contacts[0].status === 'valid' ? "¡Este número posee Whatsapp!" : "¡Este número no posee Whatsapp!",
      resultadoValido: data.contacts[0].status === 'valid',
    });
  });
});

app.get('/', (req, res) => {
  res.render('index', { resultadoValidacion: null, error: null, resultadoValido: null });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
