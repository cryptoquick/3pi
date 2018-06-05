import { test } from 'ava'
import * as request from 'request-promise'
import * as faker from 'faker'

faker.seed(314)

test('insert a document', async t => {
  t.is(
    (await request.post({
      baseUrl: 'http://localhost:3000/api',
      uri: '/doc',
      body: {
        title: faker.name.title(),
        author: faker.name.findName(),
        content: faker.lorem.paragraph(),
      },
      json: true,
      resolveWithFullResponse: true,
    })).statusCode,
    200
  )
})
