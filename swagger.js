import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
     openapi: '3.0.0',
    info: {
      title: 'LoopBack Application v2',
      version: '1.0.2',
    },
    paths: {},
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'bearerAuth',
            in: 'header'
          }
        }
    },
  },
    
  apis: ['./routes/*.js', './controllers/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
