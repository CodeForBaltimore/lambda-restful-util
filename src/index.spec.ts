import app, { HttpResponse } from './index'

import chai from 'chai'

const { expect } = chai

describe('Validate package', function () {
  it('withStatusCode invalid HTTP code', async function () {
    expect(function () {
      const httpCode = 42
      app.withStatusCode(httpCode)
    }).to.throw('status code out of range')
  })
  it('withStatusCode 200 secure', async function () {
    const ok = app.withStatusCode(app.HttpStatusCode.OK, JSON.stringify)
    const bad = app.withStatusCode(app.HttpStatusCode.BAD_REQUEST, JSON.stringify)
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

    const insecureOutput: HttpResponse = {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: '{"name":"Homer Simpson"}'
    }

    expect(ok(example, 'http://localhost:8080')).to.deep.equal(goodOutput)
    expect(bad(example)).to.deep.equal(insecureOutput)
  })
  it('withStatusCode 400 insecure', async function () {
    const bad = app.withStatusCode(app.HttpStatusCode.BAD_REQUEST)
    const example = 'test'

    const insecureOutput: HttpResponse = {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'test'
    }

    expect(bad(example)).to.deep.equal(insecureOutput)
  })
})
