const express =  require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const dbsetting = require('./src/settings/dbsettings')
const routes = require('./src/router/routes')

const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(routes)

app.listen(process.env.PORT || 3000, () => {

    console.log('Server is running on port ---', process.env.PORT)
})