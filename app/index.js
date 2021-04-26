const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const config = {
  host: 'db',
  user: 'root',
  password: 'mysql',
  database: 'challenge',
}

const createTable = async (connection) => {
  return new Promise((resolve, reject) => {
    const sql =
      'CREATE TABLE IF NOT EXISTS people (id int auto_increment primary key, name varchar(255));'
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error)
      console.log(`Created "people" table`)
      resolve(results)
    })
  })
}

const showData = async (connection) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM people'
    connection.query(sql, (error, results, fields) => {
      if (error) return reject(error)
      resolve(results)
    })
  })
}

const insert = async (connection, name) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO people(name) VALUES('${name}')`
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
    const { name } = req.query

    if (!name || name.length === 0) {
      throw new Error('name is required')
    }

    await insert(connection, name)
    const rows = await showData(connection)

    res.send(html(rows))
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  } finally {
    connection.end()
  }
})

const start = async () => {
  await createTable(mysql.createConnection(config))

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start()
