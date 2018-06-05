const Datastore = require('nedb-promises')
import * as express from 'express'
import * as bodyParser from 'body-parser'
import expect from 'ceylon'

const datastore = Datastore.create('data/index.json')
const app = express()
app.use(bodyParser.json())

app.post('/api/doc', async (req, res) => {
  try {
    const { title, author, content } = req.body

    expect(title)
      .toExist()
      .toBeA('string')
    expect(author)
      .toExist()
      .toBeA('string')
    expect(content)
      .toExist()
      .toBeA('string')

    const doc = await datastore.insert({
      title,
      author,
      content,
    })

    console.log(`Added record with id ${doc._id}`)
    res.status(200).send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

app.get('/api/doc/:_id', async (req, res) => {
  try {
    const { _id } = req.params

    expect(_id)
      .toExist()
      .toBeA('string')

    const result = await datastore.find({
      _id,
    })

    if (result) {
      console.log(`Found result with id ${result._id}.`)
      res.status(200).json(result)
    } else {
      console.warn('No results found for request.')
      res.status(404).send()
    }
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

app.get('/api/doc', async (req, res) => {
  try {
    const results = await datastore.find({})

    if (results) {
      console.log(`Found ${results.length} results.`)
      res.status(200).json(results)
    } else {
      console.warn('No results found for request.')
      res.status(404).send()
    }
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

app.listen(3000)
