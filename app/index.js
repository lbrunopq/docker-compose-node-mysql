const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}

const getData = async (connection) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM people'
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error)
      resolve(results)
    })
  })
}

const html = (rows) => {
  let data = '<p><h1>Full Cycle Rocks!</h1></p>'
  for (const row of rows) {
    data += `<br />${row.name}`
  }
  return data
}

app.get('/', async (req, res) => {
  const connection = mysql.createConnection(config)

  try {
    const rows = await getData(connection)
    const content = html(rows)

    res.send(content)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  } finally {
    connection.end()
  }
})

const start = async () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start()
