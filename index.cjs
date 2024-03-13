// Iniciar codigo en la terminal con "npm run dev"
const express = require('express')
const bodyParser = require('body-parser')
const sdk = require('api')('@whapi/v1.7.5#27slv2oltdcs6xr')

// En la línea 7 cambiar el token por el nuevo utilizado
sdk.auth('na2lcOPDAzbP1vb5AIlIZDnDcFDbblyo')
const app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.post('/validar-numero', (req, res) => {
  const numero = req.body.numero
  const numeroAValidar = numero.replace(/[^0-9]/g, '') || ''

  const checkNum = async num => {
    try {
      const { data } = await sdk.checkPhones({
        blocking: 'no_wait',
        force_check: false,
        contacts: [num]
      })
      return data
    } catch (error) {
      console.error(error)
      res.render('index', {
        error: error.message,
        resultadoValidacion: 'no hay data'
      })
    }

    return null
  }

  checkNum(numeroAValidar).then(data => {
    if (data.contacts.length === 0) {
      checkNum(numeroAValidar).then(data2 => {
        console.log('la verdadera', data2)
        if (data2.contacts[0].status) {
          res.render('index', {
            resultadoValidacion: data2.contacts[0].status
          })
        }
      })

      return
    }

    res.render('index', {
      resultadoValidacion: data
    })
  })
})

app.get('/', (req, res) => {
  res.render('index', { resultadoValidacion: null, error: null })
})

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000')
})
