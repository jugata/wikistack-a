const http = require('http')
const { db, Page, User } = require('./models')
const app = require('./app');
const server = http.createServer(app)

const PORT = 3000

const init = async () => {

  db.sync({ force: false })


  server.listen(PORT, () => {
    console.log(`listening from PORT ${PORT}`)
  })

}

init()
