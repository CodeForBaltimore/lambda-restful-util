import app, { HttpResponse } from './index'

import chai from 'chai'

const { expect } = chai

describe('Validate package', function () {
  it('withStatusCode invalid HTTP code', async function () {
    expect(function () {
      const httpCode = 42
      app.withStatusCode(httpCode, 'http://localhost:8080')
    }).to.throw('status code out of range')
  })
  it('withStatusCode 200 HTTP code', async function () {
    const ok = app.withStatusCode(app.HttpStatusCode.OK, 'http://localhost:8080', JSON.stringify)
    const example = {
      name: 'Homer Simpson',
    }

    const goodOutput: HttpResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Credentials': true,
      },
      body: '{"name":"Homer Simpson"}'
    }

    expect(ok(example)).to.deep.equal(goodOutput)
  })
})
