import express from 'express';
import ejs from 'ejs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('__dirname');

app.set('view engine', 'ejs');
app.set('views',);

app.use(express.static(join(__dirname, 'public')));
app.get('/', (req, res) => res.render('index.ejs'));

// Configuración para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Punto final para manejar la solicitud POST para validar un número de teléfono
app.post('/validar-numero', async (req, res) => {
  try {
    const { codigoArea, prefijo, numero } = req.body;
    const numeroCompleto = `+${codigoArea}${prefijo}${numero}`;
    const response = await axios.post('/v1/contacts', {
      blocking: 'wait',
      contacts: [numeroCompleto],
      force_check: false
    });

    console.log('Respuesta de la API de validación:', response.data);
    
    // Verificar si el número está validado
    const esValido = response.data.contacts.some(contacto => contacto.status === 'valid');
    
    if (esValido) {
      // Si el número es válido, enviar un mensaje a través de la API de Facebook
      const responseMensaje = await axios.post('https://graph.facebook.com/v18.0/247797708416328/messages', {
        messaging_product: "whatsapp",
        to: numeroCompleto,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US"
          }
        }
      });

      console.log('Respuesta de la API de mensajes:', responseMensaje.data);
      res.send('Mensaje enviado exitosamente');
    } else {
      // Si el número no es válido, enviar un mensaje de error
      res.status(400).send('El número de teléfono no es válido');
    }
  } catch (error) {
    console.error('Error al llamar a la API:', error.message);
    res.status(500).send('Ocurrió un error al procesar la solicitud.');
  }
});

// Punto final para manejar la solicitud POST desde Postman para enviar mensajes a través de la API de Facebook Graph
app.post('/enviar-mensaje', async (req, res) => {
  try {
    const data = req.body; // El cuerpo de la solicitud POST desde Postman
    const response = await axios.post('https://graph.facebook.com/v18.0/247797708416328/messages', data);

    res.json(response.data); // Devolver la respuesta de la API de Facebook Graph
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
