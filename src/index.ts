import HttpStatusCode from './HttpStatusCode'
import { APIGatewayProxyEvent } from 'aws-lambda'

/** Interfaces */
export interface HttpResponse {
  statusCode: number,
  headers: {
    'Access-Control-Allow-Origin': string,
    'Access-Control-Allow-Credentials': boolean
  },
  body: string | Record<string, unknown>
}

/**
 * Will return fully formatted and ready 
 * HTTP response for Lambda delivery
 * @param statusCode 
 * @param origin
 * @param format 
 */
const withStatusCode = (statusCode: number, origin: string, format?: Function): Function => {
  if (100 > statusCode || statusCode > 599) {
    throw new Error('status code out of range')
  }

  // return a function that will take some data and formats a response with a status code
  return (data: string | Record<string, unknown> | Array<any> | void): HttpResponse => {
    const response: HttpResponse = {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
      },
      body: ''
    }

    // only send a body if there is data
    if (data) {
      response.body = (typeof format === 'function') ? format(data) : data
    }

    return response
  }
}

/**
 * 
 * @param apiGatewayProxyEvent 
 */
const validateAndParseRequestHeaders = (apiGatewayProxyEvent: APIGatewayProxyEvent): Record<string, unknown> | null => {
  if (apiGatewayProxyEvent !== null && apiGatewayProxyEvent.headers !== null && apiGatewayProxyEvent.headers !== undefined) {
    const requestHeaders: Record<string, unknown> = apiGatewayProxyEvent.headers

    return requestHeaders
  }

  return null
}

/**
 * 
 * @param apiGatewayProxyEvent 
 */
const validateAndParseRequestBody = (apiGatewayProxyEvent: APIGatewayProxyEvent): string | null => {
  if (apiGatewayProxyEvent !== null && apiGatewayProxyEvent.body !== null && apiGatewayProxyEvent.body !== undefined) {
    const requestBody: string = JSON.parse(apiGatewayProxyEvent.body)

    return requestBody
  }

  return null
}

export default {
  withStatusCode,
  validateAndParseRequestHeaders,
  validateAndParseRequestBody,
  HttpStatusCode
}
